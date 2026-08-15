import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import ItemGrid from './components/ItemGrid';
import Footer from './components/Footer';
import ReportModal from './components/ReportModal';
import ItemDetailsModal from './components/ItemDetailsModal';
import NotifyModal from './components/NotifyModal';
import AboutModal from './components/AboutModal';
import ContactModal from './components/ContactModal';
import { fetchAllItems, markItemReturnedInDB } from './services/itemService';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportType, setReportType] = useState('lost');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const liveData = await fetchAllItems();
    setItems(liveData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenReport = (type) => {
    setReportType(type);
    setIsReportOpen(true);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleMarkReturned = async (itemId) => {
    try {
      await markItemReturnedInDB(itemId);
      setItems((prev) =>
        prev.map((it) => (it.id === itemId ? { ...it, status: 'returned' } : it))
      );
      alert(lang === 'en' ? 'Item marked as Returned!' : 'භාණ්ඩය හිමිකරුට භාරදුන් බව සටහන් විය!');
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleItemAdded = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        lang={lang} 
        setLang={setLang}
        onAboutClick={() => setIsAboutOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />
      <main>
        <div onClick={(e) => {
          if (e.target.closest('button')?.innerText?.includes('Report Lost') || e.target.closest('button')?.innerText?.includes('නැතිවූ')) {
            handleOpenReport('lost');
          } else if (e.target.closest('button')?.innerText?.includes('Report Found') || e.target.closest('button')?.innerText?.includes('හමුවූ')) {
            handleOpenReport('found');
          }
        }}>
          <Hero lang={lang} />
        </div>
        
        <Stats items={items} lang={lang} />
        
        {loading ? (
          <div className="text-center py-16 text-slate-400 font-medium animate-pulse">
            Loading items from Firebase...
          </div>
        ) : (
          <ItemGrid items={items} onItemClick={handleCardClick} lang={lang} />
        )}

        <HowItWorks lang={lang} />
      </main>
      
      <Footer 
        lang={lang} 
        onAboutClick={() => setIsAboutOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        defaultType={reportType}
        lang={lang}
        onItemAdded={handleItemAdded}
      />

      {/* Item Details Modal */}
      <ItemDetailsModal
        item={selectedItem}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onNotifyOpen={(item) => {
          setSelectedItem(item);
          setIsNotifyOpen(true);
        }}
        onMarkReturned={handleMarkReturned}
        lang={lang}
      />

      {/* Notify Modal */}
      <NotifyModal
        item={selectedItem}
        isOpen={isNotifyOpen}
        onClose={() => setIsNotifyOpen(false)}
        lang={lang}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        lang={lang}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;