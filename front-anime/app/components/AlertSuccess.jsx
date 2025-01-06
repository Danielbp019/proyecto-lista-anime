// components/AlertSuccess.jsx

import React, { useState, useEffect } from "react";

const AlertSuccess = ({ isOpen, message, onClose }) => {
  const [seconds, setSeconds] = useState(5); // Cambiar a 5 segundos

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000); // Cerrar automáticamente después de 10 segundos
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
      <div className="alert alert-success shadow-lg flex w-auto min-w-max items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
        <span>
          {message} (Cierra en {seconds} segundos)
        </span>
        <button onClick={onClose} className="btn btn-sm btn-success">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AlertSuccess;
