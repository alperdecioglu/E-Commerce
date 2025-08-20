import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">Siparişiniz Alındı!</h1>
      <p className="text-second-text-color mb-8">Siparişiniz için teşekkür ederiz. En kısa sürede hazırlanacaktır.</p>
      <Link to="/shop" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90">
        Alışverişe Devam Et
      </Link>
    </div>
  );
};

export default OrderSuccessPage;