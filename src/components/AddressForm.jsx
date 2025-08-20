import React from 'react';
import { useForm } from 'react-hook-form';


const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded-lg">
      <input {...register("title", { required: "Başlık gerekli" })} placeholder="Adres Başlığı (Örn: Ev, İş)" className="w-full p-2 border rounded" />
      <div className="flex gap-4">
        <input {...register("name", { required: "İsim gerekli" })} placeholder="İsim" className="w-1/2 p-2 border rounded" />
        <input {...register("surname", { required: "Soyisim gerekli" })} placeholder="Soyisim" className="w-1/2 p-2 border rounded" />
      </div>
      <input {...register("phone", { required: "Telefon gerekli" })} placeholder="Telefon" className="w-full p-2 border rounded" />
      <div className="flex gap-4">
        <select {...register("city", { required: "Şehir gerekli" })} className="w-1/2 p-2 border rounded">
          <option value="">Şehir Seçin</option>
          {cities.map(city => <option key={city} value={city.toLowerCase()}>{city}</option>)}
        </select>
        <input {...register("district", { required: "İlçe gerekli" })} placeholder="İlçe" className="w-1/2 p-2 border rounded" />
      </div>
      <textarea {...register("neighborhood", { required: "Adres detayları gerekli" })} placeholder="Mahalle ve Adres Detayları" className="w-full p-2 border rounded" rows="3"></textarea>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="py-2 px-4 border rounded">İptal</button>
        <button type="submit" className="py-2 px-4 bg-primary text-white rounded">Kaydet</button>
      </div>
    </form>
  );
};

export default AddressForm;