# Traveloop

Traveloop is a polished full-stack travel planning platform built for the Odoo x Parul University Hackathon 2026. It helps users plan multi-city trips, build itineraries, track budgets, discover cities and activities, manage packing lists, and share travel plans publicly.

## What is included

- React + Vite frontend with responsive, premium UI
- Express backend with JWT authentication
- PostgreSQL database using Prisma ORM
- Real-time city and activity search using GeoDB, OpenTripMap, OpenWeather, and REST Countries
- Drag-and-drop itinerary builder with timeline and analytics
- Budget dashboards, packing checklist, travel journal and public trip sharing
- Deployment-ready configuration for Vercel and Render/Railway

## Setup

### Backend

1. Copy `.env.example` to `.env`
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
4. Push the local Prisma schema and seed demo data:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```
5. Start backend:
   ```bash
   npm run dev
   ```

### Database setup (local and production)

Local (SQLite) - quick start

- Ensure `backend/.env.example` contains `DATABASE_URL="file:./dev.db"` and copy it to `backend/.env`.
- From the project root run:
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
node prisma/seed.js   # seed demo data (if needed)
npm run dev
```
- Verify the backend health endpoint:
```bash
curl http://localhost:5000/health
npx prisma studio   # optional GUI to inspect dev.db
```

Production (Postgres) - notes

- Set `DATABASE_URL` in `backend/.env` to your Postgres connection string, e.g. `postgresql://USER:PASSWORD@HOST:5432/DATABASE`.
- Run migrations during deploy or in CI:
```bash
npx prisma migrate deploy
# or for development
npx prisma migrate dev --name init
```
- Ensure `prisma generate` is run in your build step and that env vars are available to the runtime.

What the app does automatically

- If `DATABASE_URL` points to the SQLite file and the file exists Prisma connects at startup.
- `npx prisma db push` will create the SQLite file/schema if missing. The `prisma/seed.js` script populates demo data used by the frontend.

Demo login:

- Email: `demo@traveloop.app`
- Password: `Password123!`

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start frontend:
   ```bash
   npm run dev
   ```

## Environment variables

See `backend/.env.example` and `frontend/.env.example`.

## Architecture

- `/backend` — Express API, Prisma schema, authentication, and business logic
- `/frontend` — Vite app, React Router, Zustand store, form validation, charts, and dynamic pages

## Feature summary

- Authentication, protected routes, JWT session handling
- Trip CRUD and itinerary builder
- City & activity explorer powered by external APIs
- Budget analytics and dynamic cost insights
- Packing list and travel journal management
- Shareable public itinerary pages
- Smooth animations, responsive hero, and premium card UI
