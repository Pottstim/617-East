# 617 East Trust

Production-ready Vite + React + Tailwind scaffold for the 617 East Trust website.

## Suggested GitHub repo organization

```text
617-east-trust/
├── public/
│   ├── 259351.jpg
│   ├── 259354.jpg
│   ├── 259355.jpg
│   ├── 259356.jpg
│   └── 259357.jpg
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── .gitignore
├── .env.example
└── README.md
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add the five brand image assets into the `public/` folder using these exact names:
- `259355.jpg` — Horizontal Logo
- `259351.jpg` — Detailed Crest
- `259354.jpg` — Pinecone / City Mark
- `259356.jpg` — Circular Logo
- `259357.jpg` — Official Trust Seal

3. Start the dev server:

```bash
npm run dev
```

## Production notes

- Replace placeholder links like `/client-portal`, `/privacy-policy`, `/terms-of-service`, and `/fiduciary-disclaimer` with live routes.
- Connect the contact form to your actual backend, CRM, or serverless handler.
- Replace placeholder social links with real accounts.
- Review service language for legal, credit, and fiduciary compliance before launch.

## Suggested next directories if the site grows

```text
src/
├── components/
├── content/
├── config/
├── hooks/
├── lib/
└── pages/
```

Recommended future split:
- `components/` for reusable UI blocks.
- `content/` for service copy, nav items, and footer data.
- `config/` for route and contact constants.
- `hooks/` for menu and scroll behavior.
- `lib/` for form submission helpers or analytics wrappers.
- `pages/` if you later move beyond a single landing page.
