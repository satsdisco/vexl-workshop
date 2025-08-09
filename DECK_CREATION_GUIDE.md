# Vexl Workshop Deck Creation Guide

## Overview
This guide explains how to create and manage presentation decks for different audiences using the Vexl Workshop platform.

## Methods for Creating New Slides & Decks

### Method 1: Deck Builder (Recommended for Non-Technical Users)
**Location:** `/admin/deck-builder`

The Deck Builder is a visual interface for creating and editing presentation decks:

1. **Access the Deck Builder**
   - Go to Admin Dashboard (`/admin`)
   - Click "Deck Builder" (purple card with sparkle icon)

2. **Create a New Deck**
   - Click "Create New Deck"
   - Enter deck name and description
   - Set duration, audience, difficulty, and tags

3. **Add Slides Using Templates**
   - Choose from 5 pre-built templates:
     - **Title Slide**: Main heading with subtitle and description
     - **Bullet Points**: List of key points with explanations
     - **Statistics**: Showcase metrics and numbers
     - **Comparison**: Compare two or more options
     - **Process Steps**: Show sequential steps or workflow

4. **Edit Slide Content**
   - Click on any slide in the sidebar to select it
   - Edit text fields directly in the content editor
   - See live preview on the right side
   - Reorder slides using up/down arrows
   - Delete slides with the trash icon

5. **Save and Export**
   - Click "Save Deck" to store in database
   - Click "Export" to download as JSON
   - Click "Preview" to see full deck layout
   - Test presentation with "Test Presentation" button

### Method 2: Code-Based Creation (For Developers)

#### Creating a New Slide Component

1. **Create the component file**
```bash
# Create a new slide component
touch src/components/sections/YourNewSlide.tsx
```

2. **Basic slide template**
```typescript
import VexlLogo from '@/components/VexlLogo'
import { motion } from 'framer-motion'
import { useContent } from '@/hooks/useContent'

export default function YourNewSlide() {
  const { content } = useContent('yourSlideId')
  
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-12">
        <VexlLogo className="w-32 h-auto mx-auto mb-6" />
        <h2 className="text-4xl md:text-6xl mb-4" style={{ 
          fontFamily: 'Monument Extended', 
          fontWeight: 900,
          color: '#FFFFFF'
        }}>
          {content.title || 'Slide Title'}
        </h2>
        <p className="text-xl text-vexl-gray-300">
          {content.subtitle || 'Slide subtitle'}
        </p>
      </div>
      
      {/* Add your custom content here */}
      {content.items?.map((item) => (
        <div key={item.id} className="mb-4">
          <h3 className="text-2xl text-white">{item.title}</h3>
          <p className="text-vexl-gray-400">{item.content}</p>
        </div>
      ))}
    </div>
  )
}
```

3. **Register the slide in workshop page**
```typescript
// In src/app/workshop/page.tsx

// Add import
const YourNewSlide = dynamic(() => import('@/components/sections/YourNewSlide'))

// Add to allSections array
{ id: 'your-slide-id', name: 'Your Slide Name', duration: 3 }

// Add to sectionMap
'your-slide-id': { component: <YourNewSlide />, editId: 'yourSlideId' }
```

4. **Add to deck configuration**
```typescript
// In src/data/decks.ts
// Add your slide ID to the appropriate deck's slides array
slides: ['hook', 'pitch', 'your-slide-id', 'get-started']
```

### Method 3: JSON Import/Export

1. **Export an existing deck**
   - Use Deck Builder to export a deck as JSON
   - Or manually create a JSON file

2. **JSON structure**
```json
{
  "id": "custom-deck",
  "name": "Custom Presentation",
  "description": "A tailored presentation",
  "duration": 20,
  "audience": "Specific audience",
  "difficulty": "intermediate",
  "tags": ["custom", "specific"],
  "slides": [
    {
      "id": "slide-1",
      "name": "Introduction",
      "type": "title",
      "content": {
        "title": "Welcome",
        "subtitle": "Let's begin",
        "description": "Introduction text"
      }
    }
  ]
}
```

3. **Import the deck**
   - Use the Deck Builder's import feature (future)
   - Or add directly to database via API

## Design Guidelines

### Visual Consistency
- **Colors**: Use Vexl brand colors
  - Yellow: `#FCCD6C` (highlights, CTAs)
  - White: `#FFFFFF` (main text)
  - Gray: `#9CA3AF` (secondary text)
  - Black: `#000000` (background)

- **Typography**:
  - Headers: Monument Extended font
  - Body: System font stack
  - Sizes: 
    - Main title: 4xl to 7xl
    - Subtitles: xl to 2xl
    - Body text: base to lg

### Content Best Practices

1. **Keep it concise**
   - Maximum 6 bullet points per slide
   - Short, impactful statements
   - Use visuals when possible

2. **Maintain narrative flow**
   - Each slide should connect to the next
   - Build on previous concepts
   - End with clear call-to-action

3. **Audience-specific content**
   - Technical decks: Include architecture details
   - Beginner decks: Focus on benefits, avoid jargon
   - Executive decks: Highlight ROI and vision

## Common Slide Patterns

### Hook Slide
- Problem statement
- Shocking statistic
- Provocative question

### Feature Showcase
- 3-6 key features
- Icon + title + description
- Grid or list layout

### Comparison Slide
- Side-by-side comparison
- Pros/cons format
- Before/after scenarios

### Demo Slide
- Live demonstration area
- Step-by-step walkthrough
- Interactive elements

### Call-to-Action
- Clear next steps
- Download links
- Contact information

## Testing Your Deck

1. **Preview in Deck Builder**
   - Use the preview panel
   - Check all slide transitions
   - Verify content displays correctly

2. **Test in Presentation Mode**
   - Navigate to `/workshop?deck=your-deck-id`
   - Use keyboard navigation (arrow keys)
   - Test on different screen sizes

3. **Export to PDF**
   - Click the PDF export button
   - Review the generated PDF
   - Ensure all slides are included

## Deployment

### For Development
```bash
npm run dev
# Access at http://localhost:3000/admin/deck-builder
```

### For Production
1. Save deck in Deck Builder
2. Deck automatically available at `/workshop?deck=deck-id`
3. Listed in deck selector at `/decks`

## Troubleshooting

### Slide not appearing
- Check slide ID is added to deck's slides array
- Verify component is imported in workshop page
- Ensure sectionMap includes the slide mapping

### Content not saving
- Verify API endpoint is working
- Check browser console for errors
- Ensure proper authentication token

### PDF export issues
- Make sure slides have `.slide-section` class
- Check browser console for jsPDF errors
- Verify all content is visible on screen

## Advanced Features

### Dynamic Content Loading
Use the `useContent` hook to load content from database:
```typescript
const { content, updateContent } = useContent('sectionId')
```

### Animation Effects
Use Framer Motion for slide animations:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  Content here
</motion.div>
```

### Conditional Rendering
Show different content based on deck type:
```typescript
{deckId === 'technical' && <TechnicalDetails />}
{deckId === 'beginner' && <SimpleExplanation />}
```

## Resources

- **Admin Dashboard**: `/admin`
- **Deck Builder**: `/admin/deck-builder`
- **Deck Selector**: `/decks`
- **Workshop**: `/workshop`
- **API Endpoints**:
  - GET/POST `/api/admin/decks`
  - GET/POST `/api/admin/content`

## Need Help?

- Check existing slide components in `/src/components/sections/`
- Review deck configurations in `/src/data/decks.ts`
- Test changes locally before deploying
- Use the visual Deck Builder for quick prototyping