// components/AnimeTable.tsx
import React from 'react';
import { AnimeData } from '../services/animesService';
import { ColumnDef, flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

interface AnimeTableProps {
  animes: AnimeData[];
  onEdit: (anime: AnimeData) => void;
  onDelete: (id: number) => void;
}

export default function AnimeTable({ animes, onEdit, onDelete }: AnimeTableProps) {
  const columns = React.useMemo<ColumnDef<AnimeData>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre',
      },
      {
        accessorKey: 'numero_capitulos',
        header: 'Capítulos',
      },
      {
        accessorKey: 'visto',
        header: 'Visto',
        cell: ({ getValue }) => (getValue() === 1 ? 'Sí' : 'No'),
      },
      {
        accessorKey: 'comentarios',
        header: 'Comentarios',
      },
      {
        accessorKey: 'fecha_actualizacion',
        header: 'Última Actualización',
      },
      {
        id: 'acciones',
        header: 'Acciones',
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
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data: animes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
