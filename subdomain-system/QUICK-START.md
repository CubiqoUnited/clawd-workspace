# Web Portal Quick Start

## ✅ System is Ready

The web portal generator is **WORKING and DEPLOYED**.

**Live Example:** https://cubiqoshop-jj3eunupt-adityas-projects-261b17a9.vercel.app

---

## 🚀 Generate & Deploy a Site (30 seconds)

### Single Command (Fastest):
```bash
cd subdomain-system
node cli.js create-site --domain www.cubiqo.shop
```

This will:
1. Generate the website
2. Deploy to Vercel
3. Give you a live URL

### Step-by-Step:
```bash
# 1. Generate the site
cd subdomain-system
node cli.js generate --domain www.cubiqo.shop

# 2. Deploy it
cd ../generated/www.cubiqo.shop
vercel --yes
```

---

## 📋 Available Domains (24 configured)

List all configured domains:
```bash
node cli.js list
```

**Active domains ready to generate:**
- www.cubiqo.shop (merch)
- Cubiqo.blog (blog)
- Cubiqo.team (team page)
- Cubiqo.support (contact)
- www.headlinesai.shop (merch)
- + 19 more...

---

## 🎨 Template Types

- **etsy-marketplace** - E-commerce with shopping cart
- **cubiqo-rolldown** - Landing page
- **content-blog** - Blog
- **team-page** - Team profiles
- **contact-form** - Contact page
- **volleback** - Premium product showcase
- **cubiqo-staging** - Coming soon / teaser
- **custom** - Configurable

Templates are auto-assigned based on `subdomain-config.json`.

---

## 📊 What You Get

Each generated site includes:
- ✅ Responsive HTML/CSS/JS
- ✅ Shopping cart (for marketplace templates)
- ✅ SEO files (sitemap.xml, robots.txt)
- ✅ PWA manifest
- ✅ Ready to deploy

---

## 🎯 Common Commands

```bash
# List all configured domains
node cli.js list

# List only planned (not yet generated) domains
node cli.js list --status planned

# Generate all planned domains
node cli.js generate-all --status planned

# Get info about a specific domain
node cli.js info --domain www.cubiqo.shop

# List available templates
node cli.js templates

# Show help
node cli.js help
```

---

## 📁 File Structure

```
subdomain-system/
├── cli.js              # Command-line tool
├── subdomain-config.json  # 24 domains configured here
└── generated/          # Your sites appear here
    ├── www.cubiqo.shop/
    ├── Cubiqo.blog/
    └── ...
```

---

## 🔧 Custom Colors (Optional)

Override default colors when generating:
```bash
node cli.js generate --domain www.cubiqo.shop \
  --primaryColor "#FF5733" \
  --backgroundColor "#FFFFFF"
```

---

## 🌐 Deploy All Sites at Once

```bash
# Generate all planned sites
node cli.js generate-all --status planned

# Then deploy them all
node cli.js deploy-all --delay 2000
```

This will:
1. Generate all "planned" domains
2. Deploy each to Vercel with 2s delay between
3. Give you a report at the end

---

## ✅ Already Working

- ✅ **Live Site:** https://cubiqoshop-jj3eunupt-adityas-projects-261b17a9.vercel.app
- ✅ Shopping cart with 6 products
- ✅ Add/remove from cart
- ✅ Cart persistence
- ✅ Responsive design
- ✅ ~14 second deploys

---

## 🎉 That's It

The system is ready. Just run `node cli.js create-site --domain <your-domain>` and you'll have a live site in ~20 seconds.

For details: See `WEB-PORTAL-COMPLETE.md`
