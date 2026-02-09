# CubiQo.com Product Website

**Status:** Preparation Complete ✅  
**Domain:** www.cubiqo.com  
**Template:** cubiqo-rolldown  

---

## Quick Reference

### Files
- **SITE-PLAN.md** - Full content structure, copy, and implementation details
- **config.json** - Site configuration (schema-compliant)
- **Assets:** `web-portal/assets/cubiqo-com/`

### Assets Ready
- ✅ hero-cubiqo-worlds.jpg
- ✅ features-multi-model.jpg
- ✅ features-intelligence.jpg
- ✅ features-mobile-app.jpg
- ✅ cube-glow.jpg
- ✅ animation.mp4

---

## Content Summary

### Sections (In Order)
1. **Hero** - CubiQo Worlds character grid
2. **Multi-Model AI** - Privacy-first AI routing
3. **Intelligence, Reimagined** - Features + Cooperative V.A.
4. **Mobile/Complete Assistant** - App mockups + core benefits
5. **Features Grid** - 6 key features (3-col layout)
6. **CTA** - Get Free Access

---

## Technical Specs

### Performance Targets
- FCP: <1.5s
- TTI: <3s
- Lighthouse: 95+

### Key Features
- 3D cube grid animation
- Parallax scrolling
- Video testimonials
- Mobile-first responsive
- SEO optimized

---

## Brand Guidelines

### Colors
- Primary: `#9333EA` (Purple)
- Secondary: `#3B82F6` (Blue)
- Accent: `#06B6D4` (Cyan)
- Background: `#000000` (Black)

### Typography
- Font: Inter, system-ui, sans-serif
- Headlines: Bold, large (3xl-6xl)
- Body: Regular (base-lg)

### Style
- Dark theme with neon accents
- Glowing effects on cubes/buttons
- Tech grid overlays
- Smooth animations

---

## Next Steps

When ready to build:

1. **Create page components**
   ```bash
   cd web-portal
   # Create pages from config.json sections
   ```

2. **Wire up content**
   - Use config.json as single source of truth
   - Reference assets from `/assets/cubiqo-com/`

3. **Implement animations**
   - Cube grid (Three.js or CSS)
   - Parallax sections (Framer Motion)
   - Hover effects

4. **Deploy**
   ```bash
   vercel --prod
   # Configure DNS: www.cubiqo.com → Vercel
   ```

---

## Integration Points

### Links to Other Sites
- **Merch:** cubiqo.shop (Shopify store)
- **Blog:** cubiqo.blog (Content)
- **Team:** cubiqo.team (About)
- **Support:** contact form on-site

### Analytics
- Google Analytics: G-XXXXXXXXXX (TBD)
- Vercel Analytics: Enabled
- Custom events: Signup, CTA clicks

---

## Character Module (On Hold)

Character creation feature postponed. Focus is **product website only**.

When resumed, character module will integrate via:
- Chat widget on site
- Character selection in config
- API endpoint for character interactions

---

**Prepared by:** Clawd  
**Date:** 2026-02-07  
**Ready for:** Development phase
