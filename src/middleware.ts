import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/nextAuthConfig";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });
  const pathname = req.nextUrl.pathname;

  // Permitir acceso a rutas de autenticación
  if (
    pathname.startsWith("/api/auth") ||
    pathname === "/signin" ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  if (!token) {
    // Si no hay token, redirigir a signin con un parámetro de sesión expirada
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("sessionExpired", "true");
    return NextResponse.redirect(signInUrl);
  }

  const userRole = token.role as string;
  // Definir rutas específicas para cada rol
  const roleRoutes: Record<string, string | string[]> = {
    aficionado: ["/reservar_cancha", "/mis_reservas", "/club"],
    admin: "/panel_solicitudes",
    duenio: ["/panel_negocio", "/mis_canchas", "/reservas_negocio"],
  };

  if (userRole) {
    const allowedRoute = roleRoutes[userRole];

    if (allowedRoute) {
      const routes = Array.isArray(allowedRoute)
        ? allowedRoute
        : [allowedRoute];
      const isAllowedPath = routes.some((route) => pathname.startsWith(route));

      if (!isAllowedPath) {
        // Si no está en una ruta permitida, redirigir a la primera ruta del rol
        return NextResponse.redirect(
          new URL(
            Array.isArray(allowedRoute) ? allowedRoute[0] : allowedRoute,
            req.url
          )
        );
      }
    }
  } else {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/reservar_cancha",
    "/panel_solicitudes",
    "/panel_negocio",
    "/mis_canchas",
    "/reservas_negocio",
    "/mis_reservas",
    "/panel_comisiones",
    // "/((?!api/auth|_next/static|_next/image|favicon.ico|/|public).*)", no esta permitiendo cargar las imagenes de la home, toca corregir el comportamiento
  ],
};
