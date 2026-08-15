import React, { useState, useRef } from 'react';
import { X, UploadCloud, AlertCircle, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
import { createItemReport } from '../services/itemService';

const ReportModal = ({ isOpen, onClose, defaultType = 'lost', lang, onItemAdded }) => {
  const [reportType, setReportType] = useState(defaultType);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // File input එක trigger කිරීමට ref එකක්
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Wallets & Bags',
    location: '',
    district: 'Colombo',
    date: new Date().toISOString().split('T')[0],
    description: '',
    phone: '',
    whatsapp: '',
  });

  const categories = ['Wallets & Bags', 'Electronics', 'Documents', 'Keys', 'Pets', 'Jewelry', 'Other'];
  const districts = ['Colombo', 'Gampaha', 'Kandy', 'Galle', 'Matara', 'Kurunegala', 'Jaffna', 'Anuradhapura', 'Badulla', 'Ratnapura'];

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        type: reportType,
        titleEn: formData.title,
        titleSi: formData.title,
        descriptionEn: formData.description,
        descriptionSi: formData.description,
      };

      const newItem = await createItemReport(payload, imageFile);
      if (onItemAdded) onItemAdded(newItem);

      alert(lang === 'en' ? 'Report submitted successfully!' : 'දැන්වීම සාර්ථකව ඇතුළත් විය!');
      setImageFile(null);
      setImagePreview(null);
      onClose();
    } catch (error) {
      console.error('Firebase save error:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {lang === 'en' ? 'Create a Report' : 'දැන්වීමක් ඇතුළත් කරන්න'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'en' ? 'No registration or login required' : 'ලියාපදිංචි වීමක් අවශ්‍ය නොවේ'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Type Selector */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setReportType('lost')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
                reportType === 'lost'
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/25'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              {lang === 'en' ? 'Lost Item' : 'නැතිවූ භාණ්ඩයක්'}
            </button>
            <button
              type="button"
              onClick={() => setReportType('found')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
                reportType === 'found'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {lang === 'en' ? 'Found Item' : 'හමුවූ භාණ්ඩයක්'}
            </button>
          </div>

          {/* Item Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Item Title' : 'භාණ්ඩයේ නම'} *
            </label>
            <input
              type="text"
              required
              placeholder={lang === 'en' ? 'e.g., Black Leather Wallet' : 'උදා: කළු පසුම්බිය'}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Category & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Category' : 'කාණ්ඩය'} *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'District' : 'දිස්ත්‍රික්කය'} *
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Location' : 'ස්ථානය'} *
              </label>
              <input
                type="text"
                required
                placeholder={lang === 'en' ? 'e.g., Bus Stand, Railway Station' : 'උදා: බස් නැවතුම'}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

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
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Phone Number' : 'දුරකථන අංකය'} *
              </label>
              <input
                type="tel"
                required
                placeholder="0771234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'WhatsApp Number' : 'WhatsApp අංකය'}
              </label>
              <input
                type="tel"
                placeholder="94771234567"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
              />
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
              placeholder={lang === 'en' ? 'Describe the item...' : 'භාණ්ඩයේ විස්තරය...'}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
          </div>

          {/* Image Input Box with useRef */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Upload Image' : 'පින්තූරයක් තෝරන්න'}
            </label>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div
              onClick={handleTriggerFileInput}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer block transition-all bg-slate-50 dark:bg-slate-950/50 hover:bg-blue-50/20"
            >
              {imagePreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img src={imagePreview} alt="Preview" className="h-28 object-contain rounded-lg shadow-sm" />
                  <span className="text-xs text-blue-600 font-semibold">{imageFile?.name} (Click to change)</span>
                </div>
              ) : (
                <div className="py-2">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {lang === 'en' ? 'Click here to browse your files' : 'පින්තූරය තෝරා ගැනීමට මෙතන click කරන්න'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? (lang === 'en' ? 'Submitting...' : 'ඇතුළත් කරමින් පවතී...') : (lang === 'en' ? 'Submit Report' : 'දැන්වීම පළ කරන්න')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;