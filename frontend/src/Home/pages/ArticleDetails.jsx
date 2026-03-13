import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NormalBlock from '../components/NormalBlock';

const ArticleDetails = () => {
  // 1. Grab the article ID or Slug from the URL
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // Scroll to top when loading a new article
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400); // Simulate network request
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center font-bold text-xl text-slate-500">
          Loading article...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-grow w-full bg-white shadow-sm mt-6 mb-12 rounded-sm border border-slate-200">
        
        {/* =========================================
            ARTICLE HEADER
            ========================================= */}
        <div className="mb-6">
          {/* Category Badge & Date */}
          <div className="flex items-center gap-4 mb-4">
            <Link to="/category/Technology" className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase hover:bg-red-700 transition-colors">
              Technology
            </Link>
            <span className="text-slate-500 text-sm font-medium">Published 2 hours ago</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            The Future of MERN Stack: Why React and Node Still Dominate the Web
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-3 border-y border-slate-100 py-3">
            <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="Author" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">By John Doe</p>
              <p className="text-xs text-slate-500">Senior Tech Correspondent</p>
            </div>
          </div>
        </div>

        {/* =========================================
            MAIN ARTICLE IMAGE
            ========================================= */}
        <div className="w-full h-[300px] md:h-[500px] rounded-md overflow-hidden mb-8">
          <img 
            src="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop" 
            alt="Article Hero" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* =========================================
            ARTICLE CONTENT (The actual news)
            ========================================= */}
        <article className="text-lg text-slate-700 leading-relaxed space-y-6 mb-12 border-b border-slate-200 pb-12">
          <p className="font-semibold text-xl text-slate-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">The Shift in Modern Web Architecture</h2>
          <p>
            Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.
          </p>
          <p>
            Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Mauris dictum facilisis enim. Aliquam nisi lorem, pulvinar id, suscipit in, mollis sed, elit. Pellentesque mi. 
          </p>
        </article>

        {/* =========================================
            RELATED NEWS ROW
            ========================================= */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3 mb-6">
            Related News
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Link to={`/article/${item}`} key={item}>
                <NormalBlock 
                  image={`https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=400&auto=format&fit=crop&sig=${item + 10}`}
                  title="Another related story you might find interesting"
                  timestamp="1 day ago"
                  isSmall={true}
                />
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetails;