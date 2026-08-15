import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode, lang, setLang, onAboutClick, onContactClick }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-blue-600 text-white p-2 rounded-xl font-black text-xl shadow-md shadow-blue-600/30">
              LL
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Lost<span className="text-blue-600">Link</span>
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hidden sm:block"
            >
              {lang === 'en' ? 'Home' : 'මුල් පිටුව'}
            </button>
            <button
              onClick={onAboutClick}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {lang === 'en' ? 'About' : 'අප ගැන'}
            </button>
            <button
              onClick={onContactClick}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {lang === 'en' ? 'Contact' : 'සම්බන්ධ වන්න'}
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'en' ? 'si' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'en' ? 'සිංහල' : 'English'}</span>
            </button>

            {/* Theme Switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;