import { ENV } from "@/lib/env";
import { prisma, Prisma } from "@/lib/prisma";
export default async function Wishlist() {
  const x = await prisma.wishlist.findMany({
    where: { event: { id: ENV.EVENT_ID } },
  });
  return (
    <div>
      <h1>Wishlist</h1>
      <p>Detta är en lista på saker som Frej önskar sig.</p>
      {x.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
