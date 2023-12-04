-- CreateTable
CREATE TABLE "Compra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "modalidade" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "cnpj_instituicao" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compra_id" INTEGER NOT NULL,
    "anvisa" TEXT,
    "cnpj_fornecedor" TEXT NOT NULL,
    "cnpj_fabricante" TEXT NOT NULL,
    "qtde" BIGINT NOT NULL,
    "unitario" REAL NOT NULL,
    "licitacao" TEXT,
    "NF" TEXT,
    "material_id" INTEGER NOT NULL,
    CONSTRAINT "Item_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_cnpj_fabricante_fkey" FOREIGN KEY ("cnpj_fabricante") REFERENCES "PJ" ("cnpj") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_cnpj_fornecedor_fkey" FOREIGN KEY ("cnpj_fornecedor") REFERENCES "PJ" ("cnpj") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_compra_id_fkey" FOREIGN KEY ("compra_id") REFERENCES "Compra" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PJ" (
    "cnpj" TEXT NOT NULL PRIMARY KEY,
    "razao_social" TEXT NOT NULL,
    "municipio" TEXT,
    "uf" TEXT
);

-- CreateTable
CREATE TABLE "Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigobr" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "classe" TEXT NOT NULL,
    "pdm" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "disponivel" INTEGER NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "phone" TEXT
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OauthAccount" (
    "providerId" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("providerId", "providerUserId"),
    CONSTRAINT "OauthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Compra_id_key" ON "Compra"("id");

-- CreateIndex
CREATE INDEX "Compra_data_idx" ON "Compra"("data");

-- CreateIndex
CREATE INDEX "Item_material_id_idx" ON "Item"("material_id");

-- CreateIndex
CREATE UNIQUE INDEX "Material_id_key" ON "Material"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
