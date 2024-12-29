// (pages)/dashboard/csvanime/page.jsx
"use client";

import DashboardLayout from "@/app/layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { getExcelcsv, createExcelcsv, deleteExcelcsv } from "@/app/services/csvanimeService";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import "@/app/styles/globals.css";

export default function CsvanimePage() {
  const [file, setFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para el diálogo de confirmación
  const [countdown, setCountdown] = useState(0); // Estado para el contador

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      await createExcelcsv(file);
      alert("Archivo CSV subido con éxito");
    }
  };

  const handleDownload = async (id) => {
    if (countdown === 0) {
      await getExcelcsv(id);
      setCountdown(10); // Iniciar el contador de 10 segundos
    }
  };

  const handleDelete = async (id) => {
    await deleteExcelcsv(id);
    alert("Tabla anime truncada con éxito");
    setIsDialogOpen(false); // Cerrar el diálogo después de confirmar
  };

  const openConfirmDialog = () => {
    setIsDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full">
        <div className="w-full mb-4">
          <h1 className="text-2xl font-bold text-left">Subida de CSV anime</h1>
          <div className="flex items-center justify-between mt-4">
            <nav className="text-sm breadcrumbs">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard" className="link">
                    Escritorio
                  </a>
                </li>
                <li className="breadcrumb-item active">
                  <span>Subida de CSV anime</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Card de subida */}
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body shadow-t">
            <h2 className="card-title">Subir Archivo CSV</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} className="input input-bordered w-full" />
            <button onClick={handleUpload} className="btn btn-primary mt-4">
              Subir CSV
            </button>
          </div>
        </div>

        {/* Doble card */}
        <div className="flex flex-row w-full mt-4">
          <div className="card flex-grow bg-base-100 shadow-xl mr-4">
            <div className="card-body">
              <h2 className="card-title">Descargar Archivo CSV</h2>
              <button onClick={() => handleDownload(1)} className="btn btn-secondary mt-4" disabled={countdown > 0}>
                {countdown > 0 ? `Esperar ${countdown}s` : "Descargar CSV"}
              </button>
            </div>
          </div>

          <div className="card flex-grow bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Vaciar Tabla Anime</h2>
              <button onClick={openConfirmDialog} className="btn btn-error mt-4">
                Vaciar Tabla
              </button>
            </div>
          </div>
        </div>

        {/* Diálogo de confirmación */}
        <ConfirmDialog
          isOpen={isDialogOpen}
          message="¿Estás seguro de que deseas vaciar la tabla de anime? Esta acción no se puede deshacer y todos los datos se eliminarán."
          onConfirm={() => handleDelete(1)}
          onCancel={closeConfirmDialog}
        />
      </div>
    </DashboardLayout>
  );
}
