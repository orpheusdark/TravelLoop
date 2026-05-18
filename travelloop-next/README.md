# TravelLoop Next Frontend

Premium cinematic travel-tech UI built with:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn-style UI primitives
- Lucide icons
- Zustand
- next-themes

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Backend Integration

The app is prepared to connect to the existing backend API.

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

API wrappers are in `src/lib/api.ts`.

## Implemented Surfaces

- Cinematic landing page with animated sections
- Floating glass navbar with mobile menu and theme toggle
- Premium split-screen login page
- Multi-step signup onboarding flow
- Travel intelligence dashboard
- Additional pages:
	- destination details
	- city exploration
	- booking
	- profile
	- community feed
	- AI planner interface
	- travel blog
	- settings

## Architecture

See `ARCHITECTURE.md` for:
- component hierarchy
- folder layout
- animation strategy
- design tokens
- state management architecture
- auth and API flow placeholders
- dark mode system
