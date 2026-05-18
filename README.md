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
