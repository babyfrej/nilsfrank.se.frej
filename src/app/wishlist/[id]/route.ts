import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  const data = await prisma.wishlist.findUnique({
    where: { id },
    select: {
      image: true,
      price: true,
      title: true,
      href: true,
    },
  });
  return NextResponse.json({ data });
}
