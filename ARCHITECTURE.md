# Team Global Logistics - Architecture & Documentation

## 📁 Component Structure

```
src/
├── components/
│   ├── ui/                      # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── accordion.tsx
│   │   └── ...
│   ├── AnimatedSection.tsx      # Reusable scroll animation wrapper
│   ├── ClientLogos.tsx          # Auto-scrolling client carousel with glow
│   ├── FAQ.tsx                  # Accordion FAQ with icons
│   ├── Footer.tsx               # Site footer
│   ├── MetricsDashboard.tsx     # Charts & animated counters
│   ├── Navbar.tsx               # Navigation with mobile menu
│   ├── NavLink.tsx              # Active link component
│   ├── SEOHead.tsx              # Dynamic SEO meta tags & schemas
│   ├── ServiceCard.tsx          # Service showcase card
│   ├── TeamSection.tsx          # Team profiles with GSAP animations
│   └── Testimonials.tsx         # Auto-scroll testimonial carousel
├── pages/
│   ├── Home.tsx                 # Homepage with all sections
│   ├── About.tsx                # Company story & values
│   ├── Services.tsx             # Detailed services
│   ├── Contact.tsx              # Contact form & info
│   └── NotFound.tsx             # 404 page
├── lib/
│   └── utils.ts                 # Utility functions
├── hooks/
│   └── use-mobile.tsx           # Mobile detection hook
├── assets/                      # Images & media
├── index.css                    # Global styles & design tokens
└── App.tsx                      # Main app with routing
```

## 🎨 Design System

### Color Palette (HSL)
```css
:root {
  --primary: 220 90% 35%;        /* Deep Navy Blue */
  --accent: 25 100% 50%;         /* Vibrant Orange */
  --secondary: 220 10% 95%;      /* Light Gray */
  --background: 0 0% 100%;       /* White */
  --foreground: 220 20% 15%;     /* Dark Gray Text */
  --muted: 220 10% 60%;          /* Muted Gray */
}
```

### Typography
- **Primary Font**: Inter (body text, UI elements)
- **Display Font**: Poppins (headings, emphasis)

### Animations
- **Framer Motion**: Page transitions, scroll animations, hover effects
- **GSAP**: Complex animations (floating icons, magnetic effects)
- **React CountUp**: Animated numeric counters
- **Tailwind**: Utility animations (fade-in, slide, float)

## 🚀 Key Features

### 1. SEO Optimization
- **Dynamic Meta Tags**: SEOHead component updates title, description, keywords per page
- **Open Graph**: Facebook/social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Schema.org**: Structured data for Organization, FAQ, Services
- **Canonical URLs**: Prevent duplicate content issues
- **Semantic HTML**: Proper heading hierarchy, alt tags

### 2. Performance
- **Code Splitting**: React.lazy() for route-based splitting
- **Lazy Loading**: Images load on demand
- **Optimized Animations**: GPU-accelerated transforms
- **Tree Shaking**: Unused code removed in production

### 3. Interactive Components

#### MetricsDashboard
- **Line Chart**: Monthly shipment trends (Recharts)
- **Pie Chart**: On-time vs delayed deliveries
- **Bar Chart**: Cargo type distribution (Air/Sea/Road)
- **Animated Counters**: Total shipments, countries, clients

#### TeamSection
- **Magnetic Hover**: GSAP-powered card interactions
- **Floating Icons**: Animated cargo icons on hover
- **Bio Tooltips**: Expand on hover with smooth animation
- **Image Zoom**: Framer Motion scale effect

#### FAQ
- **Accordion**: Smooth expand/collapse with icons
- **Icon Mapping**: Each FAQ has relevant icon
- **Staggered Animation**: Sequential entry animation

#### Testimonials
- **Auto-scroll**: 5-second interval carousel
- **Manual Controls**: Previous/next buttons & dots
- **Slide Animation**: Smooth horizontal transition

#### ClientLogos
- **Infinite Scroll**: Seamless looping carousel
- **Glow Effect**: Hover glow with box-shadow and text-shadow
- **Scale Animation**: Hover scale effect

### 4. Hero Section
- **Parallax Background**: Fixed attachment for depth
- **Floating Icons**: GSAP-animated logistics icons
- **Micro-interactions**: Button hover/tap animations
- **Full-screen**: Viewport height for impact

## 📊 Charts & Data Visualization

### Recharts Integration
```tsx
import { LineChart, PieChart, BarChart } from "recharts";

// Responsive containers
<ResponsiveContainer width="100%" height={250}>
  <LineChart data={monthlyData}>
    {/* ... */}
  </LineChart>
</ResponsiveContainer>
```

### Chart Theming
- Colors match design system (primary, accent, muted)
- Tooltips styled with card background
- Responsive sizing for mobile/tablet/desktop

