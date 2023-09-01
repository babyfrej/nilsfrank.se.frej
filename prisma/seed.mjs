import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Start seeding ...");
    await prisma.event.create({
      data: {
        details: {
          create: {
            name: "Välkomna till Frej's Födelse­dags­kalas",
            description: `Vi bjuder in till att fira ett år fyllt av glädje, skratt och kärlek. Frej har spridit så mycket lycka omkring sig under detta första magiska år, och vi kan knappt vänta med att dela den här speciella dagen tillsammans med er alla. Hjälp oss fira framsteg, första leenden, små steg och alla de stora stunderna som gör att vi känner oss så stolta som föräldrar. Så ta en ballong, njut av lite festligt fika och låt oss tillsammans skapa ännu fler värdefulla minnen att bevara för alltid.`,
            location: "Zenithgatan 52",
            osaAt: new Date("2023-09-17"),
            contact: {
              create: {
                name: "Niklas",
                email: "niklas.frank@gmail.com",
                phone: "0722133743",
                message: "Vid frågor kontakta Niklas på telefon",
              },
            },
          },
        },
        slots: {
          create: [
            {
              start: new Date("2023-10-14 11:00:00+00"),
              end: new Date("2023-10-14 15:00:00+00"),
              seats: 15,
            },
            {
              start: new Date("2023-10-15 11:00:00+00"),
              end: new Date("2023-10-15 15:00:00+00"),
              seats: 15,
            },
          ],
        },
        wishlist: {
          create: [
            {
              title: "Lego",
              description: "Lego Technic",
              href: "https://www.lego.com/sv-se/themes/technic",
              image: "https://picsum.photos/200/300",
              price: 1_300,
              claimType: "PARTIAL",
            },
            {
              title: "Böcker",
              description: "Böcker om programmering",
              image: "https://picsum.photos/200/300",
              claimType: "MULTIPLE",
            },
            {
              title: "Kläder",
              description: "Kläder i storlek 86",
              image: "https://picsum.photos/200/300",
              claimType: "MULTIPLE",
            },
            {
              title: "Presentkort på Lindex",
              description:
                "Med ett presentkort kan vi köpa lite kläder efter behovet uppstår",
              image: "https://picsum.photos/200/300",
              claimType: "MULTIPLE",
            },
          ],
        },
      },
    });
    console.log("Seeding finished.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
