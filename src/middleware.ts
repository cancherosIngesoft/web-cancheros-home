import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/utils";

export async function middleware(req: NextRequest) {
	const session = await getToken({ req, secret: authOptions.secret })

	if (!session && req.nextUrl.pathname.startsWith("/reservar_cancha")) {
		return NextResponse.redirect(new URL('/api/auth/signin/auth0', req.url));
	}

}
export const config = {
	matcher: ["/api/:path*", "/reservar_cancha"]
}