# Contact form & Book a Call — free setup

## Phone numbers (already on the site)

- **+91 75669 60696** — Call / WhatsApp buttons
- **+91 89626 02181** — Call / WhatsApp buttons

These work immediately on mobile and desktop (opens phone app or WhatsApp).

---

## Receive form submissions by email (free)

We use **[Web3Forms](https://web3forms.com)** — free, no credit card, ~250 submissions/month.

### Step 1 — Create access key

1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter **`craftinggstories@gmail.com`** (your inbox for form leads)
3. Click **Create Access Key**
4. Copy your **Access Key**

### Step 2 — Add to Render (backend)

1. [Render Dashboard](https://dashboard.render.com) → your API service (**crafthousenew**)
2. **Environment** → **Add variable**
3. Key: `WEB3FORMS_ACCESS_KEY`
4. Value: paste your access key
5. **Save, rebuild, and deploy**

### Step 3 — Test

1. Open [https://crafthousenew.vercel.app/#contact](https://crafthousenew.vercel.app/#contact)
2. Fill the form → **Send Message**
3. Check your inbox (and spam folder)

---

## Local testing

In `backend/.env` (copy from `.env.example`):

```
WEB3FORMS_ACCESS_KEY=your_key_here
```

Restart backend: `cd backend && npm run dev`

---

## Without Web3Forms key

- **Call / WhatsApp** still work
- Form submits but you only see entries in **Render Logs** (not ideal for production)

---

## Change phone numbers or email later

Edit `frontend/src/lib/site-config.ts` and redeploy.
