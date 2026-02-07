# Subdomain Creature System

## Overview
This system implements automated subdomain creation and website generation using Alex's JSON configuration. The system can generate complete websites in approximately 10 minutes using pre-defined templates.

## Architecture

### Components
1. **Config Loader** - Reads and validates `subdomain-config.json`
2. **Template Engine** - Generates websites from templates
3. **Subdomain Manager** - Handles DNS and subdomain creation
4. **Deployment Pipeline** - Automated deployment to production
5. **Analytics Integration** - Google Analytics and KPI tracking

### Templates Available
- **cubiqo-rolldown**: Landing page with scroll animations
- **etsy-marketplace**: E-commerce marketplace with Shopify integration
- **volleback**: Premium product showcase
- **cubiqo-staging**: Teaser/coming-soon pages
- **content-blog**: Blog with categories and search
- **team-page**: Team member profiles
- **contact-form**: Support and contact pages
- **custom**: Fully configurable template

## Quick Start

### 1. Load Configuration
```javascript
const config = require('../subdomain-config.json');
```

### 2. Generate Website
```bash
npm run generate -- --domain cubiqo.shop --template etsy-marketplace
```

### 3. Deploy
```bash
npm run deploy -- --domain cubiqo.shop
```

## Configuration Structure

Each subdomain entry in `subdomain-config.json` contains:
- `domain`: Full domain name
- `purpose`: Description of the subdomain's purpose
- `template`: Template to use for generation
- `canonical`: Whether this is the primary domain
- `redirect`: Target domain if this is a redirect
- `status`: active | planned | inactive

## Features

### P1 (MVP) - Implemented
✅ Website template generation
✅ Subdomain creation
✅ Basic deployment pipeline

### P2 - Coming Soon
- KPI Analytics dashboard
- SEO optimization tools
- Google Sheets → JSON sync
- Advanced Shopify integration
- A/B testing framework

## Directory Structure
```
subdomain-system/
├── README.md (this file)
├── generator/
│   ├── index.js           # Main generator
│   ├── template-engine.js # Template processor
│   └── templates/         # Template files
├── manager/
│   ├── subdomain.js       # Subdomain management
│   └── dns-config.js      # DNS configuration
├── deploy/
│   ├── pipeline.js        # Deployment automation
│   └── config/            # Deployment configs
└── analytics/
    ├── google-analytics.js
    └── kpi-tracker.js
```

## Usage Examples

### Generate Merch Store
```bash
npm run generate -- --domain cubiqo.shop --template etsy-marketplace
```

### Create Blog
```bash
npm run generate -- --domain cubiqo.blog --template content-blog
```

### Deploy All Planned Sites
```bash
npm run deploy-all -- --status planned
```

## Integration Points

### Shopify
- Payment processing
- Inventory management
- Order fulfillment
- Printify integration

### Analytics
- Google Analytics per domain
- Real-time dashboards
- User tracking
- Conversion metrics

### SEO
- Automated meta tags
- Sitemap generation
- Schema markup
- Canonical URLs

## Development

### Add New Template
1. Create template in `generator/templates/`
2. Add template config to `subdomain-config.json`
3. Update template engine mappings

### Test Generation
```bash
npm run test -- --template etsy-marketplace --dry-run
```

## Priority & Timeline

**Priority**: P1 (Immediate - Top Priority)
**Story Points**: 10-15
**Status**: In Development
**Delivery**: Testing/Bhini closed

## Notes
- Minimum MVP focuses on website and subdomain generation
- All sites should be reusable and tested in CAP API
- Templates are customizable for colors and backgrounds
- Preview mode available before publishing
