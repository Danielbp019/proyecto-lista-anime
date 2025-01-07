// components/ExplainCSVModal.jsx
import React from "react";
import Image from "next/image";

export default function ExplainCSVModal({ onClose }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box w-auto max-w-full overflow-auto">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        <h2 className="font-bold text-2xl mb-4">Explicación del uso de CSV</h2>
        <p className="mb-4">
          La operación de "Subir Archivo CSV" se puede realizar con un archivo que cumpla algunas condiciones:
        </p>
        <ul className="list-disc pl-5 space-y-4">
          <li className="mb-4">1. Debe ser tipo/extensión CSV.</li>
          <li className="mb-4">
            2. El archivo debe tener dos columnas, una con el nombre de las obras y la otra con el número de los
            capítulos.
            <div className="mt-2 mb-4">
              <Image src="/csv-subir.jpg" alt="CSV" width={875} height={320} />
            </div>
          </li>
          <li className="mb-4">
            3. Los CSV generados por esta aplicación también pueden volver a ser usados para alimentar la aplicación.
            <div className="mt-2 mb-4">
              <Image src="/CSV-descargado.jpg" alt="CSV-descargado" width={1045} height={426} />
            </div>
          </li>
          <li className="mb-4">
            4. El sistema no acepta nombres de obras repetidos; de existir uno, producirá un error.
          </li>
        </ul>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
