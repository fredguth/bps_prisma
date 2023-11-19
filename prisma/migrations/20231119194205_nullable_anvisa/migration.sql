-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compra_id" INTEGER NOT NULL,
    "codigobr" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "anvisa" TEXT,
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
INSERT INTO "new_Item" ("anvisa", "cnpj_fabricante", "cnpj_fornecedor", "codigobr", "compra_id", "id", "material_id", "produto_id", "qtd_item", "unidade", "valor_item") SELECT "anvisa", "cnpj_fabricante", "cnpj_fornecedor", "codigobr", "compra_id", "id", "material_id", "produto_id", "qtd_item", "unidade", "valor_item" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
