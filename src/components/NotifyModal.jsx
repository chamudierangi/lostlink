import React, { useState, useEffect } from 'react';
import { X, Send, BellRing } from 'lucide-react';

const NotifyModal = ({ item, isOpen, onClose, lang }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (item) {
      const defaultText = lang === 'en'
        ? `Hello, I found an item matching your lost report "${item.titleEn}" on LostLink. Please contact me back!`
        : `හෙලෝ, මට ඔබ LostLink හි පළ කළ "${item.titleSi}" ට සමාන භාණ්ඩයක් හමුවී ඇත. කරුණාකර මා හා සම්බන්ධ වන්න!`;
      setMessage(defaultText);
    }
  }, [item, lang]);

  if (!isOpen || !item) return null;

  const handleSendSMS = (e) => {
    e.preventDefault();
    // Default SMS link trigger
    window.location.href = `sms:${item.phone}?body=${encodeURIComponent(message)}`;
    alert(lang === 'en' ? 'SMS Client opened!' : 'පණිවිඩය යැවීමට SMS සේවාව විවෘත විය!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-blue-600">
            <BellRing className="w-5 h-5" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {lang === 'en' ? 'Notify Item Owner' : 'අයිතිකරුට පණිවිඩයක් යවන්න'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSendSMS} className="p-6 space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'en'
              ? `You can send an instant notification directly to ${item.phone}. You may edit the default text below.`
              : `${item.phone} අංකයට සෘජු SMS පණිවිඩයක් යැවිය හැක. අවශ්‍ය නම් පණිවිඩය වෙනස් කරන්න.`}
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Message Text' : 'පණිවිඩය'}
            </label>
            <textarea
              rows="4"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-transform active:scale-[0.99]"
          >
            <Send className="w-4 h-4" />
            {lang === 'en' ? 'Send Instant SMS' : 'SMS පණිවිඩය යවන්න'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotifyModal;