import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Start seeding ...");
    await prisma.event.create({
      data: {
        details: {
          create: {
            name: "Frej Födelsedags fest",
            description: "Frej fyller 1 år och vi firar med en fest",
            date: new Date("2023-10-09"),
            location: "Hemma hos oss",
            osaAt: new Date("2023-09-17"),
            contact: {
              create: {
                name: "Niklas",
                email: "niklas.frank@gmail.com",
                phone: "0722-133743",
                message: "Vid frågor kontakta Niklas på telefon",
              },
            },
          },
        },
        invitations: {
          create: [
            {
              code: 123,
              guests: {
                create: [
                  {
                    name: "Niklas",
                    isAdult: true,
                  },
                  {
                    name: "Therese",
                    isAdult: true,
                  },
                  {
                    name: "Frej",
                    isAdult: false,
                  },
                ],
              },
            },
            {
              code: 26,
              guests: {
                create: [
                  {
                    name: "Niklas",
                    isAdult: true,
                  },
                ],
              },
            },
            {
              code: 68,
              guests: {
                create: [
                  {
                    name: "Niklas",
                    isAdult: true,
                  },
                  {
                    name: "Therese",
                    isAdult: true,
                  },
                ],
              },
            },
            {
              code: 241,
              guests: {
                create: [
                  {
                    name: "Niklas",
                    isAdult: true,
                  },
                  {
                    name: "Therese",
                    isAdult: true,
                  },
                  {
                    name: "Frej",
                    isAdult: false,
                  },
                ],
              },
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
