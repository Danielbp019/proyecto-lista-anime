// (pages)/dashboard/tipo/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getTipos, createTipo, updateTipo, deleteTipo } from "@/app/services/tiposService";
import DashboardLayout from "@/app/layouts/DashboardLayout";
// Componentes
import TipoModal from "@/app/components/TipoModal";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import AlertSuccess from "@/app/components/AlertSuccess";
import AlertDanger from "@/app/components/AlertDanger";
import Table from "@/app/components/Table";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function TipoPage() {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [tipoToEdit, setTipoToEdit] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [tipoToDelete, setTipoToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertSuccessOpen, setAlertSuccessOpen] = useState(false); // Estado para controlar la alerta de éxito
  const [alertDangerOpen, setAlertDangerOpen] = useState(false); // Estado para controlar la alerta de error
  const [alertMessage, setAlertMessage] = useState(""); // Estado para el mensaje de la alerta

  const fetchTipos = async () => {
    setLoading(true);
    const result = await getTipos();
    if (result.success) {
      setData(result.data);
    } else {
      console.error("Error obteniendo tipos:", result.error);
      setAlertMessage(`Error al obtener los tipos: ${result.error}`);
      setAlertDangerOpen(true); // Mostrar la alerta de error
    }
    setLoading(false);
  };

  const handleDelete = (id) => {
    setTipoToDelete(id);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    setConfirmDialogOpen(false);
    const result = await deleteTipo(tipoToDelete);
    if (result.success) {
      await fetchTipos();
      setColumnFilters([]);
      setAlertMessage("Tipo eliminado con éxito");
      setAlertSuccessOpen(true);
    } else {
      setAlertMessage(`Error al eliminar el tipo: ${result.error}`);
      setAlertDangerOpen(true); // Mostrar la alerta de error
    }
    setTipoToDelete(null);
  };

  const handleEdit = (tipo) => {
    setTipoToEdit(tipo);
    setModalOpen(true);
  };

  const handleSave = async (tipo) => {
    const result = tipoToEdit ? await updateTipo(tipoToEdit.id, tipo) : await createTipo(tipo);

    if (result.success) {
      setModalOpen(false);
      setTipoToEdit(null);
      await fetchTipos();
      setAlertMessage(tipoToEdit ? "Tipo actualizado con éxito" : "Tipo creado con éxito");
      setAlertSuccessOpen(true);
    } else {
      setAlertMessage(`Error al guardar el tipo: ${result.error}`);
      setAlertDangerOpen(true); // Mostrar la alerta de error
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTipoToEdit(null);
  };

  const handleClearSearch = () => {
    setColumnFilters([]);
  };

  const columns = [
    { accessorKey: "nombretipo", header: "Nombre", filterFn: "includesString" },
    {
      id: "acciones",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row.original)}>
            Editar
          </button>
          <button className="btn btn-sm btn-error" onClick={() => handleDelete(row.original.id)}>
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchTipos();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
  });

  const breadcrumbItems = [
    { label: "Escritorio", href: "/dashboard" },
    { label: "Tipos de obra", active: true },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full">
        <div className="w-full mb-4">
          <h1 className="text-2xl font-bold text-left">Listado de Tipos</h1>
          <div className="flex items-center justify-between mt-4">
            <Breadcrumb items={breadcrumbItems} />
            <button className="btn btn-wide btn-sm btn-primary mx-auto" onClick={() => setModalOpen(true)}>
              Agregar Nuevo Tipo
            </button>
            <div className="flex items-center ml-4">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                className="input input-bordered input-primary input-sm w-full max-w-xs"
                value={columnFilters.find((filter) => filter.id === "nombretipo")?.value || ""}
                onChange={(e) => setColumnFilters([{ id: "nombretipo", value: e.target.value }])}
              />
              <button className="btn btn-sm btn-primary ml-2" onClick={handleClearSearch}>
                Borrar
              </button>
            </div>
          </div>
        </div>
        <Table table={table} loading={loading} columns={columns} />
        <TipoModal isOpen={isModalOpen} tipo={tipoToEdit} onClose={handleCloseModal} onSave={handleSave} />
        <ConfirmDialog
          isOpen={confirmDialogOpen}
          message="¿Estás seguro de que deseas eliminar este tipo? Esta acción no se puede deshacer."
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDialogOpen(false)}
        />
        <AlertSuccess isOpen={alertSuccessOpen} message={alertMessage} onClose={() => setAlertSuccessOpen(false)} />
        <AlertDanger isOpen={alertDangerOpen} message={alertMessage} onClose={() => setAlertDangerOpen(false)} />
      </div>
    </DashboardLayout>
  );
}
