# Kaarigari Production

Official website for **Kaarigari Production** — a cinematic video production studio specializing in brand films, documentaries, social content, and high-end visual storytelling.

**Live site:** *(add your deployment URL)*

---

## Overview

A modern, animation-rich marketing site built to showcase Kaarigari’s portfolio, philosophy, equipment, and inquiry flow. The site emphasizes cinematic presentation with smooth scrolling, , page transitions, and embedded video playback across works and gallery sections.

### Pages

| Route       | Description                                      |
|-------------|--------------------------------------------------|
| `/`         | Home — hero, featured works, philosophy, process |
| `/about`    | Studio story and team                            |
| `/works`    | Full portfolio with category filters & video modal |
| `/gallery`  | Photo gallery (Google Drive via Apps Script)     |
| `/contact`  | Inquiry form + contact details                   |

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** — dev server & production build
- **Tailwind CSS 4** — styling
- **Motion** — page transitions & scroll animations
- **Lenis** — smooth scrolling
- **React Router 7** — client-side routing
- **Formspree** — contact form submissions
- **Vercel** — deployment (SPA rewrites in `vercel.json`)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- npm

Optional (for video sync scripts):
- Python 3
- `ffmpeg`
- `curl`

### Installation

```bash
npm install