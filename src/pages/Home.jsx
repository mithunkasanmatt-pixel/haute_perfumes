import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCollections } from '../components/home/FeaturedCollections';
import { BestSelling } from '../components/home/BestSelling';
import { NewArrivals } from '../components/home/NewArrivals';
import { BrandShowcase } from '../components/home/BrandShowcase';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials } from '../components/home/Testimonials';
import { Newsletter } from '../components/home/Newsletter';

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCollections />
      <BestSelling />
      <WhyChooseUs />
      <NewArrivals />
      <BrandShowcase />
      <Testimonials />
      <Newsletter />
    </div>
  );
};
