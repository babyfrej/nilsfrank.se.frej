import prisma from "@/lib/prisma";
import { ClaimType } from "@/types/claim-type";
import type { NextRequest } from "next/server";

type SwishBodyRequest = {
  format: "jpg" | "png" | "svg";
  payee?: { value: string; editable: boolean };
  amount?: { value: number; editable: boolean };
  message?: { value: string; editable: boolean };
  size?: number;
  border?: number;
  transparent?: boolean;
};

const MESSAGE_ALLOWED_CHARS = /[^a-öA-Ö0-9?!() .,\-:;]/g;
const MESSAGE_MAX_LENGTH = 50;

export const revalidate = 60 * 60 * 24 * 365;

export async function generateStaticParams() {
  return prisma.wishlist.findMany({
    where: { claimType: ClaimType.DONATE, eventId: process.env.EVENT_ID },
    select: { id: true },
  });
}

export async function GET(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  if (!id) {
    return new Response("Not found", { status: 404 });
  }
  const [item, contact] = await prisma.$transaction([
    prisma.wishlist.findFirst({
      where: { id: id, eventId: process.env.EVENT_ID },
      select: { title: true, price: true },
    }),
    prisma.eventContact.findFirst({
      where: { event: { id: process.env.EVENT_ID } },
      select: { phone: true },
    }),
  ]);
  if (!item) {
    return new Response("Not found", { status: 404 });
  }
  if (!contact?.phone) {
    return new Response("Contact Not Found", { status: 500 });
  }

  const body = {
    format: "png",
    payee: {
      value: contact.phone,
      editable: false,
    },
    amount: {
      value: item.price ?? 200,
      editable: true,
    },
    message: {
      value: item.title
        .replaceAll(MESSAGE_ALLOWED_CHARS, "")
        .slice(0, MESSAGE_MAX_LENGTH),
      editable: false,
    },
    size: 400,
    border: 1,
  } satisfies SwishBodyRequest;

  const qr = await fetch(
    "https://mpc.getswish.net/qrg-swish/api/v1/prefilled",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  const res = await qr.blob();

  return new Response(res, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
