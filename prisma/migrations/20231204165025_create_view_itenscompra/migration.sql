CREATE VIEW 'ItensCompra' AS
SELECT
    item.id,
    compra.data,
    compra.cnpj_instituicao,
    PJIN.razao_social as instituicao,
    PJIN.municipio,
    PJIN.UF,
    compra.modalidade,
    compra.tipo,
    item.licitacao,
    item.material_id,
    item.cnpj_fornecedor,
    PJFO.razao_social as fornecedor,
    item.NF,
    item.cnpj_fabricante,
    PJFA.razao_social as fabricante,
    item.anvisa,
    item.qtde,
    item.unitario
FROM Item
LEFT JOIN Compra ON item.compra_id = compra.id
LEFT JOIN PJ AS PJIN ON cnpj_instituicao = PJIN.cnpj
LEFT JOIN PJ AS PJFO ON cnpj_fornecedor = PJFO.cnpj
LEFT JOIN PJ AS PJFA ON cnpj_fabricante = PJFA.cnpj
order by data desc