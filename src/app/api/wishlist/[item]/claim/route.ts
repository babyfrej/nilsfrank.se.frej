import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const wishlistClaim = z.object({
  email: z
    .string()
    .min(1, "en e-postadress är obligatorisk")
    .email("Ogiltig e-postadress"),
});

export async function POST(
  req: NextRequest,
  { params }: RouteContext<"/api/wishlist/[item]/claim">,
) {
  const { item } = await params;
  const json = wishlistClaim.safeParse(await req.json());
  if (!json.success) {
    return NextResponse.json(json.error.errors, { status: 400 });
  }
  const inputs = json.data;
  try {
    await prisma.wishlistClaim.upsert({
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
    console.log(e);
    return NextResponse.json(
      { "root.server": "Något gick fel" },
      { status: 500 },
    );
  }

  (await cookies()).set(process.env.NEXT_PUBLIC_COOKIE_CODE, inputs.email, {
    expires: new Date("2024-10-25"),
    sameSite: "strict",
    path: "/",
  });

  revalidatePath("/");

  return NextResponse.json(null, {
    status: 201,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext<"/api/wishlist/[item]/claim">,
) {
  const { item } = await params;
  const email = req.cookies.get(process.env.NEXT_PUBLIC_COOKIE_CODE)?.value;
  if (!email) {
    return NextResponse.json({ email: "Ingen epost angiven" }, { status: 400 });
  }
  try {
    await prisma.wishlistClaim.update({
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
    console.log(e);
    return NextResponse.json(
      { "root.server": "Något gick fel" },
      { status: 500 },
    );
  }

  revalidatePath("/");

  return NextResponse.json(null, { status: 200 });
}
