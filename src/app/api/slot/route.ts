import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const slotPost = z.object({
  reservationId: z.string().uuid({ message: "Invalid reservationId" }),
  email: z.string().email(),
  name: z.string(),
  notes: z.string().optional(),
  adults: z.coerce.number().int().min(1).default(1),
  children: z.coerce.number().int().min(0).default(0),
});

type SlotValues = z.infer<typeof slotPost>;
export async function POST(req: NextRequest) {
  const inputs = slotPost.safeParse(await req.json());
  if (!inputs.success) {
    console.log(inputs.error.errors);
    return NextResponse.json(inputs.error.errors, { status: 400 });
  }
  await prisma.guests.upsert({
    create: {
      attending: true,
      ...inputs.data,
    },
    update: {
      attending: true,
      ...inputs.data,
    },
    where: {
      email: inputs.data.email,
      reservationId: inputs.data.reservationId,
    },
  });

  revalidatePath("/");
  return NextResponse.json(inputs, {
    status: 201,
    headers: {
      "Set-Cookie": `${process.env.COOKIE_CODE}=${inputs.data.email}; Path=/; SameSite=Strict; Expires=Fri, 15 Oct 2023 00:00:00 GMT;`,
    },
  });
}

const slotDelete = z.object({
  reservationId: z.string().uuid({ message: "Invalid reservationId" }),
});
export async function DELETE(req: NextRequest) {
  const inputs = slotDelete.safeParse(await req.json());
  const email = req.cookies.get(process.env.COOKIE_CODE)?.value;
  if (!email || !inputs.success) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    await prisma.guests.delete({
      where: { email, reservationId: inputs.data.reservationId },
    });
  } catch (e) {
    return new Response("Något gick fel", {
      status: 400,
    });
  }
  revalidatePath("/");
  redirect("/");
}
