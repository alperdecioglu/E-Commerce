import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';
import { toast } from 'react-toastify';
import { Loader2, Star } from 'lucide-react';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const product = useSelector(store => store.product.activeProduct);
  const fetchState = useSelector(store => store.product.fetchState);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);
  
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(`"${product.name}" sepete eklendi!`);
    }
  };

  if (fetchState === "FETCHING") {
    return <div className="flex justify-center items-center py-16"><Loader2 className="animate-spin text-primary" size={48} /></div>;
  }

  if (fetchState === "FAILED" || !product) {
    return <div className="text-center py-16 text-red-500"><p>Ürün yüklenirken bir hata oluştu veya ürün bulunamadı.</p></div>;
  }

  const mainImage = product.images && product.images.length > 0 ? product.images[0].url : "https://placehold.co/600x400?text=No+Image";
  const thumbnails = product.images?.slice(1);

  return (
    <div className="container mx-auto py-12 px-4">
      <button onClick={() => history.goBack()} className="mb-8 font-bold text-primary hover:underline">
        &lt; Geri
      </button>
      <div className="flex flex-col lg:flex-row gap-12">
        
        <div className="w-full lg:w-1/2">
          <div className="mb-4 border rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4">
            {thumbnails?.map((img, index) => (
              <div key={index} className="w-1/4 border rounded-lg overflow-hidden h-24">
                <img src={img.url} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center my-3">
            <div className="flex text-yellow-400">
              {[...Array(Math.round(product.rating))].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              {[...Array(5 - Math.round(product.rating))].map((_, i) => <Star key={i} size={20} />)}
            </div>
            <span className="ml-2 text-second-text-color">{product.rating.toFixed(1)} Reviews</span>
          </div>
          <h2 className="text-2xl font-bold my-4 text-primary">${product.price.toFixed(2)}</h2>
          <p className="text-second-text-color mb-6">{product.description}</p>
          <hr />
          <div className="flex items-center gap-4 mt-6">
            <button onClick={handleAddToCart} className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors">
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;