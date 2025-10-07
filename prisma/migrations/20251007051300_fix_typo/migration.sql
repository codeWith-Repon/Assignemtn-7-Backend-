/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnails" TEXT[];
