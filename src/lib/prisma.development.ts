import { PrismaClient } from "@prisma/client";

export default function createDatabase() {
  const globalPrisma = globalThis as unknown as {
    prisma: PrismaClient;
  };
  if (!globalPrisma.prisma) {
    globalPrisma.prisma = new PrismaClient();
  }

  return globalPrisma.prisma;
}
