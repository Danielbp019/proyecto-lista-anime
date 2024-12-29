// (pages)/dashboard/page.jsx

import DashboardLayout from "@/app/layouts/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Escritorio</h1>
        <p>Aquí podrás gestionar todas las funcionalidades de la aplicación.</p>
      </div>
    </DashboardLayout>
  );
}
