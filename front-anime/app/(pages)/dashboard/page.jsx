// (pages)/dashboard/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import {
  getTotalRegistros,
  getTipo1,
  getTipo2,
  getTipo3,
  getTipo4,
  getOtrosTipos,
} from "@/app/services/estadisticaService";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalRegistros: 0,
    tipo1: 0,
    tipo2: 0,
    tipo3: 0,
    tipo4: 0,
    otrosTipos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("user_id");

      const totalRegistros = await getTotalRegistros(userId);
      const tipo1 = await getTipo1(userId);
      const tipo2 = await getTipo2(userId);
      const tipo3 = await getTipo3(userId);
      const tipo4 = await getTipo4(userId);
      const otrosTipos = await getOtrosTipos(userId);

      setStats({
        totalRegistros: totalRegistros.data.total_registros || 0,
        tipo1: tipo1.data.tipo_1 || 0,
        tipo2: tipo2.data.tipo_2 || 0,
        tipo3: tipo3.data.tipo_3 || 0,
        tipo4: tipo4.data.tipo_4 || 0,
        otrosTipos: otrosTipos.data.otros_tipos || 0,
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full">
        <div className="w-full mb-4">
          <h1 className="text-2xl font-bold text-left">Bienvenido al Escritorio</h1>
          <p>Mira un resumen de la actividad en la aplicación.</p>
          <div className="flex items-center justify-between mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="card bg-success text-success-content">
            <div className="card-body">
              <h2 className="card-title">Total de Registros</h2>
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <p>{stats.totalRegistros}</p>
              )}
            </div>
          </div>
          <div className="card bg-neutral text-neutral-content">
            <div className="card-body">
              <h2 className="card-title">Número de obras "Sin definir"</h2>
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <p>{stats.tipo1}</p>
              )}
            </div>
          </div>
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Número de obras "Anime"</h2>
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <p>{stats.tipo2}</p>
              )}
            </div>
          </div>
          <div className="card bg-secondary text-secondary-content">
            <div className="card-body">
              <h2 className="card-title">Número de obras "Dorama"</h2>
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <p>{stats.tipo3}</p>
              )}
            </div>
          </div>
          <div className="card bg-accent text-accent-content">
            <div className="card-body">
              <h2 className="card-title">Número de obras "Serie"</h2>
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <p>{stats.tipo4}</p>
              )}
            </div>
          </div>
          <div className="card bg-warning text-warning-content">
            <div className="card-body">
              <h2 className="card-title">Número de obras de otros Tipos</h2>
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <p>{stats.otrosTipos}</p>
              )}
            </div>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200 w-full mt-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">Clic aquí para Mostar/Ocultar como se usa el CSV</div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
