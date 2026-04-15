# 🛍️ Product Management Application

A complete, full-featured React + TypeScript product management system with full CRUD operations, responsive design, dark mode, and localStorage persistence.

**Live Demo:** Deploy to GitHub Pages using the [deployment guide](./DEPLOYMENT.md)

---

## ✨ Features

### Core Functionality
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete products
- ✅ **Product Listing** with responsive grid layout
- ✅ **Product Details Page** with full information
- ✅ **Add/Edit Product Forms** with comprehensive validation

### Search & Filter
- 🔍 **Real-time Search** - Search products by name or description (debounced 300ms)
- 🏷️ **Category Filtering** - Filter by product categories
- 📊 **Multi-option Sorting** - Sort by price (low/high) or name (A-Z/Z-A)

### Design & UX
- 📱 **Fully Responsive** - Mobile (1 col) → Tablet (2 col) → Desktop (3 col) → Large (4 col)
- 🌓 **Dark Mode** - Theme toggle in header, persists in localStorage
- 💾 **Auto-save** - All data persists to localStorage
- 🎨 **Beautiful UI** - shadcn/ui components with TailwindCSS
- 📲 **Touch-friendly** - Optimized for mobile and tablet devices

### Product Management
- 🖼️ **Dual Image Upload** - File upload (base64) or URL input with preview
- 🎨 **Color Selection** - Add/edit/remove colors with hex codes and names
- 📝 **Rich Descriptions** - Support for detailed product information
- 💰 **Price Management** - Flexible pricing with validation

### Data & Validation
- ✔️ **Form Validation** - Comprehensive validation using Zod
- 📦 **Mock Data** - Pre-loaded with 15 diverse products
- 🔐 **Secure** - All data stored locally, no server required
- 📊 **localStorage Service** - Complete CRUD operations with localStorage

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/product-management-app.git
cd product-management-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` - App will open with HashRouter enabled

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm preview

# Deploy to GitHub Pages (see DEPLOYMENT.md)
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── product/
│   │   ├── ProductCard.tsx          # Product card with image, price, colors
│   │   ├── ProductForm.tsx          # Add/Edit product form
│   │   ├── ProductGrid.tsx          # Responsive product grid
│   │   └── FilterBar.tsx            # Search, category filter, sort
│   └── shared/
│       ├── Header.tsx               # App header with dark mode toggle
│       ├── ColorPicker.tsx          # Color selection component
│       ├── ColorSwatches.tsx        # Color display swatches
│       ├── DeleteConfirmation.tsx   # Delete confirmation modal
│       └── ImageUploader.tsx        # Image upload/URL input
├── pages/
│   ├── ProductListPage.tsx          # Main product list
│   ├── ProductFormPage.tsx          # Add/Edit product page
│   └── ProductDetailPage.tsx        # Product details
├── context/
│   └── ProductContext.tsx           # Global state management
├── hooks/
│   └── index.ts                     # Custom hooks (useDebounce, useForm, useImageUpload)
├── services/
│   └── localStorage.service.ts      # CRUD operations with localStorage
├── types/
│   └── index.ts                     # TypeScript interfaces
├── utils/
│   ├── constants.ts                 # Mock data and constants
│   ├── formatters.ts                # Text formatting utilities
│   ├── validators.ts                # Zod validation schemas
├── lib/
│   └── utils.ts                     # TailwindCSS utilities
├── styles/
│   └── globals.css                  # Global styles
├── App.tsx                          # Main app with routing
└── main.tsx                         # Entry point
```

---

## 🎯 Key Technologies

- **Frontend:** React 18 + TypeScript
- **Routing:** React Router v6 with HashRouter (GitHub Pages compatible)
- **Styling:** TailwindCSS + shadcn/ui components
- **State Management:** Context API + useReducer
- **Validation:** Zod
- **Theme:** next-themes with dark mode support
- **Build Tool:** Vite
- **Notifications:** React Hot Toast
- **Icons:** Lucide React

---

## 📋 Features in Detail

