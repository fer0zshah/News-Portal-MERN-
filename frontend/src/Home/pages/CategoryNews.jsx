import React, { useEffect, useState ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import our reusable blocks!
import HotBlock from '../components/HotBlock';
import LatestBlock from '../components/LatestBlock';
import NormalBlock from '../components/NormalBlock';

import storeContext from '../../context/storeContext';

// ==========================================
// HELPER FUNCTION: Time Ago Calculator
// You can later move this to a 'utils' folder!
// ==========================================
const timeAgo = (dateString) => {
  const newsDate = new Date(dateString);
  const now = new Date();
  const secondsPast = (now.getTime() - newsDate.getTime()) / 1000;

  if (secondsPast < 60) return 'Just now';
  if (secondsPast < 3600) return `${Math.floor(secondsPast / 60)} minutes ago`;
  if (secondsPast <= 86400) return `${Math.floor(secondsPast / 3600)} hours ago`;
  if (secondsPast <= 2592000) return `${Math.floor(secondsPast / 86400)} days ago`;
  if (secondsPast <= 31536000) return `${Math.floor(secondsPast / 2592000)} months ago`;
  return `${Math.floor(secondsPast / 31536000)} years ago`;
};

const CategoryNews = () => {
  // 1. Grab the dynamic category from the URL
  const { category } = useParams(); 
  const { store } = useContext(storeContext);
  const isAdminUser = store.userInfo?.role === 'admin';
  // 2. Setup state
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to track how many cards to show
  const [visibleCount, setVisibleCount] = useState(8); 

  // 3. Re-fetch data whenever the category changes
  useEffect(() => {
    setLoading(true);
    // Reset visible count back to 8 when swapping categories
    setVisibleCount(8); 
    setTimeout(() => setLoading(false), 500);
    
    window.scrollTo(0, 0); 
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center font-bold text-xl text-slate-500">
          Loading {category} News...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      {/* Dynamic Category Banner */}
      <div className="bg-slate-800 text-white py-8 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black uppercase tracking-wider">{category} NEWS</h1>
          <p className="text-slate-400 text-sm mt-2">The latest updates and hot stories in {category}.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
        
        {/* =========================================
            TOP ROW: CATEGORY HOT NEWS & LATEST 4
            ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <HotBlock blockTitle={`Hot in ${category}`} />
          <LatestBlock blockTitle={`Latest in ${category}`} />
        </div>

        {/* =========================================
            BOTTOM ROW: OLDER NEWS GRID
            ========================================= */}
        <div className="mt-12">
          <div className="flex justify-between items-center border-b-2 border-slate-200 mb-6 pb-2">
            <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">More {category} Updates</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* We create an array of 24 fake items, but ONLY show 'visibleCount' amount.
            */}
            {Array.from({ length: 24 }).slice(0, visibleCount).map((_, index) => {
              
              // FAKE DATABASE DATE: We subtract a few hours based on the index to test our timeAgo function!
              // (e.g., index 1 is 2 hours ago, index 10 is 20 hours ago)
              const dummyDbDate = new Date(Date.now() - index * 2 * 60 * 60 * 1000).toISOString();

              return (
                <NormalBlock 
                  key={index}
                  image={`https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=400&auto=format&fit=crop&sig=${index}`}
                  title="This will be an older news article fetched from the database..."
                  badge={category}
                  timestamp={timeAgo(dummyDbDate)} // Passing the calculated time!
                  isAdmin={true} 
  onMakeHot={() => alert(`Making article ${index} the new HOT news! 🔥`)}
  onEdit={() => alert(`Editing article ${index} 📝`)}
  onDelete={() => alert(`Deleting article ${index} 🗑️`)}
                />
              )
            })}
          </div>

          {/* =========================================
              LOAD MORE BUTTON
              ========================================= */}
          {/* Only show the button if there are still more fake items to load */}
          {visibleCount < 24 && (
            <div className="flex justify-center mt-10 mb-8">
              <button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="bg-white border-2 border-slate-300 text-slate-700 font-bold py-2 px-8 rounded-full hover:bg-slate-50 hover:border-slate-400 hover:text-red-600 transition-colors shadow-sm"
              >
                Load More News 
              </button>
            </div>
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default CategoryNews;