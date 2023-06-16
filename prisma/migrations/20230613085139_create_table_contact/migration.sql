/*
  Warnings:

  - Made the column `phone` on table `Contact` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `Contact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
