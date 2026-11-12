# PROGRESS — Current State Snapshot

**Snapshot date:** 2026-11-11 (audit). Update this file after every meaningful work session.

## Git state

| Item | Value |
|---|---|
| Branch | `main` (only branch; tracks `origin/main` at `github.com/a-terohid/abasieh`) |
| HEAD | `085db3c` "last" (2025-03-26, single author) |
| Commits | 33. The first is `1e5f296` (2024-07-24, create-next-app) |
| Uncommitted | `package.json`, `package-lock.json`, `tsconfig.json` modified (dependency upgrade, see STACK.md); `.claude/` untracked; `docs/context/` added by this audit |
| Stashes / other branches | None |

### History milestones
| Date | Milestone |
|---|---|
| 2024-07-24 | Project bootstrapped |
| 2024-08-09/10 | Navbar, footer, sign-in/sign-up, session, admin panel shell, admins section |
| 2024-08-16 → 08-27 | Ziyarat-nameh API and UI; years; zekr API |
| 2024-09-01 → 09-04 | Zekr add/details/edit |
| 2024-09-05 | Trustees (full) |
| 2024-09-10 / 09-13 | Contact us (Resend), donate page |
| 2024-09-16 → 09-19 | Ceremonies add/delete/list/details/edit |
| 2024-09-19/20 | Pir-gholaman API, dashboard, public page |
| 2025-03-26 | "last": blog model and API and a Slate editor test (abandoned mid-way) |
| 2026-11-11 (uncommitted) | Dependency upgrade to Next 16 / React 19 / TS 7 / Tailwind 4 / Mongoose 9 started; `next dev` was run (`.next/dev` exists) |

Commit messages read "complete X", one feature per commit. Test images were committed under `public/uploads/` and later deleted (ceremony test folders in `d38e00c`). Ceremony titles in history (for example a test "jungle/animals" set) show test data, not real content.

## Completed functionality (works at HEAD, per code reading)

- Public: zekr list, filter and details (with audio); ziyarat list and details (with audio); ceremonies list and details (slider); trustees; pir-gholaman; contact page and form; donate text; dark mode.
- Admin: sign-in; admin panel shell; admins list, add and delete (OWNER); years add and delete; zekr add, view and delete; ziyarat add, view and delete; ceremonies add, view and edit; trustees add, edit and delete (with photo); pir-gholaman add and edit.

## Partially completed

- Zekr and ziyarat **edit** (works only when you upload a new audio file *and* one already existed. Other paths erase the audio or return 500).
- Ceremony **delete** (DB row removed, image folder usually left on disk).
- Trustee delete (500 when the member has no photo); pir-gholaman delete (photo file left behind).
- Donate page (account numbers empty).
- SEO metadata (per page only; root is the default).
- Role-based access (UI only, partial).

## Incomplete / not started

- Home page (`homem page` placeholder) and admin dashboard (`paned admin` placeholder).
- Articles/blog (model and unused API, editor demo pointing to a nonexistent endpoint).
- Search, Eitaa link, footer about text, sign-out, password change, upcoming events, video.

## Known bugs (highest impact first)

| # | Bug | Location |
|---|---|---|
| B-1 | Public, unauthenticated admin creation | `src/app/api/auth/signup/route.ts` |
| B-2 | `.env` with secrets committed to git | repo root, since `f23c9fa` |
| B-3 | Trustees' full phone numbers published (`mask` formats, doesn't hide) | `src/utils/mask.ts`, `C/TrustesCart.tsx` |
| B-4 | APIs ignore roles; any ADMIN can delete the OWNER or call OWNER-only mutations | all `src/app/api/**` |
| B-5 | SSRF in blog image fetch | `src/app/api/blog/route.ts` |
| B-6 | Zekr/ziyarat edit erases audio or 500s | `api/zekr/route.ts`, `api/Ziartnameh/route.ts`, `T/ZiartnamehEditPage.tsx` |
| B-7 | Ceremony delete slug mismatch leaks files | `api/ceremony/delete/[ceremonyId]/route.ts` |
| B-8 | Trustee delete 500 without photo; wrong success message | `api/trustees/delete/[trusteesId]/route.ts` |
| B-9 | Pir-gholaman delete looks in the wrong folder | `api/oldSlaves/delete/[oldSlavesId]/route.ts` |
| B-10 | Ceremony PATCH missing `connectDB()` | `api/ceremony/route.ts` |
| B-11 | Unawaited `save()` in 7 handlers | trustees, oldSlaves, year, zekr, Ziartnameh |
| B-12 | Ceremony card image relative URL (`uploads/…` without `/`) | `C/CeremonyCard.tsx` |
| B-13 | Edit-ceremony cover preview path missing `/cover/` | `T/EditCeremonyPage.tsx` |
| B-14 | Zekr metadata uses a nonexistent `zekr.Tear` | `src/app/zekr/[zekrId]/page.tsx` |
| B-15 | Plaintext password logged on signup | `api/auth/signup/route.ts` |
| B-16 | `"useclient"` typo (works only because the parent is a client component) | `E/DeleteOldSlavesButton.tsx`, `E/DeleteTrustessButton.tsx` |
| B-17 | Wrong not-found messages (ziyarat text on zekr and trustee pages; "zekr" in ceremony metadata) | several `page.tsx` |
| B-18 | Contact sender address may be rejected by Resend (unverified) | `api/send/route.tsx` |

## Build state

