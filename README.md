# CommerceX

A curated lifestyle e-commerce demo — portfolio project showcasing frontend and product-thinking skills.

**Live Demo:** [commercex.vercel.app](https://commercex.vercel.app)

## About

CommerceX looks and behaves like a real shopping site, but everything runs on mock data. No real payments, no real user accounts, no backend — just a polished, deployable storefront and admin dashboard.

**Design direction:** Modern Artisanal — warm neutrals, terracotta accent, Inter typeface. Inspired by brands like Aesop and Kinfolk.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | React 19 + TypeScript + Vite 8 |
| Styling | Tailwind CSS v4 with custom design tokens |
| State | Zustand (persisted to localStorage) |
| Routing | React Router 7 |
| Charts | Recharts |
| Data | Static TypeScript files with mock products |

## Features

### Storefront
- **Home page** — hero, category cards, featured products, philosophy section, newsletter
- **Product listing** — grid layout, category filter, search, sort (price, newest, popularity), pagination
- **Product detail** — image gallery, variant selector (size/color), reviews section, add to cart with toast feedback

### Cart & Checkout
- **Cart** — add/remove/update quantity, order summary, free shipping threshold
- **Checkout** — shipping address form, fake payment fields, client-side validation, card number formatting
- **Order confirmation** — generated fake order ID, order summary
- **Order history** — past orders with status badges

### Auth (Fake)
- **Login/Signup** — any email/password works, stored in localStorage
- **Account page** — editable profile, quick links

### Admin Dashboard
- **Dashboard** — revenue & orders charts (Recharts), top products table, stat cards
- **Product management** — list, add, edit, delete (in-memory/session)
- **Orders list** — table with status badges, mock historical data

### Polish
- Responsive across mobile, tablet, desktop
- Loading skeletons, empty states, toast notifications
- Smooth animations (fade-in, slide-up)
- Custom favicon, page titles, selection color

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build & Deploy

```bash
pnpm build
pnpm preview
```

Deploy the `dist/` folder to Vercel, Netlify, or GitHub Pages.

## Project Structure

```
src/
├── admin/          # Admin dashboard pages
├── components/     # Shared UI (Navbar, Footer, ProductCard, Skeletons, Toast)
├── data/           # Mock products, categories, types
├── lib/            # API helpers, formatters
├── pages/          # Storefront pages
└── store/          # Zustand stores (cart, auth)
```

## License

This is a demo/portfolio project. Not licensed for commercial use.
