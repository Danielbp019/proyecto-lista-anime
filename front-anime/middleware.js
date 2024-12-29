// middleware.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  // Obtener las cookies de la solicitud
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token"); // Obtener el token de la cookie

  // Si no hay token y el usuario intenta acceder a la página de dashboard
  if (!authToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    // Redirigir al login si el usuario no está autenticado
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url); // Redirigir al login
  }

  // Si el usuario tiene el token o no está intentando acceder a /dashboard
  return NextResponse.next(); // Continuar con la solicitud
}

// Configuración del middleware
export const config = {
  // Usar un patrón simple para coincidir con rutas dentro de "/dashboard"
  matcher: ["/dashboard/:path*"], // Esto cubre todas las rutas dentro de /dashboard
};
