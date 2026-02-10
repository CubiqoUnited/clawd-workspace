# UI Changes Implementation Plan - Cubiqo.ai

## Requirements (P1, 1-3 Story Points)
From requirements-doc-1.docx:

1. **Cube Size Toggle** - Give users control to increase/decrease CubiQo size
2. **Isometric Shape Changes** - Turn it to an isometric diamond shape  
3. **Hide Eyes Feature** - Ability to hide the eyes

## Current Architecture Analysis

### Cube Components Located:
- `src/components/cube/Cube.tsx` - Main cube with eyes (currently not used in main app)
- `src/components/FlowingEnergyCube.tsx` - Currently active cube (no eyes)
- `src/components/cube/IsometricCube.tsx` - Already exists for diamond shape!
- `src/components/cube/CubeScene.tsx` - Canvas wrapper that renders FlowingEnergyCube
- `src/components/CubiQoApp.tsx` - Main app component

### Key Findings:
1. The main app uses `FlowingEnergyCube` which has NO eyes
2. There's a `Cube.tsx` component WITH eyes but it's not currently used
3. `IsometricCube.tsx` already exists and implements the diamond/aurora shape
4. Need to add UI controls and state management for toggling between shapes and sizes

## Implementation Strategy

### 1. Create Settings Control Panel Component
**File:** `src/components/CubeControls.tsx`
- Size slider (scale 0.5x to 2x)
- Shape toggle (Cube vs Isometric Diamond)
- Eye visibility toggle (only relevant for Cube shape)

### 2. Modify CubeScene Component
**File:** `src/components/cube/CubeScene.tsx`
- Accept props: `cubeSize`, `shapeType`, `showEyes`
- Conditional rendering between FlowingEnergyCube and IsometricCube
- Pass scale prop to adjust size

### 3. Update CubiQoApp Component  
**File:** `src/components/CubiQoApp.tsx`
- Add state for: cubeSize, shapeType, showEyes
- Persist preferences to localStorage
- Render CubeControls component
- Pass settings to CubeScene

### 4. Modify Cube Component (for eyes)
**File:** `src/components/cube/Cube.tsx`
- Accept `showEyes` prop
- Conditionally render eyes group based on prop

### 5. Create FlowingEnergyCube with Eyes variant
**File:** `src/components/FlowingEnergyCubeWithEyes.tsx`
- Clone FlowingEnergyCube and add eyes similar to Cube.tsx
- Eyes should follow the same energy aesthetic

## Implementation Files

### New Files:
1. `src/components/CubeControls.tsx` - Control panel UI
2. `src/components/FlowingEnergyCubeWithEyes.tsx` - Energy cube with eyes

### Modified Files:
1. `src/components/cube/CubeScene.tsx` - Support multiple cube types and size
2. `src/components/CubiQoApp.tsx` - Add controls and state management
3. `src/components/cube/Cube.tsx` - Add showEyes prop (optional, if needed)

## Testing Checklist
- [ ] Size slider smoothly scales cube from 0.5x to 2x
- [ ] Shape toggle switches between energy cube and isometric diamond
- [ ] Eye toggle works (when available on cube type)
- [ ] Settings persist across page refreshes
- [ ] All animations continue to work with different sizes
- [ ] No performance issues with scaling
- [ ] Mobile responsive controls

## Story Points Justification: 1-3
- **1 point**: Size toggle (simple scale transform)
- **1 point**: Shape toggle (components already exist, just need switching logic)
- **1 point**: Eye toggle + UI controls
- **Total: 3 points** ✅

## Next Steps
1. Create CubeControls component
2. Update CubeScene for conditional rendering
3. Update CubiQoApp with state management
4. Test all features
5. Commit and document
