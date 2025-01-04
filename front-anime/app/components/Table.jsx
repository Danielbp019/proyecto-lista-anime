// components/Table.jsx
import React from "react";
import { flexRender } from "@tanstack/react-table";

const Table = ({ table, loading, columns }) => (
  <div className="overflow-x-auto w-full">
    <table className="table w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length}>
              <div className="flex justify-center items-center">
                Cargando datos
                <span className="ml-4 loading loading-dots loading-lg text-warning"></span>
              </div>
            </td>
          </tr>
        ) : table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>
              <div className="flex justify-center items-center">No se encontraron datos</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <div className="flex justify-center mt-4">
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
        <button className="join-item btn btn-outline" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Última
        </button>
        <select
          className="join-item btn btn-outline"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
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
);

export default Table;
