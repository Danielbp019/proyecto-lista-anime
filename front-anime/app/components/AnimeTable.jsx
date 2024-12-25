// components/AnimeTable.jsx

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { getAnimes } from "../services/animesService";

export default function AnimeTable() {
  // Estado react - Pasar los datos de la consulta a la tabla.
  const [data, setData] = useState([]);
  // Estado react - Buscador.
  const [filtering, setFiltering] = useState("");

  const columns = [
    { accessorKey: "nombre", header: "Nombre" },
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
          <button className="btn btn-sm btn-primary" onClick={() => onEdit(row.original)}>
            Editar
          </button>
          <button className="btn btn-sm btn-error" onClick={() => onDelete(row.original.id)}>
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  // Pasar los datos de la consulta a la tabla.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const animes = await getAnimes();
        setData(animes);
      } catch (error) {
        console.error("Error obteniendo animes:", error);
      }
    };
    fetchData();
  }, []);

  // Hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="overflow-x-auto w-full">
      {/* ver si puedo mover el buscador al page */}
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="input input-bordered w-full max-w-xs mb-4"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
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
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>Información no disponible</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginacion */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button onClick={() => table.setPageIndex(0)}>Primera</button>
        <button onClick={() => table.previousPage()}>Anterior</button>
        <button onClick={() => table.nextPage()}>Siguiente</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Ultima</button>
      </div>
    </div>
  );
}
