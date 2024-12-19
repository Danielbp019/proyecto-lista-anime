//(pages)/dashboard/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/services/authService';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      document.cookie = 'auth_token=; max-age=0'; // Eliminar token
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-error text-white">
        Cerrar Sesión
      </button>
    </div>
  );
}
