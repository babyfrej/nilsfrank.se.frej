import type { PrismaClient } from "@prisma/client";
import createDevelopment from "./prisma.development";
import createProduction from "./prisma.production";

let prisma: PrismaClient = (() => {
  switch (process.env.APP_ENV) {
    case "development":
    case "test":
      return createDevelopment();
    case "production":
      return createProduction();
  }
})();

export default prisma;
