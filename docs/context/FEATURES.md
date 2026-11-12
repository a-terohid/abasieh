# FEATURES — Inventory

Status legend: **Implemented**, **Partially Implemented**, **Incomplete**, **Broken**, **Planned**, **Unknown**.
A status describes the code at commit `085db3c` (HEAD). The uncommitted dependency upgrade in the working tree breaks the **build** as a whole (see PROGRESS.md). That's not repeated per feature.

Path shorthand: `T/` = `src/components/template/`, `M/` = `src/components/module/`, `C/` = `src/components/constants/`, `E/` = `src/components/elements/`.

---

## Part A — Existing features

### F-01 Site shell: navigation, footer, theme — *Partially Implemented*
- **Purpose:** global header with hamburger drawer, theme toggle and footer with about/social links.
- **Implementation:** `src/app/layout.tsx` → `NextAuthProvider` → `ThemeProvider` (next-themes, `attribute="class"`) → `src/components/layout/Layout.tsx` → `M/Navbar.tsx` and `M/Footer.tsx`.
- **Works:** the drawer menu lists all public sections, the admin link appears when authenticated (`useSession`), and dark/light toggle works.
- **Limitations:**
  - The search icon does nothing.
  - The "مقاله ها" (articles) link goes to `/`.
  - The Eitaa link goes to `/`.
  - The footer "درباره ما" is Lorem ipsum.
  - Root metadata is still `"Create Next App"`.
  - The menu only closes when an item is clicked (no outside-click/Escape).
  - Toggles are `<span onClick>` and aren't keyboard accessible.
  - The theme icon is wrong on first render when `theme === "system"`.

### F-02 Home page — *Incomplete*
- `src/app/page.tsx` renders the literal text `homem page`. There is no content.

### F-03 Zekr archive (public) — *Implemented*
- **Purpose:** list annual chants, filter by year, read a chant and play its audio.
- **Pages:** `/zekr` (`src/app/zekr/page.tsx` → `T/Zekrpage.tsx`, `C/ZekrCart.tsx`, `M/ZekrFilterSection.tsx`), and `/zekr/[zekrId]` (`T/ZekrDetailspage.tsx`, `M/ZekrtextSection.tsx`).
- **Data:** `Zekr` model. Years come from the `Save` singleton (DATABASE.md).
- **Behavior:**
  - The year filter is a `<select>` plus an "اعمال" link building `?year=`. Filtering is done **in memory** after `Zekr.find()` loads all documents.
  - The detail page toggles between stanza 1 and 2 and alternates verse alignment (`even:text-left`) to mimic poetry layout.
  - Audio comes from `/uploads/voices/<file>`.
- **Limitations:**
  - No sorting or pagination.
  - Choosing the placeholder option sends `?year=` empty, which shows all items (works by accident).
  - `generateMetadata` reads a misspelled field `zekr.Tear`, so the description is always undefined.
  - `ZekrDetailspage.tsx` imports `useState` without `"use client"` (unused). Next's server-component import check may reject this. **Unknown** whether it builds.
  - Stanza count is hard-coded to exactly two.

### F-04 Ziyarat-nameh (public) — *Implemented*
- **Pages:** `/ziartnameh` (`T/ZiartnamehHomePage.tsx`, `C/ZiartnamehCard.tsx`), and `/ziartnameh/[ziartnamehId]` (`T/ZiartnamehDetailsPage.tsx`, `C/ZiartnamehTextCard.tsx`).
- **Data:** `Ziartnameh` model.
- **Behavior:** a list of cards. The detail page shows the description, an optional `<audio>`, and numbered sections with Supplement (italic green), Original (bold) and Translation.
- **Limitations:**
  - Arabic text has no dedicated Arabic font, `lang="ar"` or larger size.
  - No section anchors/TOC, although each section gets `id={index}`.
  - Card descriptions are clipped with a fixed `h-[150px]` and no ellipsis.

