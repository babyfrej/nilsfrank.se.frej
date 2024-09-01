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
            // hero items
            {
              title: "ClaimType(No, Hero)",
              description:
                "A Wishlist item that is highlighted above the rest of the wishlist for maximum exposure",
              image: "/images/bedframe.webp",
              claimType: ClaimType.NO,
              hero: true,
            },
            {
              title: "ClaimType(Full, Hero)",
              description:
                "A Wishlist item that is highlighted above the rest of the wishlist for maximum exposure",
              image: "/images/bedframe.webp",
              claimType: ClaimType.FULL,
              price: 100,
              hero: true,
            },
            {
              title: "ClaimType(Partial, Hero)",
              description:
                "A Wishlist item that is highlighted above the rest of the wishlist for maximum exposure",
              image: "/images/bedframe.webp",
              claimType: ClaimType.PARTIAL,
              price: 5,
              hero: true,
            },
            {
              title: "ClaimType(Multiple, Hero)",
              description:
                "A Wishlist item that is highlighted above the rest of the wishlist for maximum exposure",
              image: "/images/bedframe.webp",
              claimType: ClaimType.MULTIPLE,
              hero: true,
            },
            {
              title: "ClaimType(Donate , Hero)",
              description:
                "A Wishlist item that is highlighted above the rest of the wishlist for maximum exposure",
              image: "/images/bedframe.webp",
              claimType: ClaimType.DONATE,
              price: 5000,
              hero: true,
            },
            // wishlist items
            {
              title: "ClaimType(No)",
              description:
                "A wishlist item that is not claimable, i.e. open donation.",
              claimType: ClaimType.NO,
            },
            {
              title: "ClaimType(Full) claimable",
              description: "A wishlist item that is claimable by one only",
              claimType: ClaimType.FULL,
            },
            {
              title: "ClaimType(Full) not claimable",
              description: "A wishlist item that is claimable by one only",
              claimType: ClaimType.FULL,
              claims: {
                create: [{ email: "example@nilsfrank.se", amount: 0 }],
              },
            },
            {
              title: "ClaimType(Partial)",
              description:
                "a wishlist item that is claimable by people grouping up to buy it together",
              claimType: ClaimType.PARTIAL,
              price: 5,
            },
            {
              title: "ClaimType(Multiple) no claims",
              description:
                "a wishlist item that is claimable by multiple people, i.e. something unspecific like books",
              claimType: ClaimType.MULTIPLE,
            },
            {
              title: "ClaimType(Multiple) with claims",
              description:
                "a wishlist item that is claimable by multiple people, i.e. something unspecific like books",
              claimType: ClaimType.MULTIPLE,
              claims: {
                create: [
                  { email: "a@nilsfrank.se", amount: 0 },
                  { email: "b@nilsfrank.se", amount: 0 },
                  { email: "c@nilsfrank.se", amount: 0 },
                  { email: "d@nilsfrank.se", amount: 0 },
                ],
              },
            },
            {
              title: "ClaimType(Donate) no donations",
              description:
                "a wishlist item that is so big that people can pitch in with a bit of cash to the total pot",
              claimType: ClaimType.DONATE,
              price: 1,
            },
            {
              title: "ClaimType(Donate) has donations",
              description:
                "a wishlist item that is so big that people can pitch in with a bit of cash to the total pot",
              claimType: ClaimType.DONATE,
              price: 5000,
              claims: {
                create: [
                  {
                    email: "a@nilsfrank.se",
                    amount: 100,
                  },
                  {
                    email: "b@nilsfrank.se",
                    amount: 200,
                  },
                  {
                    email: "c@nilsfrank.se",
                    amount: 1000,
                  },
                  {
                    email: "d@nilsfrank.se",
                    amount: 10,
                  },
                ],
              },
            },
          ],
        },
      },
    });
    console.log("Seeding finished. New Event ID", event.id);
    console.log(
      `dotenvx set -f .env.development.local --plain EVENT_ID ${event.id}`,
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

await main();
