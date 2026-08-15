import React, { useState } from 'react';
import { X, MapPin, Calendar, Phone, MessageSquare, Bell, CheckCircle2, Share2, Tag } from 'lucide-react';

const ItemDetailsModal = ({ item, isOpen, onClose, onNotifyOpen, onMarkReturned, lang }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                item.type === 'lost'
                  ? 'bg-red-500 text-white'
                  : 'bg-emerald-500 text-white'
              }`}
            >
              {item.type === 'lost' ? (lang === 'en' ? 'Lost Item' : 'නැතිවූ භාණ්ඩයක්') : (lang === 'en' ? 'Found Item' : 'හමුවූ භාණ්ඩයක්')}
            </span>
            {item.status === 'returned' && (
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 text-white">
                {lang === 'en' ? 'Returned' : 'භාරදුන්'}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Image */}
          <div className="w-full h-64 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <img src={item.image} alt={item.titleEn} className="w-full h-full object-cover" />
          </div>

          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              <Tag className="w-4 h-4" />
              <span>{item.category}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {lang === 'en' ? item.titleEn : item.titleSi}
            </h2>
          </div>

          {/* Info Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-sm">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400">{lang === 'en' ? 'Location' : 'ස්ථානය'}</p>
                <p className="font-semibold">{item.location} ({item.district})</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <Calendar className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400">{lang === 'en' ? 'Date' : 'දිනය'}</p>
                <p className="font-semibold">{item.date}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Description' : 'විස්තරය'}
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {lang === 'en' ? item.descriptionEn : item.descriptionSi}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            {/* Notify Me Button (Lost items සඳහා පමණක්) */}
            {item.type === 'lost' && item.status !== 'returned' && (
              <button
                onClick={() => {
                  onClose();
                  onNotifyOpen(item);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all"
              >
                <Bell className="w-4 h-4" />
                {lang === 'en' ? 'Notify Owner (I Found This!)' : 'අයිතිකරු දැනුවත් කරන්න (මට මෙය හමුවුණා)'}
              </button>
            )}

            {/* Direct Contact Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${item.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                {lang === 'en' ? 'Call' : 'අමතන්න'}
              </a>

              {item.whatsapp && (
                <a
                  href={`https://wa.me/${item.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
            </div>

            {/* Mark as Returned Button */}
            {item.status !== 'returned' && (
              <button
                onClick={() => {
                  onMarkReturned(item.id);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-bold transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                {lang === 'en' ? 'Mark as Returned to Owner' : 'හිමිකරුට නැවත ලබාදුන් බව සලකුණු කරන්න'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;