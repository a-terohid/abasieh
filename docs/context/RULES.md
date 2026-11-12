# RULES — Guidelines for Future Agents

## Part 1 — Mandatory rules

1. **Read `docs/context/` first** (order in README.md). Update the affected documents in the same change as the code.
2. **Preserve existing functionality** unless explicitly told otherwise. Known-broken behavior (PROGRESS.md → Known bugs) may be fixed, but say so in the change description.
3. **Never remove a feature or route** without explicit owner approval. If the site may be live, renaming routes needs redirects.
4. **Never expose secrets.**
   - Don't print, log, commit or document `.env` values.
   - Never add new secrets to tracked files.
   - Never log passwords or tokens. The signup handler currently does; don't copy that.
5. **Never invent** APIs, DB fields, env vars or content. Check DATABASE.md and API.md and the code. If something is missing, add it explicitly and document it.
6. **Respect personal data.** Trustee phone numbers and photos of living and deceased people are sensitive. Don't publish, seed or log them.
7. **Security by default:**
   - Every mutation handler must verify the session **and the role** server-side.
   - Validate all input.
   - Restrict upload MIME type and size.
   - Never fetch user-supplied URLs server-side.
8. **No unnecessary dependencies.** Check STACK.md first, since six installed packages are already unused. Don't upgrade or downgrade dependencies as a side effect of another task.
9. **Avoid unrelated changes.** Keep diffs scoped, and don't reformat untouched files.
10. **Avoid duplication.** Extract shared logic (upload helper, delete button, not-found view, contact info) rather than adding another copy.
11. **Proper error handling:**
    - Return the correct status codes (200 for an update, 201 only for a create).
    - `await` every DB write.
    - Never swallow errors silently.
    - Don't leak stack traces to clients.
12. **Accessibility:**
    - Use real `<button>`/`<a>` for interactions.
    - Give icon-only controls accessible names.
    - Associate every input with its label.
    - Keep a visible focus style.
13. **Verify** with whatever exists (type check, build, lint, manual run). State honestly what was and wasn't verified. Don't run `next dev`/`next build` on a tree where Next will rewrite `tsconfig.json` unless that change is intended.
14. **Git:**
    - Don't commit, push, rewrite history or switch branches unless the user asks.
    - Never commit `.env` or uploaded user media.
15. **Persian content:**
    - Keep the UI Persian and RTL.
    - Use correct Persian spelling and the zero-width non-joiner (نیم‌فاصله).
    - Display Jalali dates and Persian digits.
    - Religious texts must be reproduced exactly; never "fix" or paraphrase Arabic or translated text.

## Part 2 — Conventions that exist today (descriptive, not endorsed)

| Area | Existing convention | Evidence |
|---|---|---|
| Route files | `app/**/page.tsx` is a thin async server component; the UI lives in `components/template/<Name>Page.tsx` | all pages |
| Component folders | `layout/` shells, `template/` page bodies, `module/` reusable pieces, `constants/` cards, `elements/` small client widgets | `src/components` |
| Path aliases | `@/models/*`, `@/utils/*`, `@/types/*`, `@/template/*`, `@/module/*`, `@/layout/*`, `@/providers/*`, `@/public/*`; **plus** bare `src/...` imports (`src/components/lib/auth`) relying on `baseUrl` | `tsconfig.json` |
| Data access | Pages call `connectDB()` then a Mongoose model directly; no API GETs | ARCHITECTURE.md |
| Mutations | Client `fetch` to `/api/...` with `FormData` (with files) or JSON. The response is `{message}` or `{error}`. On success: toast, then `router.push`/`refresh` | all forms |
| Messages | All user-facing strings are in Persian `ERROR`/`MESSAGE` enums in `src/types/enums.ts` | |
| Model fields | PascalCase (`Title`, `Voice`) for zekr/ziyarat; camelCase for ceremony, trustees and old slaves | `src/models` |
| Naming | Mixed. `*Cart` means card; files misspelled (`TrusstesPage`, `cermony.ts`, `ZekrTextInout`) | |
| Styling | Tailwind utility classes inline; custom color tokens; `dark:` variants; Peyda font | UI-UX.md |
| Forms | Controlled `useState` + shared `Input` component; submit by button `onClick` | `M/Input.tsx` |
| Dates | Stored as ISO strings, converted to Jalali at render with `jalaali-js` | cards/details |
| Uploads | `public/uploads/{images/<Area>,voices}/YYYY-MM-DD$name$ts-rand.ext` | API.md |

When making a small fix inside the current codebase, **follow these conventions** so the fix stays consistent. Don't spread them into new architecture.

## Part 3 — Recommended conventions for the rebuild (proposals; adopt through DECISIONS.md)

- Use English, correctly spelled identifiers and kebab-case URL slugs, with Persian only in content and i18n strings.
- Organize as `features/<domain>/{components,server,schema}`, keeping one source of truth per domain.
- Run all server data access through a typed data layer, with Zod schemas shared by forms and handlers.
- Prefer Server Actions or typed route handlers. Return a consistent `{ data } | { error: { code, message } }` shape.
- Use one model naming style (camelCase), `timestamps: true` and explicit indexes.
- Put media in object storage, referenced by ID or key, never by title.
- Use design tokens as CSS variables (Tailwind v4 `@theme`) with semantic names, and a component library with documented variants.
- Write tests for the data layer and handlers, with a CI build plus type check plus lint.
