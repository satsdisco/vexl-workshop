# Vexl Workshop Project Structure

## Overview
A multi-deck presentation platform for Vexl, featuring the main workshop and specialized presentations for different audiences.

## Directory Structure

```
vexl-workshop/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx            # Vexl Studio home page
│   │   ├── workshop/           # Main workshop presentation
│   │   │   └── page.tsx        # Dynamic deck loader
│   │   ├── decks/              # Deck selector interface
│   │   │   └── page.tsx        # Browse all presentation decks
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── page.tsx        # Admin home
│   │   │   ├── login/          # Admin authentication
│   │   │   ├── deck-builder/   # Visual deck creation tool
│   │   │   └── templates/      # Template management
│   │   └── api/                # API routes
│   │       └── admin/
│   │           ├── auth/        # Authentication
│   │           ├── content/     # Content management
│   │           ├── decks/       # Deck management
│   │           └── templates/   # Template operations
│   │
│   ├── components/
│   │   ├── sections/           # Workshop slide components
│   │   │   ├── HookSection.tsx
│   │   │   ├── PitchSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── PrivacySection.tsx
│   │   │   ├── ProfileSetupSection.tsx
│   │   │   ├── FindingOffersSection.tsx
│   │   │   ├── ContactTradingSection.tsx
│   │   │   ├── ClubsSection.tsx
│   │   │   ├── DemoSection.tsx
│   │   │   ├── VisionSection.tsx
│   │   │   ├── GetStartedSection.tsx
│   │   │   └── QuickDemoSection.tsx
│   │   │
│   │   ├── SimpleEditMode.tsx  # Inline editing system
│   │   ├── ExportPDF.tsx       # PDF export functionality
│   │   ├── VexlLogo.tsx        # Brand logo component
│   │   ├── Header.tsx          # Workshop header
│   │   ├── Navigation.tsx      # Slide navigation
│   │   ├── Timer.tsx           # Presentation timer
│   │   ├── PresenterMode.tsx   # Presenter view
│   │   ├── SectionNavigation.tsx
│   │   └── KeyboardGuide.tsx   # Keyboard shortcuts
│   │
│   ├── data/
│   │   ├── decks.ts            # Deck configurations
│   │   ├── defaultContent.ts   # Default workshop content
│   │   └── masterTemplate.ts   # Master template for reset
│   │
│   ├── hooks/
│   │   └── useContent.ts       # Content management hook
│   │
│   ├── lib/
│   │   └── prisma.ts           # Database client
│   │
│   ├── styles/
│   │   └── globals.css         # Global styles & Tailwind
│   │
│   └── types/
│       └── workshop.ts         # TypeScript type definitions
│
├── public/
│   ├── screenshots/            # Workshop screenshots
│   └── vexl-logo.png          # Logo asset
│
├── prisma/
│   └── schema.prisma           # Database schema
│
├── scripts/
│   └── restore-content.js      # Content restoration script
│
└── docs/
    ├── DECK_CREATION_GUIDE.md  # How to create new decks
    └── PROJECT_STRUCTURE.md    # This file
```

## Key Features

### 1. Main Workshop (Masterpiece)
- 11 polished slides at `/workshop`
- Inline editing with 'E' key toggle
- Keyboard navigation
- Presenter mode
- Auto-save functionality

### 2. Multi-Deck System
- 7 specialized presentations
- Dynamic deck loading via URL params
- Deck selector at `/decks`
- PDF export for offline use

### 3. Deck Builder
- Visual interface at `/admin/deck-builder`
- 5 slide templates
- Live preview
- JSON export/import
- Drag-and-drop reordering

### 4. Admin Dashboard
- Central control at `/admin`
- Template management
- Content editing
- Deck management

## Core Technologies
- **Next.js 15.4.5** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **PostgreSQL** - Database (Neon)
- **Framer Motion** - Animations
- **jsPDF** - PDF generation

## Environment Variables
```env
DATABASE_URL=            # Neon PostgreSQL connection
POSTGRES_PRISMA_URL=     # Pooled connection
POSTGRES_URL_NON_POOLING= # Direct connection
ADMIN_TOKEN=             # Admin authentication
```

## Available Scripts
```bash
npm run dev              # Development server
npm run build           # Production build
npm run start           # Production server
npm run lint            # ESLint check
npm run typecheck       # TypeScript check
```

## Navigation Shortcuts
- **Arrow Keys** - Navigate slides
- **E** - Toggle edit mode
- **Cmd+P** - Presenter mode
- **Shift+Space** - Start/stop timer
- **Home/End** - First/last slide
- **1-9** - Direct slide navigation

## API Endpoints
- `GET/POST /api/admin/content` - Manage slide content
- `GET/POST /api/admin/decks` - Manage presentation decks
- `GET/POST /api/admin/templates` - Template operations
- `POST /api/admin/auth` - Admin authentication

## Database Models
- **Content** - Slide content storage
- **Template** - Workshop templates & decks
- **SlideContent** - Legacy content model
- **WorkshopSection** - Section configurations

## Deployment
- **Platform**: Vercel
- **Database**: Neon PostgreSQL
- **Domain**: Custom domain via Vercel

## Maintenance
- Content restoration: `node scripts/restore-content.js`
- Database migrations: `npx prisma migrate dev`
- Type generation: `npx prisma generate`