# UI-UX — Current Design System and Experience

> **Source-code audit only.** The running site was **not** viewed in a browser (README.md → Audit limitations). Visual statements are inferred from Tailwind classes and should be confirmed visually before redesign decisions.

## Design language (summary)

A functional, template-like Persian RTL site. The public pages share one pattern: inside a `container`, a single rounded panel (`bg-background-light-2 / dark:bg-background-dark-2`, `rounded-lg`, `px-5 lg:px-8`) holds an `h1`, justified intro paragraphs, a second `h1` "list of …", and a centered `flex-wrap` grid of fixed-width cards.

- **Identity colors:** deep red (mourning, Karbala) and green (the Abbasid flag tradition). That suits a Saqa'i Heyat, but it's applied ad hoc rather than systematically.
- **Imagery and symbols:** no logo, emblem, hero imagery, calligraphy or religious ornamentation exists. The brand appears only as plain text in the navbar.

## Tokens (`tailwind.config.ts`)

| Group | Tokens |
|---|---|
| `background` | `dark-1 #131316`, `dark-2 #1c1c21`, `dark-3 #26262c`, `dark-5 #393a41`, `dark-6 #4b4c52` (no `dark-4`), `light-1 #f8f9fa`, `light-2 #e9ecef` |
| `primary` | `red-1 #5c0000`, `red-2 #751717`, `red-3 #ba0c0c`, `red-4 #ff0000`; `green-1 #005c00`, `green-2 #2d661b`, `green-3 #2a850e`, `green-4 #27a300` |
| `secondary` | `red-1 #8e0413`, `red-2 #ad080f`, `red-3 #cb0b0a`, `red-4 #df8080`; `green-1 #004733` … `green-4 #a5c1ae`; `withe` (sic) `#f3f4f6`, `gray #dcdfe5` |
| `text` | `dark #dee2e6` (text on dark), `light #212529` (text on light). The naming is inverted relative to intuition |

There are 16 reds and greens with overlapping roles, and no semantic tokens (surface, accent, danger, success, muted, border). Hardcoded colors also appear: `#88d4ab`, `#14746f` (admin badge), `#f6f6f6` (zekr verse box), `#27a300` (loader), and `gray-300` dividers.