## 🎯 SEO Implementation

### Page-Level SEO
```tsx
<SEOHead 
  title="Team Global Logistics - Best Cargo Company in Nepal"
  description="Leading logistics..."
  keywords="logistics Nepal, cargo..."
/>
```

### Structured Data (Schema.org)
```tsx
<OrganizationSchema />  // Organization info
<FAQSchema faqs={faqData} />  // FAQ markup
```

### Robots & Crawling
- robots.txt configured
- Proper meta robots tags
- XML sitemap ready

## 🛠 Tech Stack

### Core
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool & dev server
- **TailwindCSS**: Utility-first CSS

### Animation & Motion
- **Framer Motion**: Declarative animations
- **GSAP**: Advanced animations
- **React CountUp**: Number animations
- **React Intersection Observer**: Scroll triggers

### Data & Charts
- **Recharts**: Chart library
- **React Router**: Client-side routing
- **TanStack Query**: Data fetching (future)

### UI Components
- **Shadcn UI**: Accessible component primitives
- **Radix UI**: Unstyled accessible components
- **Lucide React**: Icon system

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Hamburger menu navigation
- Touch-friendly buttons (min 44px)
- Optimized images for mobile bandwidth
- Simplified charts on small screens

## 🚀 Deployment Guide

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```
- Automatic SSL
- Global CDN
- Zero config

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```
- Drag & drop deployment
- Continuous deployment from Git

#### Traditional Hosting (cPanel, etc.)
1. Build project: `npm run build`
2. Upload `dist/` folder to web root
3. Configure `.htaccess` for SPA routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Environment Variables
Create `.env` file:
```env
VITE_API_URL=https://api.yoursite.com
VITE_GOOGLE_ANALYTICS=UA-XXXXXXXXX-X
```

## 🔧 Optimization Tips

### Performance
1. **Image Optimization**: Use WebP format, compress images
2. **Lazy Loading**: Implement for below-fold images
3. **Code Splitting**: Lazy load routes
4. **Tree Shaking**: Remove unused dependencies
5. **Minification**: Vite handles automatically

### SEO
1. **Meta Tags**: Update for each page
2. **Alt Text**: All images need descriptive alt
3. **Internal Linking**: Link related pages
4. **Mobile-First**: Ensure mobile experience is perfect
5. **Page Speed**: Aim for < 3s load time

### Accessibility
1. **Keyboard Navigation**: All interactive elements
2. **ARIA Labels**: Screen reader support
3. **Color Contrast**: WCAG AA compliance
4. **Focus States**: Visible focus indicators

## 🎨 Customization Guide

### Updating Colors
Edit `src/index.css`:
```css
:root {
  --primary: [new-hsl-value];
  --accent: [new-hsl-value];
}
```

### Adding New Pages
1. Create page in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add nav link in `src/components/Navbar.tsx`
4. Add SEOHead component to page

### Modifying Charts
Update data in `src/components/MetricsDashboard.tsx`:
```tsx
const monthlyData = [
  // Update with real data
];
```

## 📈 Future Enhancements

### Recommended Features
1. **Backend Integration**: Add Lovable Cloud for contact forms
2. **Real-time Tracking**: Integrate shipment tracking API
3. **Multi-language**: i18n support (Nepali/English)
4. **Blog System**: CMS integration for news/articles
5. **Quote Calculator**: Interactive pricing tool
6. **Customer Portal**: Login area for clients
7. **Live Chat**: Customer support integration
8. **Analytics**: Google Analytics / Mixpanel
9. **A/B Testing**: Optimize conversion rates
10. **Progressive Web App**: Offline support, installable

### Scalability Considerations
- **API Integration**: Ready for REST/GraphQL backends
- **State Management**: Add Redux/Zustand if needed
- **Testing**: Jest + React Testing Library setup
- **CI/CD**: GitHub Actions for automated deployment
- **Monitoring**: Sentry for error tracking

## 📝 Maintenance

### Regular Tasks
- Update dependencies monthly
- Check broken links quarterly
- Refresh testimonials & client logos
- Update team photos & bios
- Review and update SEO keywords
- Monitor page speed scores
- Check mobile responsiveness

### Content Updates
- Images: `src/assets/`
- Copy: Edit component files directly
- Services: `src/pages/Services.tsx`
- FAQ: `src/components/FAQ.tsx`
- Team: `src/components/TeamSection.tsx`

## 🎓 Learning Resources

### Technologies Used
- [React Docs](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [TailwindCSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Shadcn UI](https://ui.shadcn.com)

### SEO Resources
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org)
- [PageSpeed Insights](https://pagespeed.web.dev)

---

**Built with ❤️ for Team Global Logistics**
