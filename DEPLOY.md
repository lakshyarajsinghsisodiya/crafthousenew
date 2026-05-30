# Deploy Crafthouse Media (Render + Vercel)

Repo: https://github.com/lakshyarajsinghsisodiya/crafthouse-media

Deploy **backend on Render** first, then **frontend on Vercel** (the site needs the API URL).

---

## 1. Backend API — Render

1. Sign in at [render.com](https://render.com) and click **New +** → **Web Service**.
2. Connect GitHub and select **crafthouse-media**.
3. Use these settings:

| Setting | Value |
|--------|--------|
| **Name** | `crafthouse-media-api` (any name is fine) |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance type** | Free (or paid for always-on) |

4. Under **Environment**, add:

| Key | Value |
|-----|--------|
| `CORS_ORIGIN` | Your Vercel URL after step 2, e.g. `https://crafthouse-media.vercel.app` (comma-separate multiple URLs if needed) |
| `ALLOW_VERCEL_PREVIEWS` | `true` (allows `*.vercel.app` preview deploys) |
| `CONTACT_EMAIL` | Your inbox for contact form (optional) |

`PORT` is set automatically by Render — do not override it.

5. Click **Create Web Service** and wait until the deploy is **Live**.
6. Copy your API base URL, e.g. `https://crafthouse-media-api.onrender.com`  
   Health check: `https://YOUR-SERVICE.onrender.com/api/health` should return `{"status":"ok",...}`.

> **Free tier:** the service sleeps after ~15 minutes of inactivity; the first request may take 30–60 seconds to wake up.

---

## 2. Frontend — Vercel

1. Sign in at [vercel.com](https://vercel.com) → **Add New…** → **Project**.
2. Import **crafthouse-media** from GitHub.
3. Configure the project:

| Setting | Value |
|--------|--------|
| **Framework Preset** | Next.js |
| **Root Directory** | `frontend` (click Edit → set to `frontend`) |
| **Build Command** | default (`next build`) |
| **Output Directory** | default |

4. **Environment Variables** (Production + Preview):

| Key | Value |
|-----|--------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR-RENDER-SERVICE.onrender.com/api` |

Use the exact `/api` suffix. Example:  
`https://crafthouse-media-api.onrender.com/api`

5. Click **Deploy**.

6. When Vercel gives you a URL (e.g. `https://crafthouse-media.vercel.app`):
   - Go back to **Render** → your service → **Environment**
   - Set `CORS_ORIGIN` to that URL (no trailing slash)
   - Save → Render will redeploy

7. Open your Vercel site and confirm sections load (stats, portfolio, etc.). If the API was sleeping, wait up to a minute and refresh.

---

## 3. Custom domain (optional)

**Vercel:** Project → **Settings** → **Domains** → add your domain.

**Render:** Service → **Settings** → **Custom Domains**.

After adding a custom domain on Vercel, update Render `CORS_ORIGIN` to include it, e.g.  
`https://crafthousemedia.com,https://www.crafthousemedia.com`

---

## 4. Local vs production env

| App | Local file | Production |
|-----|------------|------------|
| Backend | `backend/.env` (copy from `.env.example`) | Render env vars |
| Frontend | `frontend/.env.local` (copy from `.env.local.example`) | Vercel env vars |

Never commit `.env` or `.env.local`.

---

## 5. Troubleshooting

| Problem | Fix |
|--------|-----|
| Site loads but data is missing / contact fails | Check `NEXT_PUBLIC_API_URL` on Vercel; redeploy after changing it |
| CORS error in browser console | Set `CORS_ORIGIN` on Render to your exact Vercel URL; enable `ALLOW_VERCEL_PREVIEWS` for preview URLs |
| API very slow on first visit | Render free tier cold start — upgrade or use a keep-alive ping |
| 404 on API | URL must end with `/api` for the frontend; health is `/api/health` on Render host |

---

## Deploy order checklist

- [ ] Render web service live, `/api/health` works
- [ ] Vercel project with **Root Directory** = `frontend`
- [ ] `NEXT_PUBLIC_API_URL` set on Vercel
- [ ] `CORS_ORIGIN` on Render matches Vercel production URL
- [ ] Site tested in browser
