import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { paymentId: string } }
) {
  try {
    const reservation = await prisma.reservation.findFirst({
      where: { paymentId: params.paymentId },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching payment status" },
      { status: 500 }
    );
  }
}
