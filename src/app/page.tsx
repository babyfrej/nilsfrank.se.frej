"use server";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { Clock, Event, Location, Person } from "@/components/icons";

export default async function Page() {
  const event = await prisma.event.findFirst({
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
  });
  return (
    <main>
      <article>
        <section className="hero">
          <div className="hero-img">
            <Image
              src="/teddy_present_bg.png"
              alt="illustration of a teddy bear sitting by a present"
              priority
              fill
            />
          </div>
          <div
            className="wrapper"
            style={{ backgroundColor: "var(--bg-body)" }}
          >
            <h1 className="text align-center">{event?.details?.name}</h1>
            <p>{event?.details?.description}</p>
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
                          )}{" "}
                          / {slot.seats}
                        </span>
                      </p>
                    </div>
                    <div className="slot-action text md">Välj tid</div>
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
          <h2>Frej&apos;s Önskelista</h2>
          <div>
            Vi önskar att ni hjälper oss att samla ihop pengar till en
            förvaringsmöbel till Frej&apos;s leksaker. Detta är något som vi
            kommer att ha nytta av under många år framöver, och som kommer att
            göra det enklare för Frej att hålla ordning, också bidra till en mer
            strukturerad och rolig miljö för honom att växa upp.
          </div>
        </section>
      </article>
    </main>
  );
}
