import { PrismaClient } from "@prisma/client";
import { cache } from "react";

export const prisma = cache(() => new PrismaClient());

export default prisma;
