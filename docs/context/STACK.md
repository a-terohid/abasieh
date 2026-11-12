# STACK — Technology and Dependencies

> **Two versions of the stack exist right now.** HEAD (`085db3c`) declares the stack in the "Committed" column. The working tree has an **uncommitted upgrade** (`package.json`, `package-lock.json`, `tsconfig.json` modified; installed in `node_modules`) shown in the "Working tree / installed" column. The upgrade is incomplete and the project doesn't type-check or build on it (see "Upgrade breakage" below and PROGRESS.md). No dependency was changed during the audit.

## Runtime and tooling

| Item | Value | Evidence |
|---|---|---|
| Language | TypeScript (`strict: true`), TSX | `tsconfig.json` |
| Node.js (audit machine) | v24.20.0, npm 11.19.0 | `node -v` |
| Node requirement | **Not declared** (no `engines`, no `.nvmrc`) | `package.json` |
| Package manager | npm (`package-lock.json`) | repo root |
| Scripts | `dev`, `build`, `start`, `lint` (`next lint`) | `package.json` |
| Tests | **None** (no framework, no test files) | — |
| CI/CD, Docker, hosting | **None in repo** | — |

## Dependencies

| Package | Committed | Working tree / installed | Purpose & usage | Status |
|---|---|---|---|---|
| `next` | 14.2.5 | **16.4.6** | Framework (App Router, route handlers, `next/font/local`) | Core |
| `react` / `react-dom` | ^18 | **19.3.1** | UI | Core |
| `mongoose` | ^8.5.2 | **9.12.1** | MongoDB ODM; all models in `src/models` | Core |
| `next-auth` | ^4.24.7 | 4.24.15 | Credentials auth with JWT (`src/components/lib/auth.ts`) | Core; v4 is legacy (Auth.js v5 is current) |
| `bcryptjs` (dev dep!) | ^2.4.3 | 3.0.3 | Password hashing (`src/utils/auth.ts`) | Used at **runtime**, but listed in `devDependencies` |
| `next-themes` | ^0.3.0 | 0.4.6 | Dark/light theme (`layout.tsx`, `Navbar.tsx`) | Used |
| `resend` | ^4.0.0 | 6.38.0 | Contact email (`api/send/route.tsx`) | Used |
| `react-hot-toast` | ^2.4.1 | 2.6.x | Toast feedback in every form/delete button | Used |
| `react-icons` | ^5.2.1 | 5.7.x | All icons | Used |
| `react-loader-spinner` | ^6.1.6 | **8.0.2** | `ThreeDots` loader (`M/Loader.tsx`) | Used; major bump, API **unverified** |
| `react-multi-date-picker` | ^4.5.2 | 4.5.2 | Jalali date picker (ceremony, pir-gholaman forms); imports `react-date-object` transitively | Used; React 19 peer support **unverified** |
| `jalaali-js` | ^1.2.7 | **2.0.1** | Gregorian to Jalali for display (cards, details) | Used; major bump |
| `mime` | ^4.0.4 | 4.1.x | File extension from MIME in upload handlers | Used |
| `slate`, `slate-react`, `slate-history` | 0.103 / 0.110 / 0.109 | 0.147 / 0.147 / 0.144 | Rich-text editor demo for abandoned blog (`M/test.tsx`); `slate-history` unused | Experimental |
| `@prisma/client`, `prisma` | ^5.18.0 | **7.10.1** | **Unused** (no schema, no imports) | Remove candidate |
| `formidable`, `multer`, `multiparty`, `next-connect` | various | various | **Unused** (uploads use `req.formData()`) | Remove candidates |
| `lodash` | ^4.17.21 | 4.18.x | **Unused** | Remove candidate |
| `@types/*` | — | — | Types for the above (several for unused libs) | — |

**Dev dependencies:** `typescript` (^5 → **7.0.2**), `eslint` (^8 → **10.14.0**), `eslint-config-next` (14.2.5 → 16.4.6), `tailwindcss` (^3.4.1 → **4.3.5**), `postcss` ^8.

## Infrastructure and external services

