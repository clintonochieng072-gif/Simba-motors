# Simba Motors - Next.js Car Dealership Website

A modern, SEO-optimized car dealership website built with Next.js 16, featuring server-side rendering, static site generation, and comprehensive admin dashboard.

## 🚀 Features

### Frontend Features

- **Server-Side Rendering (SSR)** for dynamic car listings and user dashboards
- **Static Site Generation (SSG)** for static pages (About, Contact, Services)
- **SEO Optimized** with meta tags, Open Graph, structured data (JSON-LD)
- **Performance Optimized** with Next.js Image optimization, code splitting, and lazy loading
- **Responsive Design** with Tailwind CSS
- **Real-time Notifications** and toast messages
- **WhatsApp Integration** for direct customer communication

### Admin Dashboard

- **Car Inventory Management** - Add, edit, delete, and manage car listings
- **User Management** - View and manage user accounts
- **Dashboard Analytics** - Overview of sales, leads, and performance metrics
- **Settings Management** - Configure fees, notifications, and appearance
- **Authentication** - Secure admin login system

### SEO & Performance

- Dynamic sitemap generation with car listings
- Robots.txt configuration
- Structured data for search engines
- Open Graph and Twitter meta tags
- Mobile-first responsive design

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** React Icons
- **Backend:** Node.js/Express API
- **Database:** MongoDB
- **Image Storage:** Cloudinary
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database
- Cloudinary account (for image uploads)

## 🚀 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd nextjs-simba-motors
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**

   ```bash
   cp .env.example .env.local
   ```

   Update the environment variables in `.env.local`:

   ```env
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_API_URL=https://your-api-url.com/api
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
nextjs-simba-motors/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── about/                   # About page (SSG)
│   ├── contact/                 # Contact page (SSG)
│   ├── services/                # Services page (SSG)
│   ├── cars/[id]/               # Dynamic car detail page (SSR)
│   └── admin/                   # Admin routes
│       └── dashboard/           # Admin dashboard (SSR)
├── components/                  # React components
│   ├── ui/                      # Reusable UI components
│   ├── AdminCars.tsx            # Admin car management
│   ├── CarCard.jsx              # Car listing card
│   ├── CarDetail.tsx            # Car detail view
│   └── ...
├── contexts/                    # React contexts
│   └── ToastContext.tsx         # Toast notifications
├── lib/                         # Utility functions
│   └── api.ts                   # API client functions
├── public/                      # Static assets
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS config
└── vercel.json                 # Vercel deployment config
```

## 🔧 Configuration

### SEO Configuration

The app is fully configured for SEO with:

- **Dynamic meta tags** for each page
- **Open Graph tags** for social sharing
- **Structured data (JSON-LD)** for car listings
- **Dynamic sitemap** generation
- **Robots.txt** configuration

### Performance Optimization

- **Next.js Image component** for optimized image loading
- **Code splitting** with dynamic imports
- **Lazy loading** for components
- **Compression** and minification enabled

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Environment Variables:** Set the following in Vercel dashboard:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
   NEXT_PUBLIC_API_URL=https://your-api-url.com/api
   ```
3. **Deploy:** Vercel will automatically build and deploy on git push

### Manual Deployment

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## 🔐 Authentication

The admin dashboard requires authentication. Admin users can log in through `/admin` route.

## 📊 API Integration

The frontend integrates with a Node.js backend API that provides:

- Car listings management
- User authentication
- Settings management
- File upload handling

## 🎨 Customization

### Styling

- Uses Tailwind CSS for styling
- Custom color scheme and design tokens
- Responsive breakpoints configured

### Branding

- Update metadata in `app/layout.tsx`
- Replace logo and branding assets
- Customize color scheme in Tailwind config

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors:**

   - Ensure all environment variables are set
   - Check TypeScript compilation errors

2. **API Connection Issues:**

   - Verify backend API is running
   - Check environment variable configuration

3. **Image Loading Issues:**
   - Ensure Cloudinary configuration is correct
   - Check image domains in Next.js config

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software owned by Simba Motors.

## 📞 Support

For support, contact the development team at [contact email].

---

**Built with ❤️ for Simba Motors - Your trusted car dealership in Kenya**

# Deployment test update
