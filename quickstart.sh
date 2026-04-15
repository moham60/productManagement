#!/bin/bash
# Quick Start Script for Product Management App

echo "🎉 Product Management App - Quick Start"
echo "======================================"
echo ""

# Check Node version
NODE_VERSION=$(node -v)
echo "✓ Node version: $NODE_VERSION"

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✓ Dependencies installed"
else
    echo "⚠️  Installing dependencies..."
    npm install
fi

echo ""
echo "📝 Available commands:"
echo ""
echo "  npm run dev       - Start development server (http://localhost:5173)"
echo "  npm run build     - Build for production"
echo "  npm run preview   - Preview production build"
echo ""
echo "📚 Documentation:"
echo "  README.md         - Complete project guide"
echo "  TESTING.md        - Test checklist"
echo "  DEPLOYMENT.md     - Deploy to GitHub Pages"
echo "  COMPLETION_SUMMARY.md - Implementation details"
echo ""
echo "🚀 Ready to go! Run: npm run dev"
echo ""
