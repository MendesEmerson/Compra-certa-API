-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "describle" TEXT NOT NULL,
    "itens_quantity" INTEGER NOT NULL,
    "usersId" TEXT,

    CONSTRAINT "Listas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itens" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sub_category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "listasId" TEXT,

    CONSTRAINT "Itens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Listas" ADD CONSTRAINT "Listas_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itens" ADD CONSTRAINT "Itens_listasId_fkey" FOREIGN KEY ("listasId") REFERENCES "Listas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
