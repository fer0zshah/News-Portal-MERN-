import React from 'react';

const HotBlock = ({ blockTitle = "Hot News", hotNews }) => {
  // Fallback UI if no article is currently marked as "Hot"
  if (!hotNews) {
    return (
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
          <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">
            {blockTitle}
          </h2>
        </div>
        <div className="flex items-center justify-center bg-slate-200 rounded-lg shadow-md h-[300px] md:h-[450px]">
          <p className="text-slate-500 font-bold">No hot news selected for this category yet.</p>
        </div>
      </div>
    );
  }

  // Render the real dynamic data
  return (
    <div className="lg:col-span-2">
      <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
        <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">
          {blockTitle}
        </h2>
      </div>
      <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md h-[300px] md:h-[450px]">
        {/* Dynamic Image */}
        <img 
          src={hotNews.image} 
          alt={hotNews.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 p-4 md:p-8">
          {/* Dynamic Category Badge */}
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 mb-3 inline-block rounded-sm uppercase">
            {hotNews.category}
          </span>
          {/* Dynamic Title */}
          <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight hover:underline">
            {hotNews.title}
          </h3>
          {/* Dynamic Date & Author */}
          <p className="text-slate-300 text-sm mt-3">
            {hotNews.date} | By {hotNews.writerName || 'Admin'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotBlock;