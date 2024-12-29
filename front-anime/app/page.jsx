// components/Home.jsx

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
            className="mx-auto h-12 w-auto"
            src="/logo.png" // Asegúrate de colocar la ruta correcta de tu archivo PNG
            alt="Anime List"
            width={80}
            height={80}
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-neutral-content">
            ¡Bienvenido a tu lista de animes!
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-neutral-content">
            Un lugar para almacenar y gestionar todos los animes que has visto.
          </p>
        </div>
        <div className="rounded-md shadow-sm">
          <div className="text-center">
            <Link
              href="/auth/login"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-primary hover:bg-primary-focus focus:outline-none focus:border-primary-focus focus:shadow-outline-primary active:bg-primary transition duration-150 ease-in-out"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 max-w-md w-full space-y-6">
        <h3 className="text-xl leading-6 font-medium text-neutral-content">Características del Proyecto</h3>
        <ul className="space-y-4">
          <li className="flex items-center text-neutral-content">
            <span className="h-6 w-6 mr-2" role="img" aria-label="Anime">
              📺
            </span>
            Almacena información de los animes vistos, número de capítulos, y comentarios.
          </li>
          <li className="flex items-center text-neutral-content">
            <span className="h-6 w-6 mr-2" role="img" aria-label="State">
              ✅
            </span>
            Marca si has terminado de ver un anime o no.
          </li>
          <li className="flex items-center text-neutral-content">
            <span className="h-6 w-6 mr-2" role="img" aria-label="CSV">
              📁
            </span>
            Permite la exportación e importación de datos en formato CSV.
          </li>
        </ul>
      </div>
    </div>
  );
}
