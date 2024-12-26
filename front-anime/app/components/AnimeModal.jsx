// components/AnimeModal.jsx

import React, { useState, useEffect } from "react";

export default function AnimeModal({ isOpen, anime, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    numero_capitulos: 0,
    visto: 0,
    comentarios: "",
  });

  useEffect(() => {
    if (anime) {
      setFormData(anime);
    } else {
      setFormData({
        id: 0,
        nombre: "",
        numero_capitulos: 0,
        visto: 0,
        comentarios: "",
      });
    }
  }, [anime]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = () => {
    if (!formData.nombre.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }
    if (formData.numero_capitulos < 1) {
      alert("El número de capítulos debe ser mayor a 0.");
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null; // Asegurarse de no renderizar el modal si no está abierto.

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{anime ? "Editar Anime" : "Agregar Nuevo Anime"}</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Número de Capítulos</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={formData.numero_capitulos}
            onChange={(e) => {
              const value = Math.max(1, +e.target.value); // Asegura que el valor no sea menor a 1
              handleChange("numero_capitulos", value);
            }}
            min={1} // Asegura que el valor no sea menor a 1
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Visto</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.visto}
            onChange={(e) => handleChange("visto", +e.target.value)}
          >
            <option value={0}>Sin terminar</option>
            <option value={1}>Completo</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Comentarios</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={formData.comentarios}
            onChange={(e) => {
              const value = e.target.value.slice(0, 250); // Limita a 250 caracteres
              handleChange("comentarios", value);
            }}
          ></textarea>
          <label className="label">
            <span className="label-text-alt">{formData.comentarios.length}/250 caracteres</span>
          </label>
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
