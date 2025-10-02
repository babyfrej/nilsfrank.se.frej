import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const slotPost = z.object({
  reservationId: z.string().uuid({ message: "Invalid reservationId" }),
  email: z.string().email(),
  name: z.string(),
  notes: z.string().optional(),
  adults: z.coerce.number().int().min(1).default(1),
  children: z.coerce.number().int().min(0).default(0),
});

export async function POST(req: NextRequest) {
  const inputs = slotPost.safeParse(await req.json());
  if (!inputs.success) {
    return NextResponse.json(inputs.error.errors, { status: 400 });
  }
  try {
    const reservation = { ...inputs.data, attending: true };
    await prisma.guests.upsert({
      create: reservation,
      update: reservation,
      where: {
        email: inputs.data.email,
        reservationId: inputs.data.reservationId,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { "root.server": "Något gick fel" },
      { status: 500 },
    );
  }

  revalidatePath("/");
  cookies().set(process.env.NEXT_PUBLIC_COOKIE_CODE, inputs.data.email, {
    sameSite: "strict",
    path: "/",
  });
  return NextResponse.json(null, {
    status: 201,
  });
}

const slotDelete = z.object({
  reservationId: z.string().uuid({ message: "Invalid reservationId" }),
});
export async function DELETE(req: NextRequest) {
  const email = req.cookies.get(process.env.NEXT_PUBLIC_COOKIE_CODE)?.value;
  if (!email) {
    return NextResponse.json(
      { "root.server": "Något gick fel" },
      {
        status: 500,
      },
    );
  }
  const inputs = slotDelete.safeParse(await req.json());
  if (!inputs.success) {
    return NextResponse.json(inputs.error.errors, { status: 400 });
  }
  try {
    await prisma.guests.update({
      where: { email, reservationId: inputs.data.reservationId },
      data: { attending: false, deletedAt: new Date() },
    });
  } catch (e) {
    return NextResponse.json(
      { "root.server": "Något gick fel" },
      {
        status: 500,
      },
    );
  }
  revalidatePath("/");
  redirect("/");
}
