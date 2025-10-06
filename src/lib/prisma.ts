import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import assert from "assert";
import "server-only";

const globalPrisma = global as unknown as {
  prisma: PrismaClient;
};

let prisma: PrismaClient;

if (process.env.APP_ENV === "production") {
  assert(process.env.DATABASE_AUTH_TOKEN, "missing auth token");
  const libsql = createClient({
    url: `${process.env.DATABASE_URL}`,
    authToken: `${process.env.DATABASE_AUTH_TOKEN}`,
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
