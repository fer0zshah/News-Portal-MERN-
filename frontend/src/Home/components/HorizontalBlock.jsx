import React from 'react';

const HorizontalBlock = ({ categoryTitle, image, heading, description }) => {
  return (
    <div>
      <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
        <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">{categoryTitle}</h2>
      </div>
      <div className="flex gap-4 group cursor-pointer mb-4">
        <div className="w-1/2 h-40 overflow-hidden rounded-md shadow-sm">
          <img src={image} alt={categoryTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-red-600 transition-colors leading-tight mb-2">{heading}</h3>
          <p className="text-sm text-slate-600 line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBlock;