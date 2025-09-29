/*
  Warnings:

  - You are about to drop the column `technology` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "technology",
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "technologies" TEXT[];
