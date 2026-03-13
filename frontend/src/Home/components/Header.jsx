import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // This state controls whether the mobile hamburger menu is open or closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Automatically fetch today's date for the top bar
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Helper function to close the mobile menu when a link is clicked
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="w-full">
      {/* 1. Top Bar: Date & Socials */}
      <div className="bg-slate-800 text-slate-300 text-xs py-2 px-4 flex justify-between items-center">
        <div>{currentDate}</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">YouTube</a>
        </div>
      </div>

      {/* 2. Logo & Ad Banner Section */}
      <div className="bg-white py-6 px-4 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl font-black text-red-600 tracking-tighter">NEWS PORTAL</h1>
          <p className="text-slate-500 text-sm tracking-widest font-semibold mt-1">MERN STACK</p>
        </div>
        
        {/* Ad Banner Placeholder */}
        <div className="w-full md:w-[600px] bg-red-600 text-white p-4 text-center rounded shadow-sm border-2 border-red-700">
           <span className="font-bold text-2xl block tracking-wide">ADVERTISEMENT SECTION</span>
           <span className="text-sm">EASILY ADD BANNER ADVERTISEMENT HERE</span>
        </div>
      </div>

      {/* 3. Red Navigation Bar */}
      <div className="bg-red-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          
          {/* Desktop Menu (Hidden on phones) */}
          {/* NOTICE: Updated paths to /category/... */}
          <nav className="hidden md:flex gap-6 font-bold text-sm tracking-wide">
            <Link to="/" className="hover:text-slate-200 transition-colors">HOME</Link>
            <Link to="/category/National" className="hover:text-slate-200 transition-colors">NATIONAL</Link>
            <Link to="/category/Politics" className="hover:text-slate-200 transition-colors">POLITICS</Link>
            <Link to="/category/International" className="hover:text-slate-200 transition-colors">INTERNATIONAL</Link>
            <Link to="/category/Technology" className="hover:text-slate-200 transition-colors">TECHNOLOGY</Link>
            <Link to="/category/Sports" className="hover:text-slate-200 transition-colors">SPORTS</Link>
            <Link to="/category/Culture" className="hover:text-slate-200 transition-colors">CULTURE</Link>
            <Link to="/category/Economy" className="hover:text-slate-200 transition-colors">ECONOMY</Link>
            <Link to="/category/Education" className="hover:text-slate-200 transition-colors">EDUCATION</Link>
          </nav>

          {/* Search Icon (Desktop) */}
          <div className="hidden md:block cursor-pointer text-xl hover:text-slate-200">
              🔍 
          </div>

          {/* Mobile Menu Button (Hamburger - Visible only on phones) */}
          <button 
            className="md:hidden text-white text-3xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Sliding Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-red-700 flex flex-col font-bold text-sm tracking-wide border-t border-red-500">
            {/* Added onClick={closeMenu} to each link */}
            <Link to="/" onClick={closeMenu} className="p-4 border-b border-red-500 hover:bg-red-600">HOME</Link>
            <Link to="/category/National" onClick={closeMenu} className="p-4 border-b border-red-500 hover:bg-red-600">NATIONAL</Link>
            <Link to="/category/Politics" onClick={closeMenu} className="p-4 border-b border-red-500 hover:bg-red-600">POLITICS</Link>
            <Link to="/category/International" onClick={closeMenu} className="p-4 border-b border-red-500 hover:bg-red-600">INTERNATIONAL</Link>
            <Link to="/category/Technology" onClick={closeMenu} className="p-4 border-b border-red-500 hover:bg-red-600">TECHNOLOGY</Link>
            <Link to="/category/Sports" onClick={closeMenu} className="p-4 border-b border-red-500 hover:bg-red-600">SPORTS</Link>
            <Link to="/category/Culture" onClick={closeMenu} className="p-4 border-b border-red-500 hover:bg-red-600">CULTURE</Link>
            <Link to="/category/Economy" onClick={closeMenu} className="p-4 border-b border-red-500 hover:bg-red-600">ECONOMY</Link>
            <Link to="/category/Education" onClick={closeMenu} className="p-4 border-b border-red-500 hover:bg-red-600">EDUCATION</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;