// (pages)/dashboard/csvanime/page.jsx
"use client";

import DashboardLayout from "@/app/layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { getExcelcsv, createExcelcsv, deleteExcelcsv } from "@/app/services/csvanimeService";
import "@/app/styles/globals.css";
// Componentes
import ConfirmDialog from "@/app/components/ConfirmDialog";
import AlertSuccess from "@/app/components/AlertSuccess";
import AlertDanger from "@/app/components/AlertDanger";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function CsvanimePage() {
  const [file, setFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para el diálogo de confirmación
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Estado para el alert de éxito
  const [alertMessage, setAlertMessage] = useState(""); // Mensaje para el alert de éxito
  const [isErrorOpen, setIsErrorOpen] = useState(false); // Estado para el alert de error
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje para el alert de error
  const [countdown, setCountdown] = useState(0); // Estado para el contador

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await createExcelcsv(file);
        setAlertMessage("Archivo CSV subido con éxito");
        setIsAlertOpen(true);
        setFile(null); // Limpiar el campo de subida de archivos
        document.getElementById("fileInput").value = null; // Limpiar el valor del input de archivo
      } catch (error) {
        setErrorMessage("Error al subir el archivo CSV. Intenta nuevamente.");
        setIsErrorOpen(true); // Open error alert
      }
    }
  };

  const handleDownload = async () => {
    if (countdown === 0) {
      try {
        await getExcelcsv(); // No se pasa el `id` aquí, se obtiene internamente
        setCountdown(10); // Iniciar el contador de 10 segundos
      } catch (error) {
        setErrorMessage("Error al descargar el archivo CSV.");
        setIsErrorOpen(true); // Open error alert
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExcelcsv(id);
      setAlertMessage("Tabla truncada con éxito");
      setIsAlertOpen(true);
      setIsDialogOpen(false); // Cerrar el diálogo después de confirmar
    } catch (error) {
      setErrorMessage("Error al vaciar la tabla.");
      setIsErrorOpen(true); // Open error alert
    }
  };

  const openConfirmDialog = () => {
    setIsDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsDialogOpen(false);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const closeErrorAlert = () => {
    setIsErrorOpen(false);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const breadcrumbItems = [
    { label: "Escritorio", href: "/dashboard" },
    { label: "Operaciones con de CSV", active: true },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full">
        <div className="w-full mb-4">
          <h1 className="text-2xl font-bold text-left">Operaciones con de CSV</h1>
          <div className="flex items-center justify-between mt-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Card de subida */}
        <div className="card w-full bg-base-100 shadow-xl border shadow-all">
          <div className="card-body">
            <h2 className="card-title">Subir Archivo CSV</h2>
            <input
              id="fileInput" // Añadir el id al input de archivo
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="input input-bordered w-full"
              required
            />
            <button onClick={handleUpload} className="btn btn-primary mt-4">
              Subir CSV
            </button>
          </div>
        </div>

        {/* Doble card */}
        <div className="flex flex-row w-full mt-4">
          <div className="card flex-grow bg-base-100 shadow-xl mr-4 border shadow-all">
            <div className="card-body">
              <h2 className="card-title">Descargar Archivo CSV</h2>
              <button onClick={handleDownload} className="btn btn-secondary mt-4" disabled={countdown > 0}>
                {countdown > 0 ? `Esperar ${countdown}s` : "Descargar CSV"}
              </button>
            </div>
          </div>

          <div className="card flex-grow bg-base-100 shadow-xl border shadow-all">
            <div className="card-body">
              <h2 className="card-title">Vaciar Tabla</h2>
              <button onClick={openConfirmDialog} className="btn btn-error mt-4">
                Vaciar Tabla
              </button>
            </div>
          </div>
        </div>

        {/* Diálogo de confirmación */}
        <ConfirmDialog
          isOpen={isDialogOpen}
          message="¿Estás seguro de que deseas vaciar la tabla? Esta acción no se puede deshacer y todos los datos se eliminarán."
          onConfirm={() => handleDelete(1)}
          onCancel={closeConfirmDialog}
        />

        {/* Alert de éxito */}
        <AlertSuccess isOpen={isAlertOpen} message={alertMessage} onClose={closeAlert} />

        {/* Alert de error */}
        <AlertDanger isOpen={isErrorOpen} message={errorMessage} onClose={closeErrorAlert} />
      </div>
    </DashboardLayout>
  );
}
