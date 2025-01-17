// (pages)/dashboard/obra/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { getObras, createObra, updateObra, deleteObra } from "@/app/services/obrasService";
import { getTipos } from "@/app/services/tiposService";
import DashboardLayout from "@/app/layouts/DashboardLayout";
// Componentes
import ObraModal from "@/app/components/ObraModal";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import AlertSuccess from "@/app/components/AlertSuccess";
import AlertDanger from "@/app/components/AlertDanger";
import Table from "@/app/components/Table";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function ObraPage() {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [obraToEdit, setObraToEdit] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [obraToDelete, setObraToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertSuccessOpen, setAlertSuccessOpen] = useState(false); // Estado para controlar la alerta de éxito
  const [alertDangerOpen, setAlertDangerOpen] = useState(false); // Estado para controlar la alerta de error
  const [alertMessage, setAlertMessage] = useState(""); // Estado para el mensaje de la alerta
  const [tipos, setTipos] = useState({});
  const [selectedTipo, setSelectedTipo] = useState(""); // Estado para el filtro de tipo

  const fetchObras = async () => {
    setLoading(true);
    const userId = localStorage.getItem("user_id"); // Obtener user_id del localStorage
    const result = await getObras(userId); // Pasar userId a getObras
    if (result.success) {
      setData(result.data);
    } else {
      console.error("Error obteniendo las obras:", result.error);
      setAlertMessage(`Error al obtener las obras: ${result.error}`);
      setAlertDangerOpen(true);
    }
    setLoading(false);
  };

  const fetchTipos = async () => {
    const result = await getTipos();
    if (result.success) {
      const tiposMap = {};
      result.data.forEach((tipo) => {
        tiposMap[tipo.id] = tipo.nombretipo;
      });
      setTipos(tiposMap);
    } else {
      console.error("Error obteniendo tipos:", result.error);
    }
  };

  useEffect(() => {
    fetchObras();
    fetchTipos();
  }, []);

  const handleDelete = (id) => {
    setObraToDelete(id);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    setConfirmDialogOpen(false);
    const result = await deleteObra(obraToDelete);
    if (result.success) {
      await fetchObras();
      setColumnFilters([]);
      setAlertMessage("Obra eliminada con éxito");
      setAlertSuccessOpen(true);
    } else {
      setAlertMessage(`Error al eliminar la obra: ${result.error}`);
      setAlertDangerOpen(true);
    }
    setObraToDelete(null);
  };

  const handleEdit = (obra) => {
    setObraToEdit(obra);
    setModalOpen(true);
  };

  const handleSave = async (obra) => {
    const result = obraToEdit ? await updateObra(obraToEdit.id, obra) : await createObra(obra);

    if (result.success) {
      setModalOpen(false);
      setObraToEdit(null);
      await fetchObras();
      setAlertMessage(obraToEdit ? "Obra actualizada con éxito" : "Obra creada con éxito");
      setAlertSuccessOpen(true);
    } else {
      setAlertMessage(`Error al guardar la obra: ${result.error}`);
      setAlertDangerOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setObraToEdit(null);
  };

  const handleClearSearch = () => {
    setColumnFilters([]);
    setSelectedTipo(""); // Limpiar filtro de tipo
  };

  const handleNameFilterChange = (e) => {
    const filterValue = e.target.value;
    setColumnFilters((prevFilters) => {
      const newFilters = prevFilters.filter((filter) => filter.id !== "nombre");
      if (filterValue !== "") {
        newFilters.push({ id: "nombre", value: filterValue });
      }
      return newFilters;
    });
  };

  const handleTipoChange = (e) => {
    const filterValue = e.target.value;
    setSelectedTipo(filterValue);
    setColumnFilters((prevFilters) => {
      const newFilters = prevFilters.filter((filter) => filter.id !== "tipo_id");
      if (filterValue !== "") {
        newFilters.push({ id: "tipo_id", value: filterValue });
      }
      return newFilters;
    });
  };

  const columns = [
    { accessorKey: "nombre", header: "Nombre", filterFn: "includesString" },
    { accessorKey: "numero_capitulos", header: "Capítulos" },
    {
      accessorKey: "visto",
      header: "Visto",
      cell: ({ row }) => (row.original.visto === 1 ? "Completo" : "Sin terminar"),
    },
    { accessorKey: "comentarios", header: "Comentarios" },
    { accessorKey: "fecha_actualizacion", header: "Última Actualización" },
    {
      accessorKey: "tipo_id",
      header: "Tipo",
      filterFn: "equalsString", // Agregar filtro para tipo_id
      cell: ({ row }) => {
        const tipo = tipos[row.original.tipo_id] || "Sin definir";

        // Definir clases de estilo según el tipo
        let badgeClass = "badge ";
        if (tipo === "Sin definir") {
          badgeClass += "badge-neutral";
        } else if (tipo === "Anime") {
          badgeClass += "badge-primary";
        } else if (tipo === "Dorama") {
          badgeClass += "badge-secondary";
        } else if (tipo === "Serie") {
          badgeClass += "badge-accent";
        } else {
          badgeClass += "badge-badge-outline";
        }
        return <div className={badgeClass}>{tipo}</div>;
      },
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
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
    { label: "Listado de obras", active: true },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full">
        <div className="w-full mb-4">
          <h1 className="text-2xl font-bold text-left">Listado de obras</h1>
          <div className="flex items-center justify-between mt-4">
            <Breadcrumb items={breadcrumbItems} />
            <button className="btn btn-wide btn-sm btn-primary mx-auto" onClick={() => setModalOpen(true)}>
              Agregar Nuevo Obra
            </button>
            <div className="flex items-center ml-4">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                className="input input-bordered input-primary input-sm w-full max-w-xs"
                value={columnFilters.find((filter) => filter.id === "nombre")?.value || ""}
                onChange={handleNameFilterChange}
              />
              <button className="btn btn-sm btn-primary ml-2" onClick={handleClearSearch}>
                Borrar
              </button>
              <select className="select select-primary select-sm ml-2" value={selectedTipo} onChange={handleTipoChange}>
                <option value="">Todos los Tipos</option>
                {Object.entries(tipos).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Table table={table} loading={loading} columns={columns} />
        <ObraModal
          isOpen={isModalOpen}
          obra={obraToEdit}
          onClose={handleCloseModal}
          onSave={handleSave}
          tipos={tipos} // Pasar tipos al modal
        />
        <ConfirmDialog
          isOpen={confirmDialogOpen}
          message="¿Estás seguro de que deseas eliminar esta obra? Esta acción no se puede deshacer."
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDialogOpen(false)}
        />
        <AlertSuccess isOpen={alertSuccessOpen} message={alertMessage} onClose={() => setAlertSuccessOpen(false)} />
        <AlertDanger isOpen={alertDangerOpen} message={alertMessage} onClose={() => setAlertDangerOpen(false)} />
      </div>
    </DashboardLayout>
  );
}
