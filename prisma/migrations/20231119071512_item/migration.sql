-- CreateTable
CREATE TABLE "Item" (
    "ID_COMPRA" INTEGER NOT NULL,
    "ID_ITEM" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CODIGOBR" TEXT NOT NULL,
    "UNIDADE" TEXT NOT NULL,
    "REGISTRO_ANVISA" TEXT NOT NULL,
    "CNPJ_FORNECEDOR" TEXT NOT NULL,
    "CNPJ_FABRICANTE" TEXT NOT NULL,
    "QT_ITEM_COMPRA" INTEGER NOT NULL,
    "VL_ITEM_COMPRA" REAL NOT NULL,
    "ID_MATERIAL" TEXT NOT NULL,
    "ID_PRODUTO" TEXT NOT NULL
);
