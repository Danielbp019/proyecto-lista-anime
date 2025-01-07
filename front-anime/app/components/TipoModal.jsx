// components/TipoModal.jsx

import React, { useState, useEffect } from "react";

export default function TipoModal({ isOpen, tipo, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: 0,
    nombretipo: "",
    user_id: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Obtener el user_id del localStorage
    const userId = localStorage.getItem("user_id");
    if (tipo) {
      setFormData({ ...tipo, user_id: userId });
    } else {
      setFormData({
        id: 0,
        nombretipo: "",
        user_id: userId, // Asignar el user_id al formData
      });
    }
  }, [tipo]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: "" }); // Limpiar el mensaje de error del campo modificado
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombretipo.trim()) {
      newErrors.nombretipo = "El nombre no puede estar vacío.";
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
        <h3 className="font-bold text-lg">{tipo ? "Editar Tipo" : "Agregar Nuevo Tipo"}</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.nombretipo}
            onChange={(e) => handleChange("nombretipo", e.target.value)}
            required
          />
          {errors.nombretipo && <span className="text-error">{errors.nombretipo}</span>}
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
