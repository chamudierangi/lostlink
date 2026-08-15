import React from 'react';
import { X, ShieldCheck, Users, Zap, Heart } from 'lucide-react';

const AboutModal = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {lang === 'en' ? 'About LostLink' : 'LostLink පිළිබඳව'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'en' ? 'National Lost & Found Community Platform' : 'ජාතික නැතිවූ සහ හමුවූ ද්‍රව්‍ය සම්බන්ධීකරණ වේදිකාව'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          <p>
            {lang === 'en'
              ? 'LostLink is a centralized, nationwide platform designed to help people report, search for, and recover lost belongings anywhere across Sri Lanka. Our mission is to bridge the gap between finders and owners with zero friction.'
              : 'LostLink යනු ශ්‍රී ලංකාව පුරා නැතිවූ සහ හමුවූ ඕනෑම භාණ්ඩයක් පහසුවෙන් වාර්තා කිරීමට සහ නැවත සොයා ගැනීමට නිර්මාණය කරන ලද මධ්‍යගත ජාතික වේදිකාවකි. අයිතිකරුවන් සහ භාණ්ඩ හමුවූවන් කඩිනමින් සම්බන්ධ කිරීම අපගේ මූලික අරමුණයි.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                {lang === 'en' ? 'No Login Barrier' : 'ලියාපදිංචි වීම් නැත'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Publish reports instantly without account requirements.' : 'ගිණුමක් සෑදීමකින් තොරව ක්ෂණිකව දැන්වීම් පළ කළ හැක.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                {lang === 'en' ? 'Direct Contact' : 'සෘජු සම්බන්ධතාව'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Connect directly via phone, WhatsApp, or instant SMS.' : 'දුරකථන ඇමතුම්, WhatsApp හෝ SMS මඟින් සෘජුවම සම්බන්ධ වන්න.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                {lang === 'en' ? 'Community Driven' : 'ප්‍රජා මූලික සේවාව'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Built to empower community honesty and support.' : 'අන්‍යෝන්‍ය විශ්වාසය සහ සහයෝගය මත ක්‍රියාත්මක වේ.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500 flex-shrink-0" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'en'
                ? 'LostLink is completely free to use for all citizens and organizations across the nation.'
                : 'LostLink සම්පූර්ණයෙන්ම නොමිලේ ක්‍රියාත්මක වන ප්‍රජා සත්කාරක වේදිකාවකි.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;