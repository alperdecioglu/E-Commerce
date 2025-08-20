import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts, setFilter, setSort, setOffset } from '../store/actions/productActions';
import ProductCard from '../components/ProductCard';
import { Loader2, ChevronRight, List, Grid } from 'lucide-react';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const { productList: products, fetchState, filter, sort, total, limit, offset } = useSelector(store => store.product);
  const [localFilter, setLocalFilter] = useState(filter);

  useEffect(() => {
    const params = {};
    if (categoryId) params.category = categoryId;
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;
    dispatch(fetchProducts(params));
  }, [categoryId, filter, sort, offset, dispatch]);

  const handlePageChange = (pageNumber) => {
    const newOffset = (pageNumber - 1) * limit;
    dispatch(setOffset(newOffset));
  };

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handleFilterSubmit = (e) => { e.preventDefault(); dispatch(setFilter(localFilter)); };
  const handleSortChange = (e) => { dispatch(setSort(e.target.value)); };
  const handleFilterChange = (e) => { setLocalFilter(e.target.value); };

  return (
    <div className="container mx-auto py-8 px-4">
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Mağaza</h2>
        <div className="flex items-center gap-2 text-sm font-bold">
            <Link to="/" className="text-gray-800">Ana Sayfa</Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-400">Mağaza</span>
        </div>
      </div>

      <form onSubmit={handleFilterSubmit} className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-md mb-8 gap-4">
            <h3 className="text-lg font-bold text-second-text-color">{total} üründen {products.length} adet gösteriliyor</h3>
            <div className="flex items-center gap-4">
                <input 
                    type="text" 
                    placeholder="ara..."
                    value={localFilter}
                    onChange={handleFilterChange}
                    className="p-3 border rounded-md"
                />
                 <select onChange={handleSortChange} value={sort} className="p-3 border rounded-md bg-white">
                    <option value="">Sırala</option>
                    <option value="price:asc">Fiyat: Düşükten Yükseğe</option>
                    <option value="price:desc">Fiyat: Yüksekten Düşüğe</option>
                    <option value="rating:asc">Puan: Düşükten Yükseğe</option>
                    <option value="rating:desc">Puan: Yüksekten Düşüğe</option>
                </select>
                <button type="submit" className="p-3 bg-primary text-white font-bold rounded-md">Filtre</button>
            </div>
        </form>

      
      {fetchState === "FETCHING" && ( <div className="flex justify-center items-center py-16"><Loader2 className="animate-spin text-primary" size={48} /></div> )}
      {fetchState === "FAILED" && ( <div className="text-center py-16 text-red-500"><p>Ürünler yüklenirken bir hata oluştu.</p></div> )}
      
      {fetchState === "FETCHED" && (
        <>
          {products.length > 0 ? (
            
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(product => (<ProductCard key={product.id} product={product} />))}
              </div>
              
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md font-bold disabled:opacity-50"
                >
                  Önceki
                </button>
                {[...Array(totalPages).keys()].map(num => {
                  const pageNum = num + 1;
                  return (
                    <button 
                      key={pageNum} 
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 border rounded-md font-bold ${currentPage === pageNum ? 'bg-primary text-white' : 'bg-white'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-md font-bold disabled:opacity-50"
                >
                  Sonraki
                </button>
              </div>
            </>
          ) : (
            
            <div className="text-center py-16 text-second-text-color">
              <h3 className="text-2xl font-bold text-text-color mb-2">Ürün Bulunamadı</h3>
              <p>Bu kategoride henüz ürün bulunmamaktadır. Lütfen diğer kategorilere göz atın.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopPage;