import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalPrisma = global as unknown as {
  prisma: PrismaClient;
};

let prisma: PrismaClient;
if (process.env.APP_ENV === "production") {
  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  });
  const adapter = new PrismaLibSQL(libsql);
  prisma = new PrismaClient({ adapter });
} else {
  if (!globalPrisma.prisma) {
    const libsql = createClient({
      url: process.env.DATABASE_URL,
    });
    const adapter = new PrismaLibSQL(libsql);
    globalPrisma.prisma = new PrismaClient({ adapter });
  }
  prisma = globalPrisma.prisma;
}

export default prisma;
