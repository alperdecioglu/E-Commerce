import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import API from '../api/axios';
import { setAddresses, fetchCreditCards } from '../store/actions/clientActions';
import { setAddress, setPayment } from '../store/actions/shoppingCartActions';
import { createOrder } from '../store/actions/orderActions';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import { toast } from 'react-toastify';

const OrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const addresses = useSelector(state => state.client.addresses);
  const creditCards = useSelector(state => state.client.creditCards);
  const selectedAddress = useSelector(state => state.shopping.address);
  const selectedPayment = useSelector(state => state.shopping.payment);

  const [step, setStep] = useState('address');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [cvv, setCvv] = useState("");

  const fetchAddresses = () => {
    API.get("/user/address")
      .then(res => {
        const fetchedAddresses = res.data;
        dispatch(setAddresses(fetchedAddresses));
        if (!selectedAddress?.id && fetchedAddresses.length > 0) {
          dispatch(setAddress(fetchedAddresses[0]));
        }
      })
      .catch(err => console.error("Adresler alınamadı:", err));
  };

  useEffect(() => {
    fetchAddresses();
    dispatch(fetchCreditCards());
  }, [dispatch]);

  const handleSelectAddress = (address) => { dispatch(setAddress(address)); };
  const handleSelectCard = (card) => { dispatch(setPayment(card)); };

  const handleAddressSubmit = (data) => {
    const request = editingAddress ? API.put("/user/address", { ...data, id: editingAddress.id }) : API.post("/user/address", data);
    request.then(() => { toast.success("Adres kaydedildi!"); fetchAddresses(); setShowAddressForm(false); setEditingAddress(null); }).catch(err => toast.error("Bir hata oluştu."));
  };
  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Bu adresi silmek istediğinizden emin misiniz?")) { API.delete(`/user/address/${addressId}`).then(() => { toast.success("Adres silindi."); fetchAddresses(); }).catch(err => toast.error("Adres silinirken bir hata oluştu.")); }
  };
  const handleCardSubmit = (data) => {
    const request = editingCard ? API.put("/user/card", { ...data, id: editingCard.id }) : API.post("/user/card", data);
    request.then(() => { toast.success("Kart kaydedildi!"); dispatch(fetchCreditCards()); setShowPaymentForm(false); setEditingCard(null); }).catch(err => toast.error("Bir hata oluştu."));
  };
  const handleDeleteCard = (cardId) => {
    if (window.confirm("Bu kartı silmek istediğinizden emin misiniz?")) { API.delete(`/user/card/${cardId}`).then(() => { toast.success("Kart silindi."); dispatch(fetchCreditCards()); }).catch(err => toast.error("Kart silinirken bir hata oluştu.")); }
  };
  const handleCreateOrder = () => {
    if (cvv.length >= 3) {
      dispatch(createOrder({ card_ccv: cvv }, history));
    } else {
      toast.error("Lütfen geçerli bir Güvenlik Kodu (CVV) girin.");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Sipariş</h1>
      
      {step === 'address' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Teslimat Adresleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map(address => (
              <div key={address.id} className={`p-4 border rounded-lg shadow-sm cursor-pointer transition-all ${selectedAddress?.id === address.id ? 'border-primary border-2' : 'border-gray-200'}`} onClick={() => handleSelectAddress(address)}>
                <h3 className="font-bold">{address.title}</h3>
                <p>{address.name} {address.surname}</p>
                <p>{address.neighborhood}, {address.district}, {address.city.toLocaleUpperCase('tr-TR')}</p>
                <p>{address.phone}</p>
                <div className="mt-4 flex gap-4">
                  <button onClick={(e) => { e.stopPropagation(); setEditingAddress(address); setShowAddressForm(true); }} className="text-primary font-bold">Düzenle</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address.id); }} className="text-red-500 font-bold">Sil</button>
                </div>
              </div>
            ))}
            <button onClick={() => { setEditingAddress(null); setShowAddressForm(true); }} className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 text-second-text-color hover:bg-gray-50 min-h-[160px]">
              <span className="text-3xl">+</span>
              <span>Yeni Adres Ekle</span>
            </button>
          </div>
          {showAddressForm && <AddressForm initialData={editingAddress} onSubmit={handleAddressSubmit} onCancel={() => { setShowAddressForm(false); setEditingAddress(null); }} />}
          <div className="flex justify-end mt-8">
              <button onClick={() => setStep('payment')} disabled={!selectedAddress?.id} className="bg-primary text-white py-3 px-8 rounded-md font-bold disabled:bg-gray-400 disabled:cursor-not-allowed">
                Ödeme Adımına Geç
              </button>
          </div>
        </div>
      )}

      
      {step === 'payment' && (
        <div className="space-y-6">
          <button onClick={() => setStep('address')} className="font-bold text-primary hover:underline">&lt; Adres Adımına Geri Dön</button>
          <h2 className="text-2xl font-bold">Ödeme Seçenekleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creditCards.map(card => (
              <div key={card.id} className={`p-4 border rounded-lg shadow-sm cursor-pointer transition-all ${selectedPayment?.id === card.id ? 'border-primary border-2' : 'border-gray-200'}`} onClick={() => handleSelectCard(card)}>
                <p>**** **** **** {card.card_no.slice(-4)}</p>
                <p>{card.name_on_card}</p>
                <p>Son Kul. Tar: {card.expire_month}/{card.expire_year}</p>
                <div className="mt-4 flex gap-4">
                  <button onClick={(e) => { e.stopPropagation(); setEditingCard(card); setShowPaymentForm(true); }} className="text-primary font-bold">Düzenle</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }} className="text-red-500 font-bold">Sil</button>
                </div>
              </div>
            ))}
             <button onClick={() => { setEditingCard(null); setShowPaymentForm(true); }} className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 text-second-text-color hover:bg-gray-50 min-h-[160px]">
               <span className="text-3xl">+</span>
               <span>Yeni Kart Ekle</span>
             </button>
          </div>
          {selectedPayment.id && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <label className="font-bold text-sm">Güvenlik Kodu (CVV)</label>
                <p className="text-xs text-gray-500 mb-2">Seçili kartınızın arkasındaki 3 haneli kodu girin.</p>
                <input type="text" maxLength="4" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" className="p-2 border rounded-md w-24"/>
            </div>
          )}
          {showPaymentForm && <PaymentForm initialData={editingCard} onSubmit={handleCardSubmit} onCancel={() => { setShowPaymentForm(false); setEditingCard(null); }} />}
          <div className="flex justify-end mt-8"><button onClick={handleCreateOrder} disabled={!selectedPayment?.id} className="bg-primary text-white py-3 px-8 rounded-md font-bold disabled:bg-gray-400 disabled:cursor-not-allowed">Siparişi Onayla</button></div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;