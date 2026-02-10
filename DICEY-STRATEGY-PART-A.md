# Dicey Strategy - Part A: Business Model & Architecture

**Date:** February 7, 2026  
**Purpose:** Define Dicey's role as the monetization layer for CubiQo ecosystem

---

## Core Concept

**CubiQo = Pure AI Assistant** (Voice, conversation, clean UX)  
**Dicey = Commerce & Recommendations Engine** (Shopping, affiliates, money)

### Why Separate?

1. **Brand Purity** - CubiQo stays focused on being helpful, not salesy
2. **User Trust** - No perception that CubiQo is pushing products for commission
3. **Scalability** - Dicey can be white-labeled or spun off
4. **Compliance** - Easier to manage FTC disclosure, affiliate regulations

---

## Architecture

### User Flow

```
User: "Best laptop under $1000?"
         ↓
CubiQo: "I'll check Dicey for you..."
         ↓
Deep link to Dicey.ai
         ↓
Dicey shows:
- AI-generated comparison
- Product recommendations
- Affiliate links
- Price tracking
- Reviews aggregation
         ↓
User clicks → purchases → Commission
```

### Technical Integration

```
┌─────────────────┐
│   CubiQo.ai     │ ← User starts here
│  (AI Assistant) │    Voice interface
└────────┬────────┘    Conversation
         │
         │ Deep link with context
         ↓
┌─────────────────┐
│   Dicey.ai      │ ← Commerce happens here
│  (Recommendations)│  Product search
└────────┬────────┘    Affiliate links
         │
         │ Purchase redirect
         ↓
┌─────────────────┐
│  Amazon/Shopify │ ← Money flows
│  (Merchant)     │    Commission earned
└─────────────────┘
```

---

## Domain Strategy

### CubiQo Domains (Clean)
- **cubiqo.com** - Main product site
- **cubiqo.ai** - AI assistant interface
- **cubiqo.life** - Philosophy/color theory
- **cubiqo.blog** - Content marketing

### Dicey Domains (Commerce)
- **thedicey.com** - Main product site
- **thediceyai.com / thedicey.ai** - Recommendations engine
- **feelingdicey.com** - Merchandise store
- **dicey.co.in** - India regional variant

---

## Revenue Model

### Dicey's Income Streams

1. **Affiliate Commissions** (Primary)
   - Amazon Associates: 1-10%
   - Software/SaaS: 20-50% recurring
   - Fashion/lifestyle: 5-15%
   - Target: $5k/month at 1M users

2. **Merchandise** (Secondary)
   - Dicey-branded products
   - Print-on-demand via Printify
   - Dropshipping via Shopify

3. **Subscription Tiers** (Future)
   - Free: Basic recommendations
   - Pro ($5/mo): Price tracking, alerts
   - Business ($50/mo): API access, white-label

4. **Data Insights** (Long-term)
   - Aggregated shopping trends (anonymized)
   - Sell to brands/agencies
   - Only with user consent

---

## Value Proposition

### For Users

**CubiQo gives advice. Dicey helps you shop.**

- Unbiased product comparisons
- Price tracking & alerts
- Deal discovery
- Shopping history
- Wishlist management
- No spam, no pressure

### For Brands/Merchants

- Access to engaged shoppers
- Contextual placement (user asked for it!)
- Performance-based (only pay for conversions)
- Premium shoppers (AI users = tech-savvy, higher income)

---

## Differentiation

### vs Amazon/Google Shopping
- **Conversational:** Ask naturally, get recommendations
- **Contextual:** Based on your actual needs, not just keywords
- **Transparent:** Clear affiliate disclosure, genuine advice
- **Personalized:** Learns your preferences over time

### vs Honey/Rakuten
- **Proactive:** Recommends before you search
- **AI-powered:** Understands nuance, not just price
- **Multi-merchant:** Not locked to one platform
- **Lifestyle integration:** Part of your daily AI assistant

---

## User Journey

### Phase 1: Discovery (via CubiQo)

User: "I need new running shoes"  
CubiQo: "What's your budget and running style?"  
User: "Under $150, road running"  
CubiQo: "Let me check Dicey for the best options..."

### Phase 2: Comparison (Dicey takes over)

Dicey shows:
```
🏃 Best Running Shoes Under $150

1. Nike Pegasus 40 ($130)
   ✅ Great cushioning, durable
   ⭐ 4.7/5 (12,340 reviews)
   🔗 [View on Amazon]

2. ASICS Gel-Kayano 30 ($140)
   ✅ Stability, wide fit available
   ⭐ 4.6/5 (8,920 reviews)
   🔗 [View on Amazon]

3. Brooks Ghost 15 ($145)
   ✅ Neutral, lightweight
   ⭐ 4.8/5 (15,680 reviews)
   🔗 [View on Amazon]
```