### F-05 Ceremonies (public) — *Implemented (past-event gallery only)*
- **Pages:** `/ceromony` (misspelled route; `T/CeremonyPage.tsx`, `C/CeremonyCard.tsx`), and `/ceromony/[ceromonyId]` (`T/CeremonyDetailsPage.tsx`, `M/Slider.tsx`).
- **Data:** `Ceremony` model. Images come from `public/uploads/images/cermony/<slug>/…`.
- **Behavior:** cards with a cover, Jalali date and description. The detail page has an image slider and the description.
- **Limitations:**
  - No upcoming/past distinction, no time or location fields (the page intro text promises "location, speakers", which don't exist).
  - No sorting.
  - The card image uses the relative URL `uploads/...` (missing the leading `/`). It works only on `/ceromony`, not from nested routes.
  - Image paths are derived from the **title** (see DECISIONS.md D-07).
  - The slider has no swipe, keyboard or alt text (it uses "Slide n").

### F-06 Trustees (public) — *Implemented, with a privacy defect*
- **Page:** `/trustess` (misspelled; `T/TrusstesPage.tsx`, `C/TrustesCart.tsx`).
- **Data:** `Save.Trustees` (DATABASE.md), sorted by role via `src/utils/sortTrustees.ts`.
- **Behavior:** a card with photo (falls back to `public/img/profile.png` after a client-side `HEAD` request), name, role and phone.
- **⚠ Privacy defect (Fact):** `mask(phone, "****-***-****")` in `src/utils/mask.ts` **formats** the number. It doesn't **hide** it, so every trustee's full mobile number is published on a public page and serialized into client props.

### F-07 Pir-Gholaman memorial (public) — *Implemented*
- **Page:** `/oldSlaves` (`T/OldSlavesPage.tsx`, `C/OldSlavesCart.tsx`).
- **Data:** `Save.OldSlaves`.
- **Behavior:** a card with photo (same HEAD-check fallback), name and Jalali date of death.
- **Limitations:** no ordering, and the route name is inappropriate (see PROJECT.md).

### F-08 Contact — *Implemented (delivery unverified)*
- **Page:** `/contactus` (`T/ContactUsPage.tsx`, `M/ContactForm.tsx`) → `POST /api/send` (Resend).
- **Shows:** phone, email (not a `mailto:` link), address, Google Maps link and social links. All are hardcoded in the component and duplicated in `T/DonatePage.tsx`.
- **Limitations:**
  - No client validation, no email format check, no rate limit or captcha (an open spam relay to the Heyat inbox).
  - Sender is `<visitor-username>@resend.dev`. **Unknown** whether Resend accepts this sender; it normally requires a verified domain or `onboarding@resend.dev`.
  - Uses a `type="text"` input for email.

### F-09 Donate — *Partially Implemented (static)*
- **Page:** `/donate` (`T/DonatePage.tsx`). Static text only.
- The card number and Sheba (IBAN) lines are **empty labels**. There's no payment integration.

### F-10 Authentication (admin sign-in) — *Implemented, with critical security gaps*
- **Page:** `/signin` (`src/app/(auth)/signin/page.tsx` → `T/Signin.tsx`), using NextAuth credentials with JWT (`src/components/lib/auth.ts`).
- **Flow:** ARCHITECTURE.md → Authentication.
- **Limitations:**
  - **No sign-out UI anywhere** (`signOut` is never called).
  - No link to sign-in in the UI.
  - Error messages distinguish "user not found" (`ACCESS_DENIED`) from "wrong password", which enables user enumeration.
  - No rate limiting.

### F-11 Admin panel shell — *Implemented*
- `src/app/admin-panel/layout.tsx` redirects unauthenticated users to `/signin` and loads the user to get the role. `src/components/layout/AdminLayout.tsx` provides the sidebar (horizontal scroll on mobile) with role-based links.
- `/admin-panel` itself renders the placeholder text `paned admin`, with no dashboard.

### F-12 Admin CRUD modules

| Module | Admin routes (`src/app/admin-panel/…`) | Create | Read | Update | Delete | Status |
|---|---|---|---|---|---|---|
| Admins | `admins`, `admins/add` | ✅ (`/api/auth/signup`) | ✅ OWNER-only page | ❌ none (no password change) | ✅ | Implemented; **API unprotected** (see API.md) |
| Years | `year`, `year/add` | ✅ | ✅ | ❌ | ✅ (doesn't check if zekrs still use the year) | Implemented |
| Zekr | `zekr`, `zekr/add`, `zekr/[id]`, `zekr/edit/[id]` | ✅ | ✅ | ⚠ | ✅ (audio file not deleted) | **Edit Broken in common cases** (below) |
| Ziyarat | `ziartnameh`, `…/add`, `…/[id]`, `…/edit/[id]` | ✅ | ✅ | ⚠ | ✅ (audio file not deleted) | **Edit Broken in common cases** |
| Ceremonies | `ceremony`, `…/add`, `…/[id]`, `…/edit/[id]` | ✅ | ✅ | ⚠ | ⚠ | Partially Implemented (file-handling bugs) |
| Trustees | `trustees`, `…/add`, `…/edit/[id]` | ✅ | ✅ | ✅ | ⚠ | Implemented; delete crashes when the member has no photo |
| Pir-Gholaman | `oldSlaves`, `…/add`, `…/edit/[id]` | ✅ (OWNER-only page) | ✅ | ✅ | ⚠ | Implemented; delete leaves the photo file behind |

Edit and delete defects, verified by reading `src/app/api/**`. API.md has the full detail.
- **Zekr / Ziyarat edit:**
  - Saving **without choosing a new audio file sets `Voice` to `null`**, which erases the existing audio reference.
  - Choosing a new file when none existed before throws inside `unlinkSync(.../null)`, which returns a 500.
  - In the ziyarat edit form, the existing filename *string* is re-sent as `Voice`, so the server calls `.arrayBuffer()` on a string and returns a 500.
  - `save()` isn't awaited.
- **Ceremony edit:**
  - The replacement cover is written under a filename without the date prefix (that part is harmless).
  - Renaming the title renames the image folder.
  - The edit form's cover preview path omits `/cover/`, so it's broken.
  - Unchecking the "change images" checkbox still sends nothing (fine).
  - New images are not limited to images (`accept` is client-only).
- **Ceremony delete:** it removes the folder `persianToFinglish(title)` **without** the `_`-sanitizing and lowercase step used at creation. For any title containing spaces or characters that sanitizing changes, the folder **isn't** deleted, so images leak on disk.
- **Trustee delete:** `path.resolve(dir, img)` with `img === null` throws, so it returns a 500 for members without a photo. The success message is `ZEKR_DELETE` (wrong text).
- **Pir-gholaman delete:** it looks for the photo in `Trustees/`, not `oldSlaves/`, so the file is never removed.
- **Role enforcement:** OWNER-only rules exist **only in some pages** (admins list; trustees add/edit; pir-gholaman add). Trustees list, pir-gholaman edit and all APIs aren't role-checked (see ARCHITECTURE.md → Authorization).

### F-13 Articles / Blog — *Incomplete (abandoned)*
- Added in the last commit `085db3c` ("last", 2025-03-26).
- **Files:** `src/models/blogs.ts`, `src/app/api/blog/route.ts` (POST only), `src/app/admin-panel/blogs/page.tsx` → `M/test.tsx` (a bare Slate editor demo).
- **State:**
  - The editor uploads to `/api/upload-image`, **which doesn't exist**.
  - Nothing calls `/api/blog`.
  - There's no public page.
  - The API stores `JSON.stringify(parsedContent)` into a field typed as an array of sub-documents, a schema mismatch.
  - The API **fetches arbitrary URLs from `node.src` server-side** (SSRF risk).

### F-14 SEO metadata — *Partially Implemented*
- Most pages export a Persian `metadata` (title, description, keywords, robots), and detail pages use `generateMetadata`.
- **Missing:** root title/description (still Create Next App), Open Graph images, canonical URLs, `sitemap`, `robots`, structured data and a favicon for the brand (the default `src/app/favicon.ico`).
- The ceremony "not found" metadata says "ذکر پیدا نشد" (copy-paste error).

---

## Part B — Proposed features (not implemented; see ROADMAP.md)

| ID | Proposal | Evidence of need |
|---|---|---|
| P-01 | Real home page (identity, next event, latest zekr, quick links) | F-02 placeholder |
| P-02 | Upcoming events/program schedule (date, time, location, type) | Brief; F-05 has only past-event fields |
| P-03 | About/history page | Footer Lorem ipsum; brief |
| P-04 | Articles (finish or drop F-13) | Nav link and half-built backend |
| P-05 | Site search | Dead search icon |
| P-06 | Donation details or payment link | Empty labels in F-09 |
| P-07 | Video/media gallery | Brief; no video support |
| P-08 | Admin dashboard, sign-out, password change | F-10, F-11 gaps |

---

## Update 2026-11-11 — Runtime status and proposed decisions

**Runtime (Verified, working tree on Next 16):**
- Every route returns **HTTP 500**. The cause is `import jalaali from 'jalaali-js'` (v2 has no default export) in `C/CeremonyCard.tsx`, `C/OldSlavesCart.tsx` and `T/CeremonyDetailsPage.tsx`. That build error poisons the whole module graph.
- The statuses above describe HEAD behavior and **are masked at runtime** until this is fixed.
- The full error inventory (E-01…E-35) is in [../CASE-STUDY.md §8](../CASE-STUDY.md).

**Proposed decisions** (CASE-STUDY §21; unapproved):

| Feature | Decision |
|---|---|
| F-03 Zekr | REDESIGN (flagship; year rail, occasions, dedicated reader) |
| F-04 Ziyarat | REDESIGN + extend to duas (shared model with zekr, separate section) |
| F-05 Ceremonies | REDESIGN as occasion-tagged "ceremony reports" |
| F-06 Trustees | IMPROVE (remove phone numbers; move under About) |
| F-07 Pir-gholaman | REDESIGN as a dignified memorial with profiles; new URL |
| F-08 Contact form | IMPROVE or REMOVE (owner decision) |
| F-09 Donate | REPLACE with account cards + copy (needs real data) |
| Years | MERGE into zekr |
| F-10/11/12 Admin | IMPROVE auth / REPLACE CRUD with a schema-driven editor |
| F-13 Blog | REMOVE the endpoint now; ADD articles later only if approved |
| Search icon | REPLACE with real search |

**Proposed new features for the initial rebuild:**
- Occasion taxonomy and pages
- Site search
- Season-aware home (Muharram mode)
- Reader controls
- Share a stanza or section
- Draft/publish
- Audio, conditional on storage approval

---

## Update 2026-11-12 — Jalali calendar handling

- **`src/utils/jalali.ts`** is the single source for Jalali logic:
  - Display uses `Intl` with the `persian` calendar in **Asia/Tehran** time.
  - Year ranges map to half-open UTC ISO ranges [1 Farvardin Y 00:00 IRST, 1 Farvardin Y+1 00:00 IRST).
  - Storage is unchanged: Gregorian ISO strings.
- **Bug fixed:** dates picked in Iran (stored as local midnight → previous-day `…T20:30Z`) were displayed one day early because the code read `getUTC*`. All three copies of that logic now use the helper.
- **Zekr year filter (F-03):** same `?year=` contract. It compares as Jalali years, so `۱۴۰۳`, `1403` and surrounding spaces all match; non-numeric labels still match by exact string. The UI is the shared year chips with Persian digits, newest first.
- **Ceremony year filter (F-05): new, on the existing date data.** `/ceromony?year=1403` is evaluated **in MongoDB** as a date range. The chips list only years that have ceremonies. Invalid or Gregorian values are ignored, which shows everything rather than a wrong conversion.
- **Add year (admin):** the label says «هجری شمسی», the placeholder shows the current Jalali year, and the input uses a numeric keyboard. Validation is unchanged.
- **Verified:** the Nowruz 1403→1404 boundary (1403 is a leap year), the minute before Nowruz, Persian-digit params, empty years, invalid params and legacy UTC-midnight records.
