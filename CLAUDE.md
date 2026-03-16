# CLAUDE.md

Context for AI assistants when making design and frontend decisions in this repo. For project structure and commands, see WARP.md.

## Design Context

### Users

Prospective and existing legal clients — primarily Portuguese, Brazilian, and Chinese individuals and companies navigating legal matters in Portugal. They arrive stressed, uncertain, or overwhelmed by legal complexity. Many are making high-stakes decisions (citizenship, property, business formation) and need to trust quickly. The site must convey competence immediately while feeling approachable enough to reach out.

### Brand Personality

**Trustworthy, warm, refined.**

The interface should evoke four feelings simultaneously:
- **Confidence** — "I'm in safe, capable hands"
- **Calm** — "This person will handle the stress for me"
- **Prestige** — "This is a high-caliber professional"
- **Approachability** — "I can reach out without intimidation"

This is a rare balance: prestigious enough to feel expert, warm enough to feel human. Never cold, never flashy, never generic.

### Aesthetic Direction

**Elegant minimalism.** The current direction is intentional and should be preserved:

- **Palette:** Navy (#1E2E45) as authority, Gold (#B19460) as warmth/accent, warm off-white (#e8e9e1) as ground. Never pure black or pure white.
- **Typography:** DM Serif Display for headings (gravitas, tradition), DM Sans for body (clean, readable), Encode Sans for the hero subtitle (a deliberate contrast). Buttons use the serif face.
- **Layout:** Generous whitespace. Full-width hero sections break up content. Sections breathe. Nothing feels cramped.
- **Photography:** Real images (office, landmarks, team) — never stock illustrations or AI-generated imagery.
- **Animation:** Scroll-triggered reveals via react-spring. Subtle, never bouncy. Deceleration easing (ease-out-quart). Interactions should feel refined, not playful.

### Design Principles

1. **Authority through restraint.** Less decoration, more intention. Every element earns its place. The navy-and-gold palette does the heavy lifting — don't dilute it with extra colors or gradients.

2. **Warmth in the details.** Gold accents on icons, hover states, and focus rings signal human warmth. Text selection is navy-on-cream. Form inputs reveal a gold underline on focus. These small touches accumulate into a feeling of care.

3. **Motion serves meaning.** Animations guide attention and provide feedback — they never perform. Scroll reveals help users process content in sequence. Button lifts confirm interactivity. Everything respects `prefers-reduced-motion`.

4. **Bilingual by design.** Portuguese is the default locale; English is equally important. Layouts must accommodate both languages without breaking. Translation keys should be descriptive. Never hardcode visible text.

5. **Accessible by default.** WCAG AA compliance. Semantic HTML. Proper focus management. Color contrast must hold for all text. Every interactive element must be keyboard-navigable.

### Anti-Patterns (Do Not)

- Add playful animations, bouncy easing, or whimsical copy — this is a law firm
- Use glassmorphism, gradient text, neon accents, or dark-mode-by-default
- Introduce new colors outside the navy/gold/cream palette without discussion
- Use generic AI aesthetics (purple-to-blue gradients, Inter font, card-heavy layouts)
- Add UI complexity (modals, popovers, multi-step wizards) without clear justification
- Sacrifice readability for visual impact — body text stays light-weight DM Sans
