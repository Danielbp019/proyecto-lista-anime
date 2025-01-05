// Home.jsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 min-h-screen flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6">
        <div className="max-w-screen-lg mb-8 lg:mb-16 text-center">
          <Image
            className="mx-auto h-12 w-auto"
            src="/logo.png" // Asegúrate de colocar la ruta correcta de tu archivo PNG
            alt="Anime List"
            width={80}
            height={80}
          />
          <h2 className="mt-6 text-4xl font-extrabold text-center text-gray-900 dark:text-white">
            ¡Bienvenido a tu lista de ocio!
          </h2>
          <p className="mt-2 text-center text-xl text-gray-500 dark:text-gray-400">
            Un lugar para almacenar y gestionar todos las obras de ocio que has visto.
          </p>
          <div className="text-center mt-6">
            <Link
              href="/auth/login"
              className="group relative inline-flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
        {/* Contenedor Características */}
        <div className="max-w-screen-lg mx-auto lg:mb-16">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Características del Proyecto
          </h3>
          <div className="mt-8 space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4">
                <i className="bi bi-collection-play-fill text-4xl text-blue-600 dark:text-blue-300"></i>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Almacena Información</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Almacena información de las obras de ocio vistos, número de capítulos y comentarios.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4">
                <i className="bi bi-check-circle-fill text-4xl text-blue-600 dark:text-blue-300"></i>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Marca las obras</h3>
              <p className="text-gray-500 dark:text-gray-400">Marca si has terminado de ver una obra o no.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4">
                <i className="bi bi-file-earmark-spreadsheet-fill text-4xl text-blue-600 dark:text-blue-300"></i>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Exportación e Importación</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Permite la exportación e importación de datos en formato CSV.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4">
                <i className="bi bi-palette-fill text-4xl text-blue-600 dark:text-blue-300"></i>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Temas Personalizables</h3>
              <p className="text-gray-500 dark:text-gray-400">29 temas para escoger el estilo que desees.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4">
                <i className="bi bi-shield-fill-check text-4xl text-blue-600 dark:text-blue-300"></i>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Seguridad</h3>
              <p className="text-gray-500 dark:text-gray-400">Seguridad basada en JWT.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4">
                <i className="bi bi-person-badge-fill text-4xl text-blue-600 dark:text-blue-300"></i>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Registros con UUID</h3>
              <p className="text-gray-500 dark:text-gray-400">Registros de usuarios con UUID para mayor seguridad.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
