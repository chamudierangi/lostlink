import React from 'react';
import { FileEdit, SearchCheck, MessageCircle } from 'lucide-react';

const HowItWorks = ({ lang }) => {
  const steps = [
    {
      step: '01',
      icon: FileEdit,
      titleEn: 'Report Item',
      titleSi: 'දැන්වීමක් පළ කරන්න',
      descEn: 'Publish a lost or found report in under 2 minutes without needing an account.',
      descSi: 'ගිණුමක් සෑදීමකින් තොරව විනාඩි 2ක් ඇතුළත නැතිවූ හෝ හමුවූ දැන්වීමක් පහසුවෙන්ම ඇතුළත් කරන්න.',
    },
    {
      step: '02',
      icon: SearchCheck,
      titleEn: 'Search & Match',
      titleSi: 'සොයන්න හෝ පිරික්සන්න',
      descEn: 'Filter reports by category, district, date, or keywords to locate your missing item.',
      descSi: 'කාණ්ඩය, දිස්ත්‍රික්කය හෝ දිනය අනුව සෙවීම් සිදු කර ඔබගේ නැතිවූ භාණ්ඩය පහසුවෙන් සොයාගන්න.',
    },
    {
      step: '03',
      icon: MessageCircle,
      titleEn: 'Connect & Recover',
      titleSi: 'සම්බන්ධ වී ලබාගන්න',
      descEn: 'Directly contact via Phone, WhatsApp, or instant SMS to safely recover the item.',
      descSi: 'දුරකථන අංකය හෝ WhatsApp හරහා සෘජුවම අදාළ පුද්ගලයා සම්බන්ධ කරගෙන භාණ්ඩය ආපසු ලබාගන්න.',
    },
  ];

  return (
    <section id="about" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {lang === 'en' ? 'How LostLink Works' : 'LostLink ක්‍රියාත්මක වන ආකාරය'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
          {lang === 'en'
            ? 'Simple, fast, and transparent 3-step process to recover lost belongings.'
            : 'නැතිවූ ද්‍රව්‍ය නැවත ලබාගැනීමට පියවර 3 කින් යුත් සරල හා වේගවත් ක්‍රියාවලිය.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-start hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="flex items-center justify-between w-full mb-6">
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-slate-300 dark:text-slate-700">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {lang === 'en' ? item.titleEn : item.titleSi}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === 'en' ? item.descEn : item.descSi}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;