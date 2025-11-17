# Migration to Next.js Plan

## 1. Create New Next.js Project Structure

- [x] Initialize new Next.js 14+ app in `nextjs-simba-motors` directory using `npx create-next-app@latest` with App Router, TypeScript, Tailwind CSS, and ESLint
- [x] Copy existing components, pages, utils, and assets from `frontend/src/` to new Next.js structure
- [ ] Update `package.json` to include Next.js dependencies and remove React Router
- [x] Set up basic project structure: `app/`, `components/`, `lib/`, `public/`

## 2. Convert Routes to Next.js App Router

- [x] Create root layout `app/layout.js` using `PublicLayout` as base
- [x] Convert static public pages to SSG:
  - [x] `app/page.js` (Home)
  - [x] `app/about/page.js`
  - [x] `app/contact/page.js`
  - [x] `app/services/page.js`
- [x] Convert dynamic pages to SSR:
  - [x] `app/cars/[id]/page.js` (CarDetail)
- [x] Create admin layout `app/admin/dashboard/layout.js` using `AdminLayout`
- [x] Convert admin pages:
  - [x] `app/admin/page.js` (AdminLogin)
  - [x] `app/admin/dashboard/page.js` (AdminOverview)
  - [x] `app/admin/dashboard/add-car/page.js`
  - [ ] `app/admin/dashboard/cars/page.js`
  - [x] `app/admin/dashboard/cars/[id]/page.js` (AdminCarEdit)
  - [ ] `app/admin/dashboard/users/page.js`
  - [ ] `app/admin/dashboard/settings/page.js`

## 3. Migrate Components and Contexts

- [ ] Move all components from `frontend/src/components/` to `components/`
- [ ] Convert `ToastProvider` to client component and integrate into `app/layout.js`
- [ ] Update all imports to match new structure
- [ ] Replace lazy loading with Next.js dynamic imports where needed

## 4. Implement SEO and Optimizations

- [ ] Add metadata API to all pages for title, description, Open Graph, JSON-LD
- [ ] Convert all `<img>` tags to `<Image>` from `next/image`
- [ ] Generate `sitemap.xml` and `robots.txt` using Next.js config

## 5. Update API Calls and Environment

- [ ] Move `api.js` to `lib/api.js` and update for Next.js
- [ ] Set up `.env.local` with API URLs, Cloudinary keys, etc.
- [ ] Ensure API calls work with absolute URLs for backend

## 6. Handle Authentication and State

- [ ] Create `middleware.js` for protected admin routes
- [ ] Implement server-side auth checks in admin pages
- [ ] Update auth logic to use Next.js cookies/sessions

## 7. Testing and Deployment

- [ ] Run `npm run dev` and test all routes locally
- [ ] Verify SSR/SSG functionality
- [ ] Update Vercel config for Next.js deployment
- [ ] Deploy to Vercel and test production
- [ ] Fix any issues (state initialization, routing, etc.)
