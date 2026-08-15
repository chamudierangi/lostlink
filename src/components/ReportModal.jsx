import React, { useState } from 'react';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import { createItemReport } from '../services/itemService';

const CATEGORIES = [
  'Wallets & Purses',
  'Phones & Electronics',
  'Documents & ID Cards',
  'Keys & Keychains',
  'Bags & Luggage',
  'Jewelry & Watches',
  'Clothing & Accessories',
  'Pets & Animals',
  'Other Items',
];

const DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Monaragala', 'Ratnapura', 'Kegalle'
];

const ReportModal = ({ isOpen, onClose, defaultType = 'lost', lang, onItemAdded }) => {
  const [type, setType] = useState(defaultType);
  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    location: DISTRICTS[0],
    date: new Date().toISOString().split('T')[0],
    contact: '',
    whatsapp: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        type,
      };

      const newItem = await createItemReport(payload, imageFile);
      if (onItemAdded) {
        onItemAdded(newItem);
      }

      alert(lang === 'en' ? 'Report submitted successfully!' : 'දැන්වීම සාර්ථකව පළ කරන ලදී!');
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {type === 'lost' 
                ? (lang === 'en' ? 'Report a Lost Item' : 'නැතිවූ භාණ්ඩයක් වාර්තා කරන්න')
                : (lang === 'en' ? 'Report a Found Item' : 'හමුවූ භාණ්ඩයක් වාර්තා කරන්න')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'en' ? 'No login required. Submit details directly.' : 'ගිණුමක් අවශ්‍ය නොවේ. කෙලින්ම විස්තර ඇතුළත් කරන්න.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Report Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setType('lost')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                type === 'lost'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? 'Lost Item' : 'නැතිවූ භාණ්ඩයක්'}
            </button>
            <button
              type="button"
              onClick={() => setType('found')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                type === 'found'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? 'Found Item' : 'හමුවූ භාණ්ඩයක්'}
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Item Title' : 'භාණ්ඩයේ නම'} *
            </label>
            <input
              type="text"
              required
              placeholder={lang === 'en' ? 'e.g., Black Leather Wallet, iPhone 13' : 'උදා: කළු පැහැති පසුම්බියක්, iPhone 13'}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Category' : 'වර්ගය'} *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'District' : 'දිස්ත්‍රික්කය'} *
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
              >
                {DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Date' : 'දිනය'} *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Phone Number' : 'දුරකථන අංකය'} *
              </label>
              <input
                type="tel"
                required
                placeholder="0771234567"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* WhatsApp (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              WhatsApp ({lang === 'en' ? 'Optional' : 'විකල්ප'})
            </label>
            <input
              type="tel"
              placeholder="0771234567"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Upload Image' : 'පින්තූරයක් එක් කරන්න'}
            </label>
            <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <div className="flex items-center justify-center gap-3">
                  <img src={imagePreview} alt="Preview" className="w-12 h-12 rounded-xl object-cover" />
                  <span className="text-xs font-bold text-blue-600">{lang === 'en' ? 'Change Image' : 'පින්තූරය වෙනස් කරන්න'}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <UploadCloud className="w-6 h-6" />
                  <span className="text-xs font-semibold">{lang === 'en' ? 'Click to upload item image' : 'පින්තූරය තෝරන්න'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Description' : 'විස්තරය'} *
            </label>
            <textarea
              rows="3"
              required
              placeholder={lang === 'en' ? 'Provide details, distinctive marks, or location clues...' : 'භාණ්ඩයේ විශේෂ ලකුණු හෝ අමතර විස්තර සටහන් කරන්න...'}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
          >
            {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {submitting 
              ? (lang === 'en' ? 'Submitting Report...' : 'වාර්තා කරමින් පවතී...') 
              : (lang === 'en' ? 'Submit Report' : 'දැන්වීම පළ කරන්න')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;