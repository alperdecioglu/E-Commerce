import React from 'react';
import ProductCard from '../components/ProductCard';
import Slider from '../components/Slider';

const HomePage = () => {
  return (
    <div className="flex flex-col space-y-8">
      {/* Slider Alanı */}
      <section className="w-full h-96">
        <Slider />
      </section>

      {/* Ürünler Alanı */}
      <section>
        <h2 className="text-center text-2xl font-bold mb-6">BESTSELLER PRODUCTS</h2>
        <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center gap-8">
          {/* ProductCard'ları burada listeleyeceğiz */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
    </div>
  );
};

export default HomePage;