import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import destination images
import indonesiaHero from '@/assets/indonesia-hero.jpg';
import thailandHero from '@/assets/thailand-hero.jpg';
import baliHero from '@/assets/bali-hero.jpg';

import indonesiaCard1 from '@/assets/indonesia-card1.jpg';
import indonesiaCard2 from '@/assets/indonesia-card2.jpg';
import thailandCard1 from '@/assets/thailand-card1.jpg';
import thailandCard2 from '@/assets/thailand-card2.jpg';
import baliCard1 from '@/assets/bali-card1.jpg';
import baliCard2 from '@/assets/bali-card2.jpg';

interface Destination {
  id: string;
  name: string;
  description: string;
  heroImage: string;
  cards: { image: string; title: string }[];
}

const destinations: Destination[] = [
  {
    id: 'indonesia',
    name: 'INDONESIA',
    description: 'Discover ancient temples, pristine beaches, and volcanic landscapes in this archipelago paradise of over 17,000 islands.',
    heroImage: indonesiaHero,
    cards: [
      { image: indonesiaCard1, title: 'Ancient Temples' },
      { image: indonesiaCard2, title: 'Tropical Paradise' }
    ]
  },
  {
    id: 'thailand',
    name: 'THAILAND',
    description: 'Experience the land of smiles with golden temples, floating markets, and pristine beaches that define Southeast Asian beauty.',
    heroImage: thailandHero,
    cards: [
      { image: thailandCard1, title: 'Floating Markets' },
      { image: thailandCard2, title: 'Golden Beaches' }
    ]
  },
  {
    id: 'bali',
    name: 'BALI',
    description: 'Immerse yourself in spiritual temples, emerald rice terraces, and crystal-clear waters of this Indonesian island jewel.',
    heroImage: baliHero,
    cards: [
      { image: baliCard1, title: 'Rice Terraces' },
      { image: baliCard2, title: 'Sacred Temples' }
    ]
  }
];

const TravelSlider: React.FC = () => {
  const [currentDestination, setCurrentDestination] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextDestination = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentDestination((prev) => (prev + 1) % destinations.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const prevDestination = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentDestination((prev) => (prev - 1 + destinations.length) % destinations.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  // Auto-advance destinations every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextDestination, 5000);
    return () => clearInterval(interval);
  }, [nextDestination]);

  const current = destinations[currentDestination];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Crossfade */}
      <div className="absolute inset-0">
        {destinations.map((dest, index) => (
          <div
            key={dest.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentDestination ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={dest.heroImage}
              alt={dest.name}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-overlay" />
          </div>
        ))}
      </div>

      {/* Navigation Header */}
      <header className="relative z-20 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-white font-bold text-xl">Foxico</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Destinations</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
        </nav>

        <div className="text-white/80 text-sm">
          Hello, <span className="text-white">Traveler</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-8">
        {/* Progress Indicator */}
        <div className="absolute left-6 md:left-8 top-1/2 transform -translate-y-1/2">
          <div className="progress-line">
            <div 
              className="progress-dot transition-all duration-1000"
              style={{ 
                top: `${(currentDestination / (destinations.length - 1)) * 180}px`
              }}
            />
          </div>
          <div className="mt-4 space-y-2">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentDestination(index);
                    setTimeout(() => setIsAnimating(false), 800);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentDestination ? 'bg-primary scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Destination Content */}
        <div className="flex-1 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div
              key={`${current.id}-title`}
              className="text-hero animate-slide-right"
            >
              {current.name}
            </div>
            
            <p
              key={`${current.id}-desc`}
              className="text-cinematic max-w-lg animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              {current.description}
            </p>
            
            <Button
              key={`${current.id}-btn`}
              className="btn-hero animate-scale-in"
              style={{ animationDelay: '0.4s' }}
            >
              Explore {current.name}
            </Button>
          </div>

          {/* Right Content - Image Collage */}
          <div className="flex justify-end">
            <div
              key={`${current.id}-cards`}
              className="flex space-x-4 animate-slide-left"
              style={{ animationDelay: '0.3s' }}
            >
              {current.cards.map((card, index) => (
                <div
                  key={`${current.id}-card-${index}`}
                  className="travel-card w-48 h-64"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                    <span className="text-white text-sm font-medium">
                      {card.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute right-6 md:right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevDestination}
            className="glass w-12 h-12 text-white hover:bg-white/10"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextDestination}
            className="glass w-12 h-12 text-white hover:bg-white/10"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentDestination(index);
                  setTimeout(() => setIsAnimating(false), 800);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentDestination 
                  ? 'bg-primary scale-125 animate-glow' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelSlider;