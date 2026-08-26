# YuanBio · 缘简

> A resume builder for overseas Chinese singles — fill in your profile, pick a template, and export a polished PDF résumé and a shareable name-card image.

YuanBio is a free, registration-free online tool for creating matchmaking profiles. Your data stays entirely in your browser — no account, no server storage.

---

## ✨ Features

- **Guided profile editor** — fill in your details step by step.
- **Beautiful templates** — choose a layout that fits you.
- **One-click export** — generate a PDF résumé and a name-card image.
- **Privacy first** — everything is saved locally in your browser; nothing is uploaded.
- **No sign-up** — just open and start.

---

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deploy

Push the repository to GitHub, import the project on [Vercel](https://vercel.com), configure the environment variables below, and deploy.

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Site URL, e.g. `https://yuanbio.com` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification (optional) |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster verification (optional) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher ID (optional) |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | Ad slot IDs (optional) |

---

## 🛠 Tech Stack

Next.js · TypeScript · Tailwind CSS · jsPDF · html2canvas

---
