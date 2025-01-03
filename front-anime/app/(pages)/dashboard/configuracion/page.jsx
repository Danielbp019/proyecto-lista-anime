// (pages)/dashboard/configuracion/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns"; // Importar date-fns para formatear fechas
import { getUser, updateUser } from "@/app/services/userService";
import AlertSuccess from "@/app/components/AlertSuccess";
import AlertDanger from "@/app/components/AlertDanger";
import DashboardLayout from "@/app/layouts/DashboardLayout";

export default function ConfiguracionPage() {
  const [user, setUser] = useState({ id: "", name: "", email: "", created_at: "", updated_at: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertSuccessOpen, setAlertSuccessOpen] = useState(false);
  const [alertDangerOpen, setAlertDangerOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // Obtener el ID del usuario del localStorage

    if (userId) {
      getUser(userId).then((result) => {
        if (result.success) {
          const userData = result.data;
          // Formatear las fechas usando date-fns
          userData.created_at = format(new Date(userData.created_at), "yyyy-MM-dd hh:mm:ss a");
          userData.updated_at = format(new Date(userData.updated_at), "yyyy-MM-dd hh:mm:ss a");
          setUser(userData);
        } else {
          setError(result.error);
          setAlertDangerOpen(true);
        }
        setIsLoading(false);
      });
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateUser(user.id, { name: user.name });

      if (result.success) {
        setAlertMessage("Usuario actualizado con éxito");
        setAlertSuccessOpen(true);
      } else {
        setError(result.error);
        setAlertDangerOpen(true);
      }
    } catch (error) {
      setError("Error al actualizar la información del usuario.");
      setAlertDangerOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertSuccessOpen(false);
    setAlertDangerOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full">
        <div className="w-full mb-4">
          <h1 className="text-2xl font-bold text-left">Configuración del Usuario</h1>
        </div>
        <div className="flex flex-row w-full mt-4 space-x-4">
          {/* Card de datos del usuario */}
          <div className="card w-1/2 bg-base-100 shadow-xl border">
            <div className="card-body shadow-t">
              <h2 className="card-title">Datos del Usuario</h2>
              <div className="mb-4">
                <label htmlFor="id" className="block font-medium">
                  ID
                </label>
                <input type="text" id="id" name="id" value={user.id} disabled className="input input-bordered w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  disabled
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
                  value={user.email}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="created_at" className="block font-medium">
                  Creado (Formato 12 horas)
                </label>
                <input
                  type="text"
                  id="created_at"
                  name="created_at"
                  value={user.created_at}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="updated_at" className="block font-medium">
                  Actualizado (Formato 12 horas)
                </label>
                <input
                  type="text"
                  id="updated_at"
                  name="updated_at"
                  value={user.updated_at}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
          {/* Card para cambiar el nombre del usuario */}
          <div className="card w-1/2 bg-base-100 shadow-xl border">
            <div className="card-body shadow-t">
              <h2 className="card-title">Cambiar Nombre</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block font-medium">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                  />
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary w-full flex justify-center items-center ${isLoading ? "cursor-not-allowed" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm text-white"></span>
                  ) : (
                    <>
                      <i className="bi bi-person-badge-fill mr-2"></i>Actualizar
                    </>
                  )}
                </button>
                <p className="text-red-600 mt-2">* Los cambios se verán reflejados al volver a iniciar sesión.</p>
              </form>
            </div>
          </div>
        </div>
        <AlertSuccess isOpen={alertSuccessOpen} message={alertMessage} onClose={handleCloseAlert} />
        <AlertDanger isOpen={alertDangerOpen} message={error} onClose={handleCloseAlert} />
      </div>
    </DashboardLayout>
  );
}
