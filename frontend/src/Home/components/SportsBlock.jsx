import React from 'react';

// Accept the sportsNews array as a prop
const SportsBlock = ({ sportsNews = [] }) => {
  return (
    <div className="lg:col-span-1">
      <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
        <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">Sports</h2>
      </div>
      
      {/* Check for news BEFORE creating the white box */}
      {sportsNews.length > 0 ? (
        <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100 flex flex-col gap-4">
          {sportsNews.slice(0, 3).map((item) => (
            <div key={item._id} className="group cursor-pointer border-b border-slate-100 last:border-0 pb-3 last:pb-0">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">{item.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No sports news yet.</p>
      )}

    </div>
  );
};

export default SportsBlock;