# Vercel Deploy — Chore Tracker Parent Dashboard

## What this is
A parent-only dashboard hosted on Vercel's global CDN.
Accessible from anywhere — your phone, laptop, wherever.
Connects directly to your Google Apps Script (no backend needed).

## Deploy in 3 minutes

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
cd ChoreTracker_vercel
vercel
```
Follow the prompts. Vercel gives you a URL like:
`https://chore-tracker-abc123.vercel.app`

### Option B — Vercel Dashboard (no CLI)
1. Go to vercel.com → Sign up free with GitHub/Google
2. New Project → Upload → drag the ChoreTracker_vercel folder
3. Deploy → done in 30 seconds

### Option C — GitHub (best for updates)
1. Create a private GitHub repo
2. Push the ChoreTracker_vercel folder
3. Connect repo to Vercel — auto-deploys on every push

---

## First time setup (in the browser)

When you open the Vercel URL for the first time, you'll see a
connection screen asking for two things:

1. **Google Apps Script URL** — the /exec URL from your deployment
2. **API Key** — the same secret string from your Settings sheet

These are saved in your browser's localStorage — you won't need
to re-enter them on the same device.

---

## What the dashboard can do

| Feature | How |
|---------|-----|
| View all kids' progress | Real-time, auto-refreshes every 30s |
| Approve WiFi | Tap Approve — ESP32 unlocks within 30s |
| Mark a chore done | Tap ✓ next to any chore |
| Reset a chore | Tap ↩ next to any done chore |
| Reset all chores for a kid | Tap ↩ Reset All in kid panel footer |
| Send Alexa reminder | Tap 🔔 Remind — ESP32 announces within 30s |
| View family calendar | Shown below the kid panels |

---

## Security note

The Vercel URL itself is the "password" — anyone with the URL
can access the dashboard. Keep it private (don't share it publicly).

If you want to add a PIN later, I can add a simple localStorage-based
PIN gate to index.html.

---

## Custom domain (optional)

In Vercel dashboard → your project → Settings → Domains
Add your own domain like `chores.yourdomain.com` — free with Vercel.

---

## Updating

If you ever change index.html:
- CLI: run `vercel` again from the folder
- GitHub: push the change — Vercel auto-deploys
