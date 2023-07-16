-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "osaAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "code" INTEGER NOT NULL,
    "lateEntry" BOOLEAN NOT NULL DEFAULT false,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Guests" (
    "name" TEXT NOT NULL,
    "invitationCode" INTEGER NOT NULL,
    "isAdult" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Guests_pkey" PRIMARY KEY ("invitationCode","name")
);

-- CreateTable
CREATE TABLE "Osa" (
    "code" INTEGER NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Osa_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "href" TEXT,
    "image" TEXT,
    "price" DECIMAL(65,30),
    "claimedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_code_key" ON "Invitation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Osa_code_key" ON "Osa"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_id_key" ON "Wishlist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_claimedBy_key" ON "Wishlist"("claimedBy");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_invitationCode_fkey" FOREIGN KEY ("invitationCode") REFERENCES "Invitation"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Osa" ADD CONSTRAINT "Osa_code_fkey" FOREIGN KEY ("code") REFERENCES "Invitation"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_claimedBy_fkey" FOREIGN KEY ("claimedBy") REFERENCES "Invitation"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_id_fkey" FOREIGN KEY ("id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
