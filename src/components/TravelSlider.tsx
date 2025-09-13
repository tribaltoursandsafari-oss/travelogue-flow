import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import northeastern state images
import arunachalHero from '@/assets/arunachal-hero.jpg';
import assamHero from '@/assets/assam-hero.jpg';
import manipurHero from '@/assets/manipur-hero.jpg';
import meghalayaHero from '@/assets/meghalaya-hero.jpg';
import mizoramHero from '@/assets/mizoram-hero.jpg';
import nagalandHero from '@/assets/nagaland-hero.jpg';
import sikkimHero from '@/assets/sikkim-hero.jpg';
import tripuraHero from '@/assets/tripura-hero.jpg';

import arunachalCard1 from '@/assets/arunachal-card1.jpg';
import arunachalCard2 from '@/assets/arunachal-card2.jpg';
import assamCard1 from '@/assets/assam-card1.jpg';
import assamCard2 from '@/assets/assam-card2.jpg';
import manipurCard1 from '@/assets/manipur-card1.jpg';
import manipurCard2 from '@/assets/manipur-card2.jpg';
import meghalayaCard1 from '@/assets/meghalaya-card1.jpg';
import meghalayaCard2 from '@/assets/meghalaya-card2.jpg';
import mizoramCard1 from '@/assets/mizoram-card1.jpg';
import mizoramCard2 from '@/assets/mizoram-card2.jpg';
import nagalandCard1 from '@/assets/nagaland-card1.jpg';
import nagalandCard2 from '@/assets/nagaland-card2.jpg';
import sikkimCard1 from '@/assets/sikkim-card1.jpg';
import sikkimCard2 from '@/assets/sikkim-card2.jpg';
import tripuraCard1 from '@/assets/tripura-card1.jpg';
import tripuraCard2 from '@/assets/tripura-card2.jpg';

interface Destination {
  id: string;
  name: string;
  description: string;
  heroImage: string;
  cards: { image: string; title: string }[];
}

const destinations: Destination[] = [
  {
    id: 'arunachal-pradesh',
    name: 'ARUNACHAL PRADESH',
    description: 'Land of the Dawn-lit Mountains, where pristine Himalayan peaks meet ancient monasteries and vibrant tribal cultures in India\'s easternmost frontier.',
    heroImage: arunachalHero,
    cards: [
      { image: arunachalCard1, title: 'Buddhist Monasteries' },
      { image: arunachalCard2, title: 'Himalayan Valleys' }
    ]
  },
  {
    id: 'assam',
    name: 'ASSAM',
    description: 'Gateway to Northeast India, famous for world-class tea gardens, one-horned rhinoceros at Kaziranga, and the mighty Brahmaputra River.',
    heroImage: assamHero,
    cards: [
      { image: assamCard1, title: 'Wildlife Sanctuary' },
      { image: assamCard2, title: 'Tea Gardens' }
    ]
  },
  {
    id: 'manipur',
    name: 'MANIPUR',
    description: 'The Jewel of India, known for its classical dance forms, floating islands of Loktak Lake, and rich cultural heritage of the Meitei people.',
    heroImage: manipurHero,
    cards: [
      { image: manipurCard1, title: 'Cultural Dance' },
      { image: manipurCard2, title: 'Ancient Palaces' }
    ]
  },
  {
    id: 'meghalaya',
    name: 'MEGHALAYA',
    description: 'The Abode of Clouds, featuring unique living root bridges, pristine waterfalls, and some of the wettest places on Earth with mystical landscapes.',
    heroImage: meghalayaHero,
    cards: [
      { image: meghalayaCard1, title: 'Waterfalls' },
      { image: meghalayaCard2, title: 'Rain Forests' }
    ]
  },
  {
    id: 'mizoram',
    name: 'MIZORAM',
    description: 'Land of the Hill People, blessed with rolling hills, bamboo forests, and vibrant festivals celebrating the rich traditions of Mizo culture.',
    heroImage: mizoramHero,
    cards: [
      { image: mizoramCard1, title: 'Tribal Festivals' },
      { image: mizoramCard2, title: 'Blue Mountains' }
    ]
  },
  {
    id: 'nagaland',
    name: 'NAGALAND',
    description: 'Land of Festivals, home to diverse Naga tribes, famous Hornbill Festival, and breathtaking landscapes with terraced fields and ancient traditions.',
    heroImage: nagalandHero,
    cards: [
      { image: nagalandCard1, title: 'Hornbill Festival' },
      { image: nagalandCard2, title: 'Valley Flowers' }
    ]
  },
  {
    id: 'sikkim',
    name: 'SIKKIM',
    description: 'The Himalayan Kingdom, offering stunning views of Kanchenjunga, ancient Buddhist monasteries, and alpine beauty in India\'s smallest state.',
    heroImage: sikkimHero,
    cards: [
      { image: sikkimCard1, title: 'Buddhist Temples' },
      { image: sikkimCard2, title: 'Alpine Lakes' }
    ]
  },
  {
    id: 'tripura',
    name: 'TRIPURA',
    description: 'Land of Royal Heritage, featuring magnificent palaces, ancient temples, and a unique blend of Bengali and tribal cultures in serene landscapes.',
    heroImage: tripuraHero,
    cards: [
      { image: tripuraCard1, title: 'Water Palaces' },
      { image: tripuraCard2, title: 'Tribal Crafts' }
    ]
  }
];

