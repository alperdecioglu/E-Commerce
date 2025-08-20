import React from 'react';
import { Phone, Mail } from 'lucide-react'; 

const ContactPage = () => {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto text-center">
        <h4 className="font-bold text-second-text-color">OFİSİMİZİ ZİYARET EDİN</h4>
        <h2 className="text-4xl font-bold text-text-color mt-2 mb-8">
      
        </h2>

        <div className="flex flex-col md:flex-row md:justify-center gap-8 text-left">
          
          <div className="flex flex-col items-center md:items-start p-8 shadow-lg w-full md:w-1/3">
            <Phone size={32} className="text-primary mb-4" />
            <p className="font-bold text-text-color">xxx-xxx-xx-xx</p>
            <h5 className="font-bold text-text-color text-lg">Destek</h5>
            <button className="mt-2 px-6 py-3 border border-primary text-primary rounded font-bold hover:bg-primary hover:text-white transition-colors">
              Talebinizi İletin
            </button>
          </div>

          
          <div className="flex flex-col items-center md:items-start p-8 shadow-lg w-full md:w-1/3">
            <Mail size={32} className="text-primary mb-4" />
             <p className="font-bold text-text-color">alper@ecommerce.com</p>
            <h5 className="font-bold text-text-color text-lg">Destek</h5>
            <button className="mt-2 px-6 py-3 border border-primary text-primary rounded font-bold hover:bg-primary hover:text-white transition-colors">
              Talebinizi İletin
            </button>
          </div>
        </div>

        
        <div className="mt-16 text-center">
           <h3 className="text-lg font-bold text-text-color">SİZİNLE TANIŞMAK İÇİN SABIRSIZLANIYORUZ</h3>
           <h2 className="text-5xl font-bold text-text-color mt-2 mb-8"></h2>
           <button className="px-8 py-3 bg-primary text-white rounded font-bold hover:bg-opacity-90">
              Şimdi Ücretsiz Deneyin
           </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;