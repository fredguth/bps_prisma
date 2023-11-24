CREATE VIEW "ItensCompra" AS
SELECT
    item.id AS "item_id",
    item.compra_id,
    compra.data AS "data",
    item.material_id,
    item.produto_id,
    item.anvisa,
    item.cnpj_fornecedor,
    item.cnpj_fabricante,
    PJFabricante.razao_social AS fabricante,
    PJFornecedor.razao_social AS fornecedor,
    item.qtd_item AS qtde,
    item.valor_item AS valor_unitario
FROM
    item
LEFT JOIN
    (SELECT cnpj, razao_social FROM PJ) AS PJFabricante
ON
    item.cnpj_fabricante = PJFabricante.cnpj
LEFT JOIN
    (SELECT cnpj, razao_social FROM PJ) AS PJFornecedor
ON
    item.cnpj_fornecedor = PJFornecedor.cnpj
LEFT JOIN
    (SELECT id, "data" FROM compra) AS compra
ON
    item.compra_id = compra.id;
