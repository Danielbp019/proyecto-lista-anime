import React from "react";

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-box">
        <h2 className="text-xl font-bold mb-4">Confirmación</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button onClick={onConfirm} className="btn btn-primary">
            Confirmar
          </button>
          <button onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
