-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Compra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "modalidade" TEXT NOT NULL,
    "judicial" INTEGER NOT NULL DEFAULT true,
    "instituicao" TEXT NOT NULL,
    "cnpj_instituicao" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);
INSERT INTO "new_Compra" ("cnpj_instituicao", "data", "id", "instituicao", "modalidade", "uf") SELECT "cnpj_instituicao", "data", "id", "instituicao", "modalidade", "uf" FROM "Compra";
DROP TABLE "Compra";
ALTER TABLE "new_Compra" RENAME TO "Compra";
CREATE UNIQUE INDEX "Compra_id_key" ON "Compra"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
