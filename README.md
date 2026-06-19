# CommerceX

CommerceX is a production-ready full-stack e-commerce platform template built with **React + Vite + Tailwind CSS** and **Node.js + Express + Prisma + PostgreSQL**.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Redux Toolkit, Axios, Framer Motion
- Backend: Node.js, Express, Prisma ORM, PostgreSQL
- Auth: JWT Access + Refresh Tokens, RBAC (Customer/Admin)
- Security: Helmet, CORS, Rate Limiting, CSRF Double-Submit Cookie strategy, input validation (Zod)
- Integrations: Stripe (payments), Cloudinary (media)

## Project Structure

```text
CommerceX/
├── frontend/
│   ├── src/
│   │   ├── app/store.js
│   │   ├── components/
│   │   ├── features/ (auth, cart, theme)
│   │   ├── layouts/
│   │   ├── pages/ (home, shop, checkout, dashboard, admin)
│   │   └── services/apiClient.js
├── backend/
│   ├── prisma/schema.prisma
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── repositories/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── app.js
│       └── server.js
└── package.json (workspaces)
```

## Features Delivered

### Customer-facing
- Auth API endpoints: register, login, logout, refresh, forgot/reset password, email verification
- Home page with hero + merchandising sections (featured, trending, arrivals, flash-sale blocks)
- Product catalog and product detail UX shells
- Checkout flow shell (multi-step structure)
- User dashboard shell (profile, wishlist, orders, notifications)
- Redux Toolkit state slices for auth/cart/theme

### Admin
- Admin dashboard page with KPI cards and management modules
- Admin API route with role guard
- Product CRUD route scaffolding and protected admin mutations
- Coupon and order management route scaffolding

### Backend architecture
- MVC + service + repository layering
- Prisma data model for: users, products, categories, subcategories, orders, order items, reviews, coupons, addresses, payments, wishlist, notifications, refresh tokens, activity logs
- Stripe payment intent endpoint
- Cloudinary configuration module

## Database Schema

Prisma schema is located at:

- `/tmp/workspace/Jeremiah-Jefry/CommerceX/backend/prisma/schema.prisma`

Includes all required core entities and relationships for production e-commerce use cases.

## Environment Variables

Create `/tmp/workspace/Jeremiah-Jefry/CommerceX/backend/.env`:

```env
DATABASE_URL="******localhost:5432/commercex?schema=public"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
JWT_ACCESS_SECRET="replace-with-strong-secret"
JWT_REFRESH_SECRET="replace-with-strong-secret"
ACCESS_TOKEN_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"
STRIPE_SECRET_KEY="sk_test_..."
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

## API Documentation (v1)

Base URL: `http://localhost:5000/api/v1`

### Authentication
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/verify-email`

### Products
- `GET /products`
- `GET /products/:slug`
- `POST /products` (admin)
- `PATCH /products/:id` (admin)
- `DELETE /products/:id` (admin)

### Orders
- `POST /orders`
- `GET /orders/me`
- `GET /orders` (admin)
- `PATCH /orders/:id/status` (admin)

### Reviews
- `GET /reviews/product/:productId`
- `POST /reviews/product/:productId`

### Coupons
- `GET /coupons` (admin)
- `POST /coupons` (admin)
- `POST /coupons/validate`

### Payments
- `POST /payments/create-intent`

### Admin
- `GET /admin/dashboard`

## Setup

From repo root:

```bash
npm install
npm run prisma:generate --workspace backend
npm run dev:backend
npm run dev:frontend
```

## Build & Test

```bash
npm run build
npm run test
```

## Deployment Guide

### Frontend (Vercel/Netlify)
- Set `VITE_API_BASE_URL` to backend public URL
- Build command: `npm run build --workspace frontend`
- Output directory: `frontend/dist`

### Backend (Render/Railway/Fly.io)
- Build command: `npm install && npm run prisma:generate --workspace backend`
- Start command: `npm run start --workspace backend`
- Provision PostgreSQL and set `DATABASE_URL`
- Configure Stripe and Cloudinary secrets

## Notes

This codebase is structured to be extended with complete business workflows (inventory synchronization, invoices, analytics, emails, and real-time notifications) while keeping strict architectural boundaries and production security defaults.
