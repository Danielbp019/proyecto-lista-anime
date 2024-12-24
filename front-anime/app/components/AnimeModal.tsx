// components/AnimeModal.tsx
import React, { useState } from 'react';
import { AnimeData } from '../services/animesService';

interface AnimeModalProps {
  anime: AnimeData | null;
  onClose: () => void;
  onSave: (anime: AnimeData) => void;
}

export default function AnimeModal({ anime, onClose, onSave }: AnimeModalProps) {
  const [formData, setFormData] = useState<AnimeData>(
    anime || {
      id: 0,
      nombre: '',
      numero_capitulos: 0,
      visto: 0,
      comentarios: '',
      fecha_actualizacion: new Date().toISOString().slice(0, 10),
    }
  );

  const handleChange = (key: keyof AnimeData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{anime ? 'Editar Anime' : 'Agregar Nuevo Anime'}</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
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
            onChange={(e) => handleChange('numero_capitulos', +e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Visto</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.visto}
            onChange={(e) => handleChange('visto', +e.target.value)}
          >
            <option value={0}>No</option>
            <option value={1}>Sí</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Comentarios</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={formData.comentarios}
            onChange={(e) => handleChange('comentarios', e.target.value)}
          ></textarea>
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={() => onSave(formData)}>
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
