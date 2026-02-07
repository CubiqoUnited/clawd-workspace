# RGY Side Panel - Integration Guide

## Overview

The RGY (Red/Yellow/Green) Side Panel is a keyword management interface for Cubiqo that allows users to organize their preferences across three color-coded zones:

- **Red Zone**: Dating, adult content, indulgence
- **Yellow Zone**: Social, friends, platonic hangouts  
- **Green Zone**: Work, trade, wellness, achievement

## Requirements Met (P1 Priority)

✅ **Main Component:**
- Colors are visible to user (Red/Yellow/Green with distinct visual indicators)
- Keywords per color zone are visible to user
- Keywords are editable by the user (add/remove functionality)

✅ **Sub-Component:**
- Panel includes 4 disclaimers as required

## Files Included

1. **side-panel.html** - Standalone demo page
2. **side-panel-component.js** - Reusable JavaScript class
3. **side-panel.css** - Complete styling
4. **SIDE-PANEL-INTEGRATION.md** - This document

## Quick Start

### Option 1: Standalone Page

Simply open `side-panel.html` in a browser to see the full implementation.

### Option 2: Integrate into Existing Frontend

#### Step 1: Include CSS

```html
<link rel="stylesheet" href="side-panel.css">
```

#### Step 2: Include JavaScript

```html
<script src="side-panel-component.js"></script>
```

#### Step 3: Add Container HTML

```html
<div id="rgy-side-panel" class="side-panel"></div>
```

#### Step 4: Initialize Component

```javascript
const sidePanel = new RGYSidePanel('rgy-side-panel', {
  // Optional configuration
  storageKey: 'rgy-keywords',
  defaultKeywords: {
    red: ['dating', 'romance', 'nightlife'],
    yellow: ['friends', 'hangout', 'coffee', 'movies'],
    green: ['networking', 'freelance', 'IT development', 'wellness']
  },
  // Optional callbacks
  onKeywordAdd: (color, keyword) => {
    console.log(`Added "${keyword}" to ${color} zone`);
  },
  onKeywordRemove: (color, keyword) => {
    console.log(`Removed "${keyword}" from ${color} zone`);
  },
  onKeywordsChange: (allKeywords) => {
    console.log('Keywords updated:', allKeywords);
    // Send to backend API
    // sendToBackend(allKeywords);
  }
});
```

## API Reference

### Constructor

```javascript
new RGYSidePanel(containerId, options)
```

**Parameters:**
- `containerId` (string): ID of the DOM element to render the panel into
- `options` (object): Configuration options

**Options:**
- `storageKey` (string): localStorage key for persisting keywords (default: 'rgy-keywords')
- `defaultKeywords` (object): Initial keywords for each color zone
- `onKeywordAdd` (function): Callback when keyword is added `(color, keyword) => {}`
- `onKeywordRemove` (function): Callback when keyword is removed `(color, keyword) => {}`
- `onKeywordsChange` (function): Callback when any keyword changes `(allKeywords) => {}`

### Methods

#### `getKeywords(color)`
Returns array of keywords for a specific color zone.

```javascript
const redKeywords = sidePanel.getKeywords('red');
// ['dating', 'romance', 'nightlife']
```

#### `getAllKeywords()`
Returns object with all keywords for all zones.

```javascript
const allKeywords = sidePanel.getAllKeywords();
// {
//   red: ['dating', 'romance'],
//   yellow: ['friends', 'hangout'],
//   green: ['networking', 'wellness']
// }
```

#### `addKeyword(color, keyword)`
Programmatically add a keyword to a zone. Returns `true` if successful, `false` if duplicate.

```javascript
const success = sidePanel.addKeyword('yellow', 'hiking');
```

#### `removeKeyword(color, keyword)`
Programmatically remove a keyword from a zone.

```javascript
sidePanel.removeKeyword('red', 'nightlife');
```

#### `toggleZone(color)`
Expand/collapse a specific color zone.

```javascript
sidePanel.toggleZone('green');
```

#### `destroy()`
Clean up and remove the panel from the DOM.

```javascript
sidePanel.destroy();
```

## Backend Integration

### Syncing with Backend

You can sync keywords with your backend using the `onKeywordsChange` callback:

```javascript
const sidePanel = new RGYSidePanel('rgy-side-panel', {
  onKeywordsChange: async (keywords) => {
    try {
      await fetch('/api/user/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords })
      });
    } catch (error) {
      console.error('Failed to sync keywords:', error);
    }
  }
});
```

### Loading Keywords from Backend

