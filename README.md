# 🎬 MovieVault

A movie tracking application built with React, TypeScript, and Tailwind CSS. Organize your movie collection with custom watchlists, ratings, and genre filtering.

![MovieVault Preview](https://img.shields.io/badge/React-18.3-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss)

## ✨ Features

- **Movie Management** - Add, edit, and delete movies with title, genre, rating, and optional poster images
- **Watch Status Tracking** - Mark movies as watched/unwatched
- **Custom Watchlists** - Create collections like "Favorites", "Must Watch", or "Classics"
- **Smart Filtering** - Filter by watched status, top-rated (7+), or by genre
- **Genre-Based Organization** - View watched movies organized by genre
- **Persistent Storage** - All data saved to localStorage
- **Netflix-Inspired UI** - Dark theme with smooth animations and hover effects

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **State Management**: React Hooks + localStorage
- **Routing**: React Router DOM

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **bun**
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

### Recommended VS Code Extensions

- ESLint
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Prettier - Code formatter

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install dependencies

Using npm:
```bash
npm install
```

Or using bun:
```bash
bun install
```

### 3. Start the development server

Using npm:
```bash
npm run dev
```

Or using bun:
```bash
bun run dev
```

### 4. Open in browser

The app will be running at: **http://localhost:8080**

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── AddMovieForm.tsx # Form to add new movies
│   ├── EditMovieDialog.tsx # Dialog to edit movies
│   ├── GenreFilter.tsx  # Genre-based filtering
│   ├── Header.tsx       # App header with logo
│   ├── MovieCard.tsx    # Individual movie card
│   ├── MovieGrid.tsx    # Grid layout for movies
│   ├── SearchAndFilter.tsx # Search and filter controls
│   ├── StatsBar.tsx     # Movie statistics
│   ├── WatchlistDropdown.tsx # Add to watchlist dropdown
│   ├── WatchlistManager.tsx # Create/delete watchlists
│   └── WatchlistSection.tsx # Display watchlist movies
├── hooks/
│   ├── useMovies.ts     # Movie state management
│   └── useWatchlists.ts # Watchlist state management
├── types/
│   ├── movie.ts         # Movie type definitions
│   └── watchlist.ts     # Watchlist type definitions
├── pages/
│   ├── Index.tsx        # Main page
│   └── NotFound.tsx     # 404 page
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # App routes
├── main.tsx             # Entry point
└── index.css            # Global styles & design tokens
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Features Guide

### Adding a Movie
1. Fill in the movie title, select genre, and set rating (1-10)
2. Optionally upload a poster image (max 2MB)
3. Toggle watched status
4. Click "Add Movie"

### Creating Watchlists
1. Click "Manage Lists" button
2. Enter a watchlist name and click "Add"
3. Use the bookmark icon on movie cards to add movies to watchlists

### Filtering Movies
- Use the filter buttons to show: All, Watched, Unwatched, or Rating 7+
- Use the genre filter section to view watched movies by genre

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
