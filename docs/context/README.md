# Abasieh — Project Knowledge Base

This directory is the long-term memory of the Abasieh project. It was produced by a full read-only audit of the repository on **2026-11-11** (every file under `src/`, all config, git history, installed `node_modules` versions). It describes what **actually exists**, not what is planned.

Anyone (human or AI agent) starting work on this repository should read these documents before touching code.

## Documents

| File | Responsibility | Update when… |
|---|---|---|
| [PROJECT.md](PROJECT.md) | Identity, organization, audience, scope, confirmed vs. potential requirements, open questions | Product direction or organization facts change |
| [FEATURES.md](FEATURES.md) | Inventory of every feature with status, location, dependencies, limitations | A feature is added, removed, fixed, or broken |
| [ARCHITECTURE.md](ARCHITECTURE.md) | How the system is built: layers, data flow, auth flow, weaknesses (with diagrams) | Structure, rendering, storage, or auth changes |
| [STACK.md](STACK.md) | Every dependency: declared vs. installed version, purpose, usage, compatibility risk | Any `package.json` change |
| [DATABASE.md](DATABASE.md) | MongoDB models, collections, fields, the `Save` singleton, file-storage coupling | Any model/schema change |
| [API.md](API.md) | Every route handler under `src/app/api` with request/response/error behavior | Any route handler change |
| [UI-UX.md](UI-UX.md) | Design tokens, typography, layout, component patterns, accessibility, inconsistencies | Any visual/UX change |
| [PROGRESS.md](PROGRESS.md) | Snapshot of the current state: done, partial, broken, known bugs, tech debt, git state | After every meaningful work session |
| [ROADMAP.md](ROADMAP.md) | Preliminary, **unapproved** prioritized improvement list | When priorities are decided or items are completed |
| [RULES.md](RULES.md) | Rules for agents + discovered conventions vs. recommended conventions | When a convention is adopted or changed |
| [../CASE-STUDY.md](../CASE-STUDY.md) | **Proposed** product, UX, visual and storage direction for the rebuild (research, personas, IA, page specs, error inventory). Not approved requirements | Owner approves or changes a direction; after each discovery round |
| [DECISIONS.md](DECISIONS.md) | Discovered architectural/product decisions and whether to keep them | When a decision is made or reversed |

## Recommended reading order

1. **PROJECT.md** to understand what the site is for and who it serves.
2. **PROGRESS.md** for the current state, including the in-progress dependency upgrade that leaves the working tree broken.
3. **RULES.md** before making any change.
4. **ARCHITECTURE.md**, then **DATABASE.md** and **API.md** for backend work.
5. **FEATURES.md** for the specific area you are touching.
6. **UI-UX.md** for any visual work.
7. **STACK.md** before adding, upgrading, or removing a dependency.
8. **DECISIONS.md** and **ROADMAP.md** when planning.
9. **[../CASE-STUDY.md](../CASE-STUDY.md)** before any redesign or rebuild work. It is a proposal, not authorization to implement.

## How agents should use these documents

- Treat them as **evidence-backed context, not specification**. Each claim cites a file path. When code and documentation disagree, **the code wins**: fix the document in the same change.
- Statements are tagged where it matters:
  - **Fact**: verified by reading code or running a command.
  - **Inference**: a strong deduction that wasn't executed.
  - **Unknown**: could not be verified; see the "Areas requiring investigation" section of PROGRESS.md.
  - **Recommendation**: the auditor's opinion, not an approved decision.
- **Never** copy values from `.env` into these documents. Only variable names are recorded (see ARCHITECTURE.md → Configuration).
- Keep each fact in one place and link to it from the others instead of duplicating it.

## Audit limitations (summary)

- The site was **not visually inspected in a browser**. The working tree cannot build (see PROGRESS.md), and running `next dev` would rewrite the tracked `tsconfig.json`. All UI findings come from source code.
- The live MongoDB database was **not queried**. The data model comes from the Mongoose schemas only.
- No deployment configuration exists in the repository, so the production hosting setup is **unknown**.