```javascript
// Fetch user's keywords from backend
fetch('/api/user/keywords')
  .then(res => res.json())
  .then(data => {
    const sidePanel = new RGYSidePanel('rgy-side-panel', {
      defaultKeywords: data.keywords
    });
  });
```

## Data Structure

Keywords are stored in the following format:

```json
{
  "red": ["dating", "romance", "nightlife"],
  "yellow": ["friends", "hangout", "coffee", "movies"],
  "green": ["networking", "freelance", "IT development", "wellness"]
}
```

This structure is:
- Saved to `localStorage` for persistence
- Passed to callback functions
- Easily serializable for API communication

## Customization

### Color Scheme

To customize colors, modify the CSS variables:

```css
.color-zone.red {
  border-color: #FF4444; /* Your red */
  box-shadow: 0 0 20px rgba(255, 68, 68, 0.15);
}

.red .color-indicator {
  background: #FF4444; /* Your red */
}
```

### Zone Descriptions

Modify descriptions by editing the `renderZone()` method in the component:

```javascript
renderZone('red', 'Red Zone', 'Your custom description here')
```

### Panel Width

Adjust the panel width in CSS:

```css
.side-panel {
  width: 380px; /* Change to desired width */
}
```

### Disclaimers

Edit disclaimers in the `render()` method of the component or directly in HTML.

## Features

✅ **Color-Coded Zones**: Clear visual distinction between Red, Yellow, and Green
✅ **Keyword Management**: Add and remove keywords with ease
✅ **Persistent Storage**: Keywords saved to localStorage
✅ **Responsive Design**: Works on desktop and mobile
✅ **Smooth Animations**: Expand/collapse zones with transitions
✅ **Editable Interface**: Click-to-add, click-to-remove functionality
✅ **Disclaimers**: 4 disclaimers as required in footer
✅ **Event Callbacks**: Hook into keyword changes for backend sync
✅ **Standalone & Reusable**: Works as standalone page or integrated component

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Testing

### Manual Testing Checklist

- [ ] Panel renders with all three color zones
- [ ] Each zone can expand/collapse
- [ ] Keywords can be added via input + button
- [ ] Keywords can be added via Enter key
- [ ] Keywords can be removed via × button
- [ ] Duplicate keywords are rejected
- [ ] Keywords persist after page reload (localStorage)
- [ ] All disclaimers are visible in footer
- [ ] Colors are visually distinct (Red/Yellow/Green)
- [ ] Panel is responsive on mobile devices

### Automated Testing

Example Jest test:

```javascript
describe('RGYSidePanel', () => {
  let container;
  let panel;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
    panel = new RGYSidePanel('test-container');
  });

  afterEach(() => {
    panel.destroy();
    document.body.removeChild(container);
  });

  test('should add keyword successfully', () => {
    const result = panel.addKeyword('red', 'test-keyword');
    expect(result).toBe(true);
    expect(panel.getKeywords('red')).toContain('test-keyword');
  });

  test('should reject duplicate keywords', () => {
    panel.addKeyword('yellow', 'duplicate');
    const result = panel.addKeyword('yellow', 'duplicate');
    expect(result).toBe(false);
  });

  test('should remove keyword successfully', () => {
    panel.addKeyword('green', 'remove-me');
    panel.removeKeyword('green', 'remove-me');
    expect(panel.getKeywords('green')).not.toContain('remove-me');
  });
});
```

## Performance

- **Lightweight**: ~20KB total (JS + CSS)
- **No dependencies**: Pure vanilla JavaScript
- **Fast rendering**: Minimal DOM operations
- **Efficient storage**: Uses native localStorage

## Security Considerations

1. **XSS Prevention**: All user input is properly escaped before rendering
2. **Storage Limits**: localStorage has ~5-10MB limit (sufficient for keywords)
3. **No sensitive data**: Keywords are user preferences, not sensitive info
4. **Client-side only**: No automatic backend transmission unless configured

## Roadmap / Future Enhancements

- [ ] Keyword suggestions based on conversation analysis
- [ ] Drag-and-drop reordering of keywords
- [ ] Import/export keywords as JSON
- [ ] Search/filter within keywords
- [ ] Tag-based grouping within zones
- [ ] Visual analytics (most used keywords)
- [ ] Keyboard shortcuts for power users

## Support & Issues

For issues or questions, please refer to:
- Requirements document: `requirements-doc-1.docx` (Item #18)
- Main Cubiqo documentation
- Contact development team

## License

This component is part of the Cubiqo project and follows the same licensing as the parent project.

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-07  
**Priority**: P1 (Complete)
