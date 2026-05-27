/*
  Warnings:

  - The primary key for the `DataAsset` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `data_id` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `data_type` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `data_status` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `data_redundancy` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `encryption_used` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `data_behind_firewall` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `data_owner` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `data_users` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `data_frequency_type` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `data_frequency_interval` on the `DataAsset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The primary key for the `Supplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `supplier_id` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `supplier_code` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `supplier_type` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `supplier_certifications` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `supplier_organisation_size` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `supplier_turnover_currency` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `supplier_headquarter_country` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `supplier_headquarter_city` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `supplier_pincode` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `supplier_email` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `supplier_country_code` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `supplier_telephone` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "DataAsset" DROP CONSTRAINT "DataAsset_pkey",
ALTER COLUMN "data_id" SET DEFAULT ('DAT-'::text || upper(SUBSTRING(md5((random())::text) FROM 1 FOR 8))),
ALTER COLUMN "data_id" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "data_type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "data_status" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "data_redundancy" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "encryption_used" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "data_behind_firewall" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "data_owner" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "data_users" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "data_frequency_type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "data_frequency_interval" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "data_start_date" SET DATA TYPE DATE,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6),
ADD CONSTRAINT "DataAsset_pkey" PRIMARY KEY ("data_id");

-- AlterTable
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_pkey",
ALTER COLUMN "supplier_id" SET DEFAULT ('SUP-'::text || upper(SUBSTRING(md5((random())::text) FROM 1 FOR 8))),
ALTER COLUMN "supplier_id" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "supplier_code" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "supplier_start_date" DROP NOT NULL,
ALTER COLUMN "supplier_start_date" SET DATA TYPE DATE,
ALTER COLUMN "supplier_type" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "supplier_certifications" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "supplier_organisation_size" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "supplier_turnover_currency" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "supplier_blacklisted" DROP NOT NULL,
ALTER COLUMN "supplier_blacklist_date" SET DATA TYPE DATE,
ALTER COLUMN "supplier_headquarter_country" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "supplier_headquarter_city" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "supplier_pincode" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "supplier_email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "supplier_country_code" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "supplier_telephone" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6),
ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id");
