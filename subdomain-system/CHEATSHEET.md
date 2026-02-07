# Subdomain System - Quick Reference Card

## 🚀 One-Line Commands

```bash
# Setup
cd subdomain-system

# List everything
npm run list

# Generate one site
npm run generate -- --domain cubiqo.shop

# Deploy one site
npm run deploy -- --domain cubiqo.shop

# Do it all (generate + deploy)
npm run generate -- --domain cubiqo.shop && npm run deploy -- --domain cubiqo.shop
```

## 📋 Common Tasks

### View Configurations
```bash
# All domains
npm run list

# Active only
npm run list -- --status active

# Planned only
npm run list -- --status planned

# By template
npm run list -- --template etsy-marketplace
```

### Generate Websites
```bash
# Single domain
npm run generate -- --domain cubiqo.shop

# With template override
npm run generate -- --domain test.com --template volleback

# Dry run (no DNS)
npm run generate -- --domain test.com --dry-run

# All active
npm run generate-all -- --status active

# All planned
npm run generate-all -- --status planned
```

### Deploy Websites
```bash
# Single domain
npm run deploy -- --domain cubiqo.shop

# To specific provider
npm run deploy -- --domain cubiqo.shop --method netlify
npm run deploy -- --domain cubiqo.shop --method vercel
npm run deploy -- --domain cubiqo.shop --method s3

# Skip tests
npm run deploy -- --domain cubiqo.shop --skip-tests

# Staging environment
npm run deploy -- --domain cubiqo.shop --env staging

# All active
npm run deploy-all -- --status active
```

### Preview Generated Sites
```bash
# Go to site folder
cd generated/cubiqo.shop

# Serve locally
python -m http.server 8000
# or
npx serve .

# View at http://localhost:8000
```

## 🎨 Templates

| Template | Use Case | Features |
|----------|----------|----------|
| `cubiqo-rolldown` | Landing pages | Hero, animations, CTA |
| `etsy-marketplace` | E-commerce | Products, cart, Shopify |
| `volleback` | Premium products | Immersive, storytelling |
| `cubiqo-staging` | Coming soon | Email capture, teaser |
| `content-blog` | Blogs | Posts, categories, search |
| `team-page` | About pages | Team profiles, bios |
| `contact-form` | Support | Contact form, tickets |
| `custom` | Anything | Fully configurable |

## 📊 File Locations

```
subdomain-system/
├── generated/           # Generated websites
│   └── [domain]/
├── deployed/           # Deployed sites (local)
│   └── [domain]/
├── manager/
│   └── dns-records.json  # DNS registry
└── config/
    └── deploy.json      # Per-site config
```

## 🔧 Configuration

### Add New Domain
Edit `subdomain-config.json`:
```json
{
  "domain": "new-site.com",
  "purpose": "Description",
  "template": "etsy-marketplace",
  "status": "planned"
}
```

### Add Redirect
```json
{
  "domain": "alias.com",
  "redirect": "main.com",
  "canonical": false,
  "status": "active"
}
```

## 🐛 Troubleshooting

```bash
# Domain not found?
npm run list  # Check what's available

# Generation failed?
npm run generate -- --domain test.com --dry-run

# Deployment failed?
# Check DNS credentials
# Check hosting provider access
# Try with --skip-tests

# Preview not working?
cd generated/[domain]
ls -la  # Check files exist
```

## ⚡ Speed Tips

```bash
# Generate multiple sites quickly
for domain in cubiqo.shop cubiqo.blog cubiqo.team; do
  npm run generate -- --domain $domain
done

# Deploy in parallel (careful!)
npm run deploy -- --domain site1.com &
npm run deploy -- --domain site2.com &
wait
```

## 📝 Quick Edits

### Change Template Colors
Edit `generator/template-engine.js` → `createCSS()` function

### Modify HTML Structure  
Edit `generator/template-engine.js` → `generate*()` functions

### Add New Template
1. Add to `subdomain-config.json` templates section
2. Add generation logic to `template-engine.js`

## 🎯 Production Checklist

Before deploying:
- [ ] Domain in config
- [ ] Template selected
- [ ] Generate locally
- [ ] Preview in browser
- [ ] DNS provider configured
- [ ] Hosting account ready
- [ ] Analytics ID added
- [ ] Test deployment (staging)
- [ ] Deploy to production
- [ ] Verify live site
- [ ] Check SSL
- [ ] Monitor analytics

## 📞 Quick Help

```bash
# Generator help
node generator/index.js --help

# Deployment help
node deploy/pipeline.js --help

# Run demo
node test-demo.js

# Check docs
cat README.md
cat QUICKSTART.md
```

## 🔑 Environment Variables (Optional)

```bash
# DNS Provider
export DNS_PROVIDER=cloudflare
export DNS_API_KEY=your_key

# Hosting
export HOSTING_PROVIDER=netlify
export NETLIFY_TOKEN=your_token

# Analytics
export GA_TRACKING_ID=UA-XXXXXXXX-X
```

## 💡 Pro Tips

1. **Always dry-run first** when testing
2. **Use staging env** before production
3. **Batch operations** for multiple sites
4. **Preview locally** before deploying
5. **Keep config in git** for version control
6. **Monitor first deployment** closely
7. **Set up analytics** from day one
8. **Test redirects** thoroughly

## ⏱️ Expected Times

- List domains: instant
- Generate site: ~30 seconds
- Full deployment: ~5-10 minutes
- DNS propagation: 5 min - 48 hrs
- SSL certificate: ~2-5 minutes

## 🎉 Success Indicators

After deployment, verify:
```bash
# DNS resolves
nslookup your-domain.com

# Site is live
curl -I https://your-domain.com

# SSL works
curl https://your-domain.com  # No errors

# Redirects work (if configured)
curl -I https://alias.com  # Check Location header
```

---

**Remember:** The system creates production-ready sites in ~10 minutes!
