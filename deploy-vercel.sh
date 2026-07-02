#!/bin/bash
# Siggy Chess - Vercel Deployment Script

echo "🚀 Deploying Siggy Chess to Vercel"
echo "=================================="
echo ""

# Check if logged in to Vercel
if ! vercel whoami &>/dev/null; then
    echo "⚠️  Not logged in to Vercel"
    echo ""
    echo "Please run: vercel login"
    echo ""
    echo "Then run this script again!"
    exit 1
fi

echo "✅ Vercel authentication OK"
echo ""

# Deploy
echo "📦 Deploying to production..."
vercel --prod

echo ""
echo "=================================="
echo "✅ Deployment complete!"
echo ""
echo "🎮 Your Siggy Chess app is now live!"
echo ""
echo "Next steps:"
echo "1. Start the Ritual Agent: python ritual-agent.py"
echo "2. Share your app URL!"
echo "3. Play chess! ♟️"
