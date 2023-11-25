CREATE VIEW "ItensCompra" AS
SELECT
    item.id AS "item_id",
    item.compra_id,
    compra.data AS "data",
    compra.cnpj_instituicao,
    compra.instituicao,
    compra.uf AS "uf",
    item.material_id,
    item.produto_id,
    item.anvisa,
    produto.nome as produto,
    item.cnpj_fornecedor,
    item.cnpj_fabricante,
    PJFabricante.razao_social AS fabricante,
    PJFornecedor.razao_social AS fornecedor,
    item.qtd_item AS qtde,
    item.valor_item AS valor_unitario
FROM
    item
LEFT JOIN
    PJ AS PJFabricante
ON
    item.cnpj_fabricante = PJFabricante.cnpj
LEFT JOIN
    PJ AS PJFornecedor
ON
    item.cnpj_fornecedor = PJFornecedor.cnpj
LEFT JOIN
    compra
ON
    item.compra_id = compra.id
LEFT JOIN
    produto
ON
    item.produto_id = produto.id;
