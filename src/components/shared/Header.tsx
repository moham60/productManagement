import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Bell, User } from 'lucide-react';
import { useProductContext } from '../../context/ProductContext';


export function Header() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { searchTerm, setSearchTerm } = useProductContext();
 
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (!mounted) return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-surface dark:bg-slate-950/80 backdrop-blur-md shadow-sm dark:shadow-none h-16">
      <nav className="flex justify-between items-center w-full px-8 h-16 max-w-full mx-auto">
        {/* Left side - Logo and Brand */}
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-primary dark:text-blue-400 font-headline">
            ArchitectEditor
          </span>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Hidden on mobile */}
          <div className="relative hidden sm:block">
            <label htmlFor="header-product-search" className="sr-only">
              Search products
            </label>
            <input
              id="header-product-search"
              type="text"
              aria-label="Search products"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-surface-container-low dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest dark:focus:bg-slate-700 transition-all text-on-surface dark:text-slate-100 font-body"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Notification Button */}
          <button
            type="button"
            aria-label="Open notifications"
            title="Open notifications"
            className="p-2 text-on-surface-variant dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-transform active:scale-95"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile Button */}
          <button
            type="button"
            aria-label="Open user profile"
            title="Open user profile"
            className="p-2 text-on-surface-variant dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-transform active:scale-95"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-on-surface-variant dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-transform active:scale-95"
            title={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {currentTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
