# CubiQo.com Product Website

Production-ready Next.js website for **www.cubiqo.com** - "Intelligence, Reimagined"

## 🚀 Overview

A high-performance, mobile-first product landing page showcasing CubiQo's multi-model AI assistant platform with:
- **6 core sections** (Hero, Multi-Model AI, Intelligence, Mobile Assistant, Features Grid, CTA)
- **3D cube grid animation** with CSS-based floating cubes
- **Parallax scrolling** with smooth transitions
- **Dark cyberpunk theme** with neon purple/blue/cyan gradients
- **Performance optimized** for FCP <1.5s, Lighthouse 95+

## 📁 Project Structure

```
web-portal/app/cubiqo/
├── page.tsx                    # Main landing page
├── layout.tsx                  # CubiQo-specific layout
├── components/
│   ├── HeroSection.tsx         # Hero with character grid
│   ├── CubeGrid.tsx            # 3D animated cube background
│   ├── CharacterCard.tsx       # Character card component
│   ├── MultiModelSection.tsx   # Multi-Model AI section
│   ├── IntelligenceSection.tsx # Features + Cooperative badge
│   ├── MobileSection.tsx       # Mobile app showcase
│   ├── FeaturesGrid.tsx        # 3-column feature grid
│   ├── CTASection.tsx          # Call-to-action
│   └── Footer.tsx              # Site footer
└── README.md                   # This file
```

## 🎨 Design System

### Colors
- **Primary Purple:** `#9333EA` (Tailwind: `cubiqo-purple`)
- **Secondary Blue:** `#3B82F6` (Tailwind: `cubiqo-blue`)
- **Accent Cyan:** `#06B6D4` (Tailwind: `cubiqo-cyan`)
- **Background:** `#000000` (Pure black)
- **Text:** White with gray variants for hierarchy

### Typography
- **Font:** Inter (system-ui fallback)
- **Headings:** Bold, 5xl-9xl sizes
- **Body:** Regular, gray-300/400 for readability

### Animations
- **Cube Grid:** Floating rotation (CSS 3D transforms)
- **Scroll:** Parallax with `framer-motion` InView hooks
- **Hover:** Scale + glow effects on cards/buttons
- **CTA Button:** Pulsing gradient glow effect

## 🛠️ Development

### Prerequisites
- Node.js 20+
- npm or yarn

### Install Dependencies
```bash
cd web-portal
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000/cubiqo**

### Build for Production
```bash
npm run build
npm start
```

## 📦 Dependencies

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### UI/Animations
- **Framer Motion** - Advanced animations and scroll effects
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first styling

### Performance
- **Next Image** - Automatic image optimization
- **Vercel Analytics** - Real-time performance metrics
- **Vercel Speed Insights** - Core Web Vitals monitoring

## 📸 Assets

All assets located in: `web-portal/assets/cubiqo-com/`

### Images
- `hero-cubiqo-worlds.jpg` - Hero background (157 KB)
- `features-multi-model.jpg` - Multi-Model section (44 KB)
- `features-intelligence.jpg` - Intelligence section (94 KB)
- `features-mobile-app.jpg` - Mobile app mockup (93 KB)
- `cube-glow.jpg` - Brand asset (22 KB)

### Video
- `animation.mp4` - Hero animation (2.8 MB)

**Note:** Images are automatically optimized by Next.js Image component (WebP/AVIF conversion, responsive sizes).

## 🎯 Features Implemented

### ✅ Phase 1: Core Sections
- [x] Hero with animated cube grid
- [x] Character cards (6 CubiQo Worlds personalities)
- [x] Multi-Model AI System section
- [x] Intelligence, Reimagined section
- [x] Mobile/Complete Assistant section
- [x] Features Grid (6 features, 3-column layout)
- [x] CTA section with pulsing button
- [x] Footer with links

### ✅ Phase 2: Animations
- [x] 3D cube grid (CSS-based, lightweight)
- [x] Parallax scroll effects
- [x] Card hover states (glow + scale)
- [x] Button gradient animations
- [x] Smooth section transitions

### ✅ Phase 3: Responsive Design
- [x] Mobile-first approach
- [x] Tablet breakpoints (768px, 1024px)
- [x] Desktop layouts (1280px, 1440px, 1920px)
- [x] Touch-optimized interactions

### ✅ Phase 4: SEO & Performance
- [x] Meta tags (title, description, OG)
- [x] Semantic HTML structure
- [x] Image lazy loading
- [x] Optimized bundle size
- [x] Vercel Analytics integration

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Import project in Vercel
3. Set custom domain: `www.cubiqo.com`
4. Environment variables (if needed):
   ```
   NEXT_PUBLIC_APP_URL=https://www.cubiqo.com
   ```
5. Deploy!

### Manual Deployment
```bash
npm run build
npm start
```

## 📊 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| First Contentful Paint | <1.5s | ✅ Optimized |
| Largest Contentful Paint | <2.5s | ✅ Image optimization |
| Time to Interactive | <3.0s | ✅ Code splitting |
| Cumulative Layout Shift | <0.1 | ✅ Fixed dimensions |
| Lighthouse Score | 95+ | ✅ All optimizations |

## 🔗 Related Sites

- **Main App:** https://cubiqo.ai
- **Merch Store:** https://cubiqo.shop
- **Team Page:** https://cubiqo.team
- **Blog:** https://cubiqo.blog

## 📝 Content Management

All content is sourced from:
- `web-portal/sites/cubiqo-com/config.json` - Single source of truth
- `web-portal/sites/cubiqo-com/SITE-PLAN.md` - Content reference

To update copy:
1. Edit `config.json`
2. Update corresponding component
3. Test locally
4. Deploy

## 🐛 Known Issues

None currently! 🎉

## 📅 Roadmap

### Future Enhancements
- [ ] Add video testimonials section
- [ ] Implement newsletter signup
- [ ] Create interactive demo/playground
- [ ] Add A/B testing for CTA buttons
- [ ] Integrate live chat (when character module ready)
- [ ] Build pricing page
- [ ] Add customer case studies

## 🤝 Contributing

This is a production site. For contributions:
1. Test thoroughly in development
2. Ensure Lighthouse score stays 95+
3. Maintain responsive design
4. Follow existing code patterns

## 📄 License

© 2026 CubiQo. All rights reserved.

---

**Built with ❤️ by the CubiQo Team**
