---
name: Bárbara Barbizani — Law Practice
description: Trustworthy, warm, refined — elegant minimalism for a multilingual law practice in Portugal.
colors:
  counsel-navy: "#1E2E45"
  warm-gold: "#B19460"
  soft-parchment: "#E8E9E1"
  white: "#FFFFFF"
  charcoal: "#2F333A"
  slate-ink: "#374151"
  mist: "#E5E7EB"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(2.3rem, 8vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(1rem, 2.5vw, 1.05rem)"
    fontWeight: 200
    lineHeight: 1.7
    letterSpacing: "normal"
  subtitle:
    fontFamily: "Encode Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.025em"
rounded:
  none: "0"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  section-y: "clamp(20px, 5vw, 70px)"
components:
  button-primary:
    backgroundColor: "{colors.warm-gold}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "8px 40px"
    typography: "{typography.title}"
  button-primary-hover:
    backgroundColor: "{colors.warm-gold}"
    textColor: "{colors.white}"
  button-navy:
    backgroundColor: "{colors.counsel-navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "8px 40px"
    typography: "{typography.title}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.none}"
    padding: "24px 28px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.counsel-navy}"
    rounded: "{rounded.none}"
    padding: "16px"
  nav-link:
    textColor: "{colors.counsel-navy}"
    typography: "{typography.label}"
---

# Design System: Bárbara Barbizani — Law Practice

## 1. Overview

**Creative North Star: "The Trusted Counsel"**

This is the calm, refined study of an expert who puts you at ease the moment you walk in. Every surface should feel like being received by a high-caliber professional who is also unmistakably human: navy for authority, gold for warmth, parchment for calm. The system is elegant minimalism — prestigious enough to feel expert, warm enough to feel approachable. It carries visitors who arrive stressed or uncertain toward a single confident action: booking a consultation.

The palette does the heavy lifting. Counsel Navy anchors headings and authoritative surfaces; Warm Gold appears sparingly as the signal of warmth and interactivity; Soft Parchment grounds the whole page so nothing ever sits on cold, clinical white. Serif display type lends gravitas and tradition; a light-weight sans keeps body copy quiet and unintimidating. Motion is restrained — scroll-triggered reveals that decelerate smoothly and never bounce.

This system explicitly rejects the generic AI look: no purple-to-blue gradients, no Inter, no card-heavy dashboards, no glassmorphism-as-decoration, no gradient text, no neon, and never dark-mode-by-default. It is never cold, never flashy, never playful. This is a law firm.

**Key Characteristics:**
- Navy / gold / parchment, and nothing outside it without discussion
- Serif for gravitas, light sans for calm, a distinct sans for the hero subtitle
- Sharp corners everywhere — no border radius is a deliberate signature
- Flat by default; shadow and lift appear only on interaction
- Bilingual by design (PT default, EN equal); layouts hold in both

## 2. Colors

A warm, authoritative palette: deep navy authority, gold warmth, and a parchment ground that keeps the whole page calm. Never pure black, never pure white as the page ground.

### Primary
- **Counsel Navy** (#1E2E45): The voice of authority. All headings (h1–h6), the primary navy CTA on light grounds, full-bleed section backgrounds for practice areas and closing calls-to-action, input text, and active nav underlines. It is the most-used ink and the color the brand is built on.

### Secondary
- **Warm Gold** (#B19460): Warmth and interactivity, used sparingly and deliberately. The workhorse button fill, form icons, the hover underline on nav links, and the gold-on-parchment hero accents. Its restraint is what makes it read as warmth rather than decoration.

### Neutral
- **Soft Parchment** (#E8E9E1): The page ground. Every screen sits on parchment, never on white. Also the text-selection color (navy background, parchment text).
- **White** (#FFFFFF): Surface color for cards, form fields, and the scrolled navbar — the raised planes that float above the parchment ground.
- **Slate Ink** (#374151): Body copy inside white surfaces (e.g. card descriptions) where full navy would be too heavy.
- **Charcoal** (#2F333A): A deep neutral held in reserve for rare dense-text moments; not a primary surface color.
- **Mist** (#E5E7EB): Resting state of form-field underlines, before the gold focus reveal.

### Named Rules
**The Gold Restraint Rule.** Warm Gold is warmth, not decoration. Keep it to a small share of any screen — buttons, icons, hover accents. The moment gold covers large areas it stops signaling warmth and starts signaling cheapness. Its rarity is the point.

**The No-White-Ground Rule.** The page background is always Soft Parchment (#E8E9E1). White is reserved for raised surfaces (cards, inputs, scrolled nav). A full-white page ground is off-brand.

## 3. Typography

**Display Font:** DM Serif Display (with Georgia, serif fallback)
**Body Font:** DM Sans (with system-ui, sans-serif fallback)
**Label/Accent Font:** Encode Sans (hero subtitle only)

**Character:** A high-contrast pairing on the classic serif-plus-sans axis: DM Serif Display brings tradition and gravitas to every heading and button, while a deliberately light-weight DM Sans keeps body copy calm and unintimidating. Encode Sans makes a single distinct appearance in the hero subtitle as an intentional third voice.

### Hierarchy
- **Display** (DM Serif Display, 400, `clamp(2.3rem, 8vw, 3.5rem)`, line-height 1.1): The hero name and largest page headings (h1).
- **Headline** (DM Serif Display, 400, ~2.25rem / `text-4xl`, line-height 1.15): Section titles across pages (about, practice areas, contacts).
- **Title** (DM Serif Display, 700, 1.5rem / `text-2xl`, line-height 1.2): Card titles, count-up stat figures.
- **Body** (DM Sans, 200, `clamp(1rem, 2.5vw, 1.05rem)`, line-height 1.7): All paragraph copy. Deliberately light. Keep line length to 65–75ch.
- **Subtitle** (Encode Sans, 500, 1.125rem / `text-lg`, gold): The hero subtitle only — its own voice by design.
- **Label** (DM Sans, 400, ~0.9rem, letter-spacing 0.025em): Navigation links, small UI labels.

### Named Rules
**The Serif-Authority Rule.** Headings and buttons are always DM Serif Display. Never set a heading or a button label in the sans body face; the serif is what carries the practice's gravitas.

**The Light-Body Rule.** Body copy is DM Sans at weight 200. It is intentionally quiet so the page never feels dense or intimidating — but verify it still clears 4.5:1 contrast (navy or slate ink on parchment/white), never a light gray for "elegance".

## 4. Elevation

The system is flat by default. White surfaces distinguish themselves from the parchment ground by color alone, not by resting shadows. Depth is a response to interaction, not an ambient decoration — the clearest example is the practice-area card, which lifts and deepens its shadow only on hover.

### Shadow Vocabulary
- **Card rest** (`box-shadow: shadow-lg` — `0 10px 15px -3px rgba(0,0,0,0.1)`): The gentle resting plane of a white card on parchment.
- **Card hover** (`box-shadow: shadow-2xl` — `0 25px 50px -12px rgba(0,0,0,0.25)`, with `translateY(-6px)`): The lift on hover; paired with `cubic-bezier(0.25, 1, 0.5, 1)` over 300ms.
- **Navbar scrolled** (`box-shadow: shadow-sm` — `0 1px 2px rgba(0,0,0,0.05)`): Appears only once the page scrolls, alongside the backdrop blur.

### Named Rules
**The Motion-Serves-Meaning Rule.** Shadows and lifts confirm interactivity; they never perform. If a shadow isn't responding to hover, focus, or scroll state, it probably shouldn't be there.

## 5. Components

The feel across components is tactile and confident — present and weighty, with real feedback on interaction, while staying within the restrained navy/gold/parchment world.

### Buttons
- **Shape:** Sharp corners, no radius (0). Padding `8px 40px`, letter-spacing wide (`tracking-wider`), set in DM Serif Display.
- **Primary (Gold):** Warm Gold background, white text. The workhorse button (e.g. "see more", and "contact" on navy sections).
- **Navy (variant):** Counsel Navy background, white text. The primary consultation CTA when it sits on a light parchment ground.
- **Hover / Focus:** `opacity: 0.85` over a 200ms transition. Keep this consistent across both fills.

### Cards / Containers
- **Corner Style:** Sharp, no radius (0) — a deliberate signature.
- **Background:** White, on the parchment ground.
- **Shadow Strategy:** `shadow-lg` at rest → `shadow-2xl` + `translateY(-6px)` on hover (see Elevation), eased with `cubic-bezier(0.25, 1, 0.5, 1)` over 300ms.
- **Internal Padding:** `24px 28px` for the content block; edge-to-edge image at the foot.
- **Content:** Title in DM Serif Display (bold, navy); description in Slate Ink (#374151).

### Inputs / Fields
- **Style:** White surface with a 2px bottom border only (Mist #E5E7EB at rest). No box, no outline, no radius. A gold Iconify glyph leads each field; text is navy.
- **Focus:** The bottom border transitions to Warm Gold (`focus-within:border-gold`) over 300ms — a quiet gold underline reveal. Native focus outline is removed, so the gold underline must remain the visible focus signal.

### Navigation
- **Style:** Fixed header, transparent-blurred by default (`bg-white/30`, `backdrop-blur-sm`) → `bg-white/80` + `backdrop-blur-md` + `shadow-sm` once scrolled past 20px, eased with `cubic-bezier(0.25, 1, 0.5, 1)` over 500ms.
- **Links:** DM Sans, navy. Active route carries a solid navy 2px underline; hover reveals a `gold/50` underline. Mobile menu expands via an animated `grid-template-rows` transition.

## 6. Do's and Don'ts

### Do:
- **Do** ground every page in Soft Parchment (#E8E9E1); reserve white for raised surfaces (cards, inputs, scrolled nav).
- **Do** set every heading and button in DM Serif Display; keep body copy in DM Sans at weight 200.
- **Do** keep Warm Gold to a small share of any screen — buttons, icons, hover accents.
- **Do** keep corners sharp (0 radius) on buttons, cards, and inputs; it is a deliberate signature.
- **Do** make depth a response to interaction — flat at rest, lift/shadow on hover and focus.
- **Do** ease all motion with `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart); honor `prefers-reduced-motion`.
- **Do** verify body text clears WCAG AA (≥4.5:1) — navy or slate ink, never a light gray for "elegance".
- **Do** keep layouts working equally in Portuguese and English; never hardcode visible text (use next-intl keys).

### Don't:
- **Don't** introduce colors outside navy / gold / parchment without discussion.
- **Don't** use a full-white page background.
- **Don't** use glassmorphism decoratively, gradient text, neon accents, or dark-mode-by-default.
- **Don't** use generic AI aesthetics: purple-to-blue gradients, Inter, or card-heavy layouts.
- **Don't** add playful animations, bouncy or elastic easing, or whimsical copy — this is a law firm.
- **Don't** set headings or buttons in the sans body face.
- **Don't** let Warm Gold cover large areas; it reads as cheap the moment it stops being rare.
- **Don't** sacrifice readability for visual impact — body stays light-weight DM Sans, but always legible.
