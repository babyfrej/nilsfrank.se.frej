import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import z from "zod";

const codeSchema = z.preprocess(
  Number,
  z.number({
    required_error: "Saknar en inbjudan",
    invalid_type_error: "Inbjudan är inte giltig",
  }),
);
const schema = z.object({
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
    return NextResponse.error();
  }
  const data = schema.parse(await req.json());
  prisma.wishlistClaim.upsert({
    where: {
      wishlistId_invitationCode: {
        invitationCode: code.data,
        wishlistId: id,
      },
    },
    create: {
      wishlistId: id,
      invitationCode: code.data,
      amount: data.amount,
    },
    update: {
      amount: data.amount,
    },
  });
  return NextResponse.json({});
}
