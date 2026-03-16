import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';

// Import our reusable blocks!
import HotBlock from '../components/HotBlock';
import LatestBlock from '../components/LatestBlock';
import NormalBlock from '../components/NormalBlock';

import storeContext from '../../context/storeContext';

const CategoryNews = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const { store } = useContext(storeContext);
  const isAdminUser = store.userInfo?.role === 'admin';

  // State setup
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  // ==========================================
  // 1. FETCH REAL DATA FROM BACKEND
  // ==========================================
  const fetchCategoryNews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/category/news/${category}`);
      setNews(response.data.news);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  // ==========================================
  // 2. ADMIN ACTION: MAKE HOT
  // ==========================================
  // Update this inside CategoryNews.jsx
  const handleMakeHot = async (newsId) => {
    try {
      const token = localStorage.getItem('newsToken');
      const response = await axios.put(`http://localhost:5000/api/news/make-hot/${newsId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(response.data.message);

      // ✨ THE MAGIC LINE: Re-fetch the data so the UI updates instantly!
      fetchCategoryNews();

    } catch (error) {
      console.error("Error making hot:", error);
      alert("Oops! Could not make the article hot.");
    }
  };

  // ==========================================
  // 3. ADMIN ACTION: DELETE
  // ==========================================
  const handleDelete = async (newsId) => {
    if (window.confirm("Are you sure you want to completely delete this article? This cannot be undone!")) {
      try {
        const token = localStorage.getItem('newsToken');
        const response = await axios.delete(`http://localhost:5000/api/news/delete/${newsId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        alert(response.data.message);

        // Remove the deleted article from the screen instantly!
        setNews((prevNews) => prevNews.filter(article => article._id !== newsId));
      } catch (error) {
        console.error("Error deleting news:", error);
        alert("Oops! Could not delete the article.");
      }
    }
  };

  // ==========================================
  // EFFECT HOOKS
  // ==========================================
  useEffect(() => {
    setLoading(true);
    setVisibleCount(8); // Reset visible count on category change

    // Fetch real data!
    fetchCategoryNews();

    // Simulate a tiny loading delay for smooth UX
    setTimeout(() => setLoading(false), 500);
    window.scrollTo(0, 0);
  }, [category]);


  // ==========================================
  // UI RENDER
  // ==========================================
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
  const hotNewsArticle = news.find(article => article.isHot === true);

  // Create a list of latest news that EXCLUDES the hot article, and grab the first 4
  const latestCategoryNews = news
    .filter(article => article.isHot !== true)
    .slice(0, 4);
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

        {/* TOP ROW: CATEGORY HOT NEWS & LATEST */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Update your HotBlock to look like this: */}
          <HotBlock
            blockTitle={`Hot in ${category}`}
            hotNews={hotNewsArticle} // <-- We are passing the real data down!
          />
          <LatestBlock
            blockTitle={`Latest in ${category}`}
            latestNews={latestCategoryNews}
          />
        </div>

        {/* BOTTOM ROW: REAL NEWS GRID */}
        <div className="mt-12">
          <div className="flex justify-between items-center border-b-2 border-slate-200 mb-6 pb-2">
            <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">
              More {category} Updates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.length > 0 ? (
              // Map through the REAL news array, up to the visibleCount limit
              news.slice(0, visibleCount).map((article) => (
                <NormalBlock
                  key={article._id}
                  image={article.image}
                  title={article.title}
                  badge={article.category}
                  timestamp={article.date}
                  isAdmin={isAdminUser}

                  // Connect the real database ID to your functions
                  onMakeHot={() => handleMakeHot(article._id)}
                  onEdit={() => navigate(`/dashboard/news/edit/${article._id}`)}
                  onDelete={() => handleDelete(article._id)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500 font-medium py-8">
                No news found in this category yet!
              </p>
            )}
          </div>

          {/* LOAD MORE BUTTON */}
          {/* Only show if we have more real news hiding than is currently visible */}
          {visibleCount < news.length && (
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