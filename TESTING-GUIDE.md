# Testing Guide - UI Changes Implementation

## Dev Server Status ✅
- **Status:** Running successfully
- **Local URL:** http://localhost:3000
- **Network URL:** http://100.124.253.40:3000
- **Compilation:** No errors

## Quick Start Testing

### 1. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

### 2. Locate the Cube Controls
- Look below the main 3D cube display
- Find the "Cube Settings" collapsible panel
- Click to expand the panel

## Feature Testing Checklist

### ✅ Feature 1: Cube Size Toggle

**Test Steps:**
1. Expand "Cube Settings" panel
2. Locate the "Size" slider
3. Drag slider left and right
4. Observe the cube scale in real-time

**Expected Results:**
- Slider ranges from 0.5x to 2.0x
- Current size value displays above slider (e.g., "1.2x")
- Cube smoothly scales in 3D viewport
- All animations continue to work at different sizes
- No performance degradation

**Edge Cases:**
- Minimum size (0.5x): Cube should be clearly smaller but still visible
- Maximum size (2.0x): Cube should be noticeably larger but fit in viewport
- Middle value (1.0x): Should be original size

### ✅ Feature 2: Isometric Shape Changes

**Test Steps:**
1. In Cube Settings panel, locate "Shape" section
2. Two buttons: "Energy Cube" and "Isometric Diamond"
3. Click "Isometric Diamond" button
4. Observe the cube morph/transition
5. Click "Energy Cube" to switch back

**Expected Results:**
- **Energy Cube:** Flowing plasma effect with blue/purple/pink colors
  - Sparkles throughout
  - Glowing edges
  - Core orange glow
  - Smooth rotation animation

- **Isometric Diamond:** Hollow aurora effect
  - Transparent center
  - Wispy energy along edges
  - Purple/pink/cyan glow
  - Slower, subtle rotation

- Active button should be highlighted in orange
- Shape transition should be smooth
- All animations should work on both shapes

**Edge Cases:**
- Switch shapes multiple times rapidly
- Switch shapes while adjusting size
- Verify animations don't break after switching

### ✅ Feature 3: Hide/Show Eyes

**Test Steps:**
1. In Cube Settings panel, locate "Show Eyes" toggle
2. Click the toggle switch
3. Observe eyes appear on the cube (if using Energy Cube shape)
4. Move your mouse/cursor around
5. Toggle off to hide eyes

**Expected Results:**
- Toggle switch shows visual ON/OFF state
- When ON:
  - Two eyes appear on front face of Energy Cube
  - Eyes have black outer circle, glowing cyan pupils
  - Pupils track mouse/cursor movement
  - Eye tracking is smooth and responsive
- When OFF:
  - Eyes disappear
  - Cube returns to eyeless state
- Note below toggle explains feature availability

**Important Notes:**
- Eyes are more visible on "Energy Cube" shape
- Eye tracking works best with mouse movement
- Isometric Diamond may not show eyes (by design)

### ✅ Feature 4: Settings Persistence

**Test Steps:**
1. Adjust size to a specific value (e.g., 1.5x)
2. Switch to "Isometric Diamond"
3. Turn "Show Eyes" ON
4. Refresh the page (F5 or Ctrl+R)
5. Expand Cube Settings panel

**Expected Results:**
- Size slider should be at 1.5x
- "Isometric Diamond" should be selected
- "Show Eyes" should be ON
- All settings restored exactly as set
- Works across browser sessions

**Testing Different Scenarios:**
- Set various combinations, refresh each time
- Close tab and reopen localhost:3000
- Clear localStorage to reset (via browser DevTools)

## Visual Testing

### Size Testing Matrix
Test each size with each shape:

| Size | Energy Cube | Isometric Diamond | Eyes Visible |
|------|-------------|-------------------|--------------|
| 0.5x | ✓ Test      | ✓ Test            | ✓ Test       |
| 1.0x | ✓ Test      | ✓ Test            | ✓ Test       |
| 1.5x | ✓ Test      | ✓ Test            | ✓ Test       |
| 2.0x | ✓ Test      | ✓ Test            | ✓ Test       |

### Animation Continuity
Verify these animations work at all sizes and shapes:
- Gentle floating/bobbing
- Rotation (slower on isometric)
- Glow/breathing effect
- Mouse tracking (cube tilt)
- Speaking animation (when chat is active)
- Listening animation (when recording)

## Performance Testing

### Metrics to Observe:
1. **Frame Rate**
   - Open browser DevTools (F12)
   - Check FPS in Performance panel
   - Should maintain 60fps or close to it
   - Test at largest size (2.0x)

2. **Memory Usage**
   - Monitor in DevTools Memory panel
   - Switch shapes multiple times
   - Adjust size repeatedly
   - Should not have memory leaks

3. **Load Time**
   - First page load
   - Shape switching delay
   - Settings restoration speed

## Browser Compatibility

Test in these browsers (if available):
- [ ] Chrome/Edge (recommended for voice features)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (responsive testing)

## Mobile/Responsive Testing

If testing on mobile or tablet:
1. Settings panel should be touch-friendly
2. Slider should work with touch
3. Buttons should be tappable
4. Cube should fit viewport at all sizes
5. Eye tracking might not work (no mouse)

## Troubleshooting

### Issue: Settings panel not visible
**Solution:** Scroll down below the cube display

### Issue: Eyes not appearing
**Check:** 
- Is "Show Eyes" toggle ON?
- Are you using "Energy Cube" shape?
- Eyes might be subtle - look at front face

### Issue: Size not changing
**Check:**
- Try different values on slider
- Check console for errors (F12)
- Refresh page to reset

### Issue: Settings not persisting
**Check:**
- Browser localStorage enabled?
- Private/incognito mode disables persistence
- Check browser console for storage errors

### Issue: Shape not switching
**Check:**
- Click button multiple times
- Check console for errors
- Try refreshing page

## Developer Testing (Optional)

### Browser Console Checks:
```javascript
// Check localStorage
localStorage.getItem('cubiqo_cube_size')
localStorage.getItem('cubiqo_shape_type')
localStorage.getItem('cubiqo_show_eyes')

// Clear settings (to test defaults)
localStorage.clear()
```

### React DevTools:
- Install React DevTools extension
- Inspect CubiQoApp component state
- Verify state updates on control changes

## Acceptance Criteria

Implementation is successful if:
- [x] All three features implemented
- [ ] Size slider works smoothly (0.5x - 2.0x)
- [ ] Shape toggle switches between two distinct cubes
- [ ] Eyes can be shown/hidden
- [ ] Settings persist across refreshes
- [ ] No console errors
- [ ] Animations work at all configurations
- [ ] UI is intuitive and responsive
- [ ] Performance is acceptable (60fps target)

## Known Limitations

1. **Eyes on Isometric Diamond:** May not be visible or may appear differently (by design)
2. **Touch Devices:** Eye tracking requires cursor movement (won't work on touch-only)
3. **Older Browsers:** WebGL required for 3D rendering
4. **Performance:** Very large sizes (2.0x) may impact FPS on lower-end devices

## Feedback Collection

When testing, note:
- User experience (intuitive? confusing?)
- Visual quality at different sizes
- Favorite shape/configuration
- Any bugs or unexpected behavior
- Performance on your device
- Suggestions for improvements

## Next Steps After Testing

If all tests pass:
1. Document any issues found
2. Create list of refinements (if needed)
3. Prepare for code review
4. Plan deployment strategy
5. Consider user documentation

If issues found:
1. Document specific scenarios
2. Check browser console for errors
3. Note device/browser information
4. Report to development team

---

**Test Server Running:** http://localhost:3000  
**Ready for Testing:** YES ✅  
**Expected Test Duration:** 15-20 minutes for full testing  
**Priority:** P1 (High Priority)
