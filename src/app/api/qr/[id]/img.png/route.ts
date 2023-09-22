import prisma from "@/lib/prisma";
import type { NextApiRequest } from "next";

export const revalidate = 60 * 60 * 24 * 7 * 365;
export async function GET(
  req: NextApiRequest,
  { params: { id } }: { params: { id: string } },
) {
  if (!id) {
    return new Response("Not found", { status: 404 });
  }
  const item = await prisma.wishlist.findFirst({
    where: { id: id },
    select: { title: true },
  });
  if (!item) {
    return new Response("Not found", { status: 404 });
  }

  const qr = await fetch("https://api.swish.nu/qr/v2/prefilled", {
    method: "post",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payee: "46722133743",
      amount: { value: 200, editable: true },
      size: 400,
      message: { value: item.title },
    }),
  });
  return new Response(await qr.blob(), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
