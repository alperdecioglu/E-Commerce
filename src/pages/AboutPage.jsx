import React from 'react';
import { Link } from 'react-router-dom';
import AboutUsImage from '../assets/about.jpg';

const AboutPage = () => {
  return (
    <div className="py-12">
      
      <section className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h5 className="font-bold text-second-text-color mb-4">Şirketimiz</h5>
            <h1 className="text-5xl font-bold text-text-color mb-4">Hakkımızda</h1>
            <p className="text-second-text-color mb-4">
              Sürdürülebilirlikten kaliteye, her adımda sizin için en iyisini hedefliyoruz.
            </p>
            <button className="px-8 py-3 bg-primary text-white rounded font-bold hover:bg-opacity-90">
              Teklif Al
            </button>
          </div>
          <div className="w-full md:w-1/2">
            
            <img 
              src={AboutUsImage} 
              alt="Alışveriş- kadın" 
              className="w-full h-auto object-cover rounded-lg shadow-xl mx-auto max-h-[600px] object-top "/>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
         <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
                <p className="text-red-500 mb-4"></p>
                <h2 className="text-2xl font-bold text-text-color mb-4">
                </h2>
            </div>
             <div className="w-full md:w-1/2">
                <p className="text-second-text-color">
        
                </p>
             </div>
         </div>
         <div className="flex flex-col md:flex-row justify-around text-center mt-12">
            <div>
                <h3 className="text-5xl font-bold text-text-color">15K</h3>
                <p className="font-bold text-second-text-color">Mutlu Müşteriler</p>
            </div>
             <div>
                <h3 className="text-5xl font-bold text-text-color">150K</h3>
                <p className="font-bold text-second-text-color">Aylık Ziyaretçiler</p>
            </div>
             <div>
                <h3 className="text-5xl font-bold text-text-color">15</h3>
                <p className="font-bold text-second-text-color">Ülkede</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;