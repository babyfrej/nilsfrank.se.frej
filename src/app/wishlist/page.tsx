import { prisma } from "@/lib/prisma";

export default async function Wishlist() {
  const x = await prisma.wishlist.findMany({
    where: { event: { id: process.env.EVENT_ID } },
  });
  return (
    <div>
      <h1>Wishlist</h1>
      <p>Detta är en lista på saker som Frej önskar sig.</p>
      <div className="rounded-md bg-white/20 border border-solid border-white/40 p-4">
        {x.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <input
              type="checkbox"
              name={item.title}
              id={item.id}
              defaultChecked={!!item.claimedBy}
            />
            <label htmlFor={item.id}>Köpt</label>
          </div>
        ))}
      </div>
    </div>
  );
}
