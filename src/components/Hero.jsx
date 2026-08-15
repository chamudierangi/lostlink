import React from 'react';
import { PlusCircle, Search, HelpCircle } from 'lucide-react';

const Hero = ({ lang }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-xs sm:text-sm font-semibold mb-6">
          <HelpCircle className="w-4 h-4" />
          {lang === 'en' ? 'Nationwide Lost & Found System' : 'දිවයින පුරා නැතිවූ ද්‍රව්‍ය සොයාගැනීමේ ජාලය'}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
          {lang === 'en' ? (
            <>Helping Lost Things <span className="text-blue-600">Find Their Way Home.</span></>
          ) : (
            <>නැතිවූ දේවල් නැවත <span className="text-blue-600">හිමිකරුවන්ට ලබා දෙමු.</span></>
          )}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
          {lang === 'en'
            ? 'LostLink is a nationwide platform where anyone can report lost or found items and help return them to their rightful owners.'
            : 'LostLink යනු නැතිවූ හෝ හමුවූ ඕනෑම භාණ්ඩයක් පිළිබඳව ලියාපදිංචි වී ඉක්මනින් නිවැරදි හිමිකරු වෙත ලබා දීමට උදව් වන වේදිකාවකි.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-base shadow-lg shadow-red-500/25 transition-all transform hover:-translate-y-0.5">
            <PlusCircle className="w-5 h-5" />
            {lang === 'en' ? 'Report Lost Item' : 'නැතිවූ දෙයක් දන්වන්න'}
          </button>
          
          <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5">
            <Search className="w-5 h-5" />
            {lang === 'en' ? 'Report Found Item' : 'හමුවූ දෙයක් දන්වන්න'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;