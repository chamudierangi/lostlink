import React from 'react';
import { AlertCircle, CheckCircle2, Clock, Check } from 'lucide-react';

const Stats = ({ items = [], lang }) => {
  // Calculate live dynamic counts based on Firestore items
  const totalLost = items.filter((item) => item.type === 'lost').length;
  const totalFound = items.filter((item) => item.type === 'found').length;
  const totalReturned = items.filter((item) => item.status === 'returned').length;
  const stillMissing = items.filter((item) => item.type === 'lost' && item.status !== 'returned').length;

  const statsData = [
    {
      id: 1,
      titleEn: 'Total Lost Items',
      titleSi: 'නැතිවූ භාණ්ඩ',
      value: totalLost,
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10 dark:bg-red-500/20',
    },
    {
      id: 2,
      titleEn: 'Total Found Items',
      titleSi: 'හමුවූ භාණ්ඩ',
      value: totalFound,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    },
    {
      id: 3,
      titleEn: 'Successfully Returned',
      titleSi: 'හිමිකරුවන්ට භාරදුන්',
      value: totalReturned,
      icon: Check,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
    },
    {
      id: 4,
      titleEn: 'Items Still Missing',
      titleSi: 'තවමත් සොයමින් සිටින',
      value: stillMissing,
      icon: Clock,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {lang === 'en' ? stat.titleEn : stat.titleSi}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;