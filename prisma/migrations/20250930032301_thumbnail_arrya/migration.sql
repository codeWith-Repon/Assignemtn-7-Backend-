/*
  Warnings:

  - The `thumbnail` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnail" TEXT[];
