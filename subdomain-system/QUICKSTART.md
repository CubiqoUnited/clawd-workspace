# Quick Start Guide - Subdomain Creature System

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 14+ installed
- Access to DNS provider (Cloudflare, Route53, etc.)
- Hosting account (Netlify, Vercel, S3, etc.)

### Installation

```bash
cd subdomain-system
npm install
```

### 1. View All Configured Domains

```bash
npm run list
```

This shows all domains from `subdomain-config.json` with their templates and status.

### 2. Generate Your First Website

Generate a website for a specific domain:

```bash
npm run generate -- --domain cubiqo.shop
```

This will:
- ✅ Find the domain config
- ✅ Select the appropriate template (etsy-marketplace)
- ✅ Generate HTML, CSS, and JavaScript
- ✅ Create directory structure
- ✅ Generate config files
- ✅ Create subdomain (DNS)

**Output:** `generated/cubiqo.shop/`

### 3. Preview the Generated Site

```bash
cd generated/cubiqo.shop
# Use any local server, e.g.:
python -m http.server 8000
# or
npx serve .
```

Visit `http://localhost:8000` to preview.

### 4. Deploy to Production

```bash
npm run deploy -- --domain cubiqo.shop
```

This will:
- ✅ Run pre-deployment checks
- ✅ Build and minify assets
- ✅ Run tests
- ✅ Deploy to hosting (Netlify/Vercel/S3)
- ✅ Configure DNS
- ✅ Setup SSL certificate
- ✅ Setup analytics
- ✅ Validate deployment

**Time:** ~5-10 minutes from generation to live site!

## 📋 Common Commands

### List domains by status
```bash
npm run list -- --status active
npm run list -- --status planned
```

### Generate all active domains
```bash
npm run generate-all -- --status active
```

### Generate with specific template override
```bash
npm run generate -- --domain my-site.com --template volleback
```

### Dry run (generate without creating DNS)
```bash
npm run generate -- --domain test.com --dry-run
```

### Deploy all active sites
```bash
npm run deploy-all -- --status active
```

### Deploy to specific provider
```bash
npm run deploy -- --domain cubiqo.shop --method vercel
```

## 🎨 Available Templates

1. **cubiqo-rolldown** - Landing page with scroll animations
2. **etsy-marketplace** - E-commerce with Shopify integration
3. **volleback** - Premium product showcase
4. **cubiqo-staging** - Teaser/coming-soon page
5. **content-blog** - Blog with categories
6. **team-page** - Team member profiles
7. **contact-form** - Contact/support page
8. **custom** - Fully customizable

## 📁 Project Structure

```
subdomain-system/
├── generator/           # Website generation
│   ├── index.js        # Main generator
│   └── template-engine.js
├── manager/            # Subdomain management
│   └── subdomain.js
├── deploy/             # Deployment pipeline
│   └── pipeline.js
├── generated/          # Generated websites (output)
│   └── [domain]/
└── subdomain-config.json  # Main configuration
```

## ⚙️ Configuration

Edit `subdomain-config.json` to:
- Add new domains
- Change templates
- Update purposes
- Modify status (active/planned/inactive)

Example domain entry:
```json
{
  "domain": "cubiqo.shop",
  "purpose": "Merch",
  "template": "etsy-marketplace",
  "status": "active"
}
```

## 🔧 Advanced Usage

### Generate Multiple Sites in Sequence
```bash
npm run generate -- --domain cubiqo.shop
npm run generate -- --domain cubiqo.blog
npm run generate -- --domain cubiqo.team
```

### Custom Deployment Method
```bash
npm run deploy -- --domain mysite.com --method s3 --env staging
```

### Skip Tests During Deployment
```bash
npm run deploy -- --domain mysite.com --skip-tests
```

### Verify DNS Propagation
```javascript
const SubdomainManager = require('./manager/subdomain');
const manager = new SubdomainManager();

await manager.verify('cubiqo.shop');
```

## 📊 Monitoring

After deployment, check:
- DNS propagation: `nslookup [domain]`
- SSL status: `https://[domain]`
- Analytics: Google Analytics dashboard
- Uptime: Configured monitoring service

## 🐛 Troubleshooting

**Problem:** Domain not found in config
```bash
# Check available domains:
npm run list
```

**Problem:** Generation fails
```bash
# Try dry-run mode:
npm run generate -- --domain test.com --dry-run
```

**Problem:** Deployment fails
```bash
# Check pre-deployment requirements
# Ensure DNS provider credentials are set
# Verify hosting provider access
```

## 🎯 Next Steps

1. **Customize Templates**: Edit `generator/template-engine.js`
2. **Add DNS Provider**: Update `manager/subdomain.js`
3. **Configure Hosting**: Update `deploy/pipeline.js`
4. **Setup Analytics**: Add Google Analytics IDs
5. **Enable Shopify**: Configure Shopify API keys

## 📚 Documentation

- Main README: `README.md`
- Config reference: `subdomain-config.json`
- Template docs: See template-engine.js comments
- Deployment docs: See pipeline.js comments

## 💡 Tips

- Use `--dry-run` for testing
- Start with `--list` to see what's available
- Generate locally before deploying
- Test with staging environment first
- Keep config file in version control
- Monitor first deployment closely

## ⏱️ Timeline

- **Generation**: ~30 seconds per site
- **Deployment**: ~5-10 minutes per site
- **DNS Propagation**: 5 minutes - 48 hours (usually < 1 hour)
- **SSL Setup**: ~2-5 minutes

**Total time from zero to live site: ~10 minutes!** 🎉
