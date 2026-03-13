import React from 'react';

// Notice the new props: isAdmin, onMakeHot, onEdit, onDelete
const NormalBlock = ({ 
  image, 
  title, 
  description, 
  badge, 
  isSmall, 
  timestamp,
  isAdmin = false, // Defaults to false so regular readers never see it
  onMakeHot,
  onEdit,
  onDelete
}) => {
  return (
    <div className="group cursor-pointer flex flex-col h-full relative overflow-hidden">
      <div className={`overflow-hidden rounded-md shadow-sm mb-3 relative ${isSmall ? 'h-40' : 'h-48'}`}>
        
        {/* Category Badge */}
        {badge && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 z-10 rounded-sm uppercase">
            {badge}
          </span>
        )}
        
        {/* Main Image */}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* =========================================
            ADMIN OVERLAY (Only renders if isAdmin is true)
            ========================================= */}
        {isAdmin && (
          <div className="absolute bottom-0 left-0 w-full bg-slate-900/85 backdrop-blur-sm py-2 px-1 flex justify-evenly items-center z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            
            <button 
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                if(onMakeHot) onMakeHot(); 
              }} 
              className="text-xs font-bold text-white hover:text-orange-400 transition-colors flex items-center gap-1"
            >
              🔥 Hot
            </button>

            <button 
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                if(onEdit) onEdit(); 
              }}
              className="text-xs font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              📝 Edit
            </button>

            <button 
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                if(onDelete) onDelete(); 
              }}
              className="text-xs font-bold text-white hover:text-red-400 transition-colors flex items-center gap-1"
            >
              🗑️ Del
            </button>
            
          </div>
        )}
      </div>

      <h3 className={`${isSmall ? 'text-md' : 'text-lg'} font-bold text-slate-800 group-hover:text-red-600 transition-colors leading-tight mb-2`}>
        {title}
      </h3>
      {description && <p className="text-sm text-slate-600 line-clamp-2">{description}</p>}
      {timestamp && <p className="text-xs font-medium text-slate-500 mt-auto pt-3">{timestamp}</p>}
    </div>
  );
};

export default NormalBlock;