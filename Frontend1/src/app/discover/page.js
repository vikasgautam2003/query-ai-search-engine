// src/app/discover/page.jsx
import React from 'react';
import { WeatherWidget } from '../components/Discover//Weather';
import { NewsCarousel } from '../components/Discover//News';
import { MarketDataWidget } from '../components/Discover/Market';
import { PersonalizationWidget } from '../components/Discover/Interests';
import { FeaturedNewsCard } from '../components/Discover/FeaturedNews';
import { NewsGrid } from '../components/Discover/NewsGrid';
import { TrendingTopicsWidget } from '../components/Discover/Trending';
import { CategorizedNews } from '../components/Discover/CategorizedNews';
import { HistoryWidget } from '../components/Discover/History';
import { VideoCarousel, VideoList } from '../components/Discover/VideosCaro';



export default function DiscoverPage() {
  return (
    <div className="p-4 md:p-8 bg-gray-900 text-white min-h-full">
      <h1 className="text-3xl font-bold mb-8">Discover</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-8">
          <FeaturedNewsCard />

          <NewsGrid />

          <div className="mt-12">
        <NewsCarousel />
      </div>
           <HistoryWidget />
           <CategorizedNews />
        </div>

        <div className="md:col-span-1 space-y-6">
          <PersonalizationWidget />

          <WeatherWidget />



          <MarketDataWidget />

         <TrendingTopicsWidget />
         <VideoList />
        </div>
      </div>

      

    </div>
  );
}





