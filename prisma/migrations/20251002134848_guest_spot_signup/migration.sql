/*
  Warnings:

  - The primary key for the `Guests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guests" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "reservationId" TEXT NOT NULL,

    PRIMARY KEY ("email", "reservationId"),
    CONSTRAINT "Guests_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "EventSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guests" ("adults", "attending", "children", "createdAt", "deletedAt", "email", "name", "notes", "reservationId", "updatedAt") SELECT "adults", "attending", "children", "createdAt", "deletedAt", "email", "name", "notes", "reservationId", "updatedAt" FROM "Guests";
DROP TABLE "Guests";
ALTER TABLE "new_Guests" RENAME TO "Guests";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
