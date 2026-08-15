import React, { useState } from 'react';
import { Search, MapPin, Calendar, Eye, Tag } from 'lucide-react';

const ItemGrid = ({ items, onItemClick, lang }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const categories = ['Wallets & Bags', 'Electronics', 'Documents', 'Keys', 'Pets', 'Jewelry', 'Other'];
  const districts = ['Colombo', 'Gampaha', 'Kandy', 'Galle', 'Matara', 'Kurunegala', 'Jaffna'];

  const filteredItems = items.filter((item) => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch =
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleSi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'all' || item.district === selectedDistrict;
    return matchesTab && matchesSearch && matchesCategory && matchesDistrict;
  });

  return (
    <section id="items" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {lang === 'en' ? 'Recent Reports' : 'මෑතකාලීන දැන්වීම්'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'en' ? 'Browse through items reported by the community' : 'නැතිවූ සහ හමුවූ සියලුම දැන්වීම් මෙතැනින් පිරික්සන්න'}
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl self-start md:self-auto border border-slate-200 dark:border-slate-700">
          {['all', 'lost', 'found'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab === 'all' ? (lang === 'en' ? 'All Items' : 'සියල්ල') : tab === 'lost' ? (lang === 'en' ? 'Lost' : 'නැතිවූ') : (lang === 'en' ? 'Found' : 'හමුවූ')}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder={lang === 'en' ? 'Search items, places...' : 'භාණ්ඩය හෝ ස්ථානය සොයන්න...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">{lang === 'en' ? 'All Categories' : 'සියලුම කාණ්ඩ'}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">{lang === 'en' ? 'All Districts' : 'සියලුම දිස්ත්‍රික්ක'}</option>
            {districts.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col"
          >
            <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img
                src={item.image}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    item.type === 'lost'
                      ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                      : 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                  }`}
                >
                  {item.type === 'lost' ? (lang === 'en' ? 'Lost' : 'නැතිවූ') : (lang === 'en' ? 'Found' : 'හමුවූ')}
                </span>
                {item.status === 'returned' && (
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 text-white">
                    {lang === 'en' ? 'Returned' : 'භාරදුන්'}
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{item.category}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                  {lang === 'en' ? item.titleEn : item.titleSi}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                  {lang === 'en' ? item.descriptionEn : item.descriptionSi}
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{item.location} ({item.district})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {lang === 'en' ? 'View Details' : 'විස්තර බලන්න'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ItemGrid;