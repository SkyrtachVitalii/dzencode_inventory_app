-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serialNumber" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL,
    "photo" TEXT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "specification" TEXT NOT NULL,
    "guaranteeStart" DATETIME NOT NULL,
    "guaranteeEnd" DATETIME NOT NULL,
    "orderId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" REAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
