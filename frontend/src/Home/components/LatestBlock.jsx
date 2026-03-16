import React from 'react';

const LatestBlock = ({ blockTitle = "Latest News", latestNews = [] }) => {
  return (
    <div className="lg:col-span-1">
      <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
        <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">
          {blockTitle}
        </h2>
      </div>
      
      <div className="flex flex-col gap-6 mt-4">
        {/* Check if we actually have news to show */}
        {latestNews.length > 0 ? (
          latestNews.map((article) => (
            <div key={article._id} className="flex gap-4 group cursor-pointer">
              {/* Image Container */}
              <div className="w-1/3 h-24 overflow-hidden rounded-md flex-shrink-0 shadow-sm relative">
                 <img 
                    src={article.image} 
                    alt={article.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                 />
              </div>
              
              {/* Text Container */}
              <div className="w-2/3 flex flex-col justify-center">
                <span className="text-red-600 text-[10px] font-bold uppercase tracking-wider">
                  {article.category}
                </span>
                <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-red-600 transition-colors mt-1 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-slate-500 mt-2">{article.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 italic py-4">No latest news available.</p>
        )}
      </div>
    </div>
  );
};

export default LatestBlock;