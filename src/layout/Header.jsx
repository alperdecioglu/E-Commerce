import React, { useState } from 'react';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import md5 from 'md5';
import { toast } from 'react-toastify';
import { setUser } from '../store/actions/clientActions';
import { setAuthToken } from '../api/axios';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(store => store.client.user);
  const categories = useSelector(store => store.product.categories);
  const cart = useSelector(store => store.shopping.cart);

  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const gravatarUrl = user.email ? `https://www.gravatar.com/avatar/${md5(user.email.toLowerCase().trim())}?d=mp` : null;
  const womenCategories = categories.filter(c => c.gender === 'k');
  const menCategories = categories.filter(c => c.gender === 'e');
  const totalItemCount = cart.reduce((total, item) => total + item.count, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser({}));
    setAuthToken(null);
    history.push("/");
    toast.info("Başarıyla çıkış yaptınız.");
    setIsUserMenuOpen(false);
  };

  return (
    <header className="py-6 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-text-color">
            E-Commerce
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-second-text-color font-bold">
            <Link to="/" className="hover:text-primary">Ana Sayfa</Link>
            <div className="relative" onMouseLeave={() => setIsShopMenuOpen(false)}>
              <Link to="/shop" className="hover:text-primary p-2" onMouseEnter={() => setIsShopMenuOpen(true)}>
                Mağaza
              </Link>
              {isShopMenuOpen && categories.length > 0 && (
                <div className="absolute top-full -left-4 mt-2 w-96 p-6 bg-white shadow-lg rounded-md flex gap-8 z-10" onMouseEnter={() => setIsShopMenuOpen(true)}>
                  <div className="w-1/2">
                    <h3 className="font-bold text-lg mb-2 text-text-color">Kadın</h3>
                    <ul className="space-y-2">
                      {womenCategories.map(cat => (
                        <li key={cat.id}><Link to={`/shop/kadin/${cat.title.toLowerCase()}/${cat.id}`} className="hover:text-primary text-sm" onClick={() => setIsShopMenuOpen(false)}>{cat.title}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-1/2">
                    <h3 className="font-bold text-lg mb-2 text-text-color">Erkek</h3>
                    <ul className="space-y-2">
                      {menCategories.map(cat => (
                        <li key={cat.id}><Link to={`/shop/erkek/${cat.title.toLowerCase()}/${cat.id}`} className="hover:text-primary text-sm" onClick={() => setIsShopMenuOpen(false)}>{cat.title}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <Link to="/about" className="hover:text-primary">Hakkımızda</Link>
            <Link to="/contact" className="hover:text-primary">İletişim</Link>
            <Link to="/team" className="hover:text-primary">Ekibimiz</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user.name ? (
            <div className="relative">
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 200)} className="flex items-center gap-3">
                {gravatarUrl && <img src={gravatarUrl} alt="avatar" className="w-8 h-8 rounded-full" />}
                <span className="font-bold">{user.name}</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-20">
                  <Link to="/previous-orders" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Geçmiş Siparişlerim</Link>
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 font-bold hover:bg-gray-100 rounded">Çıkış Yap</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 font-bold whitespace-nowrap">
              <Link to="/login" className="text-primary hover:underline">Giriş Yap</Link>
              <span className="text-gray-400">/</span>
              <Link to="/signup" className="text-primary hover:underline">Kayıt Ol</Link>
            </div>
          )}
          <button className="text-primary"><Search size={20} /></button>
          <div className="relative">
            <button onClick={() => setIsCartMenuOpen(!isCartMenuOpen)} className="text-primary flex items-center gap-1 relative">
              <ShoppingCart size={20} />
              {totalItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>
            {isCartMenuOpen && (
              <div onMouseLeave={() => setIsCartMenuOpen(false)} className="absolute top-full right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-4 z-20">
                <h3 className="font-bold text-lg mb-2 text-text-color">Sepetim ({totalItemCount} Ürün)</h3>
                <div className="max-h-64 overflow-y-auto">
                  {cart.length > 0 ? (
                    cart.map(item => (
                      <div key={item.product.id} className="flex items-center gap-4 py-2 border-b">
                        <img src={item.product.images[0]?.url} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-1 text-left">
                          <p className="font-bold text-sm text-text-color">{item.product.name}</p>
                          <p className="text-xs text-second-text-color">{item.count} x ${item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  ) : (<p className="text-center text-second-text-color mt-4">Sepetiniz boş.</p>)}
                </div>
                {cart.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2">
                    <Link to="/cart" onClick={() => setIsCartMenuOpen(false)} className="w-full text-center py-2 border border-primary text-primary rounded font-bold">Sepete Git</Link>
                    <Link to="/checkout" onClick={() => setIsCartMenuOpen(false)} className="w-full text-center py-2 bg-primary text-white rounded font-bold">Siparişi Tamamla</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;