### Product Card (Exact Design Match)
```
┌─────────────────────────┐
│   Product Image (h-48)  │
├─────────────────────────┤
│ Product Name            │ (font-semibold text-lg)
│ Description truncated   │ (80 chars + "...")
│ $99.99                  │ (text-2xl font-bold text-primary)
│ ● ● ● ●  +2            │ (Color swatches + badge)
│ [Edit] [Delete]         │
└─────────────────────────┘
```

### Form Validation
- Product Name: min 3 characters
- Description: min 10 characters
- Price: must be positive number
- Image: required URL or upload
- Category: required, editable
- Colors: min 1 color required

### Responsive Breakpoints
- **Mobile:** 1 column (default)
- **Tablet (md):** 2 columns (768px+)
- **Desktop (lg):** 3 columns (1024px+)
- **Large (xl):** 4 columns (1280px+)

### Dark Mode
- Toggle in header (Moon/Sun icon)
- Persists to localStorage
- Respects system preference on first load
- All components support dark mode

---

## 🧪 Testing

Comprehensive testing checklist available in [TESTING.md](./TESTING.md):

- ✅ CRUD operations
- ✅ Search & filtering
- ✅ Responsive design
- ✅ Dark mode
- ✅ Form validation
- ✅ Image handling
- ✅ LocalStorage persistence
- ✅ Edge cases

**Run tests locally:**
```bash
npm run dev
# Open http://localhost:5173 and test manually
```

---

## 📦 Performance

- **Build Size:** 273 KB (gzipped: 82.7 KB)
- **Load Time:** < 2 seconds
- **Lighthouse Score:** 90+
- **No Backend Required:** 100% client-side

---

## 🚀 Deployment

### GitHub Pages (Recommended)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup:

**Option 1: Manual Deployment (gh-pages package)**
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

**Option 2: GitHub Actions (Automatic)**
- Create `.github/workflows/deploy.yml`
- Push to main branch
- Automatically deploys on every commit

Both options use HashRouter for compatibility.

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)

# Production
npm run build            # Build for production
npm run preview          # Preview production build locally

# Deployment
npm run deploy           # Deploy to GitHub Pages (with gh-pages package)
```

---

## 📝 Configuration

### Update Base URL for GitHub Pages

If deploying to a subdirectory (not user.github.io):

**vite.config.ts:**
```typescript
base: '/your-repo-name/'
```

**Then rebuild:**
```bash
npm run build
```

### Environment Variables

Create `.env` if needed:
```
VITE_BASE_URL=/product-management-app/
```

---

## 💾 Data Storage

All data is stored in browser's localStorage:
- **Products:** Stored with timestamps and complete information
- **Categories:** Related to products
- **Theme:** Dark/light mode preference
- **No server:** All data remains local

**Clear all data:**
```javascript
// In browser console
localStorage.clear()
// Then reload page (F5)
```

---

## 🎨 Customization

### Change Primary Color

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: 'your-color-here',
      // ... other colors
    }
  }
}
```

### Add More Mock Products

Edit `src/utils/constants.ts` and add to `MOCK_PRODUCTS` array.

### Modify Grid Layout

Edit breakpoints in `src/components/product/ProductGrid.tsx`:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

---

## ❌ Known Limitations

- All data stored in localStorage (limited to ~5MB per domain)
- No authentication/authorization
- No image resizing (stores full size)
- No undo/redo functionality
- Single browser storage (not synced across devices)

---

## 🤝 Contributing

To contribute:
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues, questions, or feedback:
1. Check [Testing Guide](./TESTING.md)
2. Check [Deployment Guide](./DEPLOYMENT.md)
3. Review console for errors (F12)
4. Create an issue on GitHub

---

## 🎉 Getting Started Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test CRUD operations
- [ ] Test responsive design (resize browser)
- [ ] Test dark mode toggle
- [ ] Test search/filter/sort
- [ ] Review test checklist
- [ ] Deploy to GitHub Pages
- [ ] Share your URL!

**You're all set! Happy managing! 🚀**
