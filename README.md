<div align="center">

# ✨ Cleanar — Modern Cleaning Services & Commercial Solutions
### Built with **Astro 5**, **ClientRouter (View Transitions)**, **GSAP**, & **Vanilla Sass**

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![GSAP](https://img.shields.io/badge/GSAP-3.x-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<p align="center">
  A production-ready, ultra-fast multi-page cleaning services web application with smooth SPA view transitions, rich interactive micro-animations, and modular component architecture.
</p>

[View Live Demo](#) • [Explore Pages](#-pages--features) • [Installation](#-getting-started)

</div>

---

## 🌟 Overview

**Cleanar** is a comprehensive, high-performance web platform designed for commercial cleaning, residential housekeeping, sanitization, and maintenance companies. 

Originally structured as a multi-page static HTML template, this project represents a complete **modern architecture migration to Astro 5**, delivering:
- ⚡ **Zero-runtime JavaScript overhead** where static content suffices.
- 🔄 **Astro ClientRouter View Transitions** providing seamless, app-like SPA page changes without full browser reloads.
- 🎨 **Cinematic Entry & Micro-Animations** via GSAP (SplitText, ScrollTrigger) and WOW.js synchronized with a custom preloader transition curtain.
- 🧩 **Componentized Design System** with reusable Astro layouts, headers, footers, breadcrumb banners, and UI elements.

---

## 🚀 Key Technical Highlights

### 1. Synchronized Route Transition System
Engineered a custom page transition lifecycle utilizing Astro's `<ClientRouter />` events (`astro:before-preparation`, `astro:after-swap`, `astro:page-load`):
- **Immediate Preloader Curtain**: Displays an animated brand overlay on link click to mask document fetch latency.
- **Scroll Restoration**: Automatically resets scroll position to `(0, 0)` during DOM swapping.
- **Animation Re-orchestration**: Smoothly fades out the overlay while triggering WOW.js viewport entry animations and GSAP text reveals fresh on every route change.

### 2. Rich Interactive UI & Micro-Interactions
- **GSAP SplitText & Opacity Scrub**: Text line splits, character staggering, and scroll-driven opacity reveals.
- **Magnetic Buttons & Cursor Parallax**: Spring-physics hover effects and custom trailing cursor tracking.
- **Multi-Slider Integrations**: Responsive carousels powered by Swiper (Hero with parallax depth), Slick Slider (Services & Products), and Owl Carousel (Testimonials).
- **Interactive Modals & Popups**: Magnific Popup image galleries and Fancybox video lightboxes.

### 3. Comprehensive Multi-Page Experience (25+ Pages)
- **3 Home Page Layout Variations**: Tailored for residential cleaning, commercial janitorial, and disinfection services.
- **Service & Project Showcases**: Filterable Isotope gallery with categorized case studies and detailed service breakdowns.
- **E-Commerce & Booking Flows**: Shop catalog, product detail pages, mini-cart slide-out, shopping cart, and multi-step appointment forms.
- **Full Blogging Platform**: Grid, list, left-sidebar, right-sidebar, and fullwidth layouts.

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [Astro 5](https://astro.build) (Static Site Generation + Islands Architecture) |
| **Routing** | Astro `astro:transitions` (`ClientRouter`) |
| **Animation Engine** | [GSAP 3](https://greensock.com/) (ScrollTrigger, SplitText, TextPlugin), [WOW.js](https://wowjs.uk/) & Animate.css |
| **UI & Styling** | SCSS / Vanilla CSS3, [Bootstrap 5](https://getbootstrap.com/) |
| **Carousels & Media** | Swiper, Slick Slider, Owl Carousel, Fancybox, Magnific Popup, Isotope |
| **Icons & Typography** | Themify Icons, Flaticons, Google Fonts (*Nunito*, *Parkinsans*) |

---

## 📂 Project Structure

```text
cleanar-astro/
├── public/
│   └── assets/
│       ├── css/        # Bootstrap, animate.css, swiper, slick, owl, fancybox
│       ├── fonts/      # Themify, Flaticons, Slick font files
│       ├── images/     # Optimized SVG vectors, illustrations, and photography
│       ├── js/         # jQuery runtime, GSAP, plugin bundle, and custom scripts
│       └── sass/       # Master Sass / CSS stylesheets
├── src/
│   ├── components/
│   │   ├── Header.astro     # Configurable navigation, topbar, search modal & mini-cart
│   │   ├── Footer.astro     # Modular footer with newsletter and links
│   │   ├── PageTitle.astro  # Dynamic breadcrumb banner
│   │   ├── Preloader.astro  # Animated loading curtain
│   │   └── BackToTop.astro  # Floating scroll-to-top button
│   ├── layouts/
│   │   └── BaseLayout.astro # Master HTML wrapper with SEO tags, styles & transition hooks
│   └── pages/
│       ├── index.astro                 # Home Style 1 (Classic)
│       ├── index-2.astro               # Home Style 2 (Commercial)
│       ├── index-3.astro               # Home Style 3 (Modern)
│       ├── about.astro                 # Company About Page
│       ├── appoinment.astro            # Service Booking & Estimation Form
│       ├── service.astro               # Services Catalog
│       ├── service-single.astro        # Detailed Service Breakdown
│       ├── project.astro               # Portfolio Grid (Isotope Filterable)
│       ├── project-single.astro        # Project Case Study
│       ├── team.astro                  # Team Members Grid
│       ├── team-single.astro           # Staff Profile & Qualifications
│       ├── shop.astro                  # Cleaning Supplies E-Commerce Catalog
│       ├── shop-single.astro           # Product Details with Gallery
│       ├── cart.astro                  # Shopping Cart
│       ├── checkout.astro              # Checkout & Payment Select
│       ├── blog.astro                  # Blog with Right Sidebar
│       ├── blog-left-sidebar.astro     # Blog with Left Sidebar
│       ├── blog-fullwidth.astro        # Blog Fullwidth Grid
│       ├── blog-single.astro           # Article Detail (Sidebar)
│       ├── contact.astro               # Contact Us & Google Maps
│       └── 404.astro                   # Custom 404 Error Screen
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: `v18.17.1` or higher
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dancodea/cleanar-astro.git
   cd cleanar-astro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser.

4. **Create a production build:**
   ```bash
   npm run build
   ```

5. **Preview the production bundle:**
   ```bash
   npm run preview
   ```

---

## 🎯 Architecture & Performance Insights

- **Static HTML Output**: All 25 pages are pre-rendered as pure HTML files at build time for instant TTFB (Time to First Byte) and high SEO ranking.
- **Client-Side Hydration**: Dynamic scripts (Swiper, GSAP, WOW.js) are scoped and re-initialized idempotently via Astro's `astro:page-load` lifecycle to prevent memory leaks and zombie event listeners.
- **Accessible & Responsive**: Fully adaptable from mobile viewports (320px) up to ultra-wide displays (2560px+) with off-canvas navigation and touch-friendly controls.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <sub>Crafted with passion for high-performance web experiences.</sub>
</div>
