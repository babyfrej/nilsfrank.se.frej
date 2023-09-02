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
              sizes="(max-width: 668px) 100vw, 668px"
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
            <p>
              I år hade vi hoppas att ni vill hjälpa oss med att samla ihop lite
              pengar. Vi har flera saker som vi behöver införskaffa till Frej.
            </p>
            <p>
              Just nu ligger många av Frejs saker utspridda i hans rum, vilket
              gör det svårt för oss att låta honom på ett säkert sätt vara där
              och leka. Vi saknar förvaringsutrymmen för hans saker och planerar
              att köpa en förvaringsmöbel för alla hans småsaker. Denna möbel
              kommer att vara till stor nytta under de kommande åren och hjälpa
              Frej att hålla ordning. Det kommer även att bidra till en mer
              strukturerad och trivsam miljö för honom att växa upp i.
            </p>
            <div
              style={{
                position: "relative",
                width: "80%",
                marginInline: "auto",
                aspectRatio: "2 / 1",
                borderRadius: "32px",
                overflow: "hidden",
                borderBlockStart: "1px solid",
                borderBlockEnd: "none",
                borderInline: "1px solid",
                borderColor: "color-mix(in lab, var(--bg-body) 74%, white)",
                boxShadow: "0 0 12px rgba(0, 0, 0, 0.220)",
              }}
            >
              <Image
                src="/montisory-shelf.webp"
                alt="photo of a storage furniture for children"
                sizes="(max-width: 668px) 100vw, 668px"
                fill
                style={{ objectFit: "cover", borderRadius: "inherit" }}
              />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
