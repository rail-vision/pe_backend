-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'VIEWER');

-- AlterTable
ALTER TABLE "People" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "attendancePercent" DOUBLE PRECISION,
ADD COLUMN     "bonus" DOUBLE PRECISION,
ADD COLUMN     "experienceYears" INTEGER,
ADD COLUMN     "performanceScore" DOUBLE PRECISION,
ADD COLUMN     "salary" DOUBLE PRECISION,
ADD COLUMN     "trainingHours" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'VIEWER',
    "department" TEXT NOT NULL DEFAULT 'general',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
