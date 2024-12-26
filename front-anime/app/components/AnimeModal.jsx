// components/AnimeModal.jsx
import React, { useState, useEffect } from "react";

export default function AnimeModal({ anime, onClose, onSave }) {
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

  return (
    <div className={`modal ${anime ? "modal-open" : ""}`}>
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
            onChange={(e) => handleChange("numero_capitulos", +e.target.value)}
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
            onChange={(e) => handleChange("comentarios", e.target.value)}
          ></textarea>
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
