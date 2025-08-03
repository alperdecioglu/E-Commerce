import React from 'react';

const ProductCard = () => {
  return (
    <div className="flex flex-col text-center w-64 shadow-lg pb-4">
      <div className="bg-gray-200 h-64 mb-4">
         {/* Ürün resmi buraya gelecek */}
         <img src="https://via.placeholder.com/300" alt="Product" className="w-full h-full object-cover" />
      </div>
      <h5 className="text-lg font-bold">Graphic Design</h5>
      <p className="text-sm text-second-text-color">English Department</p>
      <div className="flex justify-center space-x-2 mt-2 font-bold">
        <span className="text-gray-400">$16.48</span>
        <span className="text-secondary">$6.48</span>
      </div>
    </div>
  );
};

export default ProductCard;