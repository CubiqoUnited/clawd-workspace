# MEMORY.md - Long-Term Memory

## Project: CubiQo Web Portal

### Project Overview
A comprehensive web portal platform with visual website builder, analytics, e-commerce, and deployment automation. Inspired by modularapp.preview.emergentagent.com but focused on website creation and management.

### Key Features Implemented

#### 1. Core Web Portal (Completed)
- **Landing Page**: Modern design with 3D animations, responsive layout
- **Admin Dashboard**: Analytics, site management, order tracking
- **Deployment**: Vercel integration with automatic deployment
- **Authentication**: Fixed Vercel authentication issues for public access

#### 2. Website Designer System (In Progress - 40% Complete)
**Started**: February 9, 2026, 2:40 AM
**Status**: Core canvas and interaction working, UI components in progress

**Components Created:**
- `/app/designer/page.tsx` - Main designer interface
- `DesignerCanvas` - Interactive canvas with drag-and-drop
- **Planned**: ComponentsPanel, PropertiesPanel, Toolbar, PreviewPanel

**Features:**
- 1200×800px canvas with zoom (25-200%)
- Element types: Container, Text, Image, Button
- Drag to move elements with visual feedback
- Select tool and element-specific tools
- Grid display and preview mode toggle
- JSON export/import functionality

**Technical Implementation:**
- React hooks for state management
- Custom drag-and-drop with mouse events
- CSS transforms for zoom system
- Mobile-responsive with bottom tabs
- Preview mode for testing interactions

### Technical Stack
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Language**: TypeScript

### Lessons Learned

#### Deployment Issues
1. **Vercel Authentication**: Project-level setting that blocks public access
   - **Solution**: Disable in Settings → Authentication
   - **Impact**: Caused 401 Unauthorized for users
2. **React Hydration**: CSS can work while React fails
   - **Solution**: Hard refresh (Ctrl+Shift+R) clears cache
   - **Diagnosis**: "Animation on left, blank screen" indicates CSS working, React failing
3. **Import Errors**: Broken designer page had missing component imports
   - **Solution**: Rebuilding with proper component structure

#### User Preferences
- **Execution over planning**: Prefers "just build it" approach
- **Visual feedback**: Screenshots helpful for debugging
- **Complete systems**: Wants end-to-end solutions (design, deploy, SEO, analytics)
- **Direct communication**: Step-by-step guidance appreciated

### Development Patterns

#### File Structure
```
web-portal/
├── app/                    # Next.js app router
│   ├── page.tsx           # Landing page
│   ├── admin/             # Admin dashboard
│   └── designer/          # Website designer (new)
├── components/            # React components
│   └── designer/          # Designer components
├── lib/                   # Utilities and shared code
├── sites/                 # Generated site templates
└── public/                # Static assets
```

#### Component Design
- **Client Components**: Use 'use client' directive for interactivity
- **State Management**: React hooks for local state
- **Props Interface**: TypeScript interfaces for component props
- **Error Handling**: Try-catch for API calls, loading states

### Future Development Priorities

#### Short-term (Next 24-48 hours)
1. Complete website designer system (remaining 60%)
2. Add SEO automation tools
3. Implement analytics dashboard
4. Create deployment pipeline

#### Medium-term (Next week)
1. E-commerce integration
2. Template library
3. User authentication
4. Team collaboration features

#### Long-term
1. AI-assisted design
2. Performance optimization
3. Multi-language support
4. Plugin ecosystem

### Important Decisions

1. **Technology Choice**: Next.js for SSR and performance
2. **Design System**: Tailwind CSS for rapid development
3. **Deployment**: Vercel for simplicity and integration
4. **State Management**: React hooks (no Redux/Zustand for now)
5. **Component Architecture**: Modular, reusable components

### User Context
- **Name**: Avloy (from Telegram username)
- **Project**: Building comprehensive web tools
- **Style**: Prefers working systems over documentation
- **Communication**: Direct, technical, solution-oriented
- **Environment**: Windows development, Vercel deployment

### Success Metrics
- ✅ Web portal deployed and publicly accessible
- ✅ All content rendering correctly
- ✅ Responsive design working
- ✅ Animations functional
- ⏳ Designer system in progress
- ⏳ Additional features planned

---

*Last Updated: February 9, 2026, 2:45 AM*
*Next Review: After designer system completion*