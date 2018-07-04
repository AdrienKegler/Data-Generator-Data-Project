const db = require('./db');


class DynamicDataGenerator {

    constructor() {
    };


    static async generateEightyTwenty() {

        let eighty = []; // percentage of sales
        let twenty = []; // percentage of sales

        let std80 = 0;
        let std20 = 0;
        let gel80 = 0;
        let gel20 = 0;


        let standardCandies = await db.mapQuery("SELECT C1.CANDYREFERENCEID\n" +
            "  FROM CANDYREFERENCE C1\n" +
            "    LEFT JOIN CANDYCOMBO C2 on C1.CANDYCOMBOID = C2.CANDYCOMBOID\n" +
            "    LEFT JOIN TASTELIST T on C2.TASTEID = T.TASTEID\n" +
            "WHERE T.TASTENAME NOT LIKE '%Gélifié%'");

        let gelCandies = await db.mapQuery("SELECT C1.CANDYREFERENCEID\n" +
            "  FROM CANDYREFERENCE C1\n" +
            "    LEFT JOIN CANDYCOMBO C2 on C1.CANDYCOMBOID = C2.CANDYCOMBOID\n" +
            "    LEFT JOIN TASTELIST T on C2.TASTEID = T.TASTEID\n" +
            "WHERE T.TASTENAME LIKE '%Gélifié%'");

        standardCandies.forEach(stdCndy => {
            if (Math.random() > 0.22) {
                twenty.push(stdCndy.candyreferenceid);
                std20++;
            }
            else {
                eighty.push(stdCndy.candyreferenceid);
                std80++;
            }
        });

        gelCandies.forEach(gelCndy => {
            if (Math.random() > 0.14) {
                twenty.push(gelCndy.candyreferenceid);
                gel20++;
            }
            else {
                eighty.push(gelCndy.candyreferenceid);
                gel80++;
            }
        });


        console.log("Standards :");
        console.log("20 : " + std20);
        console.log("80 : " + std80);
        console.log("Gelifiés :");
        console.log("20 : " + gel20);
        console.log("80 : " + gel80);


        console.log("Proportions :");
        console.log(Math.floor(twenty.length / 3888 * 10000) / 100 + "% de 20");
        console.log(Math.floor(eighty.length / 3888 * 10000) / 100 + "% de 80");
        console.log("20 : " + twenty.length + " items, " + twenty.length + "% de gelifés, " + Math.floor(std20 / twenty.length * 10000) / 100 + "% de standard, ");
        console.log("80 : " + eighty.length + " items, " + Math.floor(gel80 / eighty.length * 10000) / 100 + "% de gelifés, " + Math.floor(std80 / eighty.length * 10000) / 100 + "% de standard, ");

        return {twenty: twenty, eighty: eighty};
    }


    static async createOrder(referenceList) {


        let orderSize = Math.floor(Math.random() * 10);
        if (orderSize === 0) {
            return null;
        }
        else {
            let countryIdList = await db.execute("SELECT COUNTRYID FROM COUNTRY");
            let countryId = DynamicDataGenerator.selectRandomFromArray(countryIdList['rows'])[0];
            let lastOrder = await db.execute("SELECT CLIENTORDERTIME FROM (SELECT * FROM CLIENTORDER ORDER BY CLIENTORDERTIME DESC) WHERE ROWNUM = 1");
            lastOrder = lastOrder['rows'][0];
            if (lastOrder === undefined || lastOrder === null) {
                lastOrder = new Date('July 1, 2018 09:00:00');
            }

            let orderTime = new Date(lastOrder).setSeconds(new Date(lastOrder).getSeconds() + Math.floor(Math.random() * 90 + 180));

            await db.execute("INSERT INTO CLIENTORDER (CLIENTORDERTIME, COUNTRYID) VALUES (:time, '" + countryId + "')", {time: new Date(orderTime)});

            let orderId = await db.mapQuery("SELECT CLIENTORDERID FROM CLIENTORDER WHERE CLIENTORDERTIME =:time AND COUNTRYID = '" + countryId + "'", {time: new Date(orderTime)});

            orderId = orderId[0].clientorderid;

            for (let a = 0; a < orderSize; a++) {
                await DynamicDataGenerator.createOrderLine(referenceList, orderId);
            }

            await db.commit();
        }
        return null;
    }

    static async createOrderLine(referenceList, id) {
        let ref = null;

        if (Math.random() <= 0.20) {
            ref = DynamicDataGenerator.selectRandomFromArray(referenceList.eighty);
        } else {
            ref = DynamicDataGenerator.selectRandomFromArray(referenceList.twenty);
        }

        let qty = Math.floor(DynamicDataGenerator.limit(DynamicDataGenerator.gaussRand() * 10000, 260000));

        if (qty === 0) {
            return null;
        }
        else {
            db.execute("INSERT INTO ORDERLINE (CLIENTORDERID, CANDYREFERENCEID, ORDERLINEQUANTITY) VALUES (" + id + ", " + ref + ", " + qty + ")");
        }

    }


    static gaussRand() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    static limit(input, limitMax, limitMin = 0) {
        return Math.max(Math.min(input, limitMax), limitMin);
    }

    static selectRandomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

}

module.exports = DynamicDataGenerator;