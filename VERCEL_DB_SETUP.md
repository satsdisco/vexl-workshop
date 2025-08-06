# 🚀 Vercel Postgres Setup Guide

## Quick Setup (5 minutes)

### Step 1: Login to Vercel CLI
```bash
npx vercel login
```

### Step 2: Link Your Project
```bash
npx vercel link
```
- Select your existing `vexl-workshop` project

### Step 3: Create Database in Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `vexl-workshop` project
3. Click on **"Storage"** tab
4. Click **"Create Database"** button
5. Select **"Postgres"**
6. Choose your region (pick closest to you)
7. Accept the terms
8. Click **"Create"**

### Step 4: Connect Database to Project

After creating the database:
1. Click **"Connect Project"**
2. Select your `vexl-workshop` project
3. Select all environments (Production, Preview, Development)
4. Click **"Connect"**

### Step 5: Pull Environment Variables
```bash
npx vercel env pull .env.local
```

### Step 6: Update Prisma Schema

Replace the contents of `prisma/schema.prisma` with `prisma/schema.postgresql.prisma`:

```bash
cp prisma/schema.postgresql.prisma prisma/schema.prisma
```

### Step 7: Push Database Schema
```bash
npx prisma db push
```

### Step 8: Test Locally
```bash
npm run dev
```

### Step 9: Deploy
```bash
git add -A
git commit -m "feat: Switch to Vercel Postgres"
git push
```

## ✅ Done!

Your admin panel now uses Vercel Postgres with:
- Persistent data storage
- Automatic backups
- Connection pooling
- Production-ready database

## Database Info

- **Free Tier**: 60 compute hours/month
- **Storage**: 256 MB
- **Perfect for**: Your admin panel needs

## Troubleshooting

If you see connection errors:
1. Make sure you selected all environments when connecting
2. Check that `.env.local` has these variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
3. Redeploy on Vercel

## Admin Access

After setup, access your admin panel at:
- `https://your-domain.vercel.app/admin`
- `https://your-domain.vercel.app/admin/v2`

Password: `P2Pnokyc` (change this in production!)