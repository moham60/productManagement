# GitHub Pages Deployment Guide

## Phase 13: Deploy to GitHub Pages

### Prerequisites
- Git installed
- GitHub account
- Node.js & npm installed

---

## Option 1: Manual Deployment (Recommended for First Time)

### Step 1: Create GitHub Repository

```bash
# Initialize git in your project
cd d:\React\TsProjects\WithVibeCoding
git init
git add .
git commit -m "Initial commit: Complete Product Management App"

# Create repo on GitHub (via web), then:
git remote add origin https://github.com/YOUR_USERNAME/repo-name.git
git branch -M main
git push -u origin main
```

### Step 2: Update Base URL (if using subdirectory)

If your repo is NOT your user.github.io site, update:

**vite.config.ts:**
```typescript
base: '/product-management-app/',  // Use your repo name
```

**Then rebuild:**
```bash
npm run build
```

### Step 3: Deploy dist Folder

**Option A: Using gh-pages package (Easiest)**

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Option B: Manual Push to gh-pages Branch**

```bash
# Create orphan gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push -u origin gh-pages

# Switch back to main
git checkout main
```

### Step 4: Configure GitHub Pages Settings

1. Go to your GitHub repo
2. Settings → Pages
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: Select `gh-pages`
   - Folder: `/ (root)`
4. Click Save

Your site will be available at:
- **User repo:** `https://YOUR_USERNAME.github.io/`
- **Project repo:** `https://YOUR_USERNAME.github.io/repo-name/`

---

## Option 2: Automated Deployment (GitHub Actions)

### Step 1: Create Workflow File

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Upload pages artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Step 2: Push to GitHub

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### Step 3: Monitor Deployment

- Go to Actions tab in GitHub
- Watch the workflow run
- After completion, your site is live!

---

## Verify Deployment

1. **Check your GitHub Pages URL:**
   - `https://YOUR_USERNAME.github.io/repo-name/`

2. **Test all features:**
   - Products load
   - Can add/edit/delete
   - Search/filter/sort work
   - Dark mode toggles
   - Data persists on reload

3. **Check Console:**
   - Press F12
   - No 404 errors
   - No CORS errors

---

## Troubleshooting

### Issue: White page on GitHub Pages

**Solution:** Check base URL in vite.config.ts:
```typescript
// If repo is: github.com/username/my-app
base: '/my-app/'

// If repo is: github.com/username/username.github.io
base: '/'
```

Rebuild after changing:
```bash
npm run build
```

### Issue: Assets not loading (404 errors)

**Solution:** Verify dist folder was deployed to gh-pages branch:
```bash
git checkout gh-pages
ls -la  # Should see index.html, assets/ folder
```

### Issue: Routes not working

**Solution:** HashRouter is already configured in App.tsx, which works with GitHub Pages. No changes needed.

### Issue: Images broken

**Solution:** Check if images are using absolute URLs from Unsplash. They should work. If not, try:
```typescript
// In App.tsx or components
// Image URLs use full HTTPS URLs from Unsplash, which should work
```

---

## Update Workflow

To update your app after deployment:

```bash
# Make changes
# ... edit files ...

# Commit
git add .
git commit -m "Update product features"
git push origin main

# If using GitHub Actions: Automatically deployed!
# If manual: 
npm run build
# Push dist to gh-pages branch
```

---

## Environment Variables (if needed)

Create `.env`:
```
VITE_BASE_URL=/product-management-app/
```

Build with:
```bash
npm run build
```

---

## Performance

- **Bundle size:** ~273 KB (gzipped: 82.7 KB)
- **Load time:** <2s on typical connection
- **Lighthouse:** Target 90+ score

---

## Security

✅ No backend dependencies (all client-side)
✅ No sensitive data stored
✅ Uses localStorage only for local data
✅ Static hosting - no server vulnerabilities
✅ HTTPS automatic on GitHub Pages

---

## Monitoring & Updates

### Keep Dependencies Updated

```bash
npm update
npm audit fix
```

### Monitor Build Size

```bash
npm run build
# Check dist size
ls -lah dist/
```

### Performance Monitoring

Use Lighthouse in DevTools to check:
- Performance
- Accessibility
- Best Practices
- SEO

---

## Next Steps

1. ✅ Build completed
2. ⏭️  Test locally: `npm run dev`
3. ⏭️  Deploy: Choose Option 1 or 2 above
4. ⏭️  Share your URL!

Your Product Management App is now production-ready! 🚀
