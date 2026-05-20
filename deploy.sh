#!/bin/bash
# Production Deployment Script

set -e

echo "🚀 Deploying Photophobia-friendly Dashboard to Production..."

# Build the project
echo "📦 Building for production..."
npm run build

# Create .env file if not exists
if [ ! -f ".env" ]; then
  cat > .env << EOF
VITE_API_URL=http://localhost:3001/api
EOF
  echo "✅ Created .env file"
fi

# Check for Node.js v24 compatibility issues
echo ""
echo "⚠️  Checking Node.js version..."
node --version

if [ "$(node -v | cut -d. -f2)" -ge "40" ]; then
  echo "✅ Compatible with Node.js v24+"
else
  echo "⚠️  Consider using Vite 5.4.0 for compatibility"
fi

echo ""
echo "📦 Build artifacts ready in dist/ folder"
ls -la dist/

echo ""
echo "✅ Production deployment preparation complete!"
echo ""
echo "Next steps:"
echo "  1. Review the 'dist/' folder contents"
echo "  2. Configure your hosting provider (Vercel, Netlify, AWS S3, etc.)"
echo "  3. Run 'npm run build' before deployment"
