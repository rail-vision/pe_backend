-- CreateEnum
CREATE TYPE "PersonStatus" AS ENUM ('FULL_TIME', 'PART_TIME');

-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('ACTIVE', 'NON_ACTIVE');

-- CreateEnum
CREATE TYPE "WorkPeriod" AS ENUM ('DAY_ONLY', 'NIGHT_ONLY', 'FLEXIBLE');

-- CreateTable
CREATE TABLE "People" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "employeeCode" TEXT,
    "personName" TEXT NOT NULL,
    "personStatus" "PersonStatus" NOT NULL,
    "designation" TEXT NOT NULL,
    "designationDescription" TEXT,
    "workStatus" "WorkStatus" NOT NULL,
    "personAddress" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "functionalUnit" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "workEmail" TEXT NOT NULL,
    "personalEmail" TEXT,
    "workPhone" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "workPeriod" "WorkPeriod" NOT NULL,
    "driversLicense" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "People_personId_key" ON "People"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "People_workEmail_key" ON "People"("workEmail");
