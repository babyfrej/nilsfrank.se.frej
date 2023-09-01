// import { prisma } from "@/lib/prisma";

import { Wishlist } from "@/components/wishlist";
import prisma from "@/lib/prisma";

export default async function WishlistPage() {
  const list = await prisma.wishlist.findMany({
    where: { event: { id: process.env.EVENT_ID } },
    select: {
      id: true,
      title: true,
      description: true,
      claimType: true,
      href: true,
      image: true,
      price: true,
    },
  });
  return (
    <div>
      <h1>Wishlist</h1>
      <p>Detta är en lista på saker som Frej önskar sig.</p>
      <div className="rounded-md bg-white/20 border border-solid border-white/40 p-4">
        <Wishlist list={list} />
      </div>
    </div>
  );
}
