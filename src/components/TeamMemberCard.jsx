import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const TeamMemberCard = ({ imageSrc, name, title }) => {
  return (
    <div className="flex flex-col text-center shadow-lg rounded-lg overflow-hidden">
      <div className="h-80">
        <img src={imageSrc} alt={`Profile of ${name}`} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h5 className="text-lg font-bold text-text-color">{name}</h5>
        <p className="text-sm text-second-text-color mb-4">{title}</p>
        <div className="flex justify-center space-x-4 text-primary">
          <a href="#" className="hover:text-opacity-80"><Facebook /></a>
          <a href="#" className="hover:text-opacity-80"><Instagram /></a>
          <a href="#" className="hover:text-opacity-80"><Twitter /></a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;