Nonexistent classes used: `text-Dark`, `bg-Dark`, `text-f6`, `text-Yellow` (left over from another project). `globals.css` references CSS vars `--color-primary-red-2` and `--color-secondary-red-1`, which are **never defined** (Tailwind v3 doesn't emit them), so those focus rings are no-ops.

**Other scales:**
- **Spacing and radii:** Tailwind defaults. `rounded` / `rounded-lg` / `rounded-xl` are used interchangeably.
- **Shadows:** `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `drop-shadow-md`, mixed without rules.
- **Container:** centered with 2rem padding.

## Typography

- One family: **Peyda** (`font-Peyda`, CSS var `--font-Peyda`, `src/utils/font.ts`), weights 400–900, loaded from TTF.
- There's no type scale. Headings are `font-bold md:text-2xl text-lg`, and `h1` is used for both the page title and section titles (several `h1`s per page). Card titles are `h1`, `h2` or `h3` inconsistently.
- **Arabic ziyarat text** is set in the same Persian UI font at body size, with no Arabic-specific font, `lang`, diacritic-friendly line height or size increase. This is a significant readability gap for the core religious content.
- Persian digits come from `englishToPersianNumber` on dates only. Years, phone numbers and counts render in Latin digits.

## Layout

- **Public shell** (`Layout.tsx`): a fixed header (`fixed w-screen`, which can cause a horizontal scrollbar), content padded `py-[65px] lg:py-[85px]` to clear it, `min-h-[750px]`, and a footer.
- **Admin shell** (`AdminLayout.tsx`): a green sidebar (`bg-secondary-green-2`) on `lg+`. On mobile it becomes a horizontally scrolling chip bar. Content sits in a `rounded-xl shadow-xl` panel. There's no active-link state.
- Cards have fixed widths (`w-72`, `w-80`, `w-52` images) in `flex-wrap justify-center`, so grids are ragged and widths don't adapt.

## Component patterns

| Pattern | Where | Notes |
|---|---|---|
| Navbar + drawer | `M/Navbar.tsx` | Hamburger always shown (no desktop nav). The drawer is an absolutely flowing panel with the `scale-up-ver-top` animation. Hover enlarges icons/text (`hover:text-3xl`, `hover:text-xl`), which causes layout shift |
| Footer | `M/Footer.tsx` | About (Lorem ipsum) and social links |
| Content card | `C/ZekrCart`, `C/ZiartnamehCard`, `C/CeremonyCard` | Three different card styles. The ceremony card is always light (`bg-background-light-1 text-text-light`), even in dark mode |
| Person card | `C/TrustesCart`, `C/OldSlavesCart` | Square photo with a fallback avatar through a client `HEAD` request (flash of a broken image, then the swap) |
| Admin list row | `C/*AdminCart*`, `C/CeremonyAdminCard` | "نام: <title>" plus view/edit/delete icon links |
| Form field | `M/Input.tsx` | Gray filled input, `md:w-1/2`, label above. The file variant hides the input and styles the label as a button. **Every file input uses `id="fileInput"`** (duplicate IDs when several render) |
| Primary button | inline | `bg-primary-red-1 text-white rounded md:w-1/2 py-2`. The text "افرودن" is misspelled (should be افزودن) in 6 places |
| Delete button | `E/Delete*Button` | Icon button with a native `confirm()` dialog, a loader and a toast |
| Loader | `M/Loader.tsx` | `ThreeDots` green, replaces the submit button |
| Toast | `react-hot-toast` | A `<Toaster/>` per component; position defaults |
| Slider | `M/Slider.tsx` | Image, prev/next round red buttons and dots |
| Date picker | `react-multi-date-picker` | Persian calendar, styled through `.rmdp-input` overrides |
| Empty state | inline | Bold red text "متاسفانه … یافت نشد!" (public) or an `ERROR.NO_*` paragraph (admin) |
| Not-found | inline in pages | Centered `h3` with a red underline, served with HTTP 200 |

Missing entirely: skeleton loading, `loading.tsx`, error boundaries, 404 page, pagination, breadcrumbs (only a back link on detail pages), and an audio player beyond the native `<audio>`.

## Responsive behavior

Mobile-first Tailwind with `md:`/`lg:` tweaks to text size and padding. Known issues (from code):
- The fixed-width cards (`w-80` ceremony card plus padding) can overflow screens narrower than about 360px.
- `w-screen` on the header.
- The zekr verse box uses `even:text-left` alignment on narrow screens; that's fine.
- Admin forms use `ml-7` with `w-full` inputs, so they're offset on mobile.
- No `viewport` export in the root layout (only some pages export it; Next provides a default).

## Accessibility (Fact-based findings)

- **Zero** `aria-*` attributes in the codebase.
- Interactive `<span>`/`<p onClick>` for the menu toggle, theme toggle, search icon, zekr stanza tabs and "delete section" controls. These aren't focusable and have no role or name.
- Icon-only links and buttons (view/edit/delete, slider arrows, social icons) have no accessible names.
- `<label>` elements in `Input.tsx` aren't associated with their inputs (no `htmlFor`/`id`).
- Slider images use `alt="Slide n"`; the Eitaa icon `<img>` has no `alt`.
- Uses the native `confirm()` for deletes.
- Hover-only size changes; no visible focus styles beyond the defaults.
- Contrast: `text-secondary-red-4 (#df8080)` links on `light-1` backgrounds and red on dark backgrounds are likely below WCAG AA (**Inference**, not measured).
- No skip link. Headings are out of order (many `h1`s).
- Native `<audio>` is accessible but lacks a transcript link (the text is on the page, which mitigates this).

## Inconsistencies (selected)

- Three card designs for equivalent content. The ceremony card ignores dark mode.
- Route and label spelling: `/ceromony`, `/trustess`, `/oldSlaves`, "ارتباط باما", "ایمل", "حدف", "بارگدازی", "افرودن".
- Two primary reds used for the same role (`primary-red-1` buttons and `primary-red-2/3` links and badges).
- The admin "add" button is red while admin "edit" is green and "upload" is green.
- English role badges (`admin`/`owner`) in a Persian UI.

## Worth preserving

- RTL-first layout, Persian content tone and the existing Persian copy on the contact, donate, trustees, zekr and ziyarat intros (it's meaningful and well written).
- The red and green identity (needs systematization, not replacement).
- Peyda as the Persian UI face (license permitting).
- The zekr reading layout idea (alternating hemistich alignment) and the ziyarat section structure (Original → Translation → Note).
- Jalali dates everywhere.

## Needs redesign

Home page (none exists), navigation (no desktop nav, no current-page state), all cards, the forms system, admin shell, typography scale, Arabic text treatment, slider/gallery, empty, loading and error states, and the footer.

---

## Update 2026-11-11 — Proposed design direction (not implemented, not approved)

The existing design system above remains the description of **current** code. The proposed replacement is in [../CASE-STUDY.md §14, §17–20](../CASE-STUDY.md). Summary:

- **Direction A «سقاخانه» (water, lamp, brick):**
  - Light warm-stone surfaces and deep-ink text.
  - Water-teal accent and rare brass highlights.
  - Documentary photography.
  - Arched-niche framing only for featured items.
- **B «تکیه»** (dark mourning) becomes a seasonal **Muharram mode**, not the base theme.
- **C «کتیبه»** contributes typographic discipline.
- **Typography:**
  - Vazirmatn (OFL) for UI and Persian.
  - A Naskh face for Arabic at 1.4–1.6× size, with `lang="ar"`.
  - Peyda for display only if its web license is confirmed.
- **Navigation:**
  - Desktop: a top bar with متون ▾، گزارش مراسم، دربارهٔ هیئت ▾، ارتباط، search, and a «حمایت از هیئت» CTA.
  - Mobile: a bottom tab bar (متون · مراسم · جست‌وجو · بیشتر) that hides on reading pages in favor of a reader toolbar.
- **Retire:** the 16-shade red/green token set, the hamburger-only nav, fixed-width cards, the custom slider (replaced by grid + lightbox), and per-component `<Toaster/>`.
- **Preserve:** RTL-first layout, Jalali dates, the existing Persian intro copy, the alternating-hemistich idea for zekr, and the ziyarat section structure.
- **Visual verification still pending:** the app currently renders no page (E-01).

---

## Update 2026-11-12 — Implemented visual system (this section supersedes "Tokens", "Typography" and "Component patterns" above for **current code**)

Direction A «سقاخانه» was implemented on the visual layer, with Ketibeh typography and a restrained Tekyeh night band. It was verified in headless Chrome at 320–1440px, light and dark.

**Where it lives**
- `src/app/globals.css` is the single source.
- **Semantic tokens** are CSS variables on `:root`/`.dark`, exposed to Tailwind 4 through `@theme inline`:
  - Surfaces and lines: `bg`, `surface`, `surface-2/3`, `line`, `line-strong`.
  - Text: `ink`, `ink-muted`, `ink-subtle`.
  - Accent: `accent` (water-teal), `accent-hover`, `accent-soft`, `accent-ink`, `on-accent`.
  - Brass: `brass`, `brass-soft`.
  - Tekyeh: `night`, `night-2`, `night-ink`, `night-muted`, `crimson`.
  - Status: `danger`, `success` and `warning`, each with a `-soft` variant.
  - **Never add raw colours in components.**
- **Component classes:**
  - Layout: `.shell` (container), `.page`, `.page-header`, `.eyebrow`, `.page-title`, `.section-title`, `.lead`, `.prose-fa`.
  - Surfaces: `.card`, `.card-interactive`, `.panel`, `.band-night`, `.niche` (arch), `.tile-rule`.
  - Buttons and links: `.btn` + `-primary`/`-secondary`/`-danger`/`-ghost`/`-sm`/`-block`, `.icon-btn` (+ `-sm`/`-danger`/`-accent`), `.link`, `.link-arrow`, `.badge` (+ `-accent`/`-brass`/`-danger`).
  - Forms: `.form`, `.field-group`, `.field-label`, `.field`, `.file-trigger`, `.check`, `.repeat-block`.
  - States: `.state`, `.state-title`, `.state-text`, `.state-mark`, `.empty`.
  - Reading: `.reader`, `.text-arabic`, `.text-translation`, `.note`, `.verse-sheet`, `.hemistichs`/`.hemistich`, `.meta-list`.
  - Other: `.segmented` (tabs), `.list-row`, `.toolbar`, `.nums`.
- **Fonts** (`src/utils/font.ts`):
  - Peyda as WOFF2, weights 400–800, variable `--font-Peyda`, for UI and Persian text.
  - **Noto Naskh Arabic** via `next/font/google`, self-hosted at build time, variable `--font-naskh`. It's used only through `.text-arabic` with `lang="ar"`.
- **RTL:** logical utilities only (`ps/pe/ms/me/start/end`, `border-s`). Never `ml-*`/`mr-*`/`text-left`.
- **Motion:** 150–250 ms colour and border transitions; `animate-sheet-in` for the mobile menu; everything is disabled under `prefers-reduced-motion`.
- **Shared visual components added:**
  - `src/components/module/BrandMark.tsx`: a **placeholder** niche mark, not the official emblem.
  - `src/components/layout/AdminNavLink.tsx`: active state for the admin sidebar.
  - `src/app/not-found.tsx`: a styled 404.
- **Removed:**
  - `tailwind.config.ts`; the legacy red/green tokens are no longer used anywhere.
  - The `react-loader-spinner` *usage*. `Loader` is now pure CSS; the package is still in `package.json`.

**Missing assets (needed from the owner):** the official logo/emblem, real photography for the home hero, and the Peyda web licence confirmation.

---

## Update 2026-11-12 (second pass) — Cards, form controls, Jalali dates

- **Selects:** `select.field` has `appearance:none` and a theme-aware chevron (`--chevron`, `--chevron-active` on focus) inset 0.875rem from the inline-end border, with 2.75rem reserved padding. It's identical in Chrome, Safari and Firefox.
- **Date picker** (`.rmdp-input`): has a calendar icon (`--calendar-icon`) in the same position as the select chevron, and tabular digits. The popup uses tokens in both themes.
- **Chips:** `.chip-rail` and `.chip` are new; `aria-current="page"` marks the active chip. They're used by the shared `src/components/module/YearFilter.tsx`, which **replaces the native select + "Apply" link** for year filters.
- **Card anatomy:** new helpers `.card-pad`, `.card-footer`, `.card-kicker`, `.dot-sep` and `.stretched-link`. A whole card is one link, with no nested interactive elements.
- **Card identities (one system, distinct per content type):**
  - Zekr: brass top edge, year and poet kicker, the opening hemistich pair in a verse plate, and an audio indicator.
  - Ziyarat: the Arabic opening in Naskh on a teal plate, a section count and an audio indicator.
  - Ceremony report: photo-led, with the Jalali date overlaid on the image and a photo count.
  - Trustees: portrait-first card, with a brass frame for the chair; the page is grouped by the three existing roles.
  - Pir-gholaman: the arch "niche" memorial, unchanged as the reference.
  - Home: the "Heyat" row is now cards.
- **People with no photo** go straight to the placeholder image; the folder URL is no longer requested.
