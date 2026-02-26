# BB Website

Law firm website for Bárbara Barbizani. Next.js (Pages Router), bilingual (Portuguese/English), with practice areas, testimonials, contact form, and SEO/sitemap.

**Tech stack:** Next.js 14, React 18, Tailwind CSS, SASS, next-intl, Formspree, Vercel Analytics & Speed Insights.

---

## Requirements

- **Node.js** ≥ 24
- **npm** ≥ 9

(Defined in `package.json` `engines`; use `.nvmrc` if you use nvm.)

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Default locale is Portuguese (`pt`); English at `/en`.

---

## Repository structure

```
bb-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Analytics/       # Vercel Analytics wrapper
│   │   ├── Footer/          # FooterSection
│   │   ├── Form/            # Input, Textarea, Select (Formspree)
│   │   ├── HeroSection/
│   │   ├── PublishedArticlesSection/
│   │   ├── Testimonials/
│   │   ├── Animated.jsx     # Scroll-triggered animations (@react-spring)
│   │   ├── AppHead.jsx     # next-seo DefaultSeo
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Container.jsx
│   │   ├── Faqs.jsx
│   │   ├── Footer.jsx
│   │   ├── IconContact.jsx
│   │   ├── LanguageSelector.jsx
│   │   ├── Layout.jsx       # Navbar + children + Footer
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx
│   │   └── Section.jsx
│   ├── pages/               # Next.js file-based routes
│   │   ├── _app.js          # App shell, NextIntlClientProvider, Layout
│   │   ├── _document.js
│   │   ├── 404.jsx
│   │   ├── index.jsx        # Home
│   │   ├── about/
│   │   ├── contacts/
│   │   └── practice-areas/
│   ├── messages/            # i18n (next-intl)
│   │   ├── en.json
│   │   └── pt.json
│   ├── styles/
│   │   ├── fonts.js         # next/font: DM Sans, DM Serif, Encode Sans
│   │   └── globals.scss
│   ├── hooks/
│   │   ├── useIsMobile.jsx
│   │   └── useTranslation.jsx   # getTranslationsArray for nested i18n arrays
│   ├── constants/          # Social links, language codes, headConfig
│   └── utils/               # Shared helpers (e.g. headConfig, language codes)
├── __tests__/
│   ├── pages/               # Page tests (about, contacts, practice-areas)
│   ├── components/         # Button, Card, Layout, HeroSection
│   ├── hooks/               # useTranslation, useIsMobile
│   ├── smoke/               # Dependency migration smoke tests
│   ├── __mocks__/           # common.js (Next, Formspree, next-intl, etc.)
│   └── __utils__/           # test-helpers (renderWithMotion, etc.)
├── jest.config.js           # next/jest, jsdom, @/ path alias
├── jest.setup.js            # jest-dom, common mocks, IntersectionObserver
├── next.config.js           # i18n (pt, en), images remotePatterns
├── next-sitemap.config.js  # Sitemap (postbuild)
├── tailwind.config.js
└── MISSING_TESTS.md         # Test backlog / checklist
```

**Path alias:** `@/` → `src/` (see `jsconfig.json`).

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Development server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `build`) |
| `npm run prod` | Build then start (local prod preview) |
| `npm run lint` | ESLint (Next.js config) |
| `npm test` | Run all Jest tests |
| `npm run test:watch` | Jest watch mode |
| `npm run test:coverage` | Jest with coverage report |
| `npm run test:smoke` | Only dependency migration smoke tests |

Sitemap is generated automatically after `npm run build` (`postbuild` → next-sitemap).

---

## Internationalization (i18n)

- **Locales:** `pt` (default), `en`
- **Config:** `next.config.js` → `i18n`
- **Strings:** `src/messages/pt.json`, `src/messages/en.json`
- **Arrays in messages:** use `useTranslation()` → `getTranslationsArray(key)` (e.g. practice areas, articles, FAQs)
- **Routes:** Locale-prefixed (e.g. `/en/about`, `/pt/contacts`)

---

## Environment variables

Create a `.env` (or `.env.local`) with:

| Variable | Purpose |
|----------|--------|
| `NEXT_PUBLIC_FORM` | Formspree form ID (contact form) |
| `NEXT_PUBLIC_CAPTCHA` | Google reCAPTCHA site key |
| `NEXT_PUBLIC_HOTJAR_ID` | Hotjar tracking ID |
| `NEXT_PUBLIC_METRICS_ID` | insights-js metrics ID |

---

## Styling

- **Tailwind** for utilities. Custom colors: `blue` (#1E2E45), `gold` (#B19460), `dark` (#2f333a).
- **SASS:** `src/styles/globals.scss`; component-level `.module.scss` where used (e.g. Navbar, HeroSection).
- **Fonts:** `src/styles/fonts.js` (DM Sans, DM Serif Display, Encode Sans) injected in `_app.js` via CSS variables.

---

## Testing

- **Runner:** Jest with `next/jest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`.
- **Setup:** `jest.setup.js` applies common mocks (Next Image/Link/router, next-intl, Formspree, Iconify, etc.) and an `IntersectionObserver` mock.
- **Helpers:** `__tests__/__utils__/test-helpers.jsx` (e.g. `renderWithMotion`).
- **Smoke tests:** `__tests__/smoke/deps-migration.smoke.test.js` checks that key dependencies load and expose the APIs the app uses; run after upgrading deps (`npm run test:smoke`).

See **MISSING_TESTS.md** for the test backlog and suggested order.

---

## Deployment

- **Platform:** Vercel (recommended).
- **Build:** `npm run build`; sitemap runs in `postbuild`.
- **Domains:** Supports dual domains (e.g. .com and .pt) via Vercel config.

---

## Other docs

- **WARP.md** – Short context for AI assistants (Warp, Cursor, etc.).
- **MISSING_TESTS.md** – List of missing tests and priorities.
