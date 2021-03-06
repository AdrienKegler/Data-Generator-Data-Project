SELECT C4.CLIENTORDERTIME, C2.CANDYNAME, C3.COLORNAME, T.TASTENAME, T2.TEXTURENAME, P.PACKAGINGNAME, O.ORDERLINEQUANTITY, C5.COUNTRYNAME
  FROM ORDERLINE O
    LEFT JOIN CANDYREFERENCE C on C.CANDYREFERENCEID = O.CANDYREFERENCEID
    LEFT JOIN PACKAGING P on C.PACKAGINGID = P.PACKAGINGID
    LEFT JOIN CANDYCOMBO C1 on C1.CANDYCOMBOID = C.CANDYCOMBOID
    LEFT JOIN CANDYLIST C2 on C1.CANDYID = C2.CANDYID
    LEFT JOIN COLORLIST C3 on C1.COLORID = C3.COLORID
    LEFT JOIN TASTELIST T on C1.TASTEID = T.TASTEID
    LEFT JOIN TEXTURELIST T2 on C1.TEXTUREID = T2.TEXTUREID
    LEFT JOIN CLIENTORDER C4 on O.CLIENTORDERID = C4.CLIENTORDERID
    LEFT JOIN COUNTRY C5 on C4.COUNTRYID = C5.COUNTRYID

ORDER BY CLIENTORDERTIME