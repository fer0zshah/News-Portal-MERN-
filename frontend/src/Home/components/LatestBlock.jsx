import React from 'react';

const LatestBlock = ({ blockTitle = "Latest News" }) => {
  return (
    <div className="lg:col-span-1">
      <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
        <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">{blockTitle}</h2>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex gap-4 group cursor-pointer">
            <div className="w-1/3 h-24 overflow-hidden rounded-md flex-shrink-0 shadow-sm">
               <img src={`https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=300&auto=format&fit=crop&sig=${item}`} alt="Latest" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="w-2/3 flex flex-col justify-center">
              <span className="text-red-600 text-[10px] font-bold uppercase tracking-wider">TECHNOLOGY</span>
              <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-red-600 transition-colors mt-1 line-clamp-2">New tech breakthrough announced today, shaping the future...</h4>
              <p className="text-xs text-slate-500 mt-2">2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlock;