# Finance Track — Personal Finance Manager

> A client-side personal finance tracker where you can log income and expenses, filter and search your transaction history, and view a running balance — all saved locally in your browser with no backend required.

🔗 **Live Demo:** https://HassanTaiwo185.github.io/Finance-track-capstone/

---

## What it does

Finance Track gives you a clear picture of where your money is going. You add income and expense transactions, tag them with a category and date, and the app maintains a live balance. Everything is filterable and searchable — so finding "all food expenses in March" takes seconds.

Built as a capstone project for a client-side scripting course, the goal was to demonstrate a complete single-page application without a backend: full CRUD, routing, shared state management, and persistent storage — all running entirely in the browser.

---

## Features

- **Add transactions** — title, amount (CAD), type (income / expense), category, date, optional note, optional tax amount
- **Transaction list** — view all transactions with live search by title
- **Filter and sort** — filter by category (Food, Rent, Salary, etc.) or type (Income / Expense), sort by date or amount
- **Detail view** — click any transaction to see its full details
- **Edit and delete** — update or remove any transaction
- **Persistent storage** — all data is saved to `localStorage` so nothing is lost on page refresh
- **404 handling** — unknown routes show a not-found page

---

## Tech stack

| | Technology |
|---|---|
| Framework | React 19 (functional components + hooks) |
| Routing | React Router v6 with HashRouter |
| State management | Context API + custom hooks |
| Persistence | localStorage |
| Styling | Bootstrap 5 |
| Build tool | Vite |
| Deployment | GitHub Pages |

---

## Why these choices

**HashRouter over BrowserRouter** — GitHub Pages serves static files and doesn't support server-side URL rewriting. HashRouter uses the URL hash (`/#/list`) so deep links and refreshes work correctly without a server.

**Context API over Redux** — the app state is a single list of transactions shared across a small number of routes. Context with a custom hook keeps the code readable without the boilerplate overhead of a full state management library.

**localStorage** — a backend would be overkill for a personal finance tool used by one person. Keeping data in the browser means zero infrastructure, instant reads and writes, and a fully offline-capable app.

---

## Routes

| Route | What you see |
|---|---|
| `/` | Home / landing page |
| `/list` | All transactions with search, filter, and sort |
| `/item/:id` | Full detail view of a single transaction |
| `/new` | Form to add a new transaction |
| `/edit/:id` | Form to edit an existing transaction |
| `/*` | 404 not found |

---

## Data model

Each transaction stored in localStorage contains:

```js
{
  id: "auto-generated unique id",
  title: "Groceries",
  type: "expense",          // "income" | "expense"
  amount: 84.50,            // in CAD
  tax: 10.99,               // optional, in CAD
  category: "Food",
  date: "2026-03-15",
  note: "Weekly shop"       // optional
}
```

Storage key: `finance_transactions`

---

## Local setup

```bash
git clone https://github.com/HassanTaiwo185/Finance-track-capstone.git
cd Finance-track-capstone
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## What I would add next

- Summary dashboard with income vs expense chart (Chart.js or Recharts)
- Monthly breakdown view
- CSV export
- Budget limits per category with over-budget warnings
- Cloud sync with a backend so data is not tied to one browser
