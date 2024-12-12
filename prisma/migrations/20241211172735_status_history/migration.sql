-- CreateTable
CREATE TABLE "StatusHistory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "groceryItemId" TEXT NOT NULL,
    "status" "GroceryItemStatus" NOT NULL DEFAULT 'RANOUT',
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusHistory_pkey" PRIMARY KEY ("id")
);