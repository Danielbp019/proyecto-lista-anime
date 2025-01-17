// components/AlertDanger.jsx

import React, { useState, useEffect } from "react";

const AlertDanger = ({ isOpen, message, onClose }) => {
  const [seconds, setSeconds] = useState(5); // Cambiar a 5 segundos

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000); // Cerrar automáticamente después de 5 segundos
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
        setSeconds(5); // Resetear el contador cuando el componente se cierra
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-center">
      <div className="alert alert-error shadow-lg flex w-auto min-w-max items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
        </svg>
        <span>
          {message} (Cierra en {seconds} segundos)
        </span>
        <button onClick={onClose} className="btn btn-sm btn-error">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AlertDanger;
