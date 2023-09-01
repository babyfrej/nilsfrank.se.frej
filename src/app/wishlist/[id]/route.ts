import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import z from "zod";

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

const codeSchema = z
  .string({
    required_error: "Saknar en inbjudan",
    invalid_type_error: "Inbjudan är inte giltig",
  })
  .email();
const formFields = z.object({
  amount: z.preprocess(Number, z.number({ required_error: "Saknar belopp" })),
});

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const code = codeSchema.safeParse(
    req.cookies.get(process.env.COOKIE_CODE)?.value,
  );
  if (!code.success) {
    return NextResponse.json(code.error.errors, { status: 400 });
  }
  const data = formFields.parse(await req.json());
  await prisma.wishlistClaim.upsert({
    where: {
      email_wishlistId: {
        email: code.data,
        wishlistId: id,
      },
    },
    create: {
      wishlistId: id,
      email: code.data,
      amount: data.amount,
    },
    update: {
      amount: data.amount,
    },
  });
  return NextResponse.json({});
}
