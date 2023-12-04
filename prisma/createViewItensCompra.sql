CREATE VIEW ITENSCOMPRA AS
(SELECT
    itens.id,
    compras.data,
    compras.cnpj_instituicao,
    PJIN.nome as instituicao,
    PJIN.municipio,
    PJIN.UF,
    compras.modalidade,
    compras.tipo,
    itens.licitacao,
    itens.materials_id,
    itens.cnpj_fornecedor,
    PJFO.nome as fornecedor,
    itens.NF,
    itens.cnpj_fabricante,
    PJFA.nome as fabricante,
    itens.anvisa,
    itens.qtde,
    itens.unitario
FROM itens
LEFT JOIN compras ON itens.compra_id = compras.id
LEFT JOIN PJ AS PJIN ON cnpj_instituicao = PJIN.cnpj
LEFT JOIN PJ AS PJFO ON cnpj_fornecedor = PJFO.cnpj
LEFT JOIN PJ AS PJFA ON cnpj_fabricante = PJFA.cnpj
order by data desc);