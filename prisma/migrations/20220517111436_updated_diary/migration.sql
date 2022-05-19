/*
  Warnings:

  - You are about to drop the `AddNew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AddNew" DROP CONSTRAINT "AddNew_userId_fkey";

-- DropTable
DROP TABLE "AddNew";

-- CreateTable
CREATE TABLE "Diary" (
    "id" SERIAL NOT NULL,
    "mainDate" TIMESTAMP(3) NOT NULL,
    "plan" TEXT NOT NULL,
    "affirmation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
