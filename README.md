# Cleanar - Cleaning Services Website (Astro Migration)

A 1:1 migration of the Cleanar Cleaning Services HTML/CSS/JS template into Astro with componentization, clean routing, and Astro ViewTransitions lifecycle support.

## Project Structure

```text
cleanar-astro/
├── public/
│   └── assets/
│       ├── css/        # Bootstrap, animate, themify, flaticon, swiper, slick, owl, fancybox, odometer
│       ├── fonts/      # Flaticon, themify-icons, slick
│       ├── images/     # All site image assets & svg vectors
│       ├── js/         # jQuery, Bootstrap bundle, modernizr, plugin collection, gsap-script, script
│       └── sass/       # style.css (master design stylesheet)
├── src/
│   ├── components/
│   │   ├── Header.astro     # Configurable header (topbar, mobile nav, search popup, mini-cart, CTA)
│   │   ├── Footer.astro     # Complete site footer with newsletter, links, and contact
│   │   ├── PageTitle.astro  # Breadcrumb banner component
│   │   ├── Preloader.astro  # Brand loading animation
│   │   └── BackToTop.astro  # Floating smooth scroll-to-top button
│   ├── layouts/
│   │   └── BaseLayout.astro # Base HTML shell with Google fonts, stylesheets, ClientRouter, scripts
│   └── pages/
│       ├── index.astro                 # Home Style 1 (/)
│       ├── index-2.astro               # Home Style 2 (/index-2)
│       ├── index-3.astro               # Home Style 3 (/index-3)
│       ├── about.astro                 # About Us (/about)
│       ├── appoinment.astro            # Appointment & Booking (/appoinment)
│       ├── appointment.astro           # Appointment alias (/appointment)
│       ├── service.astro               # Services Grid (/service)
│       ├── service-single.astro        # Service Details (/service-single)
│       ├── project.astro               # Portfolio / Projects (/project)
│       ├── project-single.astro        # Portfolio Single (/project-single)
│       ├── team.astro                  # Team Members (/team)
│       ├── team-single.astro           # Team Member Profile (/team-single)
│       ├── faq.astro                   # FAQs & Accordions (/faq)
│       ├── shop.astro                  # Shop Catalog (/shop)
│       ├── shop-single.astro           # Product Details (/shop-single)
│       ├── cart.astro                  # Shopping Cart (/cart)
│       ├── checkout.astro              # Checkout (/checkout)
│       ├── blog.astro                  # Blog Right Sidebar (/blog)
│       ├── blog-left-sidebar.astro     # Blog Left Sidebar (/blog-left-sidebar)
│       ├── blog-fullwidth.astro        # Blog Fullwidth (/blog-fullwidth)
│       ├── blog-single.astro           # Blog Post Right Sidebar (/blog-single)
│       ├── blog-single-left-sidebar.astro # Blog Post Left Sidebar (/blog-single-left-sidebar)
│       ├── blog-single-fullwidth.astro # Blog Post Fullwidth (/blog-single-fullwidth)
│       ├── contact.astro               # Contact Us (/contact)
│       └── 404.astro                   # 404 Error Page (/404)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The site will be available at `http://127.0.0.1:4321/`.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
