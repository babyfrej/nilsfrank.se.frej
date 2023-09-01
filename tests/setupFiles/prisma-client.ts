import { PrismaClient } from "@prisma/client";
import { type Mocked, beforeEach, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

import prisma from "@/lib/prisma";
vi.mock("@/lib/prisma", () => mockDeep(prisma));

beforeEach(() => {
  mockReset(prisma);
});

export const prismaMock = prisma as Mocked<PrismaClient>;
