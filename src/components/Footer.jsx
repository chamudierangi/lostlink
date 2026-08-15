import React from 'react';
import { Heart } from 'lucide-react';

const Footer = ({ lang, onAboutClick, onContactClick }) => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/chamudierangi',
      color: 'hover:text-slate-900 dark:hover:text-white',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/chamudi-erangi-0337b8383/',
      color: 'hover:text-blue-600',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://web.facebook.com/profile.php?id=61575510746368',
      color: 'hover:text-blue-500',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/94778107543',
      color: 'hover:text-emerald-500',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.19 0-.46.07-.7.34-.24.27-.93.91-.93 2.22s.95 2.58 1.08 2.76c.13.18 1.87 2.86 4.53 4.01.63.27 1.12.43 1.51.55.64.2 1.22.17 1.68.1.51-.08 1.57-.64 1.79-1.26.22-.62.22-1.15.16-1.26-.06-.11-.25-.18-.52-.31-.27-.14-1.57-.77-1.81-.86-.24-.09-.42-.14-.6.14-.18.27-.69.86-.85 1.04-.16.18-.31.2-.58.07-.27-.14-1.15-.42-2.19-1.34-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.46.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.47h-.51z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg font-black text-lg shadow-md shadow-blue-600/30">
              LL
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              Lost<span className="text-blue-600">Link</span>
            </span>
          </div>

          {/* Social Media Profile Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 transition-all transform hover:-translate-y-1 hover:shadow-md ${social.color}`}
                title={social.name}
              >
                {social.svg}
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <button onClick={onAboutClick} className="hover:text-blue-600 transition-colors">
              {lang === 'en' ? 'About' : 'අප ගැන'}
            </button>
            <button onClick={onContactClick} className="hover:text-blue-600 transition-colors">
              {lang === 'en' ? 'Contact' : 'සම්බන්ධ වන්න'}
            </button>
            <button 
              onClick={() => alert('LostLink Privacy: We respect user data privacy and do not sell phone numbers to third parties.')} 
              className="hover:text-blue-600 transition-colors"
            >
              {lang === 'en' ? 'Privacy Policy' : 'රහස්‍යතාව'}
            </button>
          </div>
        </div>

        {/* Developer Attribution & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
            © 2026 LostLink. Developed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> by Chamudi Erangi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;