### Phase 3: Purchase

User clicks → redirected to merchant with affiliate tag → purchases → Dicey earns commission

### Phase 4: Post-Purchase

- "How are your Nike Pegasus working out?"
- Price drop alerts on wishlist items
- Complementary product suggestions (socks, insoles)

---

## Privacy & Ethics

### Principles

1. **User-First:** Recommendations serve the user, not commission rates
2. **Transparent:** Clear disclosure of affiliate relationships
3. **Opt-In:** Users choose to use Dicey
4. **No Spam:** Never proactively push products
5. **Data Privacy:** Shopping history stays private

### FTC Compliance

Every Dicey page includes:
> "Dicey earns a commission when you purchase through our links. This helps us provide free recommendations while staying independent."

### User Controls

- Turn off recommendations entirely
- View all tracked preferences
- Clear shopping history
- Export your data

---

## Technical Stack

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Components

### Backend
- **Supabase** - Database, auth
- **Vercel** - Hosting
- **Redis** - Caching, real-time data

### Integrations
- **Amazon Product API** - Product search
- **Shopify Buy Button** - Own merch
- **Printify API** - Print-on-demand
- **Google Analytics** - Tracking
- **Stripe** - Payments (for subscriptions)

### AI Layer
- **OpenAI GPT-4** - Product comparison, summaries
- **Claude** - Contextual analysis
- **Ollama (local)** - Privacy-sensitive queries

---

## Monetization Timeline

### Month 1-3: Foundation
- Build core recommendation engine
- Integrate Amazon Associates
- Launch MVP with CubiQo deep links
- Target: 100 users, $50/month

### Month 4-6: Scale
- Add ShareASale, CJ Affiliate
- Launch merchandise store
- Improve personalization
- Target: 10k users, $500/month

### Month 7-12: Expand
- SaaS affiliate programs (high commission)
- Subscription tiers
- API for developers
- Target: 100k users, $5k/month

### Year 2+: Enterprise
- White-label for brands
- Data insights product
- B2B partnerships
- Target: 1M users, $50k/month

---

## Competitive Analysis

### Direct Competitors

**Honey (PayPal)**
- Strengths: Browser extension, large user base
- Weakness: Only saves money, doesn't recommend

**Rakuten**
- Strengths: Cashback model, trusted brand
- Weakness: Not conversational, limited to partners

**Wirecutter (NYT)**
- Strengths: In-depth reviews, credibility
- Weakness: Not personalized, slow content cycle

### Dicey's Edge

1. **AI-Native:** Built for voice/chat from day one
2. **Contextual:** Recommendations based on conversation, not search
3. **Real-Time:** Up-to-date prices, availability
4. **Multi-Modal:** Works with CubiQo voice, text, video
5. **Lifestyle Integration:** Part of your AI assistant, not a separate tool

---

## Key Metrics

### User Engagement
- Click-through rate (CTR) on recommendations
- Conversion rate (purchase vs view)
- Average order value
- Return visit rate

### Revenue
- Commission per user
- Monthly recurring revenue (subscriptions)
- Customer lifetime value (LTV)
- Cost per acquisition (CPA)

### Quality
- Recommendation relevance score
- User satisfaction (NPS)
- Purchase regret rate
- Support ticket volume

### Growth
- New users/month
- Referral rate
- Social sharing
- Organic search traffic

---

## Success Criteria

### Year 1 Goals
- ✅ 100k active users
- ✅ $5k/month revenue
- ✅ 3% conversion rate
- ✅ 60+ NPS score
- ✅ 5 major affiliate partnerships

### Year 2 Goals
- ✅ 1M active users
- ✅ $50k/month revenue
- ✅ Subscription product launched
- ✅ Break-even on operating costs
- ✅ Team of 3-5 people

### Year 3 Goals
- ✅ 5M active users
- ✅ $500k/month revenue
- ✅ Profitability
- ✅ Series A funding or exit opportunity

---

## Next Steps

1. **Build MVP** - Basic recommendation engine + Amazon integration
2. **Integrate with CubiQo** - Deep linking working end-to-end
3. **Launch Beta** - 100 users, gather feedback
4. **Iterate** - Improve based on real usage data
5. **Scale** - Add affiliates, features, users

---

**Dicey = The commerce layer that makes CubiQo financially sustainable while keeping it pure.**
