# Finance Tracker Dashboard 🚀

A modern, highly responsive, and feature-rich Finance Tracking Dashboard built with **Next.js (App Router)**, **Tailwind CSS**, and **Recharts**. This project was architected as an internship assignment to demonstrate proficiency in React component architecture, responsive UI design, data visualization, and client-side state management.

## ✨ Key Features

- **Responsive Mobile-First UI**: Seamless layout adaptation from Desktop to Mobile using deep Tailwind CSS utility configurations (`xl:`, `lg:`, `md:`, `sm:` breakpoints).
- **Data Visualization Strategy**: Complex Recharts configurations including responsive Line Charts and nested Donut Charts, handled cleanly across Next.js Server-Side Rendering (SSR) boundaries.
- **State Persistence**: Transactions automatically save and sync with browser `localStorage`, persisting user data between reloads.
- **Role-based Access Simulation**: Toggleable "Viewer" and "Admin" configurations determining whether CRUD interaction actions (Edit/Delete) are accessible.
- **Transaction Export Capability**: Out-of-the-box functionality to dynamically export filtered transaction lists directly into structured `.json` files.

---

## 🏗️ Project Architecture & Components Breakdown

This project enforces a highly modular architectural pattern, treating UI components, routing pages, and client-side states as strictly separated concerns.

### 1. `src/app/page.js` (The Main Dashboard)
The core entry point of the app, acting as the primary layout coordinator.
- Extensively utilizes Tailwind grid/flexbox properties to align the sidebar, navigation, and core widget clusters.
- Automatically adjusts components intelligently: collapsing sidebars on small screens, converting the 3 vital metric cards into stacked rows, and migrating charts underneath lists to prevent layout overflow.

### 2. `src/app/transactions/page.js` (The Operations Hub)
A dedicated, persistent ledger page responsible for viewing and actively manipulating monetary events.
- **State Logic**: Leverages `useEffect` to hydrate the React state tree with cached `localStorage` strings, preventing complete data loss on page refresh.
- **Dynamic Filtering**: Implements a highly functional local search text query and category/status multiplex filtering system that actively subsets the UI table render.
- **Admin Modal Workflow**: An integrated pop-out modal (toggled via React State) designed for controlled input schemas (saving names, amounts, debits/credits) directly back into the cached memory array.

### 3. Reusable UI Components (`src/app/components/`)
The visual DNA of the application is stripped out into strictly scoped modular `.jsx`/`.js` blocks.

- **`navbar.js`**: Adaptive spatial header determining contextual UI data such as dynamic greetings (*"Good Morning, Ansh"*) by parsing JavaScript `Date()` APIs based on the local client clock.
- **`card.js`**: An abstracted statistic card designed as a scalable prop engine. It digests `title`, `amount`, and `type` flags to conditionally color-code percentage changes (e.g., Emerald for Income, Rose for Expense) while handling its inner SVG icons smoothly.
- **`transactions.jsx`**: The minimized "Recent Activity" widget version of the ledger, decoupled from the main operational ledger to serve strictly as a preview module for the main dashboard display without logic collisions.

### 4. Data Visualization (`donut.jsx` & `line.jsx`)
Sophisticated charts structured to integrate beautifully within strict, modern dark-themed containers.
- **`line.jsx`**: Tracks and visually correlates multiple data lines (Income vs. Expense) over monthly segments with custom UI tooltips mirroring the app's aesthetic structure.
- **`donut.jsx`**: Leverages Dual-Pie configuration (Inner + Outer radius arrays) to visualize parent categories vs. nested sub-categories. 
- **SSR Hydration Failsafes**: Native `Recharts` + `Next.js` integration tends to warn or visually break container computations (`width: -1`) during Static Server Generation phase. Both chart files implement a strict `use client` + `useEffect` mounting boundary, enforcing zero-paint outputs on the server and triggering robust auto-resizing canvas injections moments after hitting the browser DOM.

---

## 💻 Tech Stack
- **Framework**: `Next.js 16` (App Router)
- **Styling**: `Tailwind CSS`
- **Charting Engine**: `Recharts`
- **Iconography**: `lucide-react`
- **Build Engine**: `Turbopack`

## 🛠️ How to Setup & Run

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Start the Development Server**
   ```bash
   npm run dev
   ```
3. **Compile for Production** *(Zero Recharts width rendering warnings guaranteed!)*
   ```bash
   npm run build
   npm start
   ```