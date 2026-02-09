# CubiQo.com Product Website - Site Plan

**Status:** Preparation Phase  
**Domain:** www.cubiqo.com  
**Template:** cubiqo-rolldown (custom landing page)  
**Launch Target:** TBD

---

## Asset Inventory

### Images
- `hero-cubiqo-worlds.jpg` - Main hero with character grid
- `features-multi-model.jpg` - Multi-Model AI System section
- `features-intelligence.jpg` - Intelligence, Reimagined section
- `features-mobile-app.jpg` - Mobile app mockups
- `cube-glow.jpg` - Brand asset (glowing cube)
- `animation.mp4` - Hero animation (if needed)

### Brand Elements
- **Colors:** Purple/blue/cyan neon gradient (#9333EA → #3B82F6 → #06B6D4)
- **Background:** Dark (#000000) with tech grid overlay
- **Typography:** Modern sans-serif, bold headlines
- **Style:** Cyberpunk/neon, 3D cubes, glowing effects

---

## Page Structure

### 1. Hero Section
**Visual:** `hero-cubiqo-worlds.jpg`

**Content:**
```
CUBIQO WORLDS
Meet the faces that power your universe.

[Character Cards Grid]
- Cubiqo Worlds: "The Mind That Connects All Worlds"
- Dicey: "Don't be Dicey, Get Dicey"
- Headlines: [News cube]
- Coz Everyone: "Deserves a Break"
- Vocspad: [Waveform cube]
- Settings: "Your World. Your Rules."

[CTA: Get Free Access]
```

**Tech:** 3D cube grid animation, parallax scrolling

---

### 2. Multi-Model AI System
**Visual:** `features-multi-model.jpg`

**Content:**
```
Multi-Model AI System
Built for Privacy

Cubiqo intelligently routes your requests to the most suitable AI model—
whether Claude, OpenAI, or specialized systems—ensuring optimal 
performance for every task. Your data remains abstract and never stored. 
Always secure.

Core Principles:
• Zero data retention—conversations exist only in transit
• Intelligent routing to optimal AI models per context
• Abstract understanding through visual semantics
• End-to-end encryption on all communications

[Video testimonials section: 3 user videos]
```

---

### 3. Intelligence, Reimagined
**Visual:** `features-intelligence.jpg`

**Content:**
```
Intelligence, Reimagined

Capabilities:
[4 Feature Cards]
- BYO Mode
- Zero Storage Mode
- Co-Op Wallet
- Context Awareness

The Cooperative V.A. The World Needs
[CERTIFIED CO OP ASSIST badge]

Features:
• Zero Data Retention
  Conversations exist only in transit. No logs, no behavioral tracking.
  
• End-to-End Encryption
  Military-grade security on all communications.
  
• Private Mode Deployment
  Run on your infrastructure with full control.
  
• Team Collaboration
  Shared workspaces with role-based access.

• Multi-Model Intelligence
  Routes requests to optimal AI—Claude for reasoning, OpenAI for 
  creativity, specialized models for domain tasks.
  
• Voice & Text Interface
  Natural speech recognition and text I/O. Switch seamlessly.
  
• Intelligent Scheduling
  Email and calendar management with context.
  
• API Integration
  Connect with your existing tools. Extensible platform.
```

---

### 4. Complete Assistant
**Visual:** `features-mobile-app.jpg`

**Content:**
```
Privacy Architecture
No conversation logs. No behavioral tracking. Abstract processing 
ensures your data never exists in concrete form.

Intelligent Routing
Automatically selects the optimal AI model for each request—Claude 
for reasoning, OpenAI for creativity, specialized models for domain tasks.

Complete Assistant
Voice commands, email management, calendar coordination, document 
analysis—unified through a single, secure interface.

[Mobile App Screenshots]
- Card wallet UI
- Dashboard/Leaderboard
- CubiQo Worlds interface
```

---

### 5. Features Grid (Below Fold)

**Layout:** 3-column grid

**Features:**
1. **Privacy First**
   - Icon: Shield
   - Zero data retention
   - End-to-end encryption
   - Private mode deployment

2. **Multi-Model Intelligence**
   - Icon: Brain/Network
   - Claude, OpenAI, specialized models
   - Intelligent routing per context
   - Best tool for every task

3. **Voice & Text**
   - Icon: Microphone/Keyboard
   - Natural speech recognition
   - Text commands
   - Seamless switching

4. **Context Aware**
   - Icon: Eye/Brain
   - Learns preferences (locally)
   - Remembers conversations
   - Anticipates needs

5. **Team Collaboration**
   - Icon: People
   - Shared workspaces
   - Role-based access
   - Secure coordination

6. **API Integration**
   - Icon: Plug/Network
   - Connect existing tools
   - Extensible platform
   - Custom workflows

---

### 6. CTA Section

**Content:**
```
Ready to Experience Intelligence, Reimagined?

Start with free access. No credit card required.

[Button: Get Free Access]

Trusted by individuals and teams who demand more.
```

---

### 7. Footer

**Sections:**
- **Product:** Features, Pricing, Merch (cubiqo.shop)
- **Company:** Team (cubiqo.team), Blog (cubiqo.blog), Contact
- **Legal:** Privacy, Terms, Certified CO OP
- **Social:** Links TBD

---

## Technical Specifications

### Performance Targets
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse Score: 95+

### Features to Implement
- [x] Hero with 3D cube grid animation
- [x] Parallax scrolling sections
- [x] Video embed for testimonials
- [x] Mobile app mockup carousel
- [x] Smooth scroll navigation
- [x] Responsive design (mobile-first)
- [x] SEO optimization
- [x] Analytics integration

### Animations
- Cube grid: Floating cubes with glow effect
- Section transitions: Fade + parallax
- Character cards: Hover effects (glow, scale)
- CTA buttons: Pulse glow on hover

---

## Content Requirements

### Copy Needed
- [x] Hero tagline (provided)
- [x] Feature descriptions (provided)
- [x] CTA text (provided)
- [ ] Testimonial quotes (if not using video)
- [ ] Meta description for SEO
- [ ] Open Graph description

### Media Needed
- [x] All hero images (provided)
- [x] Feature section images (provided)
- [x] Mobile mockups (provided)
- [x] Animation video (provided)
- [ ] Favicon (cube icon)
- [ ] Open Graph image (1200x630)
- [ ] App store badges (if applicable)

---

## SEO Strategy

### Primary Keywords
- Multi-model AI assistant
- Private AI platform
- Secure AI assistant
- Cooperative AI
- BYO AI model

### Meta Tags
```html
<title>CubiQo - Intelligence, Reimagined | Multi-Model AI Platform</title>
<meta name="description" content="Private, secure, multi-model AI assistant. Routes to optimal models—Claude, OpenAI, specialized systems. Zero data retention. Your intelligence, your rules.">
<meta property="og:title" content="CubiQo - Intelligence, Reimagined">
<meta property="og:description" content="The Cooperative V.A. The World Needs. Private by design.">
<meta property="og:image" content="/og-image.jpg">
```

---

## Deployment Plan

### Phase 1: Structure (Day 1)
- Create Next.js pages
- Set up routing
- Component scaffolding

### Phase 2: Styling (Day 2)
- Implement design system
- Add animations
- Responsive breakpoints

### Phase 3: Content (Day 3)
- Insert copy
- Optimize images
- Add videos

### Phase 4: Polish (Day 4)
- SEO optimization
- Performance tuning
- Cross-browser testing

### Phase 5: Launch (Day 5)
- DNS configuration
- SSL setup
- Analytics integration
- Go live

---

## Notes

- All assets stored in `web-portal/assets/cubiqo-com/`
- Character creation module on hold (focus on product site)
- Template uses existing cubiqo-rolldown foundation
- Mobile-first design required (50%+ traffic from mobile expected)

---

**Status:** Ready for development  
**Next Step:** Create page components and wire up content
