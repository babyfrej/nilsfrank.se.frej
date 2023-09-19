import { SlotForm } from "@/components/slot-form";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const email = cookies().get(process.env.NEXT_PUBLIC_COOKIE_CODE)?.value;
  const data = await prisma().eventSlot.findFirst({
    where: { id },
    select: {
      id: true,
      start: true,
      end: true,
      seats: true,
      guests: {
        where: { email: email ?? "" },
        select: {
          name: true,
          attending: true,
          adults: true,
          children: true,
          notes: true,
        },
      },
    },
  });

  if (!data) {
    redirect("/");
  }

  const {
    guests: [guest],
    ...slot
  } = data;

  return (
    <main>
      <article>
        <div
          style={{
            aspectRatio: "16/9",
            position: "relative",
            objectFit: "cover",
            marginBlockEnd: "2rem",
          }}
        >
          <Image
            src="/teddy_party.webp"
            alt="illsutration of a teddybear throwing a party"
            fill
            sizes="(max-width: 668px) 100vw, 668px"
            priority
          />
        </div>
        <section>
          <SlotForm slot={slot} guest={{ email, ...guest }} />
        </section>
      </article>
    </main>
  );
}
