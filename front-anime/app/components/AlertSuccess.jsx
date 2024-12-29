// components/AlertSuccess.jsx

import React, { useEffect } from "react";

const AlertSuccess = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 10000); // Cerrar automáticamente después de 10 segundos
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-center">
      <div className="alert alert-success shadow-lg flex w-auto min-w-max items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2l4-4m6 2a9 9 0 1 1-18 0a9 9 0 0 1 18 0z"
          />
        </svg>
        <span>{message}</span>
        <button onClick={onClose} className="btn btn-sm btn-success">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AlertSuccess;
