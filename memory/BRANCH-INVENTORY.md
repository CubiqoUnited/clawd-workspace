# Git Branch Inventory - thecubiqo Repo

**Purpose:** Prevent rework by documenting what already exists in each branch

---

## Branch: `main` (current production)

**Last commit:** `077dda2` - Keywords panel documentation  
**Status:** 1 commit ahead of origin/main

### Key Features:
- ✅ **Cube customization** - Size, shape (isometric), eyes toggle
- ✅ **Keywords panel** - RGY color system (Red/Yellow/Green)
- ✅ **Brand system** - "Powered by Claude/OpenAI" logos
- ✅ **Voice modulation** - Madhyama marg (sincere/candid/intimate tones)
- ✅ **Settings cube** - 3D configuration interface with code panels
- ✅ **Generator system** - Regional configs (UK example in `generator/config/`)
- ✅ **Full color system** - ORANGE, RED, YELLOW, GREEN_BLUE in `src/config/colors.ts`

### Directory Structure:
```
src/
├── app/
│   ├── chat/
│   ├── settings-cube/
│   └── ...
├── components/
│   ├── cube/
│   ├── settings-cube/
│   ├── FlowingEnergyCube*
│   ├── KeywordPanel.tsx
│   ├── PoweredByLogos.tsx
│   └── ...
└── config/
    └── colors.ts
generator/
└── config/
    ├── schema.json
    └── regions/
        └── uk.json
```

---

## Branch: `web-portal` (admin panel - MAJOR WORK)

**Last commit:** `af13b4a` - Update debug-deploy.ts  
**Status:** Full admin implementation

### Features:
- ✅ **Domain management** - Custom domains with DNS instructions
- ✅ **Template system** - Create/manage website templates
- ✅ **Deployment pipeline** - Config → Build → NGINX → SSL
- ✅ **SSL automation** - Certbot/Let's Encrypt integration
- ✅ **NGINX configuration** - Auto-generated reverse proxy configs
- ✅ **Google Analytics** - Per-domain tracking
- ✅ **Cubiqo Generator UI** - Content generation tool
- ✅ **File uploads** - Images, videos, logos
- ✅ **PM2 integration** - Process management
- ✅ **MySQL + Prisma ORM** - Full database layer

### Database Models (Prisma):
- Domain (status: PENDING/ACTIVE/DEPLOYED)
- Template
- Deployment
- TemplateConfig
- Upload
- Setting
- Region
- World

### Directory Structure:
```
admin/
├── prisma/
│   └── schema.prisma
├── scripts/
│   ├── setup-env.js
│   ├── debug-deploy.ts
│   └── fix-paths.ts
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── analytics/
│   │   │   ├── cubiqo-generator/
│   │   │   │   ├── regions/
│   │   │   │   └── worlds/
│   │   │   ├── deployments/
│   │   │   ├── domains/
│   │   │   ├── settings/
│   │   │   └── templates/
│   │   └── api/
│   │       ├── auth/
│   │       ├── build/
│   │       ├── deployments/
│   │       ├── domains/
│   │       ├── nginx/
│   │       ├── regions/
│   │       ├── ssl/
│   │       ├── templates/
│   │       ├── upload/
│   │       └── worlds/
│   ├── components/
│   └── lib/
│       ├── auth.ts
│       ├── build.ts
│       ├── certbot.ts
│       ├── deployment.ts
│       ├── nginx.ts
│       └── template-builder.ts
└── data/
    └── templates/
        └── template1/
```

### Tech Stack:
- Next.js 16 + TypeScript
- Tailwind CSS 4
- MySQL + Prisma ORM
- PM2
- NGINX
- Let's Encrypt/Certbot
- Recharts
- Zod validation

**DO NOT REBUILD THIS!** This is a complete admin panel implementation.

---

## Branch: `dicey-stage` (Dicey-specific variant)

**Last commit:** `7f9743e` - Update colors.js  
**Status:** Dicey configuration

### Key Differences from Main:
- **Simplified colors:** WHITE & BLACK only (vs full RGY system)
- **Dicey branding:** thedicey.com focus
- **dice.glb** - 3D model file for dice
- **Deployment configs:** GitHub workflows for production/staging

### Files:
```
.github/workflows/
├── deploy-production.yml
└── deploy-staging.yml
api/
└── chat.js
dice.glb (3D model)
src/config/
└── colors.js (WHITE/BLACK only)
deploy-production.sh
```

**Purpose:** Separate Dicey product line with different branding/colors.

---

## Other Branches (Remote)

### `staging`
- Staging environment for testing before production

### `develop`
- Development branch (feature integration)

### `phase2`
- Phase 2 features (check commits for details)

### `openclaw-integration` / `openclaw-simple`
- OpenClaw integration attempts
- Likely superseded by current architecture

### `fix/remove-openclaw-from-main`
- Cleanup branch for removing OpenClaw

### `ui/energy-cube-staging`
- Energy cube UI experiments

### `milestone-1` / `preview` / `test/thecubiqo-main`
- Historical milestones/test branches

---

## What's MISSING (Not in Any Branch):

Based on Ed's priority list and architecture diagram:

### 1. **Verbal Commands** ❌
- Email integration
- Maps integration
- Uber integration
- WhatsApp integration
- Twitter integration

### 2. **Headless Browser** ❌
- Puppeteer/Playwright integration
- Web scraping capabilities
- Form automation

### 3. **Daily Journal Flow (Rozana)** ⚠️
- Research exists in `clawd/mare-reports/daily-journal-rozana.md`
- No implementation yet

### 4. **"Conscious Mind" Memory Algorithm** ❌
- Long-term memory system
- Not just localStorage
- Persistent across sessions

### 5. **Llama/Mixtral Integration** ❌
- Cost optimization
- Local/cheap model fallback
- Hybrid routing

### 6. **Character Expansion** ❌
- ciqo.ai, acqo.ai, aewa.ai
- Similar functionality to Cubiqo
- Different branding/colors

---

## Recommended Next Steps:

1. ✅ **Push pending commits** to origin/main
2. ✅ **Merge web-portal branch** (if ready for production)
3. ⏱️ **Deploy admin panel** (web-portal branch to production)
4. 🔨 **Build missing features** (verbal commands, headless browser, etc.)
5. 📋 **Document branch merge strategy** (which features go to main?)

---

## Branch Merge Candidates:

| Branch | Merge to Main? | Reason |
|--------|----------------|--------|
| web-portal | ✅ Yes (eventually) | Full admin panel, production-ready |
| dicey-stage | ❌ No | Separate product line |
| staging | ❌ No | Staging env only |
| develop | ⚠️ Review first | Check what's in it |

---

**Last Updated:** February 7, 2026  
**Purpose:** Prevent expensive rework by mapping existing code
