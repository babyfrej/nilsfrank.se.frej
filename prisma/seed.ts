import { PrismaClient } from "@prisma/client";
import { ClaimType } from "../src/types/claim-type";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Start seeding ...");
    const event = await prisma.event.create({
      data: {
        details: {
          create: {
            name: "Välkomna till Frej's Födelsedagskalas",
            description: `Vi bjuder in till att fira ett år fyllt av glädje, skratt och kärlek. Frej har spridit så mycket lycka omkring sig under detta första magiska år, och vi kan knappt vänta med att dela den här speciella dagen tillsammans med er alla.
            Hjälp oss fira framsteg, första leenden, små steg och alla de stora stunderna som gör att vi känner oss så stolta som föräldrar.
            
            Så ta en ballong, njut av lite festligt fika och låt oss tillsammans skapa ännu fler värdefulla minnen att bevara för alltid.`,
            location: "Zenithgatan 52",
            osaAt: new Date("2023-09-17"),
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
              start: new Date("2024-10-14 11:00:00+00"),
              end: new Date("2024-10-14 15:00:00+00"),
              seats: 15,
            },
            {
              start: new Date("2024-10-14 15:00:00+00"),
              end: new Date("2024-10-14 18:00:00+00"),
              seats: 15,
            },
            {
              start: new Date("2024-10-15 11:00:00+00"),
              end: new Date("2024-10-15 15:00:00+00"),
              seats: 15,
            },
          ],
        },
        wishlist: {
          create: [
            {
              title: "Förvaringsmöbel",
              description: `Just nu ligger många av Frej&apos;s saker utspridda i hans rum, vilket gör det svårt för oss att låta honom vara där och leka på ett säkert sätt.
                Vi saknar bra utrymmen för hans saker och planerar att köpa en förvaringsmöbel för alla hans småsaker.

                Denna möbel kommer att vara till stor nytta under de kommande åren i att hjälpa Frej att hålla ordning i sitt rum.
                Det kommer även att bidra till en mer strukturerad och trivsam miljö för honom att växa upp i.`,
              image: "/montisory-shelf.webp",
              href: "https://lovevery.com/products/the-montessori-playshelf",
              claimType: ClaimType.PARTIAL,
              price: 4400,
              hero: true,
            },
            {
              title: "Säng",
              description: `Vi tycker det är dags att ge Frej en helt egen säng på sitt rum. En säng vi kan läsa godnattsagor, ta en tuplur, och som han kan sova i när han är redo för det.
              Vi har hittat en sängram som vi tycker är både fin och praktisk, och som vi tror kommer att passa perfekt i Frej&apos;s rum.`,
              image: "/bedframe.webp",
              claimType: ClaimType.PARTIAL,
              price: 3800,
              hero: true,
            },
            {
              title: "Böcker",
              description: `Frej älskar sina böcker väldigt mycket. Han är verkligen nyfiken på alla djuren vi läser om, fåglar, fiskar, och koalor, elefanter och giraffer.
              Han älskar att peka på alla bilder och lyssna på när vi läser för honom. Vill ni ge honom en bok så är det en gåva som vi vet kommer att uppskattas.
              Böcker vår planet, våra djur, och vår natur är fortfarande extra uppskattade.`,
              claimType: ClaimType.MULTIPLE,
            },
            {
              title: "Presentkort till kläder",
              description:
                "Med ett presentkort kan vi köpa lite kläder allt efter som behovet uppstår",
              claimType: ClaimType.MULTIPLE,
            },
            {
              title: "Sparande",
              description:
                "Vill du vara med och utöka Frej&apos;s sparkonto? Swisha valfritt belopp",
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
