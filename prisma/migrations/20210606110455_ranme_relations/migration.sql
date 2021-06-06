/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductDescription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productDescriptionId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productDescriptionId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductDescription" DROP CONSTRAINT "ProductDescription_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productDescriptionId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ProductDescription" DROP COLUMN "productId";

-- CreateIndex
CREATE UNIQUE INDEX "Product_productDescriptionId_unique" ON "Product"("productDescriptionId");

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("productDescriptionId") REFERENCES "ProductDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
