/*
  Warnings:

  - You are about to drop the column `instituicao` on the `Compra` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `Compra` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Compra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "modalidade" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "cnpj_instituicao" TEXT NOT NULL
);
INSERT INTO "new_Compra" ("cnpj_instituicao", "data", "id", "modalidade", "tipo") SELECT "cnpj_instituicao", "data", "id", "modalidade", "tipo" FROM "Compra";
DROP TABLE "Compra";
ALTER TABLE "new_Compra" RENAME TO "Compra";
CREATE UNIQUE INDEX "Compra_id_key" ON "Compra"("id");
CREATE INDEX "Compra_data_idx" ON "Compra"("data");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
