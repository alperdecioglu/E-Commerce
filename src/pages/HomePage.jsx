import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Slider from '../components/Slider';

import productImage1 from '../assets/bs1.jpg';
import productImage2 from '../assets/bs2.jpg';
import productImage3 from '../assets/bs3.jpg';
import productImage4 from '../assets/bs4.jpg';

import editorPickMen from '../assets/ep1.jpg';
import editorPickWomen from '../assets/ep2.jpg';
import editorPickAccessories from '../assets/ep3.jpg';
import editorPickKids from '../assets/ep4.jpg';

const bestsellerProducts = [
  { 
    id: 2,
    name: 'Balıkçı Yaka Kazak', 
    description: 'Kadın Giyim', 
    price: 16.48, 
    discountedPrice: 6.48, 
    images: [{ url: productImage1 }] 
  },
  { 
    id: 3,
    name: 'Desenli Tişört', 
    description: 'Erkek Giyim', 
    price: 16.48, 
    discountedPrice: 6.48, 
    images: [{ url: productImage2 }] 
  },
  { 
    id: 4,
    name: 'Uzun Kollu Bluz', 
    description: 'Kadın Giyim', 
    price: 16.48, 
    discountedPrice: 6.48, 
    images: [{ url: productImage3 }] 
  },
  { 
    id: 5,
    name: 'Deri Ceket ve Etek', 
    description: 'Kadın Giyim', 
    price: 16.48, 
    discountedPrice: 6.48, 
    images: [{ url: productImage4 }] 
  },
];

const HomePage = () => {
  return (
    <div>
      
      <section className="w-full">
        <Slider />
      </section>

      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-text-color">EDİTOR SEÇİMLERİ</h2>
          <p className="text-second-text-color mt-2"></p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 h-[32rem]">
          
          <div className="flex-1 relative group overflow-hidden">
            <img src={editorPickMen} alt="Men's Collection" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <Link to="/shop/erkek" className="absolute bottom-6 left-6 bg-white text-text-color font-bold px-6 py-3 rounded">
              ERKEK
            </Link>
          </div>
          
          <div className="flex-1 relative group overflow-hidden">
            <img src={editorPickWomen} alt="Women's Collection" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <Link to="/shop/kadin" className="absolute bottom-6 left-6 bg-white text-text-color font-bold px-6 py-3 rounded">
              KADIN
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 relative group overflow-hidden">
              <img src={editorPickAccessories} alt="Accessories" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
              <Link to="/shop/aksesuar" className="absolute bottom-6 left-6 bg-white text-text-color font-bold px-6 py-3 rounded">
                AKSESUAR
              </Link>
            </div>
            <div className="flex-1 relative group overflow-hidden">
              <img src={editorPickKids} alt="Kids' Collection" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
              <Link to="/shop/cocuk" className="absolute bottom-6 left-6 bg-white text-text-color font-bold px-6 py-3 rounded">
                ÇOCUK
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="container mx-auto py-16 px-4">
        <div className="text-center">
            <h4 className="text-lg text-second-text-color">Öne Çıkan Ürünler</h4>
            <h2 className="text-2xl font-bold text-text-color my-2">EN ÇOK SATANLAR</h2>
            <p className="text-second-text-color"></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {bestsellerProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;