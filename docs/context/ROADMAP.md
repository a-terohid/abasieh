# ROADMAP — Preliminary (NOT approved)

This is the auditor's recommendation, ordered by impact and dependency. **Nothing here is an approved requirement.** The product owner must confirm scope (especially Part 6) before work starts. IDs are stable; reference them in commits and PRs.

## 1. Critical issues (do first, even if a rebuild is planned)

| ID | Item | Why | Depends on |
|---|---|---|---|
| C-01 | **Rotate every secret in `.env`** (DB password/URI, `NEXTAUTH_SECRET`, Resend key). Remove `.env` from tracking and add `.env*` to `.gitignore`. Decide whether to purge it from history (a history rewrite needs explicit owner approval) | Secrets are public in git (PROGRESS B-2) | — |
| C-02 | Protect `POST /api/auth/signup` (OWNER-only) and audit existing `USER` records for unknown accounts | Anyone can become admin (B-1) | — |
| C-03 | Stop publishing trustee phone numbers | Privacy (B-3) | — |
| C-04 | Enforce roles server-side in every mutation | B-4 | C-02 |
| C-05 | Disable `/api/blog` (SSRF) until it's redesigned | B-5 | — |
| C-06 | Decide the fate of the uncommitted dependency upgrade: revert to HEAD for hotfixes, or fold it into the rebuild | The working tree doesn't build | — |

## 2. Foundation and architecture (rebuild groundwork)

| ID | Item |
|---|---|
| F-01 | Settle the canonical name, slugs and URL scheme (fix `ceromony`, `trustess`, `oldSlaves`). Plan redirects if the site is live |
| F-02 | Choose the target stack deliberately (Next 15/16 + React 19 + Tailwind 4 is the natural path). Pin the Node version and remove unused deps (Prisma, multer, formidable, multiparty, next-connect, lodash) |
| F-03 | **Media storage:** move uploads to object storage (S3-compatible), keyed by record ID rather than title. Write a migration script for existing files |
| F-04 | **Data model:** split `Save` into proper collections (`years` or a year field, `trustees`, `pirGholaman`). Add timestamps, unique indexes (user email), enums, ordering fields and a `published` flag. Write a migration from the singleton |
| F-05 | Introduce a service/data-access layer, a shared upload helper and schema validation (for example Zod) for every handler input |
| F-06 | Auth: keep Credentials but add sign-out, password change, rate limiting and generic login errors. Consider Auth.js v5. Put role and id in the JWT |
| F-07 | Caching/revalidation strategy (`revalidatePath` after mutations). Add `loading`/`error`/`not-found` boundaries |
| F-08 | Tooling: ESLint flat config, Prettier, type-safe props (no `any`), basic tests (API handlers and data layer), CI build check |

## 3. Core functionality

| ID | Item |
|---|---|
| K-01 | Real home page (identity, next/featured event, latest zekr year, entry points) |
| K-02 | Events: add `startsAt`, time, location and type. Separate upcoming events from the past gallery |
| K-03 | Fix zekr/ziyarat edit semantics (keep, replace or remove audio). Delete orphaned files on record deletion |
| K-04 | Zekr: variable stanza count, sorting by year, pagination |
| K-05 | Ziyarat: proper Arabic typography, a section navigator, optional per-section audio timestamps |
| K-06 | Admin: dashboard, active nav state, consistent forms, image previews, drag-to-reorder |
| K-07 | Contact: validation, rate limit or captcha, verified sender domain |
| K-08 | Donate: real account details (owner to supply) or a payment link |

## 4. UI/UX modernization

| ID | Item |
|---|---|
| U-01 | Design system: semantic color tokens derived from the red/green identity, a type scale, spacing, radii, elevation, light and dark themes |
| U-02 | Visual identity: logo or emblem, appropriate religious ornamentation and calligraphy (owner to provide or approve) |
| U-03 | Desktop navigation and a mobile drawer with focus trap and current-page state |
| U-04 | Unified card, list, gallery and person components; responsive grids instead of fixed widths |
| U-05 | Proper empty, loading and error states; a branded 404 |
| U-06 | Fix Persian copy typos (افزودن, ایمیل, حذف, بارگذاری, ارتباط با ما). Use Persian digits consistently |

## 5. Performance and accessibility

| ID | Item |
|---|---|
| A-01 | WCAG 2.2 AA pass: semantic buttons, labels, `aria` for icon controls, focus styles, contrast, heading order, keyboard slider |
| A-02 | `next/image` with sizes and placeholders; serve WOFF2 fonts, subset; remove the client `HEAD` image checks |
| A-03 | DB-side filtering and pagination instead of `find()` everything |
| A-04 | SEO: root metadata, Open Graph, sitemap, robots, canonical, JSON-LD (Organization, Event) |

## 6. Future product opportunities (need owner validation)

Articles/news (finish or drop F-13), video and media gallery, Muharram program calendar with reminders, live-stream links, history/about of the Heyat, volunteer sign-up, newsletter or Eitaa/Telegram channel integration, online donation through an Iranian payment gateway, multi-language (Arabic/English) for ziyarat texts.

---

## Update 2026-11-11 — Aligned with the product case study

[../CASE-STUDY.md §29–30](../CASE-STUDY.md) supersedes the ordering of Parts 2–6 above **as a proposal**. Part 1 (critical) stands unchanged.

Additions:

| ID | Item | Source |
|---|---|---|
| C-07 | Fix the global build error E-01 (`jalaali-js` named import), *or* adopt `Intl` Persian-calendar formatting and drop the dependency | CASE-STUDY §8 |
| C-08 | Test reachability from Iranian ISPs of Vercel, ImgBB and Cloudflare R2 before committing to hosting | CASE-STUDY Q-13 |
| F-09 | `MediaService` with ImgBB (images) and R2 (audio) adapters; media referenced by ID | CASE-STUDY §23 |
| F-10 | New content model: `texts` (kind zekr/ziyarat/dua, block body), `occasions`, `ceremonyReports`, `people`, `media`, `settings` | CASE-STUDY §12, §28 |
| K-09 | Occasion pages, search with Persian/Arabic normalization, season-aware home | CASE-STUDY §22 |
| U-07 | Visual direction A «سقاخانه» + Muharram mode; mood-board test with members first | CASE-STUDY §17–19 |

**Scheduling constraint:** launch well before Muharram, never during it.
