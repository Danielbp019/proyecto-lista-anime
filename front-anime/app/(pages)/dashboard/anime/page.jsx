// (pages)/dashboard/anime/page.jsx
"use client";

import AnimeTable from "@/app/components/AnimeTable";

export default function AnimePage() {
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
          placeholder="Buscar..."
          className="input input-bordered w-1/3 flex-1 ml-4"
        />
      </div>

      <AnimeTable />
    </div>
  );
}
