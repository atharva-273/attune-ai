# AttuneAI × TCules — Project Context Document
*For Claude Code and any new Claude session picking up this work*
*Last updated: May 27, 2026*

---

## 1. Who is involved

**Client:** Brook — Founder/CEO of AttuneAI (brook@attuneai.app). Based in Canada. Has an in-house development team in Canada. Communicates via Slack (added to TCules Slack workspace, channel: #proj-attuneai). Recurring client calls are calendar-titled "Design Sync — TCules × Attune AI" at 9:30–10:15 AM IST, typically Tuesdays and Fridays.

**TCules team:**
- **Atharva** — Lead designer. Primary point of contact with Brook. Handles creative direction, design decisions, and all client communication.
- **Aayushi** — Execution designer. Implements screens in Figma based on Atharva's direction. Communicates with Atharva primarily via Slack DMs (D09CUUPJSPP).
- **Rakesh** — TCules principal/director. Present on kickoff call. Handles commercial/contract side.
- **Bijen** — Present on kickoff and client calls. Internal coordination.
- **Jatin, Shoghi, Varun** — Other TCules team members; present in background/internal channels.

**Slack channels relevant to this project:**
- `#proj-attuneai` (C0B0Z4BS37H) — Main project channel
- DM: Atharva ↔ Aayushi (D09CUUPJSPP) — Day-to-day design coordination

---

## 2. What is AttuneAI

AttuneAI is a couples' emotional wellness and conflict-resolution mobile app. It is NOT a dating app. It is for existing couples — primarily those navigating relationship friction, communication gaps, or ongoing growth work.

The app operates through four core modes:

| Mode | Purpose | Solo or shared |
|------|----------|----------------|
| **Reflect** | Private, AI-guided emotional journaling/processing | Solo |
| **Repair** | Post-conflict decompression and somatic grounding | Solo |
| **Resolve** | Live, structured turn-taking dialogue between partners | Shared (both present) |
| **Refine** | Ongoing relationship growth, scheduling, lower-arousal work | Shared |

These four modes are the heart of the product. Every design decision flows from understanding what emotional state the user is in when entering each mode.

**Other key product features:**
- Partner Connection — linking two accounts as a couple
- Assessments — guided quizzes (Love Language, Relational Style, Conflict Style)
- Insights — AI-generated pattern recognition from usage
- Shared Context — shared memory/notes between partners

---

## 3. Project scope

The engagement is an **8-week design project** that started **May 13, 2026**. The contract is with TCules; deposit was paid at kickoff.

**Formal scope from Brook's Confluence doc:**

1. ~70 unique screens (actual design artifacts are higher — many screens have multiple states)
2. 14 umbrella user flows (each with sub-flows; ~16 prototype flows total)
3. A full design system — native iOS and Android (not web)
4. Micro-interactions and animations

**Tech stack:** Angular + .NET (client confirmed). The mobile framework is likely Ionic but was never explicitly confirmed. Design system base is iOS 18 (HIG) + Material 3 (M3). Compatibility of this base with Angular/.NET was sent as an open question to Brook's dev team.

**4-phase delivery structure (from Confluence):**
1. Flow Mapping — confirm logic, IA, decision trees
2. Wireframe Prototype — wired lo-fi
3. High-Fidelity Prototype — fully designed and wired
4. Engineering Handoff — dev-ready specs

**Reality of timeline:** A full detailed estimate shows 27.3 weeks of design work against an 8-week contract at 1 lead designer. The realistic 8-week scope covers all 14 flows at hi-fi screen level, with Insights, Shared Context, and extended Assessment screens as shell-only. Full prototype wiring, micro-interactions, and animation specs are deferred to a weeks 9–14 extension engagement.

---

## 4. The 14 user flows and screen inventory

| UF | Title | Screen count | Status mix | Week slot |
|----|-------|-------------|-----------|-----------|
| UF 00 | Public Beta Access | 3 | 1✅ 1⚠️ 1🆕 | Week 1 |
| UF 01 | Start Onboarding | 10 | 8✅ 2🆕 | Week 2 |
| UF 02 | Invite Token Onboarding | 5 | 3✅ 2⚠️ | Week 2 |
| UF 03 | Login Flow | 4 | 1✅ 3🆕 | Week 1 |
| UF 04 | Choose a Mode / Browse Modes | 5 | 4✅ 1🆕 | Week 3 |
| UF 05 | Reflect Flow | 7–9 | 2✅ 2⚠️ 5🆕 | Weeks 3–4 |
| UF 06 | Repair Flow | 9 | 3✅ 4⚠️ 2🆕 | Weeks 4–5 |
| UF 07 | Resolve Flow | 13 | 10✅ 3🆕 | Weeks 5–6 |
| UF 08 | Refine Flow | 10 | 7✅ 3🆕 | Week 7 |
| UF 09 | Partner Connection | 5 | 5✅ | Week 3 |
| UF 10 | Assessments | 13 | 5✅ 1⚠️ 7🆕 | Week 7 |
| UF 11 | Insights (shell) | 6 | 6🆕 | Week 8 |
| UF 12 | Shared Context (shell) | 9 | 1✅ 8🆕 | Week 8 |
| UF 13 | Profile / Settings | 13 | 13✅ | Week 6 |

*✅ = exists in current app, ⚠️ = partial/needs redesign, 🆕 = from scratch*

---

## 5. Visual direction history — key decisions

This is one of the most important sections. The visual direction went through a significant evolution before landing.

### Step 1 — Initial moodboard analysis (May 13, before kickoff)
TCules curated a moodboard in Figma (`LMOY76r0I9qDtNMhFl0MRm`) with screenshots from 5 reference apps:
- **Happn** — Black-dominant, coral/orange/lime accents, bold editorial
- **Hinge** — Near-monochrome, aubergine accent, serif type, photo-forward, literary restraint
- **Badoo** — Purple/lavender primary, bright illustrations, friendly/mass-market
- **Pillowtalk** — Black backgrounds, electric chartreuse/lime accent, Gen Z expressive, dark mode native
- **Stoic** — Pure minimal, off-white, no colour, delicate line illustrations, journaling-adjacent

Three visual directions were derived: "Still Water" (Stoic + Hinge), "Warm Depth" (Hinge + Pillowtalk amber), "Neon Pulse" (Pillowtalk chartreuse).

### Step 2 — Kickoff call direction (May 13)
Brook was leaning strongly toward the dark mode "Pillowtalk" direction at kickoff. He also introduced the idea of each mode having a distinct colour grounded in psychological colour theory. Atharva committed to sending an updated dark-mode variation.

### Step 3 — Post-kickoff visual concepts (May 13)
Atharva developed 4 directions including: a warm editorial direction and a Direction 3 light variant. Brook's response was positive. He liked the warm editorial UI and the clean look of Direction 3's light variant. He asked for a merge of the two — clean card separations (editorial) in light mode (Direction 3). Noto Serif was proposed as the primary heading font.

### Step 4 — May 15 call: Dark mode dropped permanently
This was the key pivot. Brook made the explicit call to drop dark mode entirely. His reasoning:
- Target early users are primarily women
- Dark mode reads as more "technical/masculine"
- Light mode is more on-brand for AttuneAI's calm, relationship-focused positioning
- (Brook noted privately he actually prefers dark mode, but this was a brand decision)

**Additional design decisions from May 15 call:**
- No image backgrounds on text-heavy cards — use pastel/soft gradient cards instead
- Images reserved for splash screens (mode intros) and onboarding
- Text alignment: left-aligned confirmed
- Brook shared brand asset links with lifestyle imagery for modal/splash moments

### Step 5 — May 20 client call
Brook reviewed onboarding and login progress. Positive reception. Design execution confirmed on track.

### Step 6 — May 22 call: Visual direction officially finalised
Brook explicitly confirmed he liked the designs. Visual direction locked. This marked the end of the exploration phase. Work shifted to Week 3 scope: Choose Your Plan, Consent modal, Login iterations, Choose a Mode.

---

## 6. Design system decisions

**Figma file:** `2XyCsrgKS9DDHpBVm9VfS9` (Attune — Design File)

**Typography:**
- Serif font → Titles/headings (Garamond or similar; Noto Serif was prototyped)
- Sans-serif → Body, buttons, labels (Inter)
- Regular and Bold weights in combination for hierarchy
- Italic usage rules to be defined
- Heading font is a key brand-identity element

**Colour:**
- Light mode only (dark mode explicitly out of scope)
- No purple in the palette
- Warm parchment/white surface as app background
- Pinkish/beige — primary card backgrounds
- Warm peach gradient
- Grey cards for information/secondary content
- Each mode will have a distinct colour (psychological colour theory applied)
- Pastel/soft gradients for text-heavy cards; images reserved for splash/mode intros

**Components:**
- Completely rounded corner buttons with icon on far ends
- Rounded icons (Flaticon library / Ionicons — covers iOS and Android variants)
- Simplified interface overall
- Design system base: iOS 18 components + M3 (Material 3) components pulled into the Attune Figma file
- Design variables/tokens applied throughout
- Platform differences (iOS vs Android) handled as variable modes, NOT as light/dark mode

**Grid:**
- All values in px (not dp)
- Columns-based grid (specific column count TBC per screen size)

**Scope exclusions:**
- No light/dark mode switch — out of scope
- No "All assets exported" check in dev handoff checklist

**Icon library (~75–80 unique icons documented):**
Covers: navigation, mode-specific actions, reflection states, partner/social, AI states, conversation, repair/somatic, resolve/turn-taking, refine/scheduling, shared context, assessments, insights, profile/settings, system feedback states. Many have filled + outline variants for selected/unselected states. Mode-specific icons (Reflect, Repair, Resolve, Refine) may need custom design as they are brand-specific.

---

## 7. Key UX decisions

**Dynamic UX:** Mostly static. No UX changes based on emotional state detection during sessions.

**Onboarding segmentation:** One exception — during onboarding, users are bucketed into Type A (emotional language) or Type B (logical/problem-solving) based on who installed from which ad, without asking gender directly.

**IA:** Brook is open to IA improvement suggestions, flagged as annotations alongside designs — not a separate UX engagement.

**Delivery cadence:** Flow-by-flow handoff to dev team as each flow completes. Onboarding was logically first.

**Annotation requirements per screen:**
Each non-obvious screen needs annotations covering: what triggers it, what each tap does, whether it's private or shared, whether partner consent is needed, whether it's skippable, what happens on exit, what happens if data already exists, and backend failure behavior.

**Screen state requirements:** For "important" screens — 12 possible states: default, loading, empty, error, success, disabled, completed, skipped, pending partner, partner accepted, partner not joined, existing data found. Not all 12 apply to every screen, but the real number of design artifacts exceeds 70.

---

## 8. Prototype work

A coded interactive prototype was attempted in claude.ai using the Figma file link (`2XyCsrgKS9DDHpBVm9VfS9`, node `2388-9171`) for the new onboarding flow. This hit hard limitations:
- Figma asset URLs blocked in sandbox (images, icons can't be fetched)
- Fonts don't load from custom Figma sources
- Pixel-perfect translation requires a proper export pipeline

**Recommendation given:** Claude Code is the right tool for a coded prototype, using exported Figma assets + tokens. Alternatively, Figma's own prototype tool for click-through wiring. Anima/Locofy/Builder.io were mentioned as Figma-to-React export options.

---

## 9. Timesheet tracking workflow

A recurring task is filling the AttuneAI client timesheet. The workflow established:
1. Read Slack channels: Atharva↔Aayushi DMs (D09CUUPJSPP) and #proj-attuneai (C0B0Z4BS37H)
2. Read Google Calendar for call records ("Design Sync — TCules × Attune AI")
3. Extract tasks and time per person per day
4. Format as client-optimised timesheet (Day/Date, Task, Time in hours)
5. Output format: tables per person per day, with daily and weekly totals

**Hours tracked (approximate):**

| Week | Atharva | Aayushi |
|------|---------|---------|
| May 13 (Wed, kickoff day) | — | — |
| May 14 (Wed) | 5.5 hrs | 6.0 hrs |
| May 15 (Fri) | 7.0 hrs | 6.0 hrs |
| May 18 (Mon) | 5.75 hrs | 5.75 hrs |
| May 19 (Tue) | 4.75 hrs | 5.75 hrs |
| May 20 (Wed) | 3.5 hrs | 7.0 hrs |
| May 21 (Thu) | 1.5 hrs (sick leave) | 6.0 hrs |
| May 22 (Fri) | 4.0 hrs | 6.75 hrs |
| **Wk2 total** | **19.5 hrs** | **31.25 hrs** |

---

## 10. What was shared by the client (artifacts and references)

- **Moodboard Figma file:** `LMOY76r0I9qDtNMhFl0MRm` — reference apps (Happn, Hinge, Badoo, Pillowtalk, Stoic)
- **Brand asset links:** lifestyle imagery for splash/onboarding screens (shared by Brook in Slack, May 15)
- **Confluence doc:** Brook's product requirements document containing:
  - 14 user flows with sub-flows
  - 16 required prototype flows
  - Screen state requirements (12 states per important screen)
  - 4-phase delivery structure
  - Annotation requirements
- **Kickoff call transcript** (May 13, 2026)
- **May 15 call transcript**
- **Visual direction references** (Brook shared new visual directions/moodboards that drove the light mode pivot)
- **Screenshots of existing AttuneAI app** — shared early on to understand current product state

---

## 11. Current status (as of May 27, 2026 — end of Week 2)

**Completed:**
- ✅ Kickoff call (May 13)
- ✅ Visual direction exploration — 4 directions developed and presented
- ✅ Client approved warm editorial + clean light mode direction
- ✅ Light mode confirmed as permanent direction (May 15)
- ✅ Design system setup — tokens, components from M3 + iOS pulled in
- ✅ Public Beta Access screens (UF 00)
- ✅ Onboarding flow screens (UF 01) — substantially complete
- ✅ Login flow screens (UF 03) — substantially complete
- ✅ Visual direction finalised by client (May 22)

**In progress / Week 3 scope:**
- 🔄 Choose Your Plan screen — iterations underway
- 🔄 Consent / Agreement modal — iterations underway
- 🔄 Login flow — further iterations based on May 22 feedback
- 🔄 Choose a Mode (UF 04) — starting

**Not yet started:**
- UF 02 — Invite Token Onboarding
- UF 05–UF 13 (all four modes, partner connection, assessments, insights, shared context, profile)

---

## 12. Open questions / pending items

1. **Tech stack confirmation:** Has Brook's dev team confirmed iOS 18 + M3 is compatible with their Angular/.NET implementation? (Email was sent post-May 15 call; response status unknown)
2. **Ionic confirmation:** Brook never explicitly confirmed Ionic as the mobile framework. Worth clarifying.
3. **Italic typography rules:** Defined as "to be defined" — not yet formalised in design system
4. **Mode colour palette:** The distinct colour per mode (Reflect, Repair, Resolve, Refine) using psychological colour theory was agreed in concept but the specific colours have not been finalised
5. **Font final confirmation:** Are the heading/body font choices (Garamond/Noto Serif + Inter) aligned with Brook's brand guidelines? (Was flagged as a question)
6. **Dev alignment calls:** Rakesh flagged that alignment calls with Brook's dev team will be needed during handoff phase — not yet scheduled
7. **Grid spec:** Column count and px values to be formally documented

---

## 13. Figma file structure

**Main design file:** `https://www.figma.com/design/2XyCsrgKS9DDHpBVm9VfS9/Attune---Design-File`

Key node references encountered:
- `2388-9171` — Onboarding flow (new, post visual direction lock)
- `2132-15514` — Visual direction reference / comparison node
- `2388-9247`, `2388-9286`, `2388-9344`, `2388-9469` — Specific onboarding screens

**Moodboard / reference file:** `https://www.figma.com/design/LMOY76r0I9qDtNMhFl0MRm/App-Design`
- `1:361` — Main moodboard (Happn, Hinge, Badoo, Pillowtalk, Stoic)
- `4:298` — New visual direction reference (Stoic light mode)

---

## 14. Key framing / design philosophy decisions

These are strategic decisions made through the project that should not be undone without deliberate discussion:

1. **Light mode is non-negotiable.** Not a preference — a brand and audience decision made by the client.

2. **Calm before clever.** The product asks users to engage during emotionally vulnerable moments. Every design choice should reduce cognitive load and induce safety, not impress with visual complexity.

3. **The app is not a dashboard.** The UX model is ritual, not management. A user opening the app should be drawn to one clear action, not surveying a status board.

4. **Photography as feeling, not identity.** Full-bleed single images invite resonance ("yes, that feeling"). Collages invite comparison ("are we like that?"). Comparison is corrosive for a couples-in-difficulty product. Single images confirmed.

5. **Mode colour theory:** Each mode's colour palette should match the psychological state it's designed to address — calm/cool for conflict-heavy modes (Repair, Resolve), warmer for growth modes (Refine). Not purely aesthetic.

6. **Turn-taking in Resolve is ceremonial.** The visual design of switching turns between partners should feel like a deliberate, acknowledged moment — not a loading state.

7. **The AI is "considering," not processing.** Animation for AI response states should feel intentional and human-paced, not robotic. Timing and pacing are visual design elements.

---

*This document was compiled from Claude's memory of all conversations in this project, including: the initial Slack setup conversation, moodboard analysis, kickoff call transcript, May 15 call transcript, visual direction development, design system building, timesheet tracking, and prototype work sessions. The Figma design file and Slack channels are the living sources of truth.*
