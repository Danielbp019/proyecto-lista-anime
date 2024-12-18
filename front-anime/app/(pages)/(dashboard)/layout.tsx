//(pages)/(dashboard)/layout.tsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/services/authService';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('aside') && !target.closest('button')) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      document.cookie = 'auth_token=; max-age=0'; // Eliminar token
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError('Error al cerrar sesión');
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bg-base-200 shadow-md h-full transition-transform transform md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-50 md:static`}
      >
        <ul className="menu p-4 space-y-2">
          <li className="menu-title">
            <span>Páginas</span>
          </li>
          <li>
            <a href="/dashboard" className="flex items-center">
              <i className="bi bi-house-door"></i> {/* Icono cambiado a casa */}
              <span className="ml-2">Escritorio</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full shadow z-40 flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button onClick={toggleSidebar} className="btn btn-square btn-outline md:hidden">
              <i className="bi bi-list"></i> {/* Icono de menú */}
            </button>
            <div className="flex items-center text-primary">
              <Image src="/logo.png" alt="Logo" className="h-6 w-auto" width={50} height={50} />
              <span className="hidden md:inline-block font-bold ml-2">DB Admin</span>
              {error && <p className="text-error text-sm text-center mb-4">{error}</p>}
            </div>
          </div>
          <nav className="flex items-center space-x-4">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="w-10 rounded-full">
                  <Image
                    src="/profile-img.jpg"
                    alt="Profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/settings">
                    <i className="bi bi-gear"></i> {/* Icono de configuración */}
                    Configuración
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-error btn-sm text-white">
                    <i className="bi bi-box-arrow-right"></i> {/* Icono de cerrar sesión */}
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-base-100 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
