import React from 'react';
import { X, MapPin, Calendar, Phone, MessageCircle, CheckCircle, Tag, AlertCircle } from 'lucide-react';

const ItemDetailsModal = ({ item, isOpen, onClose, onNotifyOpen, onMarkReturned, lang }) => {
  if (!isOpen || !item) return null;

  const isLost = item.type === 'lost';
  const isReturned = item.status === 'returned';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${item.title} - LostLink`,
        text: `Lost & Found Alert: ${item.title} in ${item.location}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'en' ? 'Link copied to clipboard!' : 'සබැඳිය පිටපත් කරගන්නා ලදී!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Header Image & Close Button */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-100 dark:bg-slate-800">
          <img
            src={item.image || 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80'}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 text-white backdrop-blur-md hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-sm ${isLost ? 'bg-red-500' : 'bg-emerald-500'}`}>
              {isLost ? (lang === 'en' ? 'Lost Item' : 'නැතිවූ භාණ්ඩයකි') : (lang === 'en' ? 'Found Item' : 'හමුවූ භාණ්ඩයකි')}
            </span>
            {isReturned && (
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500 text-white shadow-sm flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Returned' : 'භාරදුන්'}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span>{item.category || 'General'}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {item.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">{lang === 'en' ? 'Location / District' : 'ස්ථානය / දිස්ත්‍රික්කය'}</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.location || 'Not Specified'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">{lang === 'en' ? 'Date Reported' : 'දිනය'}</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.date || 'Recently'}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Item Description' : 'විස්තරය'}
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              {item.description || (lang === 'en' ? 'No additional description provided.' : 'අමතර විස්තරයක් ලබාදී නැත.')}
            </p>
          </div>

          {/* Action Contact Bar */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              {item.contact && (
                <a
                  href={`tel:${item.contact}`}
                  className="py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-transform active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" />
                  {lang === 'en' ? 'Call Contact' : 'ඇමතුමක් ගන්න'}
                </a>
              )}

              {item.whatsapp && (
                <a
                  href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '')}?text=Hi,%20I%20am%20contacting%20you%20regarding%20the%20${encodeURIComponent(item.title)}%20on%20LostLink.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-transform active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
            </div>

            {/* Notify Me Button & Mark Returned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {isLost && !isReturned && (
                <button
                  onClick={() => onNotifyOpen(item)}
                  className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-transform active:scale-[0.98]"
                >
                  <AlertCircle className="w-4 h-4" />
                  {lang === 'en' ? 'Notify Owner (SMS)' : 'හිමිකරුට SMS යවන්න'}
                </button>
              )}

              {!isReturned && (
                <button
                  onClick={() => onMarkReturned(item.id)}
                  className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  {lang === 'en' ? 'Mark as Returned' : 'භාරදුන් බව සටහන් කරන්න'}
                </button>
              )}

              <button
                onClick={handleShare}
                className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                {lang === 'en' ? 'Share Report' : 'දැන්වීම Share කරන්න'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;