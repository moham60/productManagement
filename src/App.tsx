import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { ProductProvider } from './context/ProductContext';
import { Header } from './components/shared/Header';
import './styles/globals.css';

const ProductListPage = lazy(() =>
  import('./pages/ProductListPage').then((module) => ({ default: module.ProductListPage }))
);
const ProductFormPage = lazy(() =>
  import('./pages/ProductFormPage').then((module) => ({ default: module.ProductFormPage }))
);
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage }))
);

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ProductProvider>
        <HashRouter>
          <Header />
          <main id="main-content" aria-label="Main content">
            <Suspense
              fallback={
                <div className="min-h-screen pt-20 flex items-center justify-center text-on-surface-variant dark:text-slate-400">
                  Loading...
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/products/new" element={<ProductFormPage />} />
                <Route path="/products/:id/edit" element={<ProductFormPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#000',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#10B981',
                  color: '#fff',
                },
              },
              error: {
                duration: 3000,
                style: {
                  background: '#EF4444',
                  color: '#fff',
                },
              },
            }}
          />
        </HashRouter>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
