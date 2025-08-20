import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/actions/orderActions';
import { fetchProducts } from '../store/actions/productActions';
import { Loader2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PreviousOrdersPage = () => {
  const dispatch = useDispatch();
  const { orderList, fetchState: orderFetchState } = useSelector(state => state.order);
  const { productList: allProducts, fetchState: productFetchState } = useSelector(state => state.product);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
    if (allProducts.length === 0) {
      dispatch(fetchProducts({ limit: 1000, offset: 0 }));
    }
  }, [dispatch]);

  const toggleOrderDetails = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  if (orderFetchState === "FETCHING") {
    return <div className="flex justify-center items-center py-16"><Loader2 className="animate-spin text-primary" size={48} /></div>;
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Geçmiş Siparişlerim</h1>
      <div className="space-y-4">
        {orderList.length > 0 ? (
          orderList.map(order => (
            <div key={order.id} className="border rounded-lg">
              <div onClick={() => toggleOrderDetails(order.id)} className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div>
                  <p className="font-bold">Sipariş No: #{order.id}</p>
                  <p className="text-sm text-gray-500">Tarih: {new Date(order.order_date).toLocaleDateString('tr-TR')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-lg">${order.price.toFixed(2)}</p>
                  <ChevronDown className={`transition-transform ${openOrderId === order.id ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {openOrderId === order.id && (
                <div className="p-4 border-t">
                  <h4 className="font-bold mb-2">Sipariş Detayları</h4>
                  {productFetchState === "FETCHING" ? (
                    <p className="text-sm text-gray-500">Ürün detayları yükleniyor...</p>
                  ) : (
                    order.products.map((item, index) => {
                      const productDetails = allProducts.find(p => String(p.id) === String(item.id));
                      if (!productDetails) {
                        return (
                          <div key={`${item.id}-${index}`} className="py-2 text-sm text-gray-500">
                            (ID: {item.id || 'Bilinmiyor'}) Bu ürünün bilgisi bulunamadı.
                          </div>
                        );
                      }
                      return (
                        <Link to={`/product/${productDetails.name.toLowerCase().replace(/ /g, '-')}/${productDetails.id}`} key={productDetails.id} className="flex items-center gap-4 py-2 border-b last:border-b-0 hover:bg-gray-50">
                          <img src={productDetails.images[0]?.url} alt={productDetails.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <p className="font-bold">{productDetails.name}</p>
                            <p className="text-sm text-gray-600">Adet: {item.count}</p>
                          </div>
                          <p className="font-bold">${productDetails.price.toFixed(2)}</p>
                        </Link>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">Henüz hiç sipariş vermediniz.</p>
        )}
      </div>
    </div>
  );
};

export default PreviousOrdersPage;