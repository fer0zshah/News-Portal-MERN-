import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-12 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand & About */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-black text-red-600 tracking-tighter mb-4">NEWS PORTAL</h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
            Your most trusted source for breaking news, in-depth analysis, and exclusive reports. We cover everything from local updates to global shifts in technology, economy, and culture.
          </p>
          <div className="flex gap-4 font-bold text-lg">
            <a href="#" className="hover:text-red-500 transition-colors">FB</a>
            <a href="#" className="hover:text-red-500 transition-colors">TW</a>
            <a href="#" className="hover:text-red-500 transition-colors">IG</a>
            <a href="#" className="hover:text-red-500 transition-colors">YT</a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-red-600 pl-2">Categories</h3>
          <ul className="flex flex-col gap-2 text-sm font-medium">
            <li><Link to="/national" className="hover:text-white hover:translate-x-1 transition-transform inline-block">National</Link></li>
            <li><Link to="/technology" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Technology</Link></li>
            <li><Link to="/sports" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Sports</Link></li>
            <li><Link to="/culture" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Culture</Link></li>
            <li><Link to="/economy" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Economy</Link></li>
            <li><Link to="/education" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Education</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-red-600 pl-2">Contact Us</h3>
          <ul className="flex flex-col gap-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-red-600">📍</span> 
              <span>123 News Street, Jaldhaka,<br/>Rangpur Division, BD</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600">📧</span> 
              <span>editor@newsportal.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600">📞</span> 
              <span>+880 1234 567890</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} News Portal. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;