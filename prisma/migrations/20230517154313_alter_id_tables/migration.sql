/*
  Warnings:

  - The primary key for the `Itens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Itens` table. All the data in the column will be lost.
  - The primary key for the `Listas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Listas` table. All the data in the column will be lost.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - The required column `itens_id` was added to the `Itens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `list_id` was added to the `Listas` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `user_id` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Itens" DROP CONSTRAINT "Itens_listasId_fkey";

-- DropForeignKey
ALTER TABLE "Listas" DROP CONSTRAINT "Listas_usersId_fkey";

-- AlterTable
ALTER TABLE "Itens" DROP CONSTRAINT "Itens_pkey",
DROP COLUMN "id",
ADD COLUMN     "itens_id" TEXT NOT NULL,
ADD CONSTRAINT "Itens_pkey" PRIMARY KEY ("itens_id");

-- AlterTable
ALTER TABLE "Listas" DROP CONSTRAINT "Listas_pkey",
DROP COLUMN "id",
ADD COLUMN     "list_id" TEXT NOT NULL,
ADD CONSTRAINT "Listas_pkey" PRIMARY KEY ("list_id");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "Listas" ADD CONSTRAINT "Listas_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itens" ADD CONSTRAINT "Itens_listasId_fkey" FOREIGN KEY ("listasId") REFERENCES "Listas"("list_id") ON DELETE SET NULL ON UPDATE CASCADE;
