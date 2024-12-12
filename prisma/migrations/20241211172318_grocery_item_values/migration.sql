-- CreateEnum
CREATE TYPE "GroceryItemStatus" AS ENUM ('RANOUT', 'HAVE');

-- CreateTable
CREATE TABLE "GroceryItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "GroceryItemStatus" NOT NULL DEFAULT 'RANOUT',
    "priority" INTEGER DEFAULT 5,
    "quantity" INTEGER DEFAULT 0,
    "lastStatusChanged" TIMESTAMP(3),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "GroceryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_grocery_user_status" ON "GroceryItem"("userId", "status");

-- CreateIndex
CREATE INDEX "idx_grocery_priority_name" ON "GroceryItem"("priority", "name");