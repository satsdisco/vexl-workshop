# 🎨 Slide Builder Pro - Complete Guide

## Quick Start

Access the slide builder at: `/admin/slide-builder-v2`

## 🎯 Overview

The Slide Builder Pro is a powerful tool for creating interactive presentation slides with drag-and-drop components. It features three modes: **Edit**, **Preview**, and **Present**.

---

## 🔧 Three Working Modes

### 1. **Edit Mode** (Default)
- **What it does**: Build and arrange components on your slide
- **Features**:
  - Drag modules from left panel onto canvas
  - Click modules to select and edit properties
  - See wireframe placeholders for quick editing
  - Resize and reposition components

### 2. **Preview Mode** 
- **What it does**: See exactly how your slide will look
- **Features**:
  - Shows actual rendered components (not wireframes)
  - Interactive components work (hover, animations)
  - Still shows the UI controls for quick edits
  - Switch back to Edit mode to make changes

### 3. **Present Mode**
- **What it does**: Full-screen presentation view
- **Features**:
  - Removes all UI controls
  - Full-screen slide display
  - Perfect for live presentations
  - Press Esc to exit

---

## 📦 How to Use Components

### Adding Components
1. **In Edit Mode**, look at the left panel
2. Find the component you want (Network Viz, Contact Import, Phone Mockup, etc.)
3. **Drag** it onto the canvas
4. **Drop** it where you want it positioned

### Editing Components
1. **Click** on any component in the canvas to select it
2. The **right panel** shows all properties:
   - **Position & Size**: X, Y, Width, Height controls
   - **Content**: Text, labels, configuration
   - **Settings**: Animation, colors, etc.
3. Changes apply immediately

### Deleting Components
- Click the **red trash icon** on any selected component
- Or select and press **Delete** key

---

## 💾 Templates System

### Using Templates
1. Click **"Templates"** button in header
2. Browse available templates by category:
   - **Intro**: Opening slides with impact
   - **Content**: Information-rich slides
   - **Interactive**: Engagement slides
   - **Closing**: Call-to-action slides
3. Click any template to apply it instantly

### Saving Your Own Templates
1. Build your perfect slide layout
2. Click **"Save Template"** button
3. Give it a name and description
4. It's now saved for future use!

### Pre-built Templates

#### "Trust Network Intro"
- Large network visualization on left
- Heading on right
- Perfect for explaining web of trust

#### "Contact Import Demo"
- Centered contact import interface
- Shows the onboarding flow
- Includes warning messages

#### "Phone Showcase"
- iPhone mockup with app screens
- Great for feature demonstrations

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **⌘P** | Toggle Preview Mode |
| **Delete** | Remove selected module |
| **Esc** | Exit Preview/Present mode |
| **⌘S** | Save current slide |
| **⌘Z** | Undo last action |

---

## 🎯 Best Practices

### 1. **Start with Templates**
- Don't build from scratch every time
- Use templates as starting points
- Modify to fit your needs

### 2. **Preview Often**
- Switch to Preview mode regularly
- Check how components actually look
- Test interactions before presenting

### 3. **Component Sizing**
- Network Viz: 40-50% width works best
- Phone Mockups: 25-30% width maintains proportion
- Contact Import: 50% width for readability

### 4. **Layout Tips**
- Leave breathing room (10-15% margins)
- Align related components
- Use consistent spacing

---

## 🚀 Workflow Example

### Creating a "Web of Trust" Presentation Slide

1. **Start**: Click "Templates" → Choose "Trust Network Intro"

2. **Customize Network**:
   - Click the network visualization
   - In properties, toggle "Show Labels" on
   - Enable "Animated" for movement
   - Adjust size to 60% width

3. **Add Context**:
   - Drag a "Heading" module
   - Position it on the right (x: 65, y: 20)
   - Enter text: "Your Network is Your Net Worth"

4. **Add Stats**:
   - Drag "Stats" module below heading
   - Add numbers: "15 Connections", "6 Vexl Users"

5. **Preview**: Press ⌘P to see the final result

6. **Save**: Click "Save Template" for reuse

---

## 🎨 Component Configuration

### Network Visualization
```
Settings:
- Show Labels: on/off
- Animated: on/off  
- Interactive: on/off
- Stats Display: automatic
```

### Contact Import Demo
```
Settings:
- Show Warning: on/off
- Warning Message: customizable
- Categories: preset or custom
```

### Phone Mockup
```
Settings:
- Screen: offer-feed / chat / network / common-friends
- Angle: -45 to 45 degrees
- Scale: 0.5 to 2.0
```

---

## 📊 Module Types Available

### Interactive
- 🕸️ Network Visualization
- 📲 Contact Import Demo
- 📱 Phone Mockup
- 🗺️ Market Map
- 🔐 Hashing Visualization

### Content
- 📝 Heading
- 📄 Paragraph
- 📋 Bullet Points
- 💬 Quote
- 📊 Statistics

### Visual
- 🖼️ Image
- 🎬 Video
- ✨ Icon
- ⚖️ Comparison

### Data
- 📊 Chart
- 📅 Timeline
- 💻 Code Block

---

## 🔧 Troubleshooting

### Components not appearing in Preview?
- Make sure you're in Preview or Present mode
- Check that the component has content configured
- Try refreshing the page

### Drag and drop not working?
- Must be in Edit mode
- Click outside any selected component first
- Check that you're dragging from the module palette

### Template not loading?
- Ensure the template has valid module configurations
- Try a different template to test
- Check browser console for errors

---

## 💡 Pro Tips

1. **Quick Preview**: Use ⌘P to rapidly toggle between edit and preview
2. **Duplicate Slides**: Save as template, then apply to new slide
3. **Alignment**: Use percentage values divisible by 5 for clean layouts
4. **Mobile Preview**: Resize browser window to test responsive behavior
5. **Export/Import**: Use the export button to save slides as JSON files

---

## 🚦 Status Indicators

- **Yellow Ring**: Selected component in edit mode
- **Red Trash**: Delete button (hover to see)
- **Dashed Border**: Canvas in edit mode
- **Grid**: Optional alignment grid (toggle with grid button)

---

## Need Help?

- Check component documentation: `/ASSET_LIBRARY_GUIDE.md`
- Test in Preview mode before presenting
- Save templates frequently for backup
- Use keyboard shortcuts for efficiency