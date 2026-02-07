# Cubiqo Infrastructure & Documentation

This workspace contains infrastructure tools, documentation, and sub-projects for the Cubiqo ecosystem.

## 🏗️ Projects in This Workspace

### 1. **Subdomain System** (P1, 10-15 SP) ✅
**Location:** `subdomain-system/`  
**Purpose:** Generate and deploy websites for Cubiqo domains  
**Status:** Complete & Tested

- Generates websites from 8 template types
- Manages 24+ configured domains
- Automated deployment pipeline (Vercel/Netlify/S3)
- CLI tool for batch operations

**Quick Start:**
```bash
cd subdomain-system
npm run list                        # See all domains
npm run generate -- --domain cubiqo.shop
npm run deploy -- --domain cubiqo.shop
```

**Documentation:** [README_SUBDOMAIN_SYSTEM.md](README_SUBDOMAIN_SYSTEM.md)

---

### 2. **RGY Side Panel** (P1, 3-5 SP) ✅
**Location:** `canvas/`  
**Purpose:** Color-coded keyword filtering system  
**Status:** Complete & Tested

- Three zones: Red (Dating), Yellow (Social), Green (Work)
- localStorage persistence
- Reusable ES6 component
- Standalone demo + integration example

**Quick Start:**
```bash
# Open standalone demo
open canvas/side-panel.html

# See integration example
open canvas/index-with-panel.html
```

**Documentation:** [canvas/README-SIDE-PANEL.md](canvas/README-SIDE-PANEL.md)

---

### 3. **Web Portal Spec** (P1, 10-15 SP)
**Location:** `web-portal/`  
**Purpose:** Admin portal specification & API stubs  
**Status:** Specification ready, implementation TBD

API endpoints for:
- Subdomain creation
- Site deployment
- Configuration management

**Documentation:** [web-portal/README.md](web-portal/README.md)

---

### 4. **Branchy Mascot System**
**Location:** `sub-domains-mascot/`  
**Purpose:** Tree-branch mascot for sub-domains  
**Status:** Design complete

SVG assets for different color states (Red/Yellow/Green/Blue).

**Documentation:** [sub-domains-mascot/README.md](sub-domains-mascot/README.md)

---

## 📚 Documentation

### Implementation Reports
- [SUBDOMAIN_SYSTEM_SUMMARY.md](SUBDOMAIN_SYSTEM_SUMMARY.md) - Subdomain system details
- [WEB-PORTAL-COMPLETE.md](WEB-PORTAL-COMPLETE.md) - Web portal status
- [BRAND-SYSTEM-COMPLETE.md](BRAND-SYSTEM-COMPLETE.md) - Brand system (deployed to main app)
- [h2-COMPLETION.md](h2-COMPLETION.md) - RGY panel completion
- [h4-FINAL-REPORT.md](h4-FINAL-REPORT.md) - Brand system deployment

### Research & Planning
- [mare-reports/](mare-reports/) - Feature research (AI usage, daily journal, RGY animations)
- [memory/](memory/) - Daily notes and implementation logs

---

## 🎯 Configuration Files

- **subdomain-config.json** - 24+ domain configurations
- **web-portal/config/** - Site configuration schemas

---

## 🔗 Related Repositories

This workspace is part of the Cubiqo ecosystem:

- **Main Cubiqo App:** `C:\Users\avloy\thecubiqo` (React/Next.js voice assistant)
- **This Workspace:** Infrastructure tools & documentation
- **cubiqo-embed:** Embedded widget (separate repo)

---

## 🚀 Deployment Status

| Component | Status | Location |
|-----------|--------|----------|
| Subdomain System | ✅ Ready | This repo |
| RGY Side Panel | ✅ Ready | This repo |
| Brand System | ✅ Deployed | thecubiqo repo |
| Keywords Panel | ✅ Deployed | thecubiqo repo |
| UI Changes | ✅ Deployed | thecubiqo repo |

---

## 🛠️ Development

### Prerequisites
```bash
node >= 18.x
npm >= 9.x
```

### Setup
```bash
npm install
```

### Key Commands
```bash
# Subdomain system
cd subdomain-system
npm run list
npm run generate -- --domain [domain]

# Test RGY panel
open canvas/side-panel.html
```

---

## 📝 Agent Context Files

This workspace includes agent configuration:
- **AGENTS.md** - Agent behavior guidelines
- **SOUL.md** - Personality & tone
- **USER.md** - User context
- **TOOLS.md** - Tool-specific notes
- **HEARTBEAT.md** - Periodic check config

---

## 🎉 Recent Completions

**February 7, 2026:**
- ✅ Subdomain system (h1 subagent)
- ✅ RGY side panel (h2 subagent)
- ✅ Brand system deployed (h4 subagent)
- ✅ Keywords panel enhanced (h2 subagent)
- ✅ UI changes deployed (h3 subagent)

---

## 📞 Support

For questions about specific components:
- **Subdomain System:** See `subdomain-system/README.md`
- **RGY Panel:** See `canvas/README-SIDE-PANEL.md`
- **Web Portal:** See `web-portal/README.md`

---

**Workspace Owner:** Ed  
**Primary Agent:** Henry (main session)  
**Last Updated:** February 7, 2026