| Service | Use | Config |
|---|---|---|
| MongoDB (host unknown; `MONGO_URI`) | All data | ARCHITECTURE.md → Configuration |
| Local filesystem `public/uploads/` | Images (`images/Trustees`, `images/oldSlaves`, `images/cermony/<slug>/[cover/]`, `images/blog/…`) and audio (`voices/`) | Hard-coded paths in handlers |
| Resend | Contact-form email to the Heyat's Gmail address | `RESEND_API_KEY` |
| Google Maps | Static short link on contact/donate | Hard-coded |
| Instagram, Telegram, Eitaa | Footer and contact links (Eitaa link is `/`) | Hard-coded |

## Fonts and assets

- **Peyda** (commercial Persian typeface, license files in `public/Fonts/Peyda/`), loaded through `next/font/local` from **TTF** files (`src/utils/font.ts`) with weights 400–900. WOFF/WOFF2/EOT variants (~3.2 MB in total) ship in `public/` but are unused. **Unknown**: whether the license allows web embedding (see `public/Fonts/Peyda/licenses.pdf`).
- Images: `public/img/Eita.png`, `public/img/profile.png` (avatar fallback). Uploaded test images are committed under `public/uploads/` (8 files).

## Upgrade breakage (verified on 2026-11-11)

1. **TypeScript 7 rejects `tsconfig.json`.** `tsc --noEmit` fails with `TS5102: Option 'baseUrl' has been removed` and 11× `TS5090: Non-relative paths are not allowed`. The ~35 imports of the form `"src/components/lib/auth"` depend on `baseUrl`.
2. ~~Tailwind v4 is incompatible with the existing setup.~~ **Fixed 2026-11-11:**
   - Installed `@tailwindcss/postcss@4.3.5` (dev dependency).
   - `postcss.config.mjs` now uses it.
   - `globals.css` uses `@import "tailwindcss"` + `@config "../../tailwind.config.ts"`, a `@custom-variant dark` for class-based dark mode, and an `@utility container` replacing the v4-ignored `container.center/padding`.
   - Remaining v4 visual differences are **not yet reviewed**: renamed scales (`shadow`→`shadow-sm`, `rounded`→`rounded-sm`, etc.), default border/ring color and width changes, and the `outline-none` semantics.
3. **Next 15+ async request APIs.** 11 pages destructure `params` synchronously and 2 use `searchParams` synchronously. These are Promises in Next 15+, and Next 16 removes the synchronous compatibility path (**Inference**, based on documented Next migration notes; not executed).
4. **`next lint` and `.eslintrc.json`.** ESLint 10 only supports flat config, and `next lint` was removed in Next 16 (**Inference**).
5. **React 19 + Server→Client props.** The code relies on Mongoose documents/`ObjectId`s being serialized implicitly when passed to client components (for example `EditCeremonyPage ceremony={doc}`, `DeleteZekrButton _id={ObjectId}`). Whether this still works under React 19 Flight is **Unknown**.
6. `tsconfig.json` was auto-rewritten (`jsx: react-jsx`, `.next/dev/types` include). A `.next/dev` folder dated 2026-11-11 shows `next dev` was run on Next 16 before the audit.

**Recommendation:** don't attempt to "finish" this upgrade on the current codebase. Either revert the working tree to HEAD for maintenance, or treat the upgrade as part of the planned rebuild (DECISIONS.md D-01, ROADMAP.md).

---

## Update 2026-11-12

- **Fonts:**
  - Peyda is now loaded from WOFF2 (`public/Fonts/Peyda/PeydaWeb/woff2`), weights 400–800.
  - **Noto Naskh Arabic** is added through `next/font/google`. That's a build-time download, self-hosted, with **no new npm dependency**. The build machine needs network access to Google Fonts.
- `react-loader-spinner` is no longer imported. `Loader` is pure CSS, so E-06 is avoided. The package is still listed and can be removed later.
- `tailwind.config.ts` is deleted. The theme lives in `src/app/globals.css` (`@theme inline`), and the `@config` bridge is gone.
