import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/utils";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });
  const pathname = req.nextUrl.pathname;
  console.log("token middleware", token);

  // Permitir acceso a rutas de autenticación
  if (pathname.startsWith('/api/auth') || pathname === '/login' || pathname === '/') {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/signin/auth0', req.url));
  }

  const userRole = token.role as string;
  console.log("userRole middleware", userRole);
  // Definir rutas específicas para cada rol
  const roleRoutes: Record<string, string> = {
    aficionado: "/reservar_cancha",
    admin: "/panel_solicitudes",
    duenio: "/panel_negocio",
  };
  if(userRole){
    const allowedRoute = roleRoutes[userRole];

    if (allowedRoute && !pathname.startsWith(allowedRoute)) {
      return NextResponse.redirect(new URL(allowedRoute, req.url));
    }
  }else{
    return NextResponse.redirect(new URL('/api/auth/signin/auth0', req.url));
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/reservar_cancha",
    "/panel_solicitudes",
    "/panel_negocio",
    // "/((?!api/auth|_next/static|_next/image|favicon.ico|/|public).*)", no esta permitiendo cargar las imagenes de la home, toca corregir el comportamiento
  ],
};
