# Branchy - Sub-Domains Mascot 🌳

## Overview

Branchy is the friendly mascot for the Cubiqo sub-domains system. This tree-like creature makes domain management approachable, memorable, and engaging through visual storytelling and state-based representations.

## What's Included

### 📁 Files & Assets

```
sub-domains-mascot/
├── README.md                          # This file
├── MASCOT_DESIGN.md                   # Complete design specification
├── INTEGRATION_GUIDE.md               # Developer integration guide
├── IMPLEMENTATION_CHECKLIST.md        # Step-by-step implementation plan
├── demo.html                          # Interactive demo page
├── assets/
│   ├── branchy-base.svg              # Neutral/ready state
│   ├── branchy-green.svg             # Active/healthy state
│   ├── branchy-yellow.svg            # Warning/pending state
│   ├── branchy-red.svg               # Error/critical state
│   ├── branchy-blue.svg              # Focused/professional state
│   └── branchy-icon-small.svg        # Small icon version (32x32)
└── examples/
    ├── react-component.jsx            # React implementation
    ├── vue-component.vue              # Vue implementation
    └── vanilla-js.html                # Plain JavaScript example
```

## Quick Start

### 1. View the Demo

Open `demo.html` in your browser to see Branchy in action with all states and interactions.

### 2. Copy Assets

Copy the `assets/` folder to your project:

```bash
cp -r assets/ /path/to/your/project/public/mascot/
```

### 3. Basic Implementation

```html
<!-- Simple usage -->
<img src="/mascot/branchy-green.svg" alt="Active subdomain" width="100" height="100">
```

For more advanced usage, see the [Integration Guide](INTEGRATION_GUIDE.md).

## Design Philosophy

### Why Branchy?

1. **Visual Metaphor**: Tree branches naturally represent hierarchical subdomain structures
2. **Approachable**: Friendly design reduces intimidation around technical concepts
3. **State Communication**: Color-coded states provide instant status feedback
4. **Brand Alignment**: Integrates seamlessly with Cubiqo's RGY color system
5. **Memorable**: Creates strong association between mascot and feature

### The Five States

| State | Color | Meaning | Use Case |
|-------|-------|---------|----------|
| **Base** | Neutral Gray | Ready/Inactive | Default state, awaiting action |
| **Green** | #2ECC71 | Active/Healthy | Subdomain running normally |
| **Yellow** | #F39C12 | Warning/Pending | Needs attention or processing |
| **Red** | #E74C3C | Error/Critical | Immediate action required |
| **Blue** | #3498DB | Focused/Professional | Business/professional mode |

## Features

### ✨ Visual States
- 5 distinct color-coded states
- Smooth SVG animations
- Responsive design (works at any size)
- Accessible with proper alt text

### 🎨 Design Elements
- Friendly, non-threatening character
- Clear emotional expressions
- Animated branches for connection visualization
- Particle effects for status changes

### 🔧 Developer-Friendly
- Pure SVG format (scalable, small file size)
- Framework-agnostic (works anywhere)
- Easy to integrate
- Extensive documentation

### 📱 Responsive
- Works from 16x16 icons to 1024x1024 hero images
- Optimized versions for different sizes
- Touch-friendly on mobile

## Use Cases

### 1. **Subdomain Creation Flow**
Show Branchy growing new branches as subdomains are created.

### 2. **Dashboard Status Indicators**
Display multiple Branchies to represent different domains with real-time status.

### 3. **Loading States**
Use rotating branches as a friendly alternative to spinners.

### 4. **Onboarding Tutorials**
Branchy guides users through setup with helpful tips.

### 5. **Network Visualization**
Connect multiple Branchies to show domain relationships.

### 6. **Error Messages**
Red Branchy makes error states less stressful.

## Technical Specifications

### SVG Format
- Vector graphics (infinitely scalable)
- Average file size: ~3KB per state
- Embedded animations
- CSS-customizable colors

### Browser Support
- All modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with minor animation limitations)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lightweight assets (<20KB total)
- Hardware-accelerated animations
- Lazy loading support
- No external dependencies

## Integration Examples

### React
```jsx
import Branchy from './components/Branchy';

<Branchy state="green" size={100} animated={true} />
```

### Vue
```vue
<Branchy :state="domainStatus" :size="150" />
```

### Vanilla JS
```javascript
document.getElementById('branchy').src = `/mascot/branchy-${state}.svg`;
```

See [Integration Guide](INTEGRATION_GUIDE.md) for complete examples.

## Customization

### Colors
SVG files can be edited to match your brand colors. Each state uses clearly defined color variables.

### Size Variations
- **Tiny**: 16x16 - 32x32 (use branchy-icon-small.svg)
- **Small**: 64x64 - 128x128 (standard assets)
- **Medium**: 256x256 - 512x512 (all features)
- **Large**: 1024x1024+ (hero images)

### Animations
- Default: Subtle breathing and pulsing
- Custom: Modify SVG `<animate>` tags
- CSS: Add additional transitions/transforms

## Accessibility

✅ **WCAG 2.1 AA Compliant**
- Proper alt text support
- High contrast mode compatible
- Reduced motion support
- Screen reader friendly
- Keyboard navigation support

## Roadmap

### Completed ✅
- [x] Base design concept
- [x] 5 color states
- [x] SVG assets
- [x] Interactive demo
- [x] Integration documentation

### Planned 🚀
- [ ] Lottie animations for complex interactions
- [ ] Additional expressions (surprised, celebrating, sleeping)
- [ ] Seasonal variations (holidays, weather)
- [ ] User customization options
- [ ] Branchy family (related mascots for other features)
- [ ] 3D version for hero sections
- [ ] Animated stickers for messaging

## Credits

**Design Concept**: Branchy the Sub-Domains Creature  
**Created For**: Cubiqo Sub-Domains System  
**Design Philosophy**: Make technical concepts friendly and accessible  
**License**: Proprietary (Cubiqo Internal Use)

## Support

For questions, issues, or feature requests:
- Check the [Integration Guide](INTEGRATION_GUIDE.md)
- Review the [Design Document](MASCOT_DESIGN.md)
- See the [Implementation Checklist](IMPLEMENTATION_CHECKLIST.md)

## Version History

**v1.0.0** (2026-02-07)
- Initial release
- 5 complete states
- Full documentation
- Interactive demo
- Integration examples

---

**Made with ❤️ for the Cubiqo team**

*"Let's branch out together!"* 🌳
