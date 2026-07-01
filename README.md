# 🛍️ NovaShop — Full-Stack E-Commerce

A production-grade e-commerce application with Next.js frontend, Express/MySQL backend, Docker Compose, and Jenkins CI/CD.

## Tech Stack
- **Frontend**: Next.js 13, React 18, CSS-in-JS (styled-jsx)
- **Backend**: Node.js + Express, MySQL 8
- **Infrastructure**: Docker Compose, Jenkins, Helm/K8s charts

## Quick Start
```bash
cp .env.example .env
docker compose -p novashop up --build -d
```
Visit http://localhost:3000

## Features
- 28 seeded products across 7 categories
- Live search, category filter, sort
- Add to cart, quantity controls
- Product detail pages
- Responsive across all screen sizes

## API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Health check |
| GET | /products | List all (supports ?search=&category=&sort=) |
| GET | /products/:id | Single product |
| GET | /categories | Distinct categories |
