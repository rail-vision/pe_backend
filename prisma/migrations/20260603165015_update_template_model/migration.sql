/*
  Warnings:

  - You are about to drop the column `name` on the `Template` table. All the data in the column will be lost.
  - Added the required column `fields` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateName` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "name",
ADD COLUMN     "fields" JSONB NOT NULL,
ADD COLUMN     "templateName" TEXT NOT NULL;
