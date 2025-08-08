# 📚 Vexl Workshop Asset Library Guide

## Overview
This guide explains all the reusable components, mockups, and interactive modules available in your Vexl Workshop presentation system.

---

## 🎯 Component Types

### 1. **Interactive Components** 
These are live, animated elements that users can interact with:

#### **Network Visualization** (`network-visualization`)
- **What it is**: The animated web showing connections between users
- **Use case**: Demonstrating trust networks and connection paths
- **Configurable**: Node positions, labels, connection strength, animation speed
- **Example**: The diagram showing "You" connected to "Your Mom", "Best Friend", etc.

#### **Contact Import Demo** (`contact-import-demo`)
- **What it is**: Interactive UI showing how users categorize and import contacts
- **Use case**: Onboarding flow demonstration
- **Configurable**: Categories, contact counts, warning messages
- **Example**: Checkboxes for "Close Friends", "Acquaintances", "Service Providers"

#### **Offer Feed** (`offer-feed`)
- **What it is**: Scrollable feed of Bitcoin trading offers
- **Use case**: Showing how users discover offers from their network
- **Configurable**: Offer details, locations, amounts

#### **Common Friends Modal** (`common-friends-modal`)
- **What it is**: Popup showing mutual connections with a trader
- **Use case**: Trust verification process
- **Configurable**: Friend list, avatars, action buttons

---

### 2. **Phone Mockups** 📱
Device frames showing app screens:

#### **iPhone Offer Feed** (`iphone-offer-feed`)
- **What it is**: iPhone showing the main trading feed
- **Use case**: App interface demonstration
- **Configurable**: Screen content, device model, theme

#### **Triple Phone Showcase** (`triple-phone-showcase`)
- **What it is**: Three iPhones at different angles showing features
- **Use case**: Marketing hero sections
- **Configurable**: Screen content for each phone, angles

---

### 3. **UI Components** 🧩
Smaller reusable interface elements:

#### **Network Stats Panel** (`network-stats-panel`)
- **What it is**: Dashboard showing connection statistics
- **Example**: "15 Total Connections, 6 Vexl Users"
- **Configurable**: Stats values, icons, labels

#### **Contact List Sidebar** (`contact-list`)
- **What it is**: Scrollable list of contacts with badges
- **Example**: List showing "Your Mom", "Best Friend" with Vexl/Bridge badges
- **Configurable**: Contact details, badge types

#### **Warning Panel** (`warning-panel`)
- **What it is**: Alert message for important information
- **Example**: "⚠️ Limited Network Warning"
- **Configurable**: Message text, type (warning/info/success)

---

### 4. **Media Assets** 🖼️
Static images and icons:

- **Vexl Logo**: Official branding
- **Bitcoin Icon**: Currency symbol
- **Trust Badges**: Visual indicators for trust levels

---

### 5. **Animations** ✨
Reusable animation effects:

#### **Network Pulse** (`network-pulse`)
- **What it is**: Pulsing effect on network connections
- **Use case**: Showing active connections

#### **Node Appear** (`node-appear`)
- **What it is**: Animation for new nodes joining network
- **Use case**: Demonstrating network growth

#### **Message Flow** (`message-flow`)
- **What it is**: Particles flowing between nodes
- **Use case**: Showing communication paths

---

## 🎨 How to Use Assets

### In the Slide Builder
1. Go to `/admin/slide-builder`
2. Drag any asset from the library onto your slide
3. Click to configure properties
4. Position and resize as needed

### In the Asset Manager
1. Go to `/admin/assets`
2. Browse all available assets
3. Filter by type or category
4. Configure default settings
5. Export selected assets for reuse

### Creating New Assets
1. Define the asset in `/src/lib/asset-library.ts`
2. Create the component in `/src/components/modules/`
3. Add to appropriate category
4. Set configurable properties

---

## 🔧 Configuration Options

Most assets are **configurable**, meaning you can adjust:

- **Visual Properties**: Colors, sizes, positions
- **Content**: Text, labels, values
- **Behavior**: Animation speed, interaction types
- **Data**: Stats, connections, lists

### Example Configuration
```javascript
{
  id: 'network-visualization',
  config: {
    nodes: [
      { id: 'you', label: 'You', x: 50, y: 50 },
      { id: 'mom', label: 'Your Mom', x: 70, y: 30 }
    ],
    showLabels: true,
    animated: true,
    connectionColor: '#FFD700'
  }
}
```

---

## 📦 Preset Layouts

Ready-made combinations of assets for common use cases:

### **Trust Network Showcase**
- Network visualization
- Stats panel
- Contact list
- *Use for*: Explaining web of trust concept

### **Onboarding Flow Demo**
- Contact import interface
- Warning panels
- Progress indicators
- *Use for*: Showing app setup process

### **App Feature Showcase**
- Triple phone mockup
- CTA buttons
- *Use for*: Marketing presentations

### **Offer Discovery Demo**
- Offer feed
- Common friends modal
- Trust indicators
- *Use for*: Explaining trading process

---

## 🚀 Quick Start

### To toggle an asset on/off:
1. In Slide Builder, click the asset
2. Click the eye icon to hide/show
3. Or delete to remove completely

### To move an asset between slides:
1. Select the asset
2. Copy (Cmd+C)
3. Navigate to target slide
4. Paste (Cmd+V)

### To save as template:
1. Configure your slide with assets
2. Click "Save as Template"
3. Name your template
4. Reuse across presentations

---

## 📝 Asset Naming Convention

- **Interactive**: `component-name-demo`
- **Mockups**: `device-screen-name`
- **UI Components**: `element-type-variant`
- **Media**: `asset-type-name`
- **Animations**: `effect-name`

---

## 🎯 Best Practices

1. **Keep it Simple**: Don't overcrowd slides with too many assets
2. **Stay Consistent**: Use the same mockup style throughout
3. **Configure Thoughtfully**: Adjust settings to match your narrative
4. **Reuse Templates**: Save successful combinations
5. **Test Interactions**: Preview before presenting

---

## 🆘 Troubleshooting

### Asset not appearing?
- Check if it's enabled in features
- Verify dependencies are loaded
- Clear browser cache

### Configuration not saving?
- Click "Save" after changes
- Check console for errors
- Ensure valid JSON format

### Performance issues?
- Reduce animation complexity
- Limit simultaneous animations
- Use static mockups for backgrounds

---

## 📚 Asset Categories Reference

- **Trust Network**: Web of trust visualizations
- **Onboarding**: Setup and import flows
- **Trading**: Offer discovery and transactions
- **Marketing**: Hero sections and showcases
- **Data Display**: Stats and metrics
- **Feedback**: Warnings and notifications
- **Actions**: Buttons and CTAs
- **Branding**: Logos and brand elements

---

## Need Help?

- Asset Manager: `/admin/assets`
- Slide Builder: `/admin/slide-builder`
- Workshop Editor: `/admin/workshop`
- Templates: `/admin/templates`