# DECISIONS — Discovered Architecture and Product Decisions

The original reasoning for these decisions is **not documented anywhere** in the repository (no ADRs, a create-next-app README, terse commit messages). Unless stated otherwise, "Reasoning" is marked **Unknown** rather than invented. Verdicts are recommendations.

Format: **Decision** · Context · Reasoning · Consequences · **Verdict** (Preserve / Reconsider / Investigate)

---

**D-01 · Next.js App Router monolith (frontend, backend and auth in one app)**
- **Context:** bootstrapped with `create-next-app` 14.2.5.
- **Reasoning:** Unknown. Likely simplicity for a solo developer.
- **Consequences:** simple deployment, SSR for SEO, a single codebase.
- **Verdict:** **Preserve** the approach. Re-platform onto the current Next major during the rebuild rather than upgrading the existing code in place (STACK.md → Upgrade breakage).

**D-02 · MongoDB + Mongoose**
- **Context:** all models are in `src/models`. Prisma is installed but unused, which suggests it was considered and dropped (Inference).
- **Reasoning:** Unknown.
- **Consequences:** flexible nested content (zekr stanzas, ziyarat sections) fits documents well. No relational integrity.
- **Verdict:** **Preserve** (it suits the nested texts), but add indexes, timestamps and validation.

**D-03 · Server Components read the DB directly; API routes only for mutations**
- **Context:** there are no GET APIs.
- **Reasoning:** Unknown. It's the idiomatic App Router pattern.
- **Consequences:** less code and fast SSR. Rendering is coupled to Mongoose documents, and there's no public API for future apps.
- **Verdict:** **Preserve**, but go through a typed data layer.

**D-04 · Singleton `Save` document for years, trustees and pir-gholaman, addressed by `SAVE_DATA_BASE_ID`**
- **Context:** `src/models/save.ts`.
- **Reasoning:** Unknown.
- **Consequences:**
  - Whole-array read-modify-write and race conditions.
  - An env-coupled document ID.
  - Unrelated concerns share one document.
  - If the document is missing, most pages crash.
- **Verdict:** **Reconsider**. Split it into collections (ROADMAP F-04).

**D-05 · Passing Mongoose documents to components, sometimes as `JSON.stringify` strings**
- **Context:** throughout `src/app/**/page.tsx`.
- **Reasoning:** Unknown. Probably a workaround for serialization warnings when passing to client components (Inference).
- **Consequences:** untyped props (`any`), double parsing, and dependence on implicit `toJSON` behavior that may change under React 19.
- **Verdict:** **Reconsider**. Map to plain typed DTOs.

**D-06 · Uploads stored on local disk under `public/uploads`**
- **Context:** every upload handler.
- **Reasoning:** Unknown.
- **Consequences:** needs a persistent writable server, isn't serverless-compatible, has no CDN, and backups are tied to the app disk.
- **Verdict:** **Reconsider** (ROADMAP F-03). **Investigate** the current hosting first.

**D-07 · Ceremony media folder derived from the title (`persianToFinglish` + sanitize)**
- **Context:** `api/ceremony`, `C/CeremonyCard.tsx`, `M/Slider.tsx`, `T/EditCeremonyPage.tsx`.
- **Reasoning:** Unknown. Probably human-readable folders.
- **Consequences:**
  - Renames must move folders.
  - Delete uses different slug logic and misses the folder.
  - Different titles can collide on one slug (lossy transliteration).
- **Verdict:** **Reconsider**. Key media by record ID.

**D-08 · NextAuth v4 Credentials + JWT; role read from the DB per request; two roles (OWNER, ADMIN)**
- **Context:** `src/components/lib/auth.ts`, `src/types/enums.ts`.
- **Reasoning:** Unknown.
- **Consequences:**
  - Simple, no OAuth dependency, and role changes take effect immediately.
  - Enforcement is UI-only and the signup endpoint is open.
  - There's no sign-out.
- **Verdict:** **Preserve** the role model, and **reconsider** the enforcement (ROADMAP C-02, C-04, F-06).

**D-09 · Persian `ERROR`/`MESSAGE` enums as the single source of user-facing strings**
- **Context:** `src/types/enums.ts`.
- **Reasoning:** Unknown.
- **Consequences:** centralized copy, but strings double as API error payloads (no machine-readable codes), and some are reused wrongly.
- **Verdict:** **Preserve** the centralization. Add error codes and move the strings to an i18n dictionary.

**D-10 · Trustee roles stored as Persian display strings**
- **Context:** `TRUSTEES_ROLE` values such as `"رئیس هیئت امنا"`.
- **Reasoning:** Unknown.
- **Consequences:** the display text is the DB value, so changing wording requires a data migration.
- **Verdict:** **Reconsider**. Store codes and map them to labels. This needs a migration.

**D-11 · Zekr has exactly two stanzas; years are free-text strings**
- **Context:** `src/models/zekr.ts`, `Save.Years`.
- **Reasoning:** Unknown. Presumably mirrors the Heyat's chant format.
- **Consequences:** inflexible, and year sorting relies on `parseInt`.
- **Verdict:** **Investigate** with the owner whether chants always have two stanzas.

**D-12 · Route and identifier naming (`ceromony`, `trustess`, `oldSlaves`, `Ziartnameh`)**
- **Context:** URL paths and model names.
- **Reasoning:** Unknown. Typos and literal translation.
- **Consequences:** unprofessional URLs. `oldSlaves` misrepresents پیر غلامان.
- **Verdict:** **Reconsider**, with redirects if the site is live.

**D-13 · Tailwind with custom red/green palette, Peyda font, class-based dark mode**
- **Context:** `tailwind.config.ts`, `src/utils/font.ts`.
- **Reasoning:** Unknown. The colors plausibly reflect the mourning red and Abbasid green symbolism (Inference).
- **Consequences:** an identity exists but isn't systematized.
- **Verdict:** **Preserve** the identity direction, **rebuild** the token system (UI-UX.md).

**D-14 · Resend for contact email**
- **Context:** `api/send/route.tsx`.
- **Reasoning:** Unknown.
- **Consequences:** a simple, free tier, but it needs a verified domain to send properly.
- **Verdict:** **Investigate** delivery, then preserve or replace.

**D-15 · Blog with a Slate editor (last commit)**
- **Context:** `models/blogs.ts`, `api/blog`, `M/test.tsx`.
- **Reasoning:** Unknown.
- **Consequences:** half-built, with an SSRF risk.
- **Verdict:** **Reconsider**. Decide whether articles are in scope. If yes, redesign (for example Markdown/MDX or a maintained editor) with uploads through the shared media service.

**D-16 · Uncommitted dependency upgrade (Next 16, React 19, TS 7, Tailwind 4, Mongoose 9)**
- **Context:** working tree as of 2026-11-11.
- **Reasoning:** Unknown. Likely the first step of this modernization effort.
- **Consequences:** the tree doesn't type-check or build.
- **Verdict:** **Investigate/decide** (ROADMAP C-06). Don't partially "fix" it in place.

---

## Proposed decisions from the product case study (2026-11-11) — **not yet approved**

These are recommendations in [../CASE-STUDY.md](../CASE-STUDY.md). Each needs owner approval before it counts as a decision.

**D-17 · One content architecture for zekr, ziyarat and dua, with separate product sections**
- **Context:** zekr is the Heyat's own authored poetry, organized by year. Ziyarat and dua are canonical liturgy, found by name or day.
- **Proposal:** a shared block-based `texts` model, one reader and one search index, with separate listing pages and nav entries.
- **Consequences:** less code and consistent UX. Requires migrating `Zekr_Text` and `Ziartnameh.Text`.
- **Status:** **Proposed**.

**D-18 · Occasion taxonomy as the connective tissue**
- **Proposal:** texts and ceremony reports carry occasions, and occasion pages aggregate both.
- **Status:** Proposed.

**D-19 · Visual direction A «سقاخانه» with a seasonal Muharram mode**
- **Reasoning:** specific to the Saqaei identity, readable year-round, and scales by season.
- **Status:** Proposed. A mood-board test with members comes first.

**D-20 · Media through a provider-agnostic `MediaService`**
- **Proposal:** ImgBB for images now (owner direction); Cloudflare R2 for audio, because ImgBB is image-only and has no delete API.
- **Rule:** content references media IDs, never URLs or titles. This supersedes D-06 and D-07 if approved.
- **Status:** Proposed. Depends on Q-12 and Q-13.

**D-21 · Defer articles**
- **Proposal:** "Saqaei tradition" and "History" become static About pages. An articles section is added only with a named editor and ready content. The `/api/blog` endpoint is removed now (security).
- **Status:** Proposed. This resolves D-15 if approved.

**D-22 · No personal phone numbers on public pages; consent for portraits**
- **Status:** Proposed (privacy). Strongly recommended.

**D-23 · Rebuild on the current stack rather than patching the half-upgraded tree**
- **Status:** Proposed. This resolves D-16 if approved.
