# Web Portal Implementation Plan
**Priority:** P1 (Top Priority)  
**Story Points:** 10-15  
**Agent:** h1 - WEB PORTAL Agent  
**Status:** In Progress

## Mission
Build the template system + subdomain creation for Cubiqo's web portal.

## Requirements Summary
From requirements-doc-1.txt and requirements-doc-2.txt:

### Core Features (MVP)
1. **Website Template System**
   - Templates for website creation
   - Customizable colors and backgrounds
   - Preview mode before publishing
   - Multiple template types

2. **Subdomain Creation & Management**
   - Automated subdomain creation
   - Production release automation
   - DNS configuration
   - Redirect management

3. **Admin Portal Features** (from requirements-doc-2.txt)
   - Create new product/merch sites from templates
   - Manage multiple product sites from one portal
   - Product management (add/edit/delete products)
   - Product approval workflow (Draft → Review → Publish)
   - Color scheme customization per site

### Available Templates (from subdomain-config.json)
1. **cubiqo-rolldown** - Landing page with scroll animations
2. **etsy-marketplace** - E-commerce marketplace with Shopify integration
3. **volleback** - Premium product showcase
4. **cubiqo-staging** - Teaser/coming-soon pages
5. **content-blog** - Blog with categories and search
6. **team-page** - Team member profiles
7. **contact-form** - Support and contact pages
8. **custom** - Fully configurable template

### Future Features (Post-MVP)
- KPI Analytics integration
- SEO optimization tools
- Google Sheets → JSON sync
- Advanced Shopify integration
- A/B testing framework

## Current State Analysis

### Existing Infrastructure
✅ Configuration system (`subdomain-config.json`) with 24+ domains defined  
✅ Basic generator structure (`subdomain-system/generator/index.js`)  
✅ Template definitions and mappings  
✅ Git configured (aditya@cubiqo.ai)  
✅ Vercel CLI authenticated (aditya-7307)  

### Missing Components
❌ Template engine implementation (`template-engine.js` - referenced but not created)  
❌ Subdomain manager (`../manager/subdomain.js` - referenced but not created)  
❌ Actual template files (HTML/CSS/JS)  
❌ Admin portal UI  
❌ Deployment pipeline integration  
❌ Vercel project setup for multi-domain hosting  

## Architecture Design

### System Components

```
web-portal/
├── admin-portal/          # Web-based admin interface
│   ├── pages/
│   │   ├── dashboard.html
│   │   ├── site-creator.html
│   │   ├── site-manager.html
│   │   └── template-selector.html
│   ├── components/
│   │   ├── preview-modal.js
│   │   └── color-picker.js
│   └── styles/
│
├── generator/             # Website generation engine
│   ├── index.js          # Main generator (existing)
│   ├── template-engine.js # NEW: Template processor
│   ├── templates/        # NEW: Template files
│   │   ├── cubiqo-rolldown/
│   │   ├── etsy-marketplace/
│   │   ├── volleback/
│   │   ├── cubiqo-staging/
│   │   ├── content-blog/
│   │   ├── team-page/
│   │   ├── contact-form/
│   │   └── base/         # Shared components
│   └── utils/
│       ├── css-processor.js
│       └── asset-optimizer.js
│
├── manager/              # NEW: Domain & deployment management
│   ├── subdomain.js      # Subdomain creation logic
│   ├── dns-config.js     # DNS configuration
│   ├── vercel-deploy.js  # Vercel deployment automation
│   └── domain-registry.js
│
├── api/                  # NEW: API for admin portal
│   ├── routes/
│   │   ├── sites.js
│   │   ├── templates.js
│   │   └── deploy.js
│   └── server.js
│
└── generated/            # Output directory for generated sites
    ├── cubiqo.shop/
    ├── cubiqo.blog/
    └── ...
```

### Data Flow

```
Admin Portal → API → Generator → Template Engine → Generated Site
                ↓
            Subdomain Manager → Vercel Deployment → Live Site
```

## Implementation Phases

### Phase 1: Core Generator & Templates (4-5 SP)
**Goal:** Create working template engine and at least 2 complete templates

1. **Template Engine Implementation**
   - Create `template-engine.js` with templating logic
   - Support for variable substitution
   - CSS/color customization
   - Asset injection

2. **Template Creation**
   - **Priority 1:** etsy-marketplace (for merch sites)
   - **Priority 2:** cubiqo-rolldown (for product pages)
   - **Priority 3:** content-blog (for blog sites)
   - Create base/shared components
   - Responsive design
   - SEO-ready markup

