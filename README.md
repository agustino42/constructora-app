# Constructora App

[![GitHub stars](https://img.shields.io/github/stars/agustino42/constructora-app?style=flat-square)](https://github.com/agustino42/constructora-app/stargazers)
[![License](https://img.shields.io/github/license/agustino42/constructora-app?style=flat-square)](https://github.com/agustino42/constructora-app/blob/master/LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13.5-blue?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-black?style=flat-square&logo=prisma)](https://www.prisma.io/)

---

## 📖 Overview

**Constructora App** is a modern, full‑stack web application built with **Next.js** (app router) and **Prisma** for database interactions. It delivers a clean, responsive UI for catalog browsing, product management, and admin features such as settings, reports, and quotation handling.

The project showcases:
- Server‑side rendering with Next.js 13 (app directory).
- Type‑safe database access via Prisma and a SQLite development DB.
- Component‑driven UI with Tailwind CSS utility classes.
- A lightweight settings system powered by a JSON‑based config.

> *The design focuses on a premium look‑and‑feel: gradient hero, glass‑morphism cards, and smooth animations.*

---

## 🛠️ Tech Stack

| Category | Technology |
| -------- | ---------- |
| **Framework** | **Next.js 13** (app router) |
| **Language** | **TypeScript** |
| **Styling** | **Tailwind CSS** (utility‑first) |
| **Database** | **Prisma ORM** – SQLite (dev) |
| **UI Components** | Custom React components (e.g., `CatalogClient`, `ProductCard`, `AdminShell`) |
| **Version Control** | Git + GitHub |
| **Package Manager** | npm |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18 (LTS) 
- **npm** (comes with Node) 
- **Git**

### Installation
```bash
# Clone the repository
git clone https://github.com/agustino42/constructora-app.git
cd constructora-app

# Install dependencies
npm install

# Generate the SQLite dev database and seed data
npx prisma migrate dev --name init
npm run seed   # (if a seed script is defined)
```

### Development
```bash
npm run dev   # Starts the dev server at http://localhost:3000
```

### Production Build
```bash
npm run build   # Generate an optimized static & server‑rendered bundle
npm start       # Run the production server
```

---

## 📂 Project Structure (high‑level)
```
├─ prisma/                 # Prisma schema & seed scripts
│   └─ schema.prisma
├─ public/                 # Static assets (images, uploads)
├─ src/
│   ├─ app/                # Next.js routes (pages)
│   │   ├─ admin/          # Admin UI (settings, reports, ajustes)
│   │   ├─ catalogo/       # Product catalog page
│   │   ├─ cotizacion/      # Quotation flow
│   │   └─ layout.tsx       # Root layout (global CSS, fonts)
│   ├─ components/        # Reusable React components
│   ├─ lib/                # Helper utilities (e.g., settings loader)
│   └─ styles/ (globals.css)
└─ package.json            # Scripts & dependencies
```

---

## 🌱 Future Enhancements

1. **Authentication & Authorization** – Integrate NextAuth.js or a custom JWT solution for secure admin access.
2. **Unit & Integration Tests** – Add Jest + React Testing Library coverage for critical components.
3. **CI/CD Pipeline** – GitHub Actions workflow for automated linting, testing, and deployment to Vercel.
4. **Database Migration to PostgreSQL** – Move to a production‑grade DB for scaling.
5. **Internationalization (i18n)** – Support multiple languages using `next-intl`.
6. **Enhanced Admin Dashboard** – Charts (Recharts) for sales/report analytics.
7. **Image Optimization** – Leverage Next.js Image component and Cloudinary for storage.
8. **Dark Mode & Theming** – Add UI toggle with CSS variables.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes with clear messages.
4. Open a Pull Request describing the changes.

Make sure to run linting and formatting before submitting:
```bash
npm run lint
npm run format
```

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](https://github.com/agustino42/constructora-app/blob/master/LICENSE) file for details.

---

*Built with ❤️ by the Constructora team.*
