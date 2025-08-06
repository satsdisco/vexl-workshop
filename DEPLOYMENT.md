# Deployment Instructions

## Vercel Deployment

### Environment Variables

You need to set the following environment variables in your Vercel project:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
DATABASE_URL=file:/tmp/dev.db
ADMIN_PASSWORD=P2Pnokyc
```

**Note**: For production, consider using a proper database:
- Vercel Postgres (recommended)
- PlanetScale
- Supabase

### Using SQLite on Vercel (Temporary Storage)

The current setup uses SQLite with `file:/tmp/dev.db`. This works but has limitations:
- Data is stored in `/tmp` which is ephemeral
- Data will be lost on redeploys
- Not suitable for production

### Using Vercel Postgres (Recommended for Production)

1. Add Vercel Postgres to your project
2. Update `DATABASE_URL` with the connection string
3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run `npx prisma db push` to create tables

### Build Configuration

The project is configured to automatically:
- Generate Prisma Client during build (`npm run build`)
- Generate Prisma Client after install (`postinstall`)

No additional build configuration needed!

## Local Development

1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Run `npx prisma db push` to create database
4. Run `npm run dev`

## Admin Access

- Basic Admin: `/admin`
- Advanced Admin: `/admin/v2`
- Default Password: `P2Pnokyc` (change in production!)

## Troubleshooting

If you see Prisma errors on Vercel:
1. Ensure `DATABASE_URL` is set in environment variables
2. Check that build script includes `prisma generate`
3. Clear build cache and redeploy