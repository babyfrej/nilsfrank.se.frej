import { Clock, Event, Location, Person } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import { Wishlist, WishlistHeader, WishlistHero } from "@/components/wishlist";
import prisma from "@/lib/prisma";
import { format } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const [event, hero, list] = await prisma.$transaction([
    prisma.event.findFirst({
      where: { id: process.env.EVENT_ID },
      select: {
        details: {
          select: {
            name: true,
            description: true,
            location: true,
            osaAt: true,
            contact: true,
          },
        },
        slots: {
          select: {
            id: true,
            start: true,
            end: true,
            seats: true,
            guests: {
              where: { attending: true },
              select: {
                adults: true,
                children: true,
              },
            },
          },
        },
      },
    }),
    prisma.wishlist.findMany({
      where: { eventId: process.env.EVENT_ID, hero: true },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        image: true,
        href: true,
        claimType: true,
        claims: {
          select: {
            amount: true,
            email: true,
          },
        },
      },
    }),
    prisma.wishlist.findMany({
      where: { eventId: process.env.EVENT_ID, hero: false },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        image: true,
        href: true,
        claimType: true,
        claims: {
          select: {
            amount: true,
            email: true,
          },
        },
      },
    }),
  ]);

  return (
    <main>
      <article>
        <section className="hero">
          <div className="hero-img">
            <Image
              src="/teddy_present_bg.webp"
              alt="illustration of a teddy bear sitting by a present"
              priority
              sizes="(max-width: 668px) 100vw, 668px"
              fill
            />
          </div>
          <div style={{ backgroundColor: "var(--bg-body)" }}>
            <h1 className="text align-center">{event?.details?.name}</h1>
            {event?.details?.description && (
              <Markdown content={event?.details?.description} />
            )}
          </div>
        </section>
        <section className="bg-secondary details">
          <div>
            <h2 className="media subheading text info">
              <Location />
              <span>Var</span>
            </h2>
            <h1>{event?.details?.location}</h1>
          </div>
          <div>
            <h2 className="media subheading text info">
              <Event />
              <span>När</span>
            </h2>
            <div className="slots">
              {event?.slots
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .map((slot) => (
                  <Link
                    key={slot.id}
                    href={`/slot/${slot.id}`}
                    className="slot-content text align-center primary"
                  >
                    <div className="slot-time">
                      <h2>{format(slot.start, "yyyy-MM-dd")}</h2>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          flexWrap: "nowrap",
                        }}
                        className="text"
                      >
                        <span className="media">
                          <Clock /> {format(slot.start, "HH:mm")} -{" "}
                          {format(slot.end, "HH:mm")}
                        </span>
                        <span className="media">
                          <Person />
                          {slot.guests.reduce(
                            (c, g) => c + g.adults + g.children,
                            0,
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="button slot-action text md">Välj tid</div>
                  </Link>
                ))}
            </div>
          </div>
          <div className="text md info">
            <p>
              p.g.a. platsbrist har vi behövt dela upp kalaset på två dagar. Vi
              hoppas att ni kan komma på en av dagarna. Om ni inte kan komma på
              någon av dagarna, eller om ni har några frågor, kontakta Niklas på{" "}
              <a href={`tel:${event?.details?.contact?.phone}`}>
                {event?.details?.contact?.phone}
              </a>
            </p>
          </div>
        </section>
        <section>
          <WishlistHeader>
            {Array.isArray(hero) &&
              hero.map((hero) => <WishlistHero key={hero.id} item={hero} />)}
            <p>Annars finns här lite inspirerande idéer</p>
            {Array.isArray(list) && <Wishlist list={list} />}
          </WishlistHeader>
        </section>
      </article>
    </main>
  );
}
