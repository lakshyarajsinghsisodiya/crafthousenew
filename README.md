# Crafthouse Media

Premium cinematic marketing agency website with separate **frontend** (Next.js) and **backend** (Express API).

**Tagline:** Building Brands That People Remember.

## Project Structure

```
├── frontend/     # Next.js 15 + React + TypeScript + Tailwind + GSAP + Lenis
├── backend/      # Express API (content, contact form)
└── logo.png
```

## Quick Start

### 1. Backend API

```bash
cd backend
npm install
npm run dev
```

API runs at **http://localhost:4000**

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Site runs at **http://localhost:3000**

Ensure `frontend/.env.local` contains:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/stats` | Results statistics |
| GET | `/api/services` | Service cards |
| GET | `/api/portfolio` | Portfolio projects |
| GET | `/api/packages` | Pricing packages |
| GET | `/api/process` | Process steps |
| GET | `/api/testimonials` | Client testimonials |
| GET | `/api/gallery` | Gallery marquee data |
| POST | `/api/contact` | Contact form submission |

## Features

- Editorial luxury design (matte black + accent red)
- Film grain, vignette, dust particles, scan lines
- GSAP scroll animations + Lenis smooth scroll
- Custom cursor (desktop)
- Floating navigation with mobile fullscreen menu
- Fully responsive mobile layouts
- SEO metadata
- API-driven content with local fallbacks

## Production Build

```bash
# Backend
cd backend && npm run build && npm start

# Frontend
cd frontend && npm run build && npm start
```

Set `NEXT_PUBLIC_API_URL` to your deployed API URL in production.

## Deploy to production

**Backend → [Render](https://render.com)** · **Frontend → [Vercel](https://vercel.com)**

Step-by-step instructions: **[DEPLOY.md](./DEPLOY.md)**

## Tech Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion, Lenis

**Backend:** Node.js, Express, TypeScript, Zod
