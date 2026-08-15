import React, { useState } from 'react';
import { X, Mail, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';

const ContactModal = ({ isOpen, onClose, lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // ඔයාගේ විස්තර
  const MY_EMAIL = "chamudierangi@gmail.com"; // <-- ඔයාට mail එන්න ඕන email address එක
  const MY_PHONE = "077 810 7543";

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Formspree Free Endpoint එක හරහා කෙලින්ම ඔයාගේ email එකට message එක යැවීම
      const response = await fetch(`https://formsubmit.co/ajax/${MY_EMAIL}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Message: formData.message,
          _subject: `New LostLink Support Message from ${formData.name}`,
        })
      });

      if (response.ok) {
        setSentSuccess(true);
        setTimeout(() => {
          setSentSuccess(false);
          setFormData({ name: '', email: '', message: '' });
          onClose();
        }, 2000);
      } else {
        // Direct Mailto Client Fallback
        window.location.href = `mailto:${MY_EMAIL}?subject=LostLink Support: ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        onClose();
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Fallback in case of network issue
      window.location.href = `mailto:${MY_EMAIL}?subject=LostLink Support: ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden shadow-2xl my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {lang === 'en' ? 'Contact Support' : 'අප හා සම්බන්ධ වන්න'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'en' ? 'Have questions, feedback, or need help?' : 'ගැටලු හෝ ප්‍රතිපෝෂණ ඇත්නම් අපට දන්වන්න'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Your Direct Phone & Email Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <a 
              href={`mailto:${MY_EMAIL}`} 
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="truncate font-semibold">{MY_EMAIL}</span>
            </a>
            
            <a 
              href="tel:0778107543" 
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold">{MY_PHONE}</span>
            </a>
          </div>

          {sentSuccess ? (
            <div className="p-6 text-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {lang === 'en' ? 'Message Sent!' : 'පණිවිඩය සාර්ථකව යවන ලදී!'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {lang === 'en' ? 'We will get back to you shortly.' : 'කඩිනමින් ඔබව සම්බන්ධ කරගන්නෙමු.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Your Name' : 'ඔබගේ නම'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'en' ? 'Enter your name' : 'නම ඇතුළත් කරන්න'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Your Email' : 'විද්‍යුත් තැපෑල (Email)'} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Message' : 'පණිවිඩය'} *
                </label>
                <textarea
                  rows="3"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'en' ? 'How can we help you?' : 'ඔබගේ පණිවිඩය මෙහි සටහන් කරන්න...'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {!loading && <Send className="w-4 h-4" />}
                {loading 
                  ? (lang === 'en' ? 'Sending...' : 'යවමින් පවතී...') 
                  : (lang === 'en' ? 'Send Message' : 'පණිවිඩය යවන්න')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;