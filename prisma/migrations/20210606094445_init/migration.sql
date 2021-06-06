/*
  Warnings:

  - The primary key for the `PriceLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductDescription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `PriceLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `ProductDescription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PriceLog" DROP CONSTRAINT "PriceLog_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "ProductDescription" DROP CONSTRAINT "ProductDescription_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductShop" ALTER COLUMN "url" SET DATA TYPE VARCHAR,
ALTER COLUMN "img" SET DATA TYPE VARCHAR;
