// (pages)/dashboard/anime/page.jsx
"use client";

import AnimeTable from "@/app/components/AnimeTable";

export default function AnimePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Listado de Animes</h1>
      <AnimeTable />
    </div>
  );
}
