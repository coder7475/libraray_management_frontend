## 📚 Library Management Frontend [![Version](https://img.shields.io/badge/version-v1.1.0-blue)](https://github.com/coder7475/library_management_frontend/releases/tag/v1.1.0)

A modern library management frontend built with **React**, **TypeScript**, **Vite**, **Redux Toolkit**, **RTK Query**, **Tailwind CSS**, and **Shadcn UI**.
Includes CRUD, borrow flow, genre filter, pagination, modals, type-safe forms, and is ready to deploy.

---

> **Looking for the backend?**
> 👉 [github.com/coder7475/library_management_apis](https://github.com/coder7475/library_management_apis)

---

## ✨ Features

### 📄 **Pages (explicit routes):**

| Route             | Purpose                                                                       |
| ----------------- | ----------------------------------------------------------------------------- |
| `/books`          | List & manage all books: view, edit, delete, borrow, filter, sort, pagination |
| `/create-book`    | Add a new book                                                                |
| `/books/:id`      | Detailed view of a single book                                                |
| `/edit-book/:id`  | Edit existing book                                                            |
| `/borrow/:bookId` | Borrow a book                                                                 |
| `/borrow-summary` | Aggregated summary of borrowed books                                          |
| `/about`          | About the library or app                                                      |
| `/contact`        | Contact or support                                                            |
| `/terms`          | Terms & conditions                                                            |

✅ **Total pages:** **9+**

---

### 🧩 **Components & UI features:**

- **Navbar** – navigation links
- **Footer** – site info / credits
- **Book Table & Grid views** with:

  - Title, Author, Genre, ISBN, Copies, Availability, Actions
  - Actions: Edit, Delete, Borrow

- **Genre selector** – 3×3 grid with icons
- **Filter & Sort controls** – by genre, title, author, etc.
- **Pagination & limit selector** – change page and items per page
- **Forms:**

  - Add Book
  - Edit Book
  - Borrow Book

- **Modals:**

  - Edit book
  - Confirm delete
  - Borrow book

- **Borrow summary table** – total quantity borrowed per book
- **Toasts** for success & error
- **Responsive design** for all devices
- **Optimistic updates** and type-safe forms

---

### ⚙ **Business logic & behaviors:**

- Filter books by genre from genre selector grid
- Sort books by title, author, etc.
- Pagination: change page & limit
- Cannot borrow more copies than available
- After adding, editing, or deleting a book: list auto-refreshes
- Borrow redirects to summary page

---

## 🛠 **Tech Stack**

- React + TypeScript + Vite
- Redux Toolkit & RTK Query
- Tailwind CSS & Shadcn UI
- React Router DOM
- React Hook Form + Zod (validation)
- ESLint & Prettier
- Optional: Cloudflare Pages / Workers

---

## 🚀 **Getting Started**

1. **Clone the repo:**

```bash
git clone git@github.com:coder7475/libraray_management_frontend.git
cd libraray_management_frontend
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Start development server:**

```bash
pnpm run dev
```

The app will run by default at: [http://localhost:5173](http://localhost:5173)

---

## 🧰 **Useful Commands**

| Command            | Purpose                                    |
| ------------------ | ------------------------------------------ |
| `pnpm run build`   | Build for production                       |
| `pnpm run preview` | Preview built app locally                  |
| `pnpm run lint`    | Run ESLint checks                          |
| `pnpm run deploy`  | Deploy to Cloudflare Pages (if configured) |

---

## 📦 **Folder Structure**

```
.
├── src
│   ├── components        # Reusable UI & feature components
│   ├── pages             # Pages for routes
│   ├── global            # Redux slices, store
│   ├── services          # RTK Query APIs
│   ├── hooks             # Custom hooks
│   ├── validators        # Zod schemas
│   ├── router            # React Router config
│   ├── lib               # Utilities
│   └── providers         # App context & providers
├── worker                # (Optional) Cloudflare Worker
├── public                # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ✅ **Before you start**

Make sure you have [pnpm](https://pnpm.io/) installed globally:

```bash
npm install -g pnpm
```

---

## 📢 **Contributions & Feedback**

Feel free to open issues or pull requests!
Let's make this library app even better. 🌱
