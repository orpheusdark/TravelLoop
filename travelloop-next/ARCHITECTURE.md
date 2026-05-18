# TravelLoop Next.js Architecture

## Component Hierarchy
- `src/app/layout.tsx`: global app shell, typography, providers, metadata
- `src/app/page.tsx`: landing page composition from reusable sections
- `src/components/layout/navbar.tsx`: floating glass navbar with animated mobile menu
- `src/components/layout/footer-cta.tsx`: emotional CTA footer
- `src/components/layout/page-shell.tsx`: reusable internal-page hero shell
- `src/components/sections/landing-sections.tsx`: hero, smart search, destinations, map exploration, AI planner, community, marketplace, insights, mobile app, pricing, FAQ
- `src/components/ui/*`: shadcn-style design primitives (`button`, `card`, `input`, `badge`, `accordion`, `skeleton`)
- `src/components/motion/reveal.tsx`: scroll-triggered reveal helper
- `src/components/providers/*`: dark/light theme and root provider composition

## Folder Structure
- `src/app`: route-level pages (landing, login, signup, dashboard, and additional pages)
- `src/components`: reusable UI and section modules
- `src/lib`: API client, utility helpers, shared types
- `src/store`: Zustand app state (auth/session/recent search)

## Animation Strategy
- Framer Motion powers:
  - section reveal on scroll (`Reveal`)
  - floating markers/particles in hero
  - hover lift cards and magnetic-style button behavior
  - animated mobile navigation drawer
  - AI generation simulation pulse cards
- CSS powers:
  - glassmorphism surfaces
  - gradient mesh background
  - smooth transitions and interaction easing

## Design System
- Palette:
  - Deep navy: `--deep-navy`
  - Ocean blue: `--ocean-blue`
  - Sunset orange: `--sunset-orange`
  - Soft sand beige: `--sand-beige`
  - Emerald: `--emerald`
- Typography:
  - Headings: Space Grotesk
  - Body: Manrope
- Reusable utility patterns:
  - `.glass`: frosted card treatment
  - `.mesh-bg`: cinematic gradient mesh layer
  - `.magnetic`: subtle hover magnetic movement

## State Management Architecture
- Zustand store in `src/store/useAppStore.ts`
  - auth token + user
  - recent searches
  - centralized auth and UI updates

## API Integration Placeholders
- API client: `src/lib/api.ts`
- Config via `NEXT_PUBLIC_API_URL` defaulting to local backend (`http://localhost:5000/api`)
- Placeholder modules included:
  - `authApi.login`, `authApi.signup`
  - `tripApi.getTrips`, `tripApi.getActivities`

## Authentication Flow
- Login and signup pages provide premium onboarding UX
- Designed to connect to existing backend auth endpoints
- Upon backend wiring completion, persist token in store and route to `/dashboard`

## Dark Mode System
- `next-themes` in `ThemeProvider`
- Global CSS variables adapt via `html.light` and dark defaults
- Toggle control in navbar (`ThemeToggle`)
