INSERT INTO LITE.Material
FROM (
        SELECT DISTINCT ID_MATERIAL,
            CODIGOBR,
            DS_UNIDADE,
            DS_CLASSE,
            PDM,
            DS_MATERIAL,
            DISPONIVEL
        FROM MATERIAL
    );
insert into lite.pj
from (
        select cnpj,
            razao_social,
            co_municipio,
            no_municipio,
            sg_uf
        from (
                select *,
                    row_number() over (
                        partition by cnpj
                        order by razao_social
                    ) as rn
                from bps.pj
            )
        where rn = 1
    );
INSERT INTO lite.compra
SELECT ID_COMPRA,
    DT_COMPRA,
    MODALIDADE,
    COMPRA_JUDICIAL,
    RAZAO_SOCIAL,
    CNPJ,
    SG_UF
FROM (
        SELECT compra.ID_COMPRA,
            compra.DT_COMPRA,
            compra.MODALIDADE,
            compra.COMPRA_JUDICIAL,
            pj.RAZAO_SOCIAL,
            compra.CNPJ,
            compra.SG_UF,
            ROW_NUMBER() OVER (
                PARTITION BY compra.ID_COMPRA
                ORDER BY compra.ID_COMPRA
            ) as rn
        FROM compra
            JOIN bps.pj ON compra.cnpj = pj.cnpj
        WHERE compra.DT_COMPRA IS NOT NULL
    ) AS subquery
WHERE rn = 1;
INSERT INTO lite.ITEM
FROM (
        select ID_ITEM,
            ID_COMPRA,
            CODIGOBR,
            UNIDADE,
            REGISTRO_ANVISA,
            CNPJ_FORNECEDOR,
            CNPJ_FABRICANTE,
            QT_ITEM_COMPRA,
            VL_ITEM_COMPRA,
            ID_MATERIAL,
            ID_PRODUTO,
            from (
                SELECT ID_ITEM,
                    ID_COMPRA,
                    CODIGOBR,
                    UNIDADE,
                    REGISTRO_ANVISA,
                    CNPJ_FORNECEDOR,
                    CNPJ_FABRICANTE,
                    QT_ITEM_COMPRA,
                    VL_ITEM_COMPRA,
                    ID_MATERIAL,
                    ID_PRODUTO,
                    ROW_NUMBER() OVER (
                        PARTITION BY ID_COMPRA
                        ORDER BY VL_ITEM_COMPRA
                    ) as rn
                FROM bps.ITEM
                WHERE ID_compra IN (
                        SELECT id
                        FROM lite.compra
                    )
                    AND ID_PRODUTO IS NOT NULL
                    AND CNPJ_FABRICANTE IS NOT NULL
                    AND ID_MATERIAL IS NOT NULL
            ) AS subquery
        WHERE rn = 1
    );
INSERT INTO lite.PRODUTO
FROM (
        select *
        from produto
        where ID_PRODUTO in (
                select distinct produto_id
                from lite.ITEM
            )
    );