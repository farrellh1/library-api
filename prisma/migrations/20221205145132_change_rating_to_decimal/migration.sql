/*
  Warnings:

  - You are about to alter the column `rating` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(65,30);
