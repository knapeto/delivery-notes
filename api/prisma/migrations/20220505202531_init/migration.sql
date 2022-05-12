-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tokenSalt" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAd" BOOLEAN NOT NULL,
    "presetPassword" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
