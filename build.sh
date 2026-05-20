#!/bin/bash
# Build Script with Optimizations

echo "🔨 Building Frontend Application..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
echo "Node.js version: $NODE_VERSION"

if [ "$NODE_VERSION" -ge 40 ]; then
    echo "⚠️  Warning: Running on Node.js v24+ with Vite 5.4.0"
fi

# Install dependencies if not present
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    
    # Post-install optimizations
    echo "⚡ Running post-install optimizations..."
    rm -rf node_modules/@esbuild/win32-x64
fi

# Clean previous build
echo "🧹 Cleaning previous build artifacts..."
rm -rf dist/*

# Build with optimizations
echo "🏗️  Building for production..."
npm run build -- --sourcemap inline

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build completed successfully!"
    echo ""
    echo "Build artifacts:"
    ls -lh dist/
    echo ""
    echo "📦 Deployment package ready in dist/"
else
    echo ""
    echo "❌ Build failed. Check console for errors."
fi
