//(pages)/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { login, LoginData } from '@/app/services/authService';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico no válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export default function Login() {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      loginSchema.parse(formData); // Validación antes de enviar datos
      const response = await login(formData);
      document.cookie = `auth_token=${response.data.token}; max-age=${12 * 60 * 60}`; // Guardar token en cookie
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('Inicio de sesión fallido. Verifique sus credenciales.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <form onSubmit={handleSubmit} className="bg-base-100 p-8 rounded shadow-md w-96">
        <h1 className="text-xl text-center font-bold mb-6">Iniciar Sesión</h1>
        {error && <p className="text-error text-sm text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <button
          type="submit"
          className={`btn btn-primary w-full flex justify-center items-center ${isLoading ? 'cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm text-white"></span>
          ) : (
            <>
              <i className="bi bi-person-badge-fill mr-2"></i>Iniciar Sesión
            </>
          )}
        </button>
        <div className="mt-4 text-center">
          <p>
            ¿No tienes cuenta?{' '}
            <a href="/register" className="link link-primary">
              Regístrate
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
