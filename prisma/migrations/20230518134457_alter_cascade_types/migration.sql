-- DropForeignKey
ALTER TABLE "Itens" DROP CONSTRAINT "Itens_listasId_fkey";

-- DropForeignKey
ALTER TABLE "Listas" DROP CONSTRAINT "Listas_usersId_fkey";

-- AddForeignKey
ALTER TABLE "Listas" ADD CONSTRAINT "Listas_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itens" ADD CONSTRAINT "Itens_listasId_fkey" FOREIGN KEY ("listasId") REFERENCES "Listas"("list_id") ON DELETE CASCADE ON UPDATE CASCADE;
