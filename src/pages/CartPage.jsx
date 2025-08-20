import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementItemCount, decrementItemCount, removeFromCart, toggleItemChecked } from '../store/actions/shoppingCartActions';
import { Trash2, Plus, Minus } from 'lucide-react';


const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(store => store.shopping.cart);

  const totalAmount = cart
    .filter(item => item.checked)
    .reduce((total, item) => total + item.count * item.product.price, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Sepetiniz Boş</h1>
        <p className="text-second-text-color mb-8">Görünüşe göre sepetinize henüz bir şey eklemediniz.</p>
        <Link to="/shop" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Sepetim ({cart.length} Ürün)</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {cart.map(item => (
            <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
              <input 
                type="checkbox" 
                checked={item.checked} 
                onChange={() => dispatch(toggleItemChecked(item.product.id))}
                className="h-5 w-5"
              />
              <img src={item.product.images[0]?.url} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.product.name}</h3>
                <p className="text-sm text-second-text-color">{item.product.description}</p>
              </div>
              <div className="flex items-center gap-2 border rounded-md">
                <button onClick={() => dispatch(decrementItemCount(item.product.id))} className="p-2 hover:bg-gray-100"><Minus size={16} /></button>
                <span className="px-4 font-bold">{item.count}</span>
                <button onClick={() => dispatch(incrementItemCount(item.product.id))} className="p-2 hover:bg-gray-100"><Plus size={16} /></button>
              </div>
              <p className="font-bold text-lg w-24 text-right">${(item.product.price * item.count).toFixed(2)}</p>
              <button onClick={() => dispatch(removeFromCart(item.product.id))} className="text-red-500 hover:text-red-700">
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 p-6 border rounded-lg shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-4">Sipariş Özeti</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Kargo</span>
              <span className="text-green-600">Bedava</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <label htmlFor="discount" className="font-bold text-sm mb-1 block">İndirim Kodu Gir</label>
            <div className="flex">
                <input type="text" id="discount" placeholder="Kupon Kodu" className="w-full p-2 border rounded-l-md focus:outline-none" />
                <button className="p-2 bg-primary text-white rounded-r-md font-bold">Uygula</button>
            </div>
          </div>
          
          <div className="flex justify-between font-bold text-xl pt-4 mt-4 border-t">
            <span>Toplam</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block text-center w-full mt-6 py-3 bg-primary text-white rounded-md font-bold hover:bg-opacity-90">
            Siparişi Oluştur
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;