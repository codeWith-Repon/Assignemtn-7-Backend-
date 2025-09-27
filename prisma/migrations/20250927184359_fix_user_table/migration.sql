-- AlterTable
ALTER TABLE "public"."Provider" ALTER COLUMN "provider" SET NOT NULL,
ALTER COLUMN "provider" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "password" DROP NOT NULL;
