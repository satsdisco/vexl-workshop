#!/bin/bash

echo "🚀 Vercel Database Setup Script"
echo "================================"
echo ""
echo "This script will help you set up Vercel Postgres for your Vexl Workshop"
echo ""

# Check if logged in
echo "1️⃣  First, login to Vercel:"
echo "   Run: vercel login"
echo ""
read -p "Press Enter after you've logged in..."

# Link the project
echo ""
echo "2️⃣  Linking to your Vercel project..."
vercel link

# Install Vercel Postgres
echo ""
echo "3️⃣  Installing Vercel Postgres package..."
npm install @vercel/postgres

echo ""
echo "4️⃣  Now, go to your Vercel Dashboard:"
echo "   1. Open: https://vercel.com/dashboard"
echo "   2. Select your 'vexl-workshop' project"
echo "   3. Go to the 'Storage' tab"
echo "   4. Click 'Create Database'"
echo "   5. Select 'Postgres'"
echo "   6. Choose your region (closest to you)"
echo "   7. Click 'Create'"
echo ""
read -p "Press Enter after creating the database..."

# Pull environment variables
echo ""
echo "5️⃣  Pulling environment variables from Vercel..."
vercel env pull .env.local

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Update prisma/schema.prisma to use PostgreSQL"
echo "2. Run: npx prisma db push"
echo "3. Commit and push changes"
echo ""
echo "Your app will now use Vercel Postgres!"