3. **Generator Enhancement**
   - Complete missing dependencies
   - Add error handling
   - Add validation
   - Test generation pipeline

### Phase 2: Subdomain & Deployment (3-4 SP)
**Goal:** Automate subdomain creation and Vercel deployment

1. **Subdomain Manager**
   - Create `subdomain.js` implementation
   - DNS configuration logic
   - Redirect handling
   - Canonical URL management

2. **Vercel Integration**
   - Create `vercel-deploy.js`
   - Multi-project deployment strategy
   - Custom domain configuration
   - Automated SSL setup

3. **Deployment Pipeline**
   - Git integration for generated sites
   - Automated deployment workflow
   - Rollback capability
   - Environment management

### Phase 3: Admin Portal (3-4 SP)
**Goal:** Web interface for managing sites and templates

1. **Admin UI**
   - Dashboard showing all sites
   - Site creator wizard
   - Template selector with previews
   - Color scheme editor

2. **Site Management**
   - List/edit/delete sites
   - Product management interface
   - Approval workflow (Draft → Review → Publish)
   - Preview mode

3. **API Backend**
   - REST API for portal operations
   - Authentication (basic for MVP)
   - Site CRUD operations
   - Template customization endpoints

### Phase 4: Testing & Polish (1-2 SP)
**Goal:** Production-ready system

1. **Testing**
   - Generate all planned domains
   - Test each template type
   - Verify deployments
   - Cross-browser testing

2. **Documentation**
   - User guide for admin portal
   - Template customization guide
   - Deployment troubleshooting
   - API documentation

3. **Refinement**
   - Performance optimization
   - Error messages improvement
   - UI/UX polish

## Technical Stack

### Frontend (Admin Portal)
- **Framework:** Vanilla JS or lightweight React
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui or custom

### Backend
- **Runtime:** Node.js
- **API:** Express.js
- **Storage:** JSON files (config-based, no DB for MVP)

### Deployment
- **Platform:** Vercel
- **DNS:** Vercel DNS management
- **Git:** GitHub (multi-repo or monorepo strategy TBD)

### Templates
- **HTML:** Semantic HTML5
- **CSS:** Modern CSS with CSS Variables for theming
- **JS:** Vanilla JS or minimal dependencies
- **Build:** No build step for MVP (plain HTML/CSS/JS)

## Testing Strategy

### Manual Testing
1. Generate each template type
2. Deploy to test subdomain
3. Verify responsiveness
4. Test customization options
5. Validate SEO markup

### Automated Testing
- Template generation tests
- Deployment validation
- Configuration validation

## Deployment Strategy for Multi-Domain

### Option 1: Single Vercel Project with Multi-Domain
- One Vercel project
- Multiple custom domains configured
- Domain-based routing
- Simpler management

### Option 2: Multiple Vercel Projects
- One project per domain
- Better isolation
- Independent deployments
- More complex management

**Recommendation:** Start with Option 1 for MVP, migrate to Option 2 if needed.

## Success Criteria

### MVP Complete When:
✅ Template engine can generate at least 2 template types  
✅ Generated sites are valid HTML/CSS/JS  
✅ Sites can be deployed to Vercel  
✅ Custom domains can be configured  
✅ Admin portal can create and manage sites  
✅ Color customization works  
✅ Preview mode functional  
✅ At least 3 test sites deployed successfully  

## Timeline Estimate

- **Phase 1:** 8-10 hours
- **Phase 2:** 6-8 hours
- **Phase 3:** 6-8 hours
- **Phase 4:** 2-4 hours

**Total:** 22-30 hours (within 10-15 SP range at ~2 hours per SP)

## Next Steps

1. ✅ Review requirements and existing code
2. ✅ Create implementation plan (this document)
3. ⏭️ **NEXT:** Create template-engine.js
4. ⏭️ Build first template (etsy-marketplace)
5. ⏭️ Test generation pipeline
6. ⏭️ Implement subdomain manager
7. ⏭️ Build Vercel deployment integration
8. ⏭️ Create admin portal
9. ⏭️ End-to-end testing
10. ⏭️ Deploy test sites

## Questions/Blockers

- None currently. All requirements are clear.
- Git and Vercel access confirmed.
- Configuration structure is well-defined.

## Notes

- Requirements specify "approximately 10 minutes" for website generation
- Need to balance speed vs quality for MVP
- Focus on 2-3 core templates first, expand later
- Admin portal can be basic for MVP
- Priority is functional over fancy

---

**Started:** 2026-02-07  
**Agent:** h1 (Web Portal Agent)  
**Last Updated:** 2026-02-07
