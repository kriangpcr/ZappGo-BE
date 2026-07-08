/*
  Warnings:

  - Added the required column `bucket` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Made the column `public_url` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "bucket" TEXT NOT NULL,
ALTER COLUMN "public_url" SET NOT NULL;
