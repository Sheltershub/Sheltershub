
import React from 'react';
import ImageSlider from './ImageSlider';
import { heroImages } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <ImageSlider images={heroImages} height="h-80 md:h-[360px]" />
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  );
};

export default Hero;