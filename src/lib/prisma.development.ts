import { PrismaClient } from "@prisma/client";

export default function createDatabase() {
  console.log("sweet, a dev tree hooking up to", process.env.DATABASE_URL);
  const globalPrisma = globalThis as unknown as {
    prisma: PrismaClient;
  };
  if (!globalPrisma.prisma) {
    globalPrisma.prisma = new PrismaClient();
  }

  return globalPrisma.prisma;
}