- **At HEAD (Next 14 stack):** *Unknown*. Not built, because doing so would require reinstalling the old lockfile. `ZekrDetailspage.tsx` importing `useState` in a server component is a possible build error.
- **Working tree (upgraded stack):** **Broken.**
  - `tsc --noEmit` fails on `tsconfig.json` (TS 7 removed `baseUrl`).
  - ~~Tailwind 4 has no PostCSS plugin installed.~~ Fixed 2026-11-11 (STACK.md → Upgrade breakage #2).
  - Next 16 async `params` changes and the ESLint 10 config are unaddressed.
  - Details are in STACK.md → Upgrade breakage.

## Technical debt (summary; detail in ARCHITECTURE.md)

Copy-pasted upload and delete logic; a singleton `Save` document; title-derived file paths; local-disk media; no validation layer; `any` everywhere; `console.log` noise; 6 unused dependencies; misspelled routes and identifiers; no tests; no error/loading boundaries; mixed raw-doc vs. JSON-string props.

## Areas requiring further investigation

1. Production hosting: where it runs, how uploads persist, whether the site is live at all, and its domain.
2. The live DB: collection names (especially the ziyarat `collection: ""`), the record count, whether a `Save` document and OWNER user exist, and data quality.
3. Whether Resend delivery works with the current sender address.
4. Visual and browser verification of every page (light/dark, mobile) once a runnable build exists.
5. Peyda font web-license terms.
6. Canonical organization name: چورلان vs. جولان (PROJECT.md).
7. Whether `public/uploads/` on the server contains media not in git (it almost certainly does if the site is live).

---

## Update 2026-11-11 (later the same day)

- **Tailwind 4 build error fixed** (user request):
  - Installed `@tailwindcss/postcss@4.3.5`.
  - Edited `postcss.config.mjs` and `src/app/globals.css`.
  - `package.json` and `package-lock.json` changed accordingly.
- **Runtime check against the user's running Next 16 dev server:** every route returns 500, from the `jalaali-js` default import (E-01 in [../CASE-STUDY.md §8](../CASE-STUDY.md)). Further errors (async `params`, `useState` in a server component, `react-loader-spinner` v8) are masked until it's fixed.
- The product and design case study was created: [../CASE-STUDY.md](../CASE-STUDY.md).

---

## Update 2026-11-12 — Website-wide visual refinement

- **Done:** the visual layer for every existing page, layout and shared component (UI-UX.md → "Implemented visual system").
  - New home page composed only from existing site copy (no data fetching).
  - Styled 404.
  - Desktop navigation, plus an accessible mobile drawer (Escape, overlay, `aria-expanded`).
  - Reading layouts for zekr and ziyarat.
  - Tekyeh band on the ceremony and pir-gholaman pages.
  - Admin shell with active state; all forms on the shared field and button system.
- **Compatibility fixes made with owner approval, so the site could render** (no behaviour change):
  - `import * as jalaali` in 3 files.
  - `await params` in 11 pages (15 call sites).
  - `await searchParams` in `/zekr`.
  - Removed the unused `useState` import in `ZekrDetailspage`.
- **Behaviour-adjacent visual fixes:**
  - The zekr stanza tabs now select the clicked stanza; previously any click toggled.
  - The `"useclient"` typo in two delete buttons was corrected to `"use client"`.
  - The footer's Lorem ipsum was replaced with an existing sentence from the donate page.
- **Verification:**
  - No horizontal overflow on 21 views × 8 widths (CDP element-bounds scan).
  - No console exceptions or hydration warnings.
  - Menu, theme toggle and stanza tabs verified.
  - `next build` compiles but **fails at type-check** (E-02, TS 7 `baseUrl`).
  - Lint can't run (`next lint` was removed in Next 16; ESLint 10 needs flat config).
- **Blockers found:**
  - The MongoDB Atlas host no longer resolves (`querySrv ENOTFOUND`, NXDOMAIN), so every data-backed page returns 500 locally. Those templates were verified through a temporary preview route (now deleted) with placeholder data.
  - The running dev server's Turbopack cache served stale modules until their content changed. If a page looks outdated, restart `next dev`.

---

## Update 2026-11-12 (later) — Stability fixes and second UI pass

- **"querySrv ENOTFOUND" ("Query emot found"):** the MongoDB Atlas cluster in `MONGO_URI` no longer exists (NXDOMAIN on system DNS, 8.8.8.8 and 1.1.1.1). **The owner must supply a working `MONGO_URI`**, plus `SAVE_DATA_BASE_ID` and an OWNER user, and restore data if a backup exists.
- **Code fixes so a new or empty database works:**
  - null-safe reads of the `Save` singleton (9 pages)
  - malformed ids return "not found" instead of a CastError (`src/utils/isValidId.ts`, 9 pages)
  - `user` null guards (4 admin pages)
  - **React 19 serialization:** Mongoose docs, ObjectIds and MongooseArrays are converted to plain JSON at page boundaries (`src/utils/toPlain.ts`, 17 props)
  - route error boundary `src/app/error.tsx`
- **Verified against a throwaway MongoDB:** 54/54 route checks (the 55th was a harness artifact) covering public pages, every admin route signed in through NextAuth, invalid and missing params, and empty-database states. The server log was clean.
- **Second UI pass and Jalali work:** see UI-UX.md and FEATURES.md (2026-11-12 updates).
- **Checks:**
  - SWC compile: 100/100 changed files.
  - `tsc` (TS7-compatible config, scratch copy only): 2 errors, both in untouched `api/blog` and `api/send` (upgrade fallout).
  - `next build`: compiles, then fails type-check on the pre-existing `tsconfig.json` `baseUrl`.
  - `npm run lint`: unavailable (`next lint` was removed in Next 16).
