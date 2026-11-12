# API — Route Handlers

All handlers live under `src/app/api/`.

- **Responses** are JSON: success is `{ message: <Persian MESSAGE enum> }` and failure is `{ error: <Persian ERROR enum> }` (`src/types/enums.ts`). No handler returns data. **There are no GET endpoints for content**, because pages read MongoDB directly (ARCHITECTURE.md).
- **"Session"** below means `getServerSession(authOptions)` returned non-null. It's any logged-in admin of either role. **No handler checks the role.**
- **Common errors:**
  - 401 `LOGIN`: no session.
  - 404 `CANT_FIND_USER`: the session user is gone (only where noted).
  - 422 `INVALID_DATA`: missing field.
  - 500 `SERVER_ERROR`: any exception, logged with `console.log`.
- Every multipart upload accepts **any** file type and size. Filenames are `YYYY-MM-DD$<original basename>$<epoch>-<rand>.<ext from MIME>`.

Path note: the ziyarat API folder is capitalized (`/api/Ziartnameh`). Paths are case-sensitive.

---

## Auth

### `GET|POST /api/auth/[...nextauth]`
`src/app/api/auth/[...nextauth]/route.ts`. Standard NextAuth v4 handler with the Credentials provider (`src/components/lib/auth.ts`). `authorize` returns `{ email }`.

Errors are thrown as Persian strings and surface in `signIn().error`:
- `SERVER_ERROR` when the DB is down
- `INVALID_DATA`
- `ACCESS_DENIED` when there's no such user
- `WRONG_PASSWORD`

### `POST /api/auth/signup` ⚠ CRITICAL
`src/app/api/auth/signup/route.ts`
- **Auth: none.** Anyone can call it. The admin UI (`/admin-panel/admins/add`) is OWNER-only, but the endpoint isn't protected.
- Body (JSON): `{ email: string, password: string }`.
- 422 `INVALID_DATA` if a field is missing. 422 `USER_EXIST` if the email exists.
- 201 `NEW_ADMIN`. The user is created with role `ADMIN`.
- Logs the plaintext `{email, password}` to the server console.

### `DELETE /api/auth/delete/[userId]`
- Auth: session plus the user exists. **Any ADMIN can delete any user, including the OWNER or themselves.**
- 404 `CANT_FIND_ADMIN`. 200 `ADMIN_DELETE`.
- Reads `context.params.userId` synchronously (breaks on Next 15+).

---

## Zekr

### `POST /api/zekr`
- Auth: session plus the user exists. Multipart fields:
  - `Title`, `Author`, `Year` (must be in `Save.Years`, else 422 `INVALID_YEAR`)
  - `Zekr_Text` (JSON of `{FirstParagraph,SecondParagraph}`)
  - `Voice` (File, optional, saved to `public/uploads/voices/`)
- `JSON.parse` runs **before** the auth check, so malformed or missing `Zekr_Text` returns 500.
- 201 `NEW_ZEKR`.

### `PATCH /api/zekr`
- Same fields plus `id`.
- 404 `CANT_FIND_ZEKR`. 201 `ZEKR_EDIT` (a 201 for an update).
- **Bugs:**
  - Without a new `Voice`, it sets `Voice = null`, which erases the audio.
  - With a new `Voice` and no previous audio, `unlinkSync(".../null")` throws, which returns 500.
  - `zekr.save()` isn't awaited.

### `DELETE /api/zekr/delete/[zekrId]`
- Auth: session plus the user exists. 404 `CANT_FIND_ZEKR`. 200 `ZEKR_DELETE`.
- The audio file is **not** deleted.

## Ziyarat-nameh

### `POST /api/Ziartnameh`
- Auth: session plus the user exists. Multipart fields:
  - `Title`, `Description`
  - `Text` (JSON array of `{Original, Translation, Supplement?}`). Each section needs Original and Translation, otherwise 422 with the section number.
  - `Voice` (File, optional)
- 201 `NEW_ZIARTNAMEH`. Logs the created document.

### `PATCH /api/Ziartnameh`
- Same fields plus `id`. 404 `CANT_FIND_ZIARTNAMEH`. 201 `ZIARTNAMEH_EDIT`.
- **Same voice bugs as zekr.** Also, the edit form re-sends the existing filename **string** as `Voice`, so `Voice.arrayBuffer` isn't a function and the request returns 500 (`T/ZiartnamehEditPage.tsx`). `save()` isn't awaited.

### `DELETE /api/Ziartnameh/delete/[ziartnamehId]`
- Auth: session plus the user exists. 200 `ZIARTNAMEH_DELETE`. The audio file isn't deleted.

## Ceremony

### `POST /api/ceremony`
- Auth: session plus the user exists. Multipart fields:
  - `title`, `description`, `date` (ISO)
  - `coverImage` (File, required)
  - `images` (File[], repeated key)
