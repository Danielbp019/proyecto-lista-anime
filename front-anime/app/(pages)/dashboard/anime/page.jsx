// (pages)/dashboard/anime/page.jsx
"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { getAnimes, createAnime, updateAnime, deleteAnime } from "@/app/services/animesService";
import AnimeModal from "@/app/components/AnimeModal";

export default function AnimePage() {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [animeToEdit, setAnimeToEdit] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchAnimes = async () => {
    const result = await getAnimes();
    if (result.success) {
      setData(result.data);
    } else {
      console.error("Error obteniendo animes:", result.error);
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteAnime(id);
    if (result.success) {
      fetchAnimes();
    } else {
      alert(`Error al eliminar el anime: ${result.error}`);
    }
  };

  const handleEdit = (anime) => {
    setAnimeToEdit(anime);
    setModalOpen(true);
  };

  const handleSave = async (anime) => {
    const result = animeToEdit
      ? await updateAnime(animeToEdit.id, anime)
      : await createAnime(anime);

    if (result.success) {
      setModalOpen(false); // Cerrar modal al guardar
      setAnimeToEdit(null); // Limpiar selección
      fetchAnimes();
    } else {
      alert(`Error al guardar el anime: ${result.error}`);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cerrar modal
    setAnimeToEdit(null); // Limpiar selección
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

  useEffect(() => {
    fetchAnimes();
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

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-between w-full mb-4">
        <nav className="text-sm breadcrumbs flex-1">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/dashboard" className="link">
                Escritorio
              </a>
            </li>
            <li className="breadcrumb-item active">
              <span>Lista de animes</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-2xl font-bold text-center flex-1">Listado de Animes</h1>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="input input-bordered w-1/3 flex-1 ml-4"
          value={columnFilters.find((filter) => filter.id === "nombre")?.value || ""}
          onChange={(e) => setColumnFilters([{ id: "nombre", value: e.target.value }])}
        />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex justify-center items-center">
                    Cargando datos
                    <span className="ml-4 loading loading-dots loading-lg text-warning"></span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center">
          <div className="join">
            <button className="join-item btn btn-outline" onClick={() => table.setPageIndex(0)}>
              Primera
            </button>
            <button className="join-item btn btn-outline" onClick={() => table.previousPage()}>
              Anterior
            </button>
            <button className="join-item btn btn-outline" onClick={() => table.nextPage()}>
              Siguiente
            </button>
            <button
              className="join-item btn btn-outline"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Última
            </button>
            <select
              className="join-item btn btn-outline"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <AnimeModal
        anime={animeToEdit}
        onClose={handleCloseModal} // Utiliza la función para cerrar
        onSave={handleSave}
      />
    </div>
  );
}
