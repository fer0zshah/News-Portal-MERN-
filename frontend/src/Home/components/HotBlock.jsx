import React from 'react';

const HotBlock = ({ blockTitle = "Hot News" }) => {
  return (
    <div className="lg:col-span-2">
      <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
        <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">{blockTitle}</h2>

      </div>
      <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md h-[300px] md:h-[450px]">
        <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop" alt="Hot News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 p-4 md:p-8">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 mb-3 inline-block rounded-sm">NATIONAL</span>
          <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight hover:underline">This will be the biggest Hot News of the day chosen by Admin</h3>
          <p className="text-slate-300 text-sm mt-3">March 12, 2026 | By Admin</p>
        </div>
      </div>
    </div>
  );
};

export default HotBlock;