# TaskFlow — Frontend

A sleek, real-time task collaboration frontend built with React + Vite, Tailwind CSS (v3), and shadcn-style Radix UI components.

**Theme**: Black / White / Purple — refined dark luxury aesthetic.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | Core framework + build tooling |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling (no config required for base) |
| Radix UI | Headless accessible components (shadcn-style) |
| Zustand | Lightweight state management |
| Axios | HTTP client with JWT interceptors |
| Socket.io Client | Real-time WebSocket events |
| @hello-pangea/dnd | Drag-and-drop board columns |
| react-hot-toast | Toast notifications |
| Lucide React | Icon library |

---

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn-style UI primitives
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── card.jsx
│   │   ├── dialog.jsx
│   │   ├── dropdown-menu.jsx
│   │   ├── select.jsx
│   │   ├── accordion.jsx
│   │   └── index.jsx    # Badge, Avatar, Separator, Textarea
│   ├── layout/
│   │   └── ProtectedRoute.jsx
│   ├── landing/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── FAQ.jsx
│   │   └── CTAFooter.jsx
│   └── board/
│       ├── ListColumn.jsx
│       ├── TaskCard.jsx
│       ├── TaskModal.jsx
│       └── ActivityPanel.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   └── BoardPage.jsx
├── store/
│   ├── authStore.js     # Zustand auth state
│   └── boardStore.js    # Zustand board/task state
├── services/
│   ├── api.js           # Axios instance + all API methods
│   └── socket.js        # Socket.io connection manager
├── lib/
│   └── utils.js         # cn(), formatters, helpers
├── App.jsx              # Router + toast config
├── main.jsx             # Entry point
└── index.css            # Tailwind + CSS vars + custom classes
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and point to your backend:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 3. Add your hero background image
Open `src/components/landing/Hero.jsx` and find the **BACKGROUND IMAGE SLOT** comment.
Replace the placeholder div with your image:
```jsx
// Option A: img tag
<img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" />

// Option B: CSS background
<div
  className="w-full h-full"
  style={{ backgroundImage: 'url(/hero-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
/>
```
Place your image in the `public/` folder.

### 4. Start dev server
```bash
npm run dev
```
App runs at `http://localhost:3000`

---

## Features

- **Landing page** — Hero with blur backdrop, Features, How it Works, FAQ (accordion), CTA, Footer
- **Auth** — Login + Register with validation, JWT stored in localStorage
- **Dashboard** — Board grid, create board modal, user dropdown
- **Board view** — Multi-column kanban with drag-and-drop (cross-column + reorder)
- **Tasks** — Create / edit / delete with status + assignee
- **Real-time** — Socket.io events: taskCreated, taskUpdated, taskMoved, taskDeleted
- **Activity panel** — Slide-in sidebar showing board activity log
- **Search** — Filter tasks by title in board header
- **Responsive** — Works on mobile, tablet, and desktop

---

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Landing page |
| `/login` | Public only | Sign in |
| `/register` | Public only | Create account |
| `/dashboard` | Protected | Board listing |
| `/board/:boardId` | Protected | Kanban board |

---

## Customization

### Colors
All colors are CSS variables in `src/index.css`. Change `--primary` to adjust the purple accent.

### Fonts
Uses **Syne** (display/headings) + **DM Sans** (body). Change in `index.html` and `tailwind.config.js`.

### API URL
If your backend runs on a different port, update `VITE_API_URL` in `.env`.
The Vite proxy in `vite.config.js` also forwards `/api` to `localhost:5000` for dev.
