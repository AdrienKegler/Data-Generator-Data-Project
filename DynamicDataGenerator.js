const db = require('./db');

var refDate = new Date('July 1, 2018 09:00:00');


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
            if (Math.random() > 0.28) {
                twenty.push(stdCndy.candyreferenceid);
                std20++;
            }
            else {
                eighty.push(stdCndy.candyreferenceid);
                std80++;
            }
        });

        gelCandies.forEach(gelCndy => {
            if (Math.random() > 0.05) {
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
        let orderSize = Math.floor(1 + Math.random() * 9);
        let countryIdList = await db.execute("SELECT COUNTRYID FROM COUNTRY");
        let countryId = DynamicDataGenerator.selectRandomFromArray(countryIdList['rows'])[0];
        let lastOrder = await db.execute("SELECT CLIENTORDERTIME FROM (SELECT * FROM CLIENTORDER ORDER BY CLIENTORDERTIME DESC) WHERE ROWNUM = 1");
        lastOrder = lastOrder['rows'][0];
        if (lastOrder === undefined || lastOrder === null) {
            lastOrder = refDate;
        }

        let orderTime = new Date(lastOrder).setSeconds(new Date(lastOrder).getSeconds() + Math.floor(Math.random() * 90 + 180));

        await db.execute("INSERT INTO CLIENTORDER (CLIENTORDERTIME, COUNTRYID) VALUES (:time, '" + countryId + "')", {time: new Date(orderTime)});
        await db.commit();

        let orderId = await db.mapQuery("SELECT CLIENTORDERID FROM CLIENTORDER WHERE CLIENTORDERTIME =:time AND COUNTRYID = '" + countryId + "'", {time: new Date(orderTime)});

        orderId = orderId[0].clientorderid;

        for (let a = 0; a < orderSize; a++) {
            await DynamicDataGenerator.createOrderLine(referenceList, orderId);
        }

        await db.commit();
        return orderId;
    }

    static async createOrderLine(referenceList, id) {
        let ref = null;

        if (Math.random() <= 0.80) {
            ref = DynamicDataGenerator.selectRandomFromArray(referenceList.eighty);
        } else {
            ref = DynamicDataGenerator.selectRandomFromArray(referenceList.twenty);
        }

        let qty = Math.abs(Math.floor(DynamicDataGenerator.limit(DynamicDataGenerator.gaussRand() * 10000, 260000)));

        if (qty === 0) {
            return null;
        }
        else {
            await db.execute("INSERT INTO ORDERLINE (CLIENTORDERID, CANDYREFERENCEID, ORDERLINEQUANTITY) VALUES (" + id + ", " + ref + ", " + qty + ")");
            await db.commit();
        }
    }

    static async processOrder(orderId) {

        let orderLines = await db.mapQuery("SELECT * FROM ORDERLINE WHERE CLIENTORDERID = " + orderId + "");

        orderLines.forEach(async line => {
            await DynamicDataGenerator.processOrderLine(orderId, line);
        });
    }


    static async processOrderLine(orderId, line) {

        let order = await db.mapQuery("SELECT * FROM CLIENTORDER WHERE CLIENTORDERID = " + orderId);
        order = order[0];


        let packaging = await db.mapQuery("SELECT PACKAGINGID FROM CANDYREFERENCE WHERE CANDYREFERENCEID = " + line.candyreferenceid);

        packaging = packaging[0].packagingid;

        let qtyPerPackaging = await db.mapQuery("SELECT PACKAGINGCANDYCAPACITY FROM PACKAGING WHERE PACKAGINGID = " + packaging);

        qtyPerPackaging = qtyPerPackaging[0].packagingcandycapacity;

        let candyQuantity = line.orderlinequantity * qtyPerPackaging;


        let articleLot = await DynamicDataGenerator.manufacture(line.candyreferenceid, candyQuantity, orderId);


        await DynamicDataGenerator.packageLot(articleLot, line.candyreferenceid, packaging, order);

    }


    static async manufacture(referenceId, quantity, orderid) {

        let taste = await db.mapQuery("SELECT c2.TASTEID  FROM CANDYREFERENCE c1 LEFT JOIN CANDYCOMBO c2 on c1.CANDYCOMBOID = c2.CANDYCOMBOID WHERE c1.CANDYREFERENCEID = " + referenceId);

        taste = taste[0].tasteid;

        let compatibleMachines = await db.mapQuery("SELECT MANUFACTURINGMACHINESETUP.MANUFACTURINGMACHINEID  FROM MANUFACTURINGMACHINESETUP LEFT JOIN MANUFACTURINGMACHINECONFIG M on MANUFACTURINGMACHINESETUP.MANUFACTURINGMACHINECONFIGID = M.MANUFACTURINGMACHINECONFIGID WHERE M.TASTEID = " + taste);

        let daRaytMachin = null;
        if (compatibleMachines.length > 1) {
            daRaytMachin = await DynamicDataGenerator.chooseMachine(compatibleMachines);
        }
        else {
            daRaytMachin = compatibleMachines[0].manufacturingmachineid;
        }

        let setup = await DynamicDataGenerator.setupMachine(taste, daRaytMachin);
        let config = await db.mapQuery("SELECT MANUFACTURINGMACHINECONFIGID FROM MANUFACTURINGMACHINESETUP WHERE MANUFACTURINGMACHINESETUPID = " + setup);
        config = config[0].manufacturingmachineconfigid;


        let x = await DynamicDataGenerator.getLastManufacturingSetupMaintenance(setup);
        let y = 0;

        if (x === null) {
            let orderTime = await db.mapQuery("SELECT CLIENTORDERTIME FROM CLIENTORDER WHERE CLIENTORDERID = " + orderid);
            x = orderTime[0].clientordertime;
        }
        else {
            y = await DynamicDataGenerator.getManufacturingSetupDelay(setup) * 60 * 1000;
        }

        let z = await DynamicDataGenerator.productionDuration(config, quantity) * 60 * 1000;

        let maintenanceDate = new Date(x.getTime() + y + z);

        await db.execute("INSERT INTO MANUFACTURINGMACHINEMAINTENANCE (MANUFACTURINGMACHINEMAINTENANCETIME, MANUFACTURINGMACHINESETUPID)\n" +
            "    VALUES ( :time , " + setup + ")", {time: new Date(new Date(maintenanceDate).setHours(maintenanceDate.getHours() + 2))});
        await db.commit();

        let candylotid = DynamicDataGenerator.getTimeBasedId();

        await db.execute("INSERT INTO CANDYLOT (CANDYLOTID, CANDYLOTCREATION, CANDYLOTVOLUME, CANDYCOMBOID, MANUFACTURINGMACHINESETUPID)\n" +
            "VALUES (" + candylotid + " , :time , " + quantity + ", (SELECT CANDYCOMBOID FROM CANDYREFERENCE WHERE CANDYREFERENCEID = " + referenceId + "), " + setup + ")",
            {time: new Date(maintenanceDate)});
        await db.commit();

        return candylotid;
    }


    static async packageLot(lotId, candyReferenceId, packagingId, order) {
        let lot = await db.mapQuery("SELECT * FROM CANDYLOT WHERE CANDYLOTID = " + lotId);
        lot = lot[0];
        let lotQuantity = lot.candylotvolume;

        let packaging = await db.mapQuery("SELECT * FROM PACKAGING WHERE PACKAGINGID = " + packagingId);
        packaging = packaging[0];
        let qtyPerPackaging = packaging.packagingcandycapacity;

        let packager = await DynamicDataGenerator.getFreePackager(packagingId);

        let packageQty = Math.floor(lotQuantity / qtyPerPackaging);

        let delayBetweenPackaging = 1 / packager.packagingmachinecandency * 60 * 1000;

        let shipmentType = await db.mapQuery("SELECT * FROM SHIPMENTTYPE " +
            "WHERE SHIPMENTTYPEAVAILABLE = 1 AND COUNTRYID =  '" + order.countryid + "'");
        shipmentType = shipmentType[0];
        let shipmentTypeId = shipmentType.shipmenttypeid;

        let transportType = await db.mapQuery("SELECT DISTINCT T.* " +
            "FROM TRANSPORTTYPE T " +
            "RIGHT JOIN SHIPMENTTYPE S2 on T.TRANSPORTTYPEID = S2.TRANSPORTTYPEID " +
            "WHERE S2.SHIPMENTTYPEAVAILABLE = 1 AND S2.TRANSPORTTYPEID = '" + shipmentType.transporttypeid + "'");
        transportType = transportType[0];


        let shippingId = DynamicDataGenerator.getTimeBasedId();
        let shippingSize = transportType.transporttypepalletmax;

        let cardBoxId = DynamicDataGenerator.getTimeBasedId();
        let cardBoxFilling = 1;
        let cardBoxCount = 1;

        let palletId = DynamicDataGenerator.getTimeBasedId();
        let palletCount = 1;
        let palletSize = transportType.transporttypepalletsize;

        let currentTime = lot.candylotcreation;


        await DynamicDataGenerator.createShipping(shippingId, new Date(currentTime), shipmentTypeId);
        await DynamicDataGenerator.createPallet(palletId, new Date(currentTime), shippingId, order.clientorderid);
        await DynamicDataGenerator.createCardboardBox(cardBoxId, new Date(currentTime), palletId);

        for (let b = 0; b < packageQty; b++) {
            if (cardBoxFilling > packaging.packagingmaxinbox) {
                cardBoxId = DynamicDataGenerator.getTimeBasedId();
                cardBoxCount++;
                if (cardBoxCount > palletSize) {
                    palletId = DynamicDataGenerator.getTimeBasedId();
                    palletCount++;
                    if (palletCount > shippingSize) {
                        shippingId = DynamicDataGenerator.getTimeBasedId();

                        await DynamicDataGenerator.createShipping(shippingId, new Date(currentTime), shipmentTypeId);
                        palletCount = 1;
                        palletCount++;
                    }
                    await DynamicDataGenerator.createPallet(palletId, new Date(currentTime), shippingId, order.clientorderid);
                    cardBoxCount = 1;
                }
                await DynamicDataGenerator.createCardboardBox(cardBoxId, new Date(currentTime), palletId);
                cardBoxFilling = 0;
            }

            let employeeid = Math.floor(Math.random() * 19) + 1;

            await db.execute("INSERT INTO ARTICLE (ARTICLECREATION, ARTICLEBOXING, CANDYLOTID, CANDYREFERENCEID, PACKAGINGMACHINEID, EMPLOYEEID, CARDBOARDBOXID) " +
                "VALUES ( :time, :boxtime, " + lotId + ", " + candyReferenceId + ", " + packager.packagingmachineid + ", " + employeeid + ", " + cardBoxId + ")",
                {
                    time: lot.candylotcreation,
                    boxtime: currentTime
                }
            );
            await db.commit();
            cardBoxFilling++;
            currentTime = new Date(currentTime.getTime() + b * delayBetweenPackaging);
        }


        await db.execute("INSERT INTO PACKAGINGMACHINEMAINTENANCE (PACKAGINGMACHINEMAINTENANCETIME, PACKAGINGMACHINEID) " +
            "VALUES (:time, " + packager.packagingmachineid + ")",
            {time: new Date(currentTime)});
        db.commit();
    }

    static async createShipping(id, timestamp, shipmentType) {
        await db.execute("INSERT INTO SHIPMENT (SHIPMENTID, SHIPPINGDEPARTURE, SHIPMENTTYPEID) " +
            "VALUES (" + id + ", :time, " + shipmentType + ")",
            {time: new Date(timestamp)});
        db.commit();
        return null;
    }

    static async createPallet(id, timestamp, father, orderId) {
        await db.execute("INSERT INTO PALLET (PALLETID, PALLETLOADTIME, SHIPMENTID, CLIENTORDERID) " +
            "VALUES (" + id + ", :time, " + father + ", " + orderId + " )",
            {time: new Date(timestamp)});
        db.commit();
        return null;
    }

    static async createCardboardBox(id, timestamp, father) {
        await db.execute("INSERT INTO CARDBOARDBOX (CARDBOARDBOXID, CARDBOARDBOXPALLETIZATION, PALLETID) \n" +
            "    VALUES (" + id + ", :time, " + father + ")", {time: new Date(timestamp)});
        db.commit();
        return null;
    }


    static async getFreePackager(packaging) {
        let bla = await db.mapQuery("SELECT * FROM PACKAGINGMACHINE WHERE PACKAGINGID = " + packaging);

        if (bla.length === 1) {
            return bla[0];
        }

        let hola = 0;

        let lowest = 99999999999999999999999999999999;

        bla.forEach(async machine => {

            let maintenance = await db.mapQuery("" +
                "SELECT * " +
                "FROM (" +
                "   SELECT * " +
                "   FROM PACKAGINGMACHINEMAINTENANCE " +
                "   WHERE PACKAGINGMACHINEID IN " +
                "                           (SELECT PACKAGINGMACHINEID F" +
                "                            FROM PACKAGINGMACHINE " +
                "                            WHERE PACKAGINGMACHINEID = " + packaging + ") " +
                "   ORDER BY PACKAGINGMACHINEMAINTENANCETIME DESC) " +
                "WHERE ROWNUM = 1");

            if (new Date(maintenance.packagingmachinemaintenancetime).getTime() + machine.packagingmachinedelay * 60 * 1000 < lowest) {
                lowest = new Date(maintenance.packagingmachinemaintenancetime).getTime() + machine.packagingmachinedelay * 60 * 1000;
                hola = machine;
            }
        });


        if (hola === 0) {
            return bla[0];
        }
        return hola;
    }


    static async chooseMachine(machineList) {

        let SoonestAvailibility = Infinity;
        let wantedMachine = machineList[0].manufacturingmachineid;
        machineList.forEach(async machine => {
            machine = machine.manufacturingmachineid;
            let localAvailibilityTime = await db.mapQuery("SELECT *\n" +
                "FROM MANUFACTURINGMACHINEMAINTENANCE M3\n" +
                "  LEFT JOIN MANUFACTURINGMACHINESETUP M on M3.MANUFACTURINGMACHINESETUPID = M.MANUFACTURINGMACHINESETUPID\n" +
                "  LEFT JOIN MANUFACTURINGMACHINECONFIG M2 on M.MANUFACTURINGMACHINECONFIGID = M2.MANUFACTURINGMACHINECONFIGID\n" +
                "WHERE M.MANUFACTURINGMACHINEID = " + machine + "\n" +
                "ORDER BY (M3.MANUFACTURINGMACHINEMAINTENANCETIME + M2.MANUFACTURINGMACHINECONFIGDELAY) DESC\n");


            if(localAvailibilityTime.length > 0){
                localAvailibilityTime = localAvailibilityTime[0].manufacturingmachinemaintenancetime;
                if (localAvailibilityTime != null && localAvailibilityTime.getTime() < SoonestAvailibility) {
                    SoonestAvailibility = localAvailibilityTime.getTime();
                    wantedMachine = machine.manufacturingmachineid;
                }
            }
            else {
                return machine.manufacturingmachineid;
            }
        });

        return wantedMachine;
    }


    static async productionDuration(config, quantity) {

        let time = await db.mapQuery("SELECT MANUFACTURINGMACHINECONFIGCADENCY FROM MANUFACTURINGMACHINECONFIG WHERE MANUFACTURINGMACHINECONFIGID = " + config);
        time = time[0].manufacturingmachineconfigcadency;
        return quantity / time;

    }

    static async getManufacturingSetupDelay(setupId) {
        let delay = await db.mapQuery("SELECT MANUFACTURINGMACHINECONFIGDELAY\n" +
            "  FROM MANUFACTURINGMACHINECONFIG\n" +
            "    LEFT JOIN MANUFACTURINGMACHINESETUP M on MANUFACTURINGMACHINECONFIG.MANUFACTURINGMACHINECONFIGID = M.MANUFACTURINGMACHINECONFIGID\n" +
            "WHERE M.MANUFACTURINGMACHINESETUPID = " + setupId);
        return delay[0].manufacturingmachineconfigdelay;
    }

    static async getLastManufacturingSetupMaintenance(setupId) {
        let time = await db.mapQuery("SELECT *\n" +
            "FROM (\n" +
            "  SELECT MANUFACTURINGMACHINEMAINTENANCETIME\n" +
            "  FROM MANUFACTURINGMACHINEMAINTENANCE\n" +
            "WHERE MANUFACTURINGMACHINESETUPID =" + setupId + "\n" +
            "ORDER BY MANUFACTURINGMACHINEMAINTENANCETIME DESC\n" +
            ")\n" +
            "WHERE ROWNUM = 1");

        if (time.length === 1) {
            return time[0].manufacturingmachinemaintenancetime;

        }
        else {
            return null;
        }
    }


    static async setupMachine(taste, machine) {

        let setup = await db.mapQuery("SELECT MANUFACTURINGMACHINESETUPID\n" +
            "  FROM MANUFACTURINGMACHINESETUP m1\n" +
            "    LEFT JOIN MANUFACTURINGMACHINECONFIG m2 on m1.MANUFACTURINGMACHINECONFIGID = m2.MANUFACTURINGMACHINECONFIGID\n" +
            "WHERE MANUFACTURINGMACHINEID = " + machine + "\n" +
            "AND m2.TASTEID = " + taste);

        setup = setup[0].manufacturingmachinesetupid;

        return setup;
    }

    static getTimeBasedId() {
        let val = new Date().getTime().toString();
        return parseInt(val.substr(val.length - 10));
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