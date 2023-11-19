/*
  Warnings:

  - The primary key for the `Material` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CODIGOBR` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `DISPONIVEL` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `DS_CLASSE` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `DS_MATERIAL` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `DS_UNIDADE` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `ID_MATERIAL` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `PDM` on the `Material` table. All the data in the column will be lost.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CNPJ_FABRICANTE` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `CNPJ_FORNECEDOR` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `CODIGOBR` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `ID_COMPRA` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `ID_ITEM` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `ID_MATERIAL` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `ID_PRODUTO` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `QT_ITEM_COMPRA` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `REGISTRO_ANVISA` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `UNIDADE` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `VL_ITEM_COMPRA` on the `Item` table. All the data in the column will be lost.
  - Added the required column `classe` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigobr` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdm` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anvisa` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnpj_fabricante` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnpj_fornecedor` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigobr` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compra_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produto_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_item` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_item` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Compra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "modalidade" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "cnpj_instituicao" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj_fabricante" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "susbstancia" TEXT NOT NULL,
    "embalagem" TEXT NOT NULL,
    "codigobr" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "qtd_embalagem" INTEGER NOT NULL,
    "registro_anvisa" TEXT NOT NULL,
    "material_id" INTEGER NOT NULL,
    CONSTRAINT "Produto_cnpj_fabricante_fkey" FOREIGN KEY ("cnpj_fabricante") REFERENCES "PJ" ("cnpj") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Produto_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PJ" (
    "cnpj" TEXT NOT NULL PRIMARY KEY,
    "razao_social" TEXT NOT NULL,
    "ibge" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigobr" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "classe" TEXT NOT NULL,
    "pdm" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "disponivel" INTEGER NOT NULL DEFAULT true
);
DROP TABLE "Material";
ALTER TABLE "new_Material" RENAME TO "Material";
CREATE UNIQUE INDEX "Material_id_key" ON "Material"("id");
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compra_id" INTEGER NOT NULL,
    "codigobr" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "anvisa" TEXT NOT NULL,
    "cnpj_fornecedor" TEXT NOT NULL,
    "cnpj_fabricante" TEXT NOT NULL,
    "qtd_item" INTEGER NOT NULL,
    "valor_item" REAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    CONSTRAINT "Item_compra_id_fkey" FOREIGN KEY ("compra_id") REFERENCES "Compra" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_cnpj_fornecedor_fkey" FOREIGN KEY ("cnpj_fornecedor") REFERENCES "PJ" ("cnpj") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_cnpj_fabricante_fkey" FOREIGN KEY ("cnpj_fabricante") REFERENCES "PJ" ("cnpj") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Item_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Compra_id_key" ON "Compra"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_id_key" ON "Produto"("id");
