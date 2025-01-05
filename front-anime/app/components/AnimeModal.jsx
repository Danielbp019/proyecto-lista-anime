// components/AnimeModal.jsx

import React, { useState, useEffect } from "react";

export default function AnimeModal({ isOpen, anime, onClose, onSave, tipos }) {
  // Recibir tipos como prop
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    numero_capitulos: 0,
    visto: 0,
    comentarios: "",
    user_id: 0, // Agregar el campo user_id aquí
    tipo_id: "", // Agregar el campo tipo_id aquí
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Obtener el user_id del localStorage
    const userId = localStorage.getItem("user_id");
    if (anime) {
      setFormData({ ...anime, user_id: userId });
    } else {
      setFormData({
        id: 0,
        nombre: "",
        numero_capitulos: 0,
        visto: 0,
        comentarios: "",
        user_id: userId, // Asignar el user_id al formData
        tipo_id: "", // Inicializar tipo_id
      });
    }
  }, [anime]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: "" }); // Limpiar el mensaje de error del campo modificado
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre no puede estar vacío.";
    }
    if (formData.numero_capitulos < 1) {
      newErrors.numero_capitulos = "El número de capítulos debe ser mayor a 0.";
    }
    if (!formData.tipo_id) {
      newErrors.tipo_id = "Debes seleccionar un tipo.";
    }
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(formData);
  };

  const handleCancel = () => {
    setErrors({});
    onClose();
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
          {errors.nombre && <span className="text-error">{errors.nombre}</span>}
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
          {errors.numero_capitulos && <span className="text-error">{errors.numero_capitulos}</span>}
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tipo</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.tipo_id}
            onChange={(e) => handleChange("tipo_id", e.target.value)}
            required
          >
            <option value="">Selecciona un tipo</option>
            {Object.entries(tipos).map(([id, nombretipo]) => (
              <option key={id} value={id}>
                {nombretipo}
              </option>
            ))}
          </select>
          {errors.tipo_id && <span className="text-error">{errors.tipo_id}</span>}
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
