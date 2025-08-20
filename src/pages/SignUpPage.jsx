import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { Loader2 } from 'lucide-react';

const SignUpPage = () => {
  const { register, handleSubmit, watch, getValues, formState: { errors, isValid } } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get('/roles')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error("Roller yüklenirken hata oluştu:", error);
        toast.error("Roller yüklenemedi. Lütfen daha sonra tekrar deneyin.");
      });
  }, []);

  const selectedRole = watch("role_id");

  const onSubmit = (data) => {
    setIsLoading(true);

    
    const { name, email, password, role_id, store_name, store_phone, store_tax_id, store_bank_account } = data;

    const requestData = {
      name,
      email,
      password,
      role_id,
    };

    if (selectedRole === '2') {
      requestData.store = {
        name: store_name,
        phone: store_phone,
        tax_no: store_tax_id,
        bank_account: store_bank_account,
      };
    }

    axios.post('/signup', requestData)
      .then(response => {
        toast.warn('Hesabınızı aktive etmek için e-postanızdaki linke tıklamanız gerekmektedir!');
        history.goBack();
      })
      .catch(error => {
        console.error("Kayıt sırasında hata:", error);
        toast.error(error.response?.data?.message || "Kayıt sırasında bir hata oluştu.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Kayıt Ol</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto flex flex-col gap-4">
        
        <div>
          <label className="block font-bold mb-1">İsim</label>
          <input {...register("name", { required: "İsim Gerekli", minLength: { value: 3, message: "En Az 3 Karakter Olmalı" } })} className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-bold mb-1">E-posta</label>
          <input {...register("email", { required: "E-posta Gerekli", pattern: { value: /^\S+@\S+$/i, message: "Geçersiz E-poosta" } })} className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-bold mb-1">Şifre</label>
          
          <input type="password" {...register("password", { required: "Şifre Gerekli", minLength: { value: 8, message: "En Az 8 Karakter Olmalı" }, pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, message: "Şifre en az bir rakam, bir büyük harf, bir küçük harf ve bir özel karakter içermelidir" } })} className="w-full p-2 border rounded" />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        
        
        <div>
          <label className="block font-bold mb-1">Şifre Doğrula</label>
          <input type="password" {...register("confirm_password", { required: "Şifrenizi Doğrulayın", validate: (value) => value === getValues("password") || "Şifre Eşleşmedi" })} className="w-full p-2 border rounded" />
          {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block font-bold mb-1">Rol</label>
          <select {...register("role_id", { required: "Rol gerekli" })} className="w-full p-2 border rounded" defaultValue="3">
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        {selectedRole === '2' && (
          <>
            <h2 className="text-xl font-bold mt-4">Mağaza İnfo</h2>
            <div>
              <label className="block font-bold mb-1">Mağaza İsmi</label>
              <input {...register("store_name", { required: "Mağaza İsmi Gerekli", minLength: { value: 3, message: "En Az 3 karakter" } })} className="w-full p-2 border rounded" />
              {errors.store_name && <p className="text-red-500 text-sm mt-1">{errors.store_name.message}</p>}
            </div>
            <div>
              <label className="block font-bold mb-1">Mağaza Telefon</label>
              <input {...register("store_phone", { required: "Telefon Gerekli", pattern: { value: /^(05\d{9})$/, message: "Geçersiz Telefon No (05xxxxxxxxx)" } })} className="w-full p-2 border rounded" />
              {errors.store_phone && <p className="text-red-500 text-sm mt-1">{errors.store_phone.message}</p>}
            </div>
            <div>
              <label className="block font-bold mb-1">Mağaza Vergi No</label>
              <input {...register("store_tax_id", { required: "Vergi No Gerekli", pattern: { value: /^T\d{4}V\d{6}$/, message: "Geçersiz Vergi No (TXXXXVXXXXXX)" } })} className="w-full p-2 border rounded" />
              {errors.store_tax_id && <p className="text-red-500 text-sm mt-1">{errors.store_tax_id.message}</p>}
            </div>
            <div>
              <label className="block font-bold mb-1">Mağaza IBAN (IBAN)</label>
              <input {...register("store_bank_account", { required: "IBAN gerekli" })} className="w-full p-2 border rounded" />
              {errors.store_bank_account && <p className="text-red-500 text-sm mt-1">{errors.store_bank_account.message}</p>}
            </div>
          </>
        )}

        
        <button type="submit" disabled={isLoading || !isValid} className="w-full p-3 bg-primary text-white rounded font-bold flex justify-center items-center transition-colors hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
          {isLoading ? <Loader2 className="animate-spin" /> : 'Kayıt Ol'}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;