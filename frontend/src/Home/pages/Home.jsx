import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import your modular blocks
import HotBlock from '../components/HotBlock';
import LatestBlock from '../components/LatestBlock';
import HorizontalBlock from '../components/HorizontalBlock';
import NormalBlock from '../components/NormalBlock';
import SportsBlock from '../components/SportsBlock';
// Add this right above const Home = () => {
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};
const Home = () => {
  const [allNews, setAllNews] = useState({});

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/all/news');
        setAllNews(response.data.news);
      } catch (error) {
        console.error("Error fetching homepage news:", error);
      }
    };
    fetchAllNews();
  }, []);

  // Helper function: Finds the hot article for a category, or falls back to the newest one
  const getCategoryHot = (categoryName) => {
    const categoryArticles = allNews[categoryName] || [];
    return categoryArticles.find(article => article.isHot) || categoryArticles[0] || null;
  };

  // Grab the specific articles for your blocks
  const eduNews = getCategoryHot('Education');
  const techNews = getCategoryHot('Technology');
  const politicsNews = getCategoryHot('Politics');
  const intNews = getCategoryHot('International');
  const cultureNews = getCategoryHot('Culture');
  const economyNews = getCategoryHot('Economy');
  const opinionNews = getCategoryHot('Opinion');
  // Find one global hot news for the main top block
  const globalHotNews = Object.values(allNews).flat().find(article => article.isHot) || null;
  const allLatestNews = Object.values(allNews)
    .flat() // Flatten the category arrays into one big array
    .filter(article => article.isHot !== true) // Optional: Exclude the hot news if you don't want it repeated
    .sort((a, b) => {
      // Sort by newest first. Assuming you have a createdAt or date field.
      // If you strictly use strings like "March 11, 2026", it's better to use `createdAt` for accurate sorting.
      return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
    })
    .slice(0, 4); // Grab the top 4

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Breaking News Ticker (Truncated for brevity) */}
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* We pass the global hot news to the top block just like we did in CategoryNews */}
          <HotBlock hotNews={globalHotNews} />
         <LatestBlock latestNews={allLatestNews} blockTitle="Latest News" />
        </div>

        {/* MIDDLE ROW 2: EDUCATION, TECHNOLOGY & SPORTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Dynamic Education Block */}
              <div>
                <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
                  <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">Education</h2>
                </div>
                {eduNews ? (
                  <NormalBlock 
                    image={eduNews.image}
                    title={eduNews.title}
                    description={eduNews.description}
                  />
                ) : <p className="text-slate-400">No education news yet.</p>}
              </div>

              {/* Dynamic Technology Block */}
              <div>
                <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
                  <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">Technology</h2>
                </div>
                {techNews ? (
                  <NormalBlock 
                    image={techNews.image}
                    title={techNews.title}
                    description={techNews.description}
                  />
                ) : <p className="text-slate-400">No technology news yet.</p>}
              </div>

            </div>
          </div>

          {/* Pass ALL sports news to the SportsBlock */}
          <SportsBlock sportsNews={allNews['Sports'] || []} />
        </div>

      {/* MIDDLE ROW 1: POLITICS & INTERNATIONAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 mb-12">
          {politicsNews ? (
            <HorizontalBlock 
              categoryTitle="Politics" 
              image={politicsNews.image} 
              heading={politicsNews.title} 
              description={stripHtml(politicsNews.description)} 
            />
          ) : (
            <div>
              <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
                <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">Politics</h2>
              </div>
              <p className="text-slate-400">No politics news yet.</p>
            </div>
          )}

          {intNews ? (
            <HorizontalBlock 
              categoryTitle="International" 
              image={intNews.image} 
              heading={intNews.title} 
              description={stripHtml(intNews.description)} 
            />
          ) : (
            <div>
              <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
                <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">International</h2>
              </div>
              <p className="text-slate-400">No international news yet.</p>
            </div>
          )}
        </div>
{/* BOTTOM ROW: CULTURE & ECONOMY */}
<div className="mt-12 mb-12">
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    
    {/* Culture Block */}
    <div className="lg:col-span-1">
      <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
        <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">Culture</h2>
      </div>
      {cultureNews ? (
        <NormalBlock isSmall={true} badge="Culture" image={cultureNews.image} title={cultureNews.title} />
      ) : (
        <p className="text-slate-400">No culture news yet.</p>
      )}
    </div>

    {/* Economy Block */}
    <div className="lg:col-span-1">
      <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
        <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">Economy</h2>
      </div>
      {economyNews ? (
        <NormalBlock isSmall={true} badge="Economy" image={economyNews.image} title={economyNews.title} />
      ) : (
        <p className="text-slate-400">No economy news yet.</p>
      )}
    </div>

    {/* Opinion Block (2 columns) */}
    <div className="lg:col-span-2">
      <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
        <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">Opinion</h2>
      </div>
      {opinionNews ? (
        <HorizontalBlock 
          categoryTitle="Opinion" 
          image={opinionNews.image} 
          heading={opinionNews.title} 
          description={stripHtml(opinionNews.description)} 
        />
      ) : (
        <p className="text-slate-400">No opinion news yet.</p>
      )}
    </div>

  </div>
</div>

      </main>
      <Footer />
    </div>
  );
};

export default Home;