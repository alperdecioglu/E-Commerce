import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/clientActions';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(loginUser(data, history));
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Giriş</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block font-bold mb-2">E-posta</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              {...register("email", { required: "E-posta Gerekli" })}
              className="w-full p-3 border rounded-md"
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block font-bold mb-2">Şifre</label>
            <input
              type="password"
              placeholder="********"
              {...register("password", { required: "Şifre Gerekli" })}
              className="w-full p-3 border rounded-md"
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="rememberMe" {...register("rememberMe")} className="mr-2" />
            <label htmlFor="rememberMe">Beni Hatırla</label>
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-md font-bold hover:bg-opacity-90">
            Giriş
          </button>
          <p className="text-center text-second-text-color mt-4">
            Henüz Bir Hesabınız Yok Mu? <Link to="/signup" className="text-primary font-bold">Hemen Kayıt Olun</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;