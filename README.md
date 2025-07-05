# 📚 Library Management Frontend [![Version](https://img.shields.io/badge/version-v1.0.0-blue)](https://github.com/coder7475/libraray_management_frontend/releases/tag/v1.0.0)

A modern library management app built with React, TypeScript, Vite, Redux Toolkit, RTK Query, Tailwind CSS, and Shadcn UI.  
Includes CRUD for books, borrowing flow, modals, clean UI, type-safe forms, and ready-to-deploy Cloudflare integration.

---

> **Looking for the backend?**  
> The API server for this project is available at:  
> [github.com/coder7475/library_management_apis](https://github.com/coder7475/library_management_apis)

---

## ✨ Features

### 📄 **Number of pages (explicit routes):**

| Route             | Purpose                                                         |
| ----------------- | --------------------------------------------------------------- |
| `/books`          | View list of all books with actions: view, edit, delete, borrow |
| `/create-book`    | Form to add a new book                                          |
| `/books/:id`      | View details of a single book                                   |
| `/edit-book/:id`  | Edit form for existing book                                     |
| `/borrow/:bookId` | Form to borrow selected book                                    |
| `/borrow-summary` | Aggregated summary of borrowed books                            |
| `/about`          | About Us page with information about the library/app            |
| `/contact`        | Contact Us page for user inquiries or support                   |
| `/terms`          | Terms & Conditions page outlining usage policies                |

✅ **Total pages:** **9 main pages**

---

### 🧩 **Components & UI features:**

- **Navbar** – links to All Books, Add Book, Borrow Summary
- **Footer** – site info / credits
- **Book List Table / Grid**
  - Shows Title, Author, Genre, ISBN, Copies, Availability, Actions
  - Actions: Edit, Delete, Borrow
- **Forms:**
  - Add Book form (title, author, genre, ISBN, description, copies, availability)
  - Edit Book form (pre-filled)
  - Borrow Book form (quantity, due date)
- **Dialogs / Modals:**
  - Confirm delete
  - Edit book
  - Borrow book
- **Borrow Summary Table:**
  - Book title, ISBN, total quantity borrowed
- **Toast Notifications**
- **Responsive design** for desktop, tablet, and mobile
- **Optimistic UI updates** (bonus)
- **Type-safe forms** using React Hook Form + Zod
- **Clean minimalist UI** built with Tailwind CSS & Shadcn UI

---

### ⚙ **Business logic & behaviors:**

- **Edit / Borrow:**
  - Quantity cannot exceed available copies
  - Copies ≤ 0 → mark book unavailable in UI
- **After create / update / delete:**
  - Redirect appropriately & refresh list
- **Borrow Book flow:**
  - On borrow → redirect to `/borrow-summary`
- **Borrow summary:**
  - Uses aggregation API to show total quantity borrowed per book

---

## 🛠 **Tech Stack**

- React + TypeScript
- Vite
- Redux Toolkit + RTK Query
- Tailwind CSS
- Shadcn UI
- ESLint & Prettier
- Cloudflare Pages / Workers (optional)

---

## 🚀 **Getting Started**

1. **Clone the repository:**

   ```bash
   git clone git@github.com:coder7475/libraray_management_frontend.git
   cd libraray_management_frontend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

### 🛠️ **Other Useful Commands**

- **Build for production:**

  ```bash
  pnpm run build
  ```

- **Preview the production build:**

  ```bash
  pnpm run preview
  ```

- **Run linter:**

  ```bash
  pnpm run lint
  ```

- **Deploy to Cloudflare Pages:**
  ```bash
  pnpm run deploy
  ```

---

## 📦 **Folder Structure**

```
.
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   ├── components
│   ├── global
│   ├── hooks
│   ├── index.css
│   ├── lib
│   ├── main.tsx
│   ├── pages
│   ├── providers
│   ├── router
│   ├── services
│   ├── validators
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.worker.json
├── vite.config.ts
├── worker
│   └── index.ts
├── worker-configuration.d.ts
└── wrangler.jsonc
```

**Note:**  
Make sure you have [pnpm](https://pnpm.io/) installed globally. If not, install it with:

---
