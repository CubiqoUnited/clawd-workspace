# CubiQo.com Deployment Guide

Complete guide for deploying the CubiQo product website to production.

## 🎯 Quick Deploy (Vercel)

### Option 1: Vercel CLI (Fastest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from web-portal directory
cd web-portal
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set root directory: .
# - Build command: npm run build
# - Output directory: .next
```

### Option 2: Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `web-portal`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
4. Click **Deploy**

## 🌐 Custom Domain Setup

### Configure www.cubiqo.com

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add domain: `www.cubiqo.com`
   - Add domain: `cubiqo.com` (optional, will redirect)

2. **DNS Configuration:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

   For apex domain (cubiqo.com):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 3600
   ```

3. **SSL Certificate:**
   - Automatically provisioned by Vercel
   - Usually ready within 5-10 minutes

## 🔧 Environment Variables

If you need environment variables (API keys, etc.):

### Vercel Dashboard
1. Go to Project Settings → Environment Variables
2. Add variables:
   ```
   NEXT_PUBLIC_APP_URL=https://www.cubiqo.com
   NEXT_PUBLIC_API_URL=https://api.cubiqo.com
   ```

### Local Development
Create `.env.local` in `web-portal/`:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📊 Analytics Setup

### Vercel Analytics (Already Integrated)
- Automatically enabled in production
- View metrics in Vercel Dashboard → Analytics

### Google Analytics (Optional)
1. Get GA4 Measurement ID
2. Add to `config.json`:
   ```json
   "analytics": {
     "googleAnalytics": "G-XXXXXXXXXX"
   }
   ```
3. Redeploy

## ✅ Pre-Launch Checklist

### Content
- [ ] All copy reviewed and approved
- [ ] Images optimized (WebP/AVIF)
- [ ] Videos tested on multiple devices
- [ ] Meta tags configured (title, description, OG)
- [ ] Favicon and app icons uploaded

### Performance
- [ ] Lighthouse score 95+ (mobile + desktop)
- [ ] First Contentful Paint <1.5s
- [ ] Images lazy loading properly
- [ ] No console errors
- [ ] All animations smooth (60fps)

### Responsive Design
- [ ] Mobile (375px, 414px) tested
- [ ] Tablet (768px, 1024px) tested
- [ ] Desktop (1280px, 1440px, 1920px) tested
- [ ] Touch interactions work on mobile

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### SEO
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Open Graph image (1200x630)
- [ ] Twitter Card meta tags
- [ ] Structured data (JSON-LD)

### Links & Navigation
- [ ] All internal links work
- [ ] External links open in new tab
- [ ] Footer links point to correct URLs
- [ ] CTA buttons lead to /signup
- [ ] 404 page styled

### Security
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] No sensitive data in client code
- [ ] API keys in environment variables

## 🚨 Rollback Plan

If something goes wrong:

### Vercel Instant Rollback
1. Go to Deployments tab
2. Find previous working deployment
3. Click ⋮ → Promote to Production

### Git Revert
```bash
git log --oneline
git revert <commit-hash>
git push
```

Vercel will auto-deploy the reverted version.

## 📈 Post-Launch Monitoring

### Day 1
- [ ] Monitor Vercel Analytics (traffic, errors)
- [ ] Check Core Web Vitals
- [ ] Test all major user flows
- [ ] Monitor uptime (use UptimeRobot or similar)

### Week 1
- [ ] Review performance metrics
- [ ] Collect user feedback
- [ ] Fix any reported bugs
- [ ] Optimize based on real usage data

### Monthly
- [ ] Review conversion rates
- [ ] A/B test CTA variations
- [ ] Update content as needed
- [ ] Check for broken links

## 🔄 CI/CD Pipeline

### Auto-Deploy on Push
Vercel automatically deploys on:
- **Production:** Push to `main` branch
- **Preview:** Push to any other branch or PR

### Manual Deploy Control
To disable auto-deploy:
1. Project Settings → Git
2. Toggle "Auto-deployments" off
3. Deploy manually from dashboard

## 🐛 Troubleshooting

### Build Fails
```bash
# Check build locally first
cd web-portal
npm run build

# Common issues:
# - Missing dependencies → npm install
# - TypeScript errors → npm run type-check
# - Image paths wrong → check /assets/cubiqo-com/
```

### 404 on Custom Domain
- DNS propagation takes 24-48 hours
- Clear your browser cache
- Use DNS checker: https://dnschecker.org

### Slow Performance
- Check image sizes (should be <200KB each)
- Enable Vercel Speed Insights
- Review Lighthouse report
- Check for render-blocking resources

## 📞 Support

If you need help:
- **Vercel Support:** https://vercel.com/support
- **Next.js Docs:** https://nextjs.org/docs
- **CubiQo Team:** ed@cubiqo.com

## 🎉 Launch Announcement

Once live, announce on:
- [ ] Twitter/X
- [ ] LinkedIn
- [ ] Product Hunt (optional)
- [ ] Update other CubiQo sites (cubiqo.ai, cubiqo.blog)
- [ ] Email newsletter (if applicable)

---

**Ready to launch? Let's go! 🚀**

For questions: Refer to `/app/cubiqo/README.md` for technical details.
