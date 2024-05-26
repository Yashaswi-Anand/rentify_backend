-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('buyer', 'seller');

-- CreateEnum
CREATE TYPE "apartment_type" AS ENUM ('flat', 'house', 'room');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(191) NOT NULL,
    "last_name" VARCHAR(191) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'buyer',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "password" VARCHAR(191) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "nearby" TEXT NOT NULL,
    "apartment" "apartment_type" NOT NULL DEFAULT 'room',
    "no_of_bedroom" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "seller_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
