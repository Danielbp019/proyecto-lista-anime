// (pages)/auth/register/page.jsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { register } from "@/app/services/authService";
import AlertSuccess from "@/app/components/AlertSuccess";
import AlertDanger from "@/app/components/AlertDanger";

const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Correo electrónico no válido"),
    password: z
      .string()
      .regex(
        /(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)/,
        "La contraseña debe tener mínimo 2 minúsculas, 2 mayúsculas y 2 números"
      ),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Nuevo estado para el mensaje de éxito
  const [isError, setIsError] = useState(false); // Nuevo estado para el mensaje de error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      registerSchema.parse(formData); // Validación antes de enviar datos
      await register(formData);
      setIsSuccess(true); // Mostrar mensaje de éxito
      setIsError(false); // Asegurarse de que el mensaje de error no se muestre
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("El registro falló. Por favor intente nuevamente.");
      }
      setIsError(true); // Mostrar mensaje de error
      setIsSuccess(false); // Asegurarse de que el mensaje de éxito no se muestre
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
  };

  const handleCloseError = () => {
    setIsError(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <form onSubmit={handleSubmit} className="bg-base-100 p-8 rounded shadow-md w-96">
        <h1 className="text-xl text-center font-bold mb-6">Registro de nuevo usuario</h1>
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
          className={`btn btn-primary w-full flex justify-center items-center ${isLoading ? "cursor-not-allowed" : ""}`}
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
            ¿Ya tienes cuenta?{" "}
            <a href="/auth/login" className="link link-primary">
              Inicia sesión
            </a>
          </p>
        </div>
      </form>
      <AlertSuccess isOpen={isSuccess} message="¡Registro exitoso!" onClose={handleCloseSuccess} />
      <AlertDanger isOpen={isError} message={error} onClose={handleCloseError} />
    </div>
  );
}
