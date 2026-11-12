# PROJECT — Identity and Scope

## Overview

**Abasieh (عباسیه)** is the website of a Shia religious mourning association (*Heyat*) in Hamedan, Iran. It is a Persian-language, right-to-left Next.js application with two faces:

1. A **public site** where visitors read the Heyat's devotional texts (annual *zekr* chants and *ziyarat-nameh* pilgrimage texts), browse a gallery of past ceremonies, see the board of trustees and a memorial of deceased veteran servants, read a donation page, and send a contact message.
2. A **password-protected admin panel** where a small number of administrators manage all of that content.

Fact: the repository is a single developer's project (33 commits, one author, July–September 2024, plus one commit in March 2025). The code was bootstrapped with `create-next-app` and still carries some of its defaults (README, root metadata).

## Organization

| Item | As given in the project brief | As found in the code | Status |
|---|---|---|---|
| Persian name | هیئت سقای اباعباسی چورلان همدان | **هیئت سقایی عباسیه جولان** (navbar `src/components/module/Navbar.tsx`, all page metadata) | ⚠ **Unresolved discrepancy** |
| Locality | Chourlan (چورلان), Hamedan | "جولان" (Joulan/Julan); address text "همدان … خیابان جولان" in `src/components/template/ContactUsPage.tsx` | ⚠ Unresolved |
| Social handles | — | Instagram and Telegram `abbasie_julan`; contact email local-part `abasiehjoulan` (hardcoded in `ContactUsPage.tsx`, `Footer.tsx`, `api/send/route.tsx`) | Fact |

**Open question for the owner:** which name and spelling is canonical (چورلان vs. جولان, "سقای اباعباسی" vs. "سقایی عباسیه")? This must be settled before any rebranding, SEO, or domain work.

**Domain vocabulary** used throughout the code. Future agents must understand these terms:

| Term | Meaning | Code identifier |
|---|---|---|
| هیئت (Heyat) | Religious mourning association | — |
| سقایی / سقا (Saqa'i) | Water-bearer tradition commemorating Abbas ibn Ali at Karbala; the Heyat's identity | — |
| ذکر (Zekr) | Devotional chant; here, the annual chants performed each Muharram, organized **by year** | `Zekr`, `/zekr` |
| بند / مصراع | Stanza / hemistich (half-verse) | `FirstParagraph`, `SecondParagraph`, `Zekr_text_p` |
| زیارت‌نامه (Ziyarat-nameh) | Pilgrimage/visitation prayer text: Arabic original + Persian translation | `Ziartnameh`, `/ziartnameh` |
| مراسم (Marasem) | Ceremony / event | `Ceremony`, `/ceromony` (sic) |
| هیئت امنا (Hey'at-e Omana) | Board of trustees | `Trustees`, `/trustess` (sic) |
| پیر غلامان (Pir-Gholaman) | Honored elder servants of the Heyat, here **deceased** members shown as a memorial (with date of death) | `OldSlaves`, `/oldSlaves` |
| مقاله | Article / blog post | `BlogPost`, `/admin-panel/blogs` |

**Recommendation:** the English identifier `oldSlaves` is a literal and misleading translation of پیر غلامان. It is exposed in public URLs. A rebuild should use a respectful slug (for example `/pir-gholaman` or `/veterans`). See DECISIONS.md D-12.

## Main purpose (as implemented)

- Preserve and publish the Heyat's **annual zekr archive** (text plus audio) and **ziyarat texts** (Arabic, translation, audio).
- Document **past ceremonies** with a photo gallery.
- Present the **people** of the Heyat: trustees and a memorial of veteran servants.
- Offer basic **contact** (email form, phone, map link, social links) and **donation** information.

## Target audience (inferred from content; not documented anywhere)

- Members and families of the Heyat community in Hamedan who want the chant texts and audio, especially around Muharram.
- Devotees looking for ziyarat texts with translation.
- People who want to see ceremony photos or contact or donate to the Heyat.
- A handful of **administrators** (the Heyat's media volunteers) who maintain the content.

Everything is in Persian. There is no English or Arabic UI.

## Existing product scope (verified)

The implemented public sections are Zekr, Ziyarat-nameh, Ceremonies, Trustees, Pir-Gholaman, Contact, Donate and Sign-in. The admin panel manages admins, years, zekr, ziyarat, ceremonies, trustees and pir-gholaman. FEATURES.md has the status of each one.

**Not implemented despite UI hints:** the home page (placeholder text), articles/blog (nav link points to `/`, backend half-built), search (icon only), the Eitaa social link (points to `/`), the footer "About us" text (Lorem ipsum), and the donation account numbers (empty labels).

## Confirmed requirements

These are requirements evidenced by existing, working code, so a rebuild must keep these capabilities:

1. Persian-only, RTL, with Persian (Jalali) dates and Persian digits for display.
2. Zekr archive organized by year, each zekr with poet, two stanzas (description, verses, hadith) and optional audio.
3. Ziyarat texts as ordered sections of Arabic original, Persian translation and an optional note, with optional audio.
4. Ceremonies with title, description, Jalali date, cover image and photo gallery.
5. Board of trustees with three fixed roles (chair, member, alternate member), shown in that order.
6. Memorial list of pir-gholaman with name, date of death and photo.
7. Contact form that delivers to the Heyat's email.
8. Light and dark themes.
9. Admin-only content management with two roles (OWNER, ADMIN). Only the OWNER manages admins and trustees in the UI.

## Potential future directions (from the brief; NOT implemented)

These are directions only. None is approved, and none exists in code beyond what's noted:

- A real home page introducing the Heyat's identity, history and activities.
- An **upcoming events / program schedule** (today ceremonies are only a past-event gallery with no notion of upcoming vs. past).
- Articles/blog (backend partially started; see FEATURES.md F-13).
- Video and broader media gallery (no video support exists).
- Live streaming, newsletter or notifications, member registration, online donation payment. None of these exist.

ROADMAP.md lists prioritized candidates.

---

## Update 2026-11-11 — Product case study (proposal, not approved)

See **[../CASE-STUDY.md](../CASE-STUDY.md)** for the full product and design direction.

**Name evidence (Fact):** independent sources use **هیئت سقایی عباسیه جولان**:
- ISNA Hamedan
- the Hegmataneh newspaper
- sufism.ir
- an Anhar e-library text

This matches the code, the social handles (`abbasie_julan`) and the email. No source found uses "چورلان". The question stays **open** until the owner confirms (CASE-STUDY Q-1).

**External history (Source, unconfirmed by the Heyat):**
- The Heyat was founded around 1277 SH by the late Sayyed Ahmad Ruhbakhsh with Karbalai Abolqasem Saqqa, and is described as Hamedan's first Saqaei Heyat.
- Its program: Quran on nights 1–3 of Muharram, then the Saqaei procession on nights 4–14.
- Location: Joulan (Taleghani Blvd), opposite the Askariyeh Mosque.

Don't publish any of this until the Heyat confirms it (Q-2).

**Proposed vision (Proposal):** *"the digital home and memory of the Saqaei Heyat of Joulan"*, a reading-first cultural archive with a seasonal (Muharram) pulse. Five pillars: Texts (zekr + ziyarat/dua), Ceremony reports, The Heyat (history, board, pir-gholaman), Support, Contact. Articles are deferred. Non-goals: news portal, visitor accounts, comments, online payment, live streaming.

**Owner direction (Fact, given in the brief):**
- Deploy on **Vercel**.
- Use **ImgBB** for image uploads for now.
- No complex payment system.