- Creates `public/uploads/images/cermony/<slug>/` and `…/cover/`. 201 `NEW_CERMONY`.
- Two ceremonies whose titles transliterate to the same slug **share and overwrite a folder**.

### `PATCH /api/ceremony`
- Auth: session plus the user exists. **Doesn't call `connectDB()`**; it relies on a warm connection, so it fails on a cold start (**Inference**).
- Multipart fields:
  - `id`, `title`, `description`, `date`
  - `coverImage` (File) with `isCheckedCoverImage` = `"true"`
  - `images` (new File[])
  - `deletedImages` (string[])
  - `isCheckedImages` (sent but ignored)
- Behavior: replaces the cover, deletes the listed images, then deletes **any file in the folder not referenced** by the record. It then **renames the folder** to the new title's slug, and fails if the target exists.
- 200 `CEREMONY_EDIT`.

### `DELETE /api/ceremony/delete/[ceremonyId]`
- Auth: session plus the user exists. Removes `public/uploads/images/cermony/<persianToFinglish(title)>` recursively. **Bug:** it doesn't apply the same sanitize and lowercase step as create, so the folder is usually not found and files leak.
- 200 `CEREMONY_DELETE`.

## Trustees (stored in `Save.Trustees`)

### `POST /api/trustees`
- Auth: **session only**. Multipart fields: `fullName`, `phone`, `role` (free string, not validated against `TRUSTEES_ROLE`), `img` (File, optional, saved to `images/Trustees/`).
- 201 `NEW_TRUSTEES`. `save()` isn't awaited.

### `PATCH /api/trustees`
- Auth: session only. The same fields plus `id` and `isChecked` (`"true"` means replace the photo).
- 404 `CANT_FIND_TRUSTEES`. 201 `TRUSTEES_EDIT`.

### `DELETE /api/trustees/delete/[trusteesId]`
- Auth: session plus the user exists. Deletes the photo, then removes the entry.
- **Bug:** if `img` is null or empty, `path.resolve`/`unlinkSync` throws and returns 500, so a member without a photo can't be deleted.
- Success message is `ZEKR_DELETE` (wrong text). `save()` isn't awaited.

## Pir-Gholaman (stored in `Save.OldSlaves`)

### `POST /api/oldSlaves`
- Auth: session only. Multipart fields: `fullName`, `date` (ISO), `img` (File, optional, saved to `images/oldSlaves/`).
- 201 `NEW_OLD_SLAVES`. `save()` isn't awaited.

### `PATCH /api/oldSlaves`
- Auth: session only. The same fields plus `id` and `isChecked`.
- 404 `CANT_FIND_OLD_SLAVES`. 201 `OLD_SLAVES_EDIT`. Uses `mkdir` without `recursive`.

### `DELETE /api/oldSlaves/delete/[oldSlavesId]`
- Auth: session plus the user exists. 200 `OLD_SLAVES_DELETE`.
- **Bug:** looks for the photo in `images/Trustees/`, so the real file in `images/oldSlaves/` is never removed.

## Years (stored in `Save.Years`)

### `POST /api/year` / `DELETE /api/year`
- Auth: session only. JSON body `{ year: string }`.
- POST returns 422 `YEAR_EXIST` and 201 `NEW_YEARS`. DELETE returns 422 `INVALID_YEAR` and 201 `YEAR_DELETED`.
- DELETE doesn't check whether any zekr uses the year. `save()` isn't awaited.
- The client's DELETE call sends a JSON body **without** a `Content-Type` header (works because the handler calls `req.json()` regardless).

## Contact

### `POST /api/send`
`src/app/api/send/route.tsx`
- **Auth: none (public).** JSON body `{ Email, Name, Subject, Text }`, all required, else 422.
- Sends through Resend from `<Email local-part>@resend.dev` to a hard-coded Gmail address, with React body `src/utils/email-template.tsx`.
- 201 `SEND_MESSAGE`. Any Resend failure returns 500 with no logging.
- **Risks:** no rate limit, no captcha, no email-format validation, user-controlled subject. Whether the sender address is accepted is **Unknown**.

## Blog (abandoned)

### `POST /api/blog`
`src/app/api/blog/route.ts`
- Auth: session plus the user exists. Multipart fields: `title`, `content` (JSON array of Slate nodes), `author`, `thumbnailUrl` (File, required).
- For every `image` node it does `fetch(node.src)` **server-side**. That's an **SSRF vector** (any URL, including internal addresses). It saves the result as `.jpeg` regardless of type.
- Stores the stringified content into an array-typed field (schema mismatch). Errors aren't logged.
- **No UI calls this endpoint.**

### `POST /api/upload-image` — **does not exist**
It's referenced by `src/components/module/test.tsx`, so it returns 404.