const TravelSlider: React.FC = () => {
  const [currentDestination, setCurrentDestination] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const goToDestination = useCallback((index: number) => {
    if (isAnimating || index === currentDestination) return;
    setIsAnimating(true);
    setCurrentDestination(index);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, currentDestination]);

  // Auto-advance destinations every 6 seconds (increased for better UX)
  useEffect(() => {
    const interval = setInterval(nextDestination, 6000);
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
      <header className="relative z-20 flex items-center justify-between p-4 sm:p-6 lg:p-8">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base">N</span>
          </div>
          <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">Northeast India</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors text-sm xl:text-base">Home</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors text-sm xl:text-base">States</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors text-sm xl:text-base">Culture</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors text-sm xl:text-base">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>

        {/* User Greeting - Hidden on small screens */}
        <div className="hidden sm:block text-white/80 text-sm lg:text-base">
          Hello, <span className="text-white">Explorer</span>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/90 z-30 lg:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a href="#" className="text-white text-xl hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-white text-xl hover:text-primary transition-colors">States</a>
            <a href="#" className="text-white text-xl hover:text-primary transition-colors">Culture</a>
            <a href="#" className="text-white text-xl hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator - Desktop Only */}
        <div className="hidden lg:block absolute left-6 xl:left-8 top-1/2 transform -translate-y-1/2">
          <div className="progress-line">
            <div 
              className="progress-dot transition-all duration-1000"
              style={{ 
                top: `${(currentDestination / (destinations.length - 1)) * 200}px`
              }}
            />
          </div>
          <div className="mt-6 space-y-3">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => goToDestination(index)}
                className={`w-2 h-2 xl:w-3 xl:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentDestination ? 'bg-primary scale-125' : 'bg-white/30'
                }`}
                aria-label={`Go to ${destinations[index].name}`}
              />
            ))}
          </div>
        </div>

        {/* Destination Content */}
        <div className="flex-1 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
              <div
                key={`${current.id}-title`}
                className="text-hero animate-slide-right"
              >
                {current.name}
              </div>
              
              <p
                key={`${current.id}-desc`}
                className="text-cinematic max-w-2xl mx-auto lg:mx-0 animate-fade-in px-4 sm:px-0"
                style={{ animationDelay: '0.2s' }}
              >
                {current.description}
              </p>
              
              <Button
                key={`${current.id}-btn`}
                className="btn-hero animate-scale-in"
                style={{ animationDelay: '0.4s' }}
                size="lg"
              >
                Explore {current.name.split(' ')[0]}
              </Button>
            </div>

            {/* Right Content - Image Collage */}
            <div className="flex justify-center lg:justify-end">
              <div
                key={`${current.id}-cards`}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-slide-left max-w-md lg:max-w-none"
                style={{ animationDelay: '0.3s' }}
              >
                {current.cards.map((card, index) => (
                  <div
                    key={`${current.id}-card-${index}`}
                    className="travel-card w-full sm:w-48 lg:w-52 xl:w-56 h-48 sm:h-64 lg:h-72"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-end p-3 sm:p-4">
                      <span className="text-white text-sm sm:text-base font-medium">
                        {card.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Desktop */}
        <div className="hidden lg:flex absolute right-6 xl:right-8 top-1/2 transform -translate-y-1/2 flex-col space-y-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevDestination}
            className="glass w-12 h-12 xl:w-14 xl:h-14 text-white hover:bg-white/10 transition-all duration-300"
            disabled={isAnimating}
            aria-label="Previous destination"
          >
            <ChevronLeft className="w-6 h-6 xl:w-7 xl:h-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextDestination}
            className="glass w-12 h-12 xl:w-14 xl:h-14 text-white hover:bg-white/10 transition-all duration-300"
            disabled={isAnimating}
            aria-label="Next destination"
          >
            <ChevronRight className="w-6 h-6 xl:w-7 xl:h-7" />
          </Button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevDestination}
            className="glass w-12 h-12 text-white hover:bg-white/10"
            disabled={isAnimating}
            aria-label="Previous destination"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextDestination}
            className="glass w-12 h-12 text-white hover:bg-white/10"
            disabled={isAnimating}
            aria-label="Next destination"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2 sm:space-x-3">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToDestination(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentDestination 
                  ? 'bg-primary scale-125 animate-glow' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to ${destinations[index].name}`}
            />
          ))}
        </div>
      </div>

      {/* State Counter - Mobile */}
      <div className="lg:hidden absolute top-1/2 left-4 transform -translate-y-1/2 text-white/60 text-xs">
        <span className="block">{String(currentDestination + 1).padStart(2, '0')}</span>
        <div className="w-px h-8 bg-white/30 mx-auto my-1"></div>
        <span className="block">{String(destinations.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default TravelSlider;