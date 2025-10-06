import { SlotForm } from "@/components/slot-form";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import * as css from "./page.css";
import { Dialog } from "@/components/dialog";

export default async function Page(props: PageProps<"/slot/booking/[id]">) {
  const { id } = await props.params;
  const email = (await cookies()).get(
    process.env.NEXT_PUBLIC_COOKIE_CODE,
  )?.value;
  const data = await prisma.eventSlot.findFirst({
    where: { id },
    select: {
      id: true,
      start: true,
      end: true,
      seats: true,
      guests: {
        where: { email: email ?? "", attending: { not: false } },
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
    return null;
  }

  const {
    guests: [guest],
    ...slot
  } = data;
  return (
    <Dialog className={css.dialog}>
      <SlotForm slot={slot} guest={{ email, ...guest }} />
    </Dialog>
  );
}
