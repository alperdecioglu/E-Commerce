import React from 'react';
import { useForm } from 'react-hook-form';

const PaymentForm = ({ initialData, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {},
  });

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-lg">
      <input {...register("card_no", { required: "Kart numarası gerekli" })} placeholder="Kart Numarası" className="w-full p-2 border rounded" />
      <input {...register("name_on_card", { required: "Kart üzerindeki isim gerekli" })} placeholder="Kart Üzerindeki İsim" className="w-full p-2 border rounded" />
      <div className="flex gap-4">
        <select {...register("expire_month", { required: "Ay gerekli" })} className="w-1/2 p-2 border rounded">
          <option value="">Ay</option>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select {...register("expire_year", { required: "Yıl gerekli" })} className="w-1/2 p-2 border rounded">
          <option value="">Yıl</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="py-2 px-4 border rounded">İptal</button>
        <button type="submit" className="py-2 px-4 bg-primary text-white rounded">Kaydet</button>
      </div>
    </form>
  );
};

export default PaymentForm;