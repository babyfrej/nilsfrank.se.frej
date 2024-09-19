import { ClaimType } from "../src/types/claim-type";
import prisma from "@/lib/prisma";

async function main() {
  try {
    console.log("Start seeding ...");
    const event = await prisma.event.create({
      data: {
        details: {
          create: {
            name: "Birthday Party",
            description: `I dagens avsnitt följer vi med när Frej fyller två år och vi blickar tillbaka på ett år fyllt med stora framsteg och första händelser. Från första meningen till första hoppet`,
            location: "Linsbogatan 3, 23364 Bara",
            osaAt: new Date("2024-09-30"),
            contact: {
              create: {
                name: "Niklas",
                email: "niklas.frank@gmail.com",
                phone: "0738557855",
                message: "Vid frågor kontakta Niklas på telefon",
              },
            },
          },
        },
        slots: {
          create: [
            {
              start: new Date("2024-10-12 14:00:00+00"),
              end: new Date("2024-10-12 18:00:00+00"),
              seats: 100,
            },
            {
              start: new Date("2024-10-13 14:00:00+00"),
              end: new Date("2024-10-13 18:00:00+00"),
              seats: 100,
            },
          ],
        },
        wishlist: {
          create: [
            // hero items
            {
              title: "Vi önskar att ni skänker pengar till Frejs sparande",
              description:
                "Sparkontot har vuxit och mycket tack vare de pengar som gavs förra året. Vi önskar att man är med och skänker lite pengar i år igen. Det hjälper Frej oerhört mycket längre fram i livet",
              claimType: ClaimType.DONATE,
              hero: true,
            },
            {
              title: "10421 LEGO® DUPLO Alfabetslastbil",
              description:
                'Frej brinner just nu för allt på hjul--2 hjul, 4 hjul, 18 hjul, vit bil, svart bil, blå lastbil, eller gul buss, det spelar ingen roll--hjälp oss att fylla Frejs tomma "garage" med fordon från Duplo',
              image: "/images/duplo-10421.webp",
              href: "https://www.pricerunner.se/pl/72-3217279892/Leksaker/Lego-Duplo-Alphabet-Truck-10421-priser",
              claimType: ClaimType.FULL,
              hero: true,
            },
            {
              title: "10931 LEGO® DUPLO Lastbil och grävmaskin",
              image: "/images/duplo-10931.webp",
              href: "https://www.pricerunner.se/pl/72-5204604/Leksaker/Lego-Duplo-Truck-Tracked-Excavator-10931-priser",
              claimType: ClaimType.FULL,
              hero: true,
            },
            {
              title: "10988 LEGO® DUPLO Bussresan",
              image: "/images/duplo-10988.webp",
              href: "https://www.pricerunner.se/pl/72-3207676476/Leksaker/Lego-Duplo-The-Bus-Ride-10988-priser",
              claimType: ClaimType.FULL,
              hero: true,
            },
            {
              title: "Skogsskola - Flaska",
              description:
                "På måndagarna har Frej skogsskola och önskar sig en vattenflaska att packa i väskan",
              claimType: ClaimType.FULL,
              href: "https://sostrenegrene.com/se/produkter/hem/isolerad-flaska-350-ml-p-9607a184",
            },
            {
              title: "Skogsskola - Matlåda",
              description:
                "På måndagarna har Frej skogskola och önskar sig en matlåda att packa sin måltid i",
              claimType: ClaimType.FULL,
              href: "https://sostrenegrene.com/se/produkter/hem/isolerad-matburk-300-ml-p-dc60b8a2",
            },
            {
              title: "Bluey Badleksaker - Bluey",
              description:
                "Frej önskar göra sin badstund roligare med dessa underbara Bluey badleksakerna",
              href: "https://www.amazon.se/dp/B0CP3V434R",
              claimType: ClaimType.FULL,
            },
            {
              title: "Bluey Badleksaker - Bingo",
              description:
                "Frej önskar göra sin badstund roligare med dessa underbara Bluey badleksakerna",
              href: "https://www.amazon.se/dp/B0CP3V29YC",
              claimType: ClaimType.FULL,
            },
            {
              title: "BIG-Boby-car-trailern",
              description:
                "Släp till Frejs röda bil så han kan ta med sig sina viktiga saker på sina utfärder",
              claimType: ClaimType.FULL,
              href: "https://amzn.eu/d/dh47PPr",
            },
            {
              title: "Böcker",
              description:
                "Frej har börjat be om att läsa tillsammans, och vi har läst alla de fina blöckerna som vi fått. Fler böcker är välkomnande",
              claimType: ClaimType.NO,
            },
            {
              title: "Pussel",
              description: "",
              image: "/images/puzzle.webp",
              claimType: ClaimType.NO,
            },
          ],
        },
      },
    });
    console.log("Seeding finished. New Event ID", event.id);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

await main();
