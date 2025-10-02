import { Clock, Event, Location, Person } from "@/components/icons";
import { Wishlist, WishlistHeader } from "@/components/wishlist";
import { WishlistHero } from "@/components/wishlist-hero-item";
import prisma from "@/lib/prisma";
import { format } from "@/utils/format";
import type { Viewport } from "next";
import Link from "next/link";
import {
  BlueyTitleCard,
  BlueyTitleCardDescription,
  BlueyTitleCardTitle,
} from "@/components/bluey/title-card";
import * as css from "./page.css";
import clsx from "clsx";
import { notFound } from "next/navigation";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "hsl(204, 95%, 91%)",
};

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

  if (!event) {
    return notFound();
  }

  return (
    <main>
      <article>
        {event.details?.name && (
          <section className={css.section}>
            <BlueyTitleCard>
              <BlueyTitleCardTitle>{event.details?.name}</BlueyTitleCardTitle>
              {event.details?.description && (
                <BlueyTitleCardDescription
                  description={event.details?.description}
                />
              )}
            </BlueyTitleCard>
          </section>
        )}
        <section className="bg-tertiary details">
          <div>
            <h2 className="media subheading text info">
              <Location />
              <span>Var</span>
            </h2>
            <h1>{event.details?.location}</h1>
          </div>
          <div>
            <h2 className="media subheading text info">
              <Event />
              <span>När</span>
            </h2>
            <div className="slots">
              {event.slots
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .map((slot) => (
                  <Link
                    key={slot.id}
                    href={`/slot/${slot.id}`}
                    className="slot-content text align-center primary"
                  >
                    <div className="slot-time">
                      <h2>{format(slot.start, "yyyy-MM-dd")}</h2>
                      <p className={clsx(css.timeslotParagraph, "text")}>
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
          {event.slots.length > 1 && (
            <div className="text md info">
              <p>
                p.g.a. platsbrist har vi behövt dela upp kalaset på två dagar.
                Vi hoppas att ni kan komma på en av dagarna. Om ni inte kan
                komma på någon av dagarna, eller om ni har några frågor,
                kontakta {event.details?.contact?.name} på{" "}
                <a href={`tel:${event.details?.contact?.phone}`}>
                  {event.details?.contact?.phone}
                </a>
              </p>
            </div>
          )}
        </section>
        {(isEmpty(list) || isEmpty(hero)) && (
          <section>
            <WishlistHeader>
              {hero.map((hero) => (
                <WishlistHero key={hero.id} item={hero} />
              ))}
              {Array.isArray(list) && Array.isArray(hero) && (
                <p>Annars finns här lite inspirerande idéer</p>
              )}
              {Array.isArray(list) && <Wishlist list={list} />}
            </WishlistHeader>
          </section>
        )}
      </article>
    </main>
  );
}

const isEmpty = (arr: unknown[]) => arr.length <= 0;
