import React from 'react';
import { Link } from 'react-router-dom';

const slugify = (text) => 
  text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/%/g, 'yuzde')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

const ProductCard = ({ product }) => {
  
  if (!product) {
    return null;
  }

  const { id, name, description, price, images } = product;
  const imageUrl = images && images.length > 0 ? images[0].url : "https://placehold.co/400x400?text=No+Image";


  const productSlug = slugify(name);

  return (
    
    <Link to={`/product/${productSlug}/${id}`} className="flex flex-col text-center shadow-lg pb-6 hover:shadow-2xl transition-shadow rounded-lg overflow-hidden">
      <div className="bg-gray-100 h-64 mb-4 flex items-center justify-center">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <h5 className="text-lg font-bold px-4 h-12 overflow-hidden">{name}</h5>
      <p className="text-sm text-second-text-color px-4 font-bold h-10 overflow-hidden">{description}</p>
      <div className="flex justify-center space-x-2 my-2 font-bold px-4">
        <span className="text-green-600">${price?.toFixed(2)}</span>
      </div>
      <div className="flex justify-center space-x-2 mt-2">
         <div className="w-4 h-4 rounded-full bg-blue-500"></div>
         <div className="w-4 h-4 rounded-full bg-green-500"></div>
         <div className="w-4 h-4 rounded-full bg-orange-400"></div>
         <div className="w-4 h-4 rounded-full bg-black"></div>
      </div>
    </Link>
  );
};

export default ProductCard;