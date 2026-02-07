# Branchy Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: See the Demo
```bash
# Open in your browser
demo.html
```

### Step 2: Copy Assets
```bash
# Copy to your project
cp -r assets/ /path/to/your/project/public/mascot/
```

### Step 3: Use It

**HTML:**
```html
<img src="/mascot/branchy-green.svg" alt="Active" width="100" height="100">
```

**React:**
```jsx
import Branchy from './components/Branchy';

<Branchy state="green" size={100} />
```

**State Mapping:**
```javascript
const statusMap = {
  'active': 'green',
  'pending': 'yellow',
  'error': 'red',
  'processing': 'blue',
  'inactive': 'base'
};
```

### Step 4: Style It

Add `Branchy.css` or use your own styles. That's it!

## 🎨 The 5 States

| State | File | Use When |
|-------|------|----------|
| 🟢 Green | `branchy-green.svg` | Subdomain is healthy |
| 🟡 Yellow | `branchy-yellow.svg` | Needs attention |
| 🔴 Red | `branchy-red.svg` | Error occurred |
| 🔵 Blue | `branchy-blue.svg` | Processing/focused |
| ⚪ Base | `branchy-base.svg` | Neutral/ready |

## 📱 Sizes

- **16-32px:** Use `branchy-icon-small.svg`
- **64-256px:** Use standard assets
- **512px+:** All features work

## 🔗 Learn More

- Full guide: `INTEGRATION_GUIDE.md`
- Design details: `MASCOT_DESIGN.md`
- Implementation: `IMPLEMENTATION_CHECKLIST.md`

---

**That's it! You're ready to use Branchy.** 🌳
