import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const wishlistClaim = z.object({
  email: z
    .string()
    .nonempty("E-postadress är obligatorisk")
    .email("Ogiltig e-postadress"),
});

export async function POST(
  req: NextRequest,
  { params: { item } }: { params: { item: string } },
) {
  const json = wishlistClaim.safeParse(await req.json());
  if (!json.success) {
    return NextResponse.json(json.error.errors, { status: 400 });
  }
  const inputs = json.data;
  try {
    await prisma().wishlistClaim.upsert({
      where: {
        email_wishlistId: {
          email: inputs.email,
          wishlistId: item,
        },
      },
      create: {
        email: inputs.email,
        wishlistId: item,
        amount: 0,
      },
      update: {
        deletedAt: null,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { "root.server": "Något gick fel" },
      { status: 500 },
    );
  }

  cookies().set(process.env.NEXT_PUBLIC_COOKIE_CODE, inputs.email, {
    expires: new Date("2023-10-25"),
    sameSite: "strict",
    path: "/",
  });
  return NextResponse.json(null, {
    status: 201,
  });
}

export async function DELETE(
  req: NextRequest,
  { params: { item } }: { params: { item: string } },
) {
  const email = req.cookies.get(process.env.NEXT_PUBLIC_COOKIE_CODE)?.value;
  if (!email) {
    return NextResponse.json({ email: "Ingen epost angiven" }, { status: 400 });
  }
  try {
    await prisma().wishlistClaim.update({
      where: {
        email_wishlistId: {
          email,
          wishlistId: item,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });
  } catch (e) {
    return NextResponse.json(
      { "root.server": "Något gick fel" },
      { status: 500 },
    );
  }
  return NextResponse.json(null, { status: 200 });
}
