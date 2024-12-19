//(pages)/register/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { register, RegisterData } from '@/app/services/authService';

const registerSchema = z
  .object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('Correo electrónico no válido'),
    password: z
      .string()
      .regex(
        /(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)/,
        'La contraseña debe tener mínimo 2 minúsculas, 2 mayúsculas y 2 números'
      ),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation'],
  });

export default function Register() {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
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
      registerSchema.parse(formData); // Validación antes de enviar datos
      await register(formData);
      router.push('/login');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('El registro falló. Por favor intente nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <form onSubmit={handleSubmit} className="bg-base-100 p-8 rounded shadow-md w-96">
        <h1 className="text-xl text-center font-bold mb-6">Registro de nuevo usuario</h1>
        {error && <p className="text-error text-sm text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="password_confirmation" className="block font-medium">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
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
              <i className="bi bi-person-plus-fill mr-2"></i>Registrar
            </>
          )}
        </button>
        <div className="mt-4 text-center">
          <p>
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="link link-primary">
              Inicia sesión
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
