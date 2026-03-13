import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import your new modular blocks
import HotBlock from '../components/HotBlock';
import LatestBlock from '../components/LatestBlock';
import HorizontalBlock from '../components/HorizontalBlock';
import NormalBlock from '../components/NormalBlock';
import SportsBlock from '../components/SportsBlock';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Breaking News Ticker */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
          <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold animate-pulse whitespace-nowrap">
            HEADLINES
          </span>
          <marquee className="text-sm font-medium text-slate-700">
            Welcome to the new portal! | Admins will soon be able to pin "Hot News" here | More features coming soon...
          </marquee>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* TOP ROW: HOT NEWS & LATEST NEWS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <HotBlock />
          <LatestBlock />
        </div>

        {/* MIDDLE ROW 1: POLITICS & INTERNATIONAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 mb-12">
          <HorizontalBlock 
            categoryTitle="Politics" 
            image="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=600&auto=format&fit=crop" 
            heading="Major policy changes announced at the capital today" 
            description="Government officials have outlined a new strategic approach to urban development and infrastructure..." 
          />
          <HorizontalBlock 
            categoryTitle="International" 
            image="https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=600&auto=format&fit=crop" 
            heading="Global summit reaches historic agreement on climate action" 
            description="Leaders from over 50 nations have signed a comprehensive pact to reduce carbon emissions by 2030..." 
          />
        </div>

        {/* MIDDLE ROW 2: TECHNOLOGY & SPORTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          
          {/* Technology uses the NormalBlock */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center border-b-2 border-slate-200 mb-4 pb-2">
              <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">Technology</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((item) => (
                <NormalBlock 
                  key={`tech-${item}`}
                  image={`https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop&sig=${item}`}
                  title="AI Revolutionizes the way we interact with daily web applications"
                  description="Experts predict that artificial intelligence will soon become an integrated part of every smart device in our homes..."
                />
              ))}
            </div>
          </div>

          {/* Sports List */}
          <SportsBlock />
        </div>

        {/* BOTTOM ROW: CULTURE & ECONOMY */}
        <div className="mt-12">
          <div className="flex justify-between items-center border-b-2 border-slate-200 mb-6 pb-2">
            <h2 className="text-xl font-extrabold text-slate-800 border-l-4 border-red-600 pl-3">Culture & Economy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Culture', 'Economy', 'Culture', 'Economy'].map((category, index) => (
              <NormalBlock 
                key={`mixed-${index}`}
                isSmall={true}
                badge={category}
                image={`https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=400&auto=format&fit=crop&sig=${index}`}
                title="Global markets show surprising trends as new art exhibits open downtown"
              />
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Home;