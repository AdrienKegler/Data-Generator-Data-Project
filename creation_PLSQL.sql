--------------------------------------------------------------
-- Table: CandyList
--------------------------------------------------------------

CREATE TABLE CandyList (
  CandyId                Number(10) NOT NULL,
  CandyName              Char(64)   NOT NULL,
  CandyManifacturingCost Number(10) NOT NULL,
  CandyConditionningCost Number(10) NOT NULL,
  CandyShipmentCost      Number(10) NOT NULL,
  CandyOverheadCost      Number(10) NOT NULL
  ,
  CONSTRAINT PK_CandyList PRIMARY KEY (CandyId)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE CandyList_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER CandyList_seq_tr
  BEFORE INSERT
  ON CandyList
  FOR EACH ROW
  WHEN (NEW.CandyId IS NULL)
  BEGIN
    SELECT CandyList_seq.NEXTVAL
    INTO :NEW.CandyId
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: ColorList
--------------------------------------------------------------

CREATE TABLE ColorList (
  ColorID   Number(10) NOT NULL,
  ColorName Char(64)   NOT NULL
  ,
  CONSTRAINT PK_ColorList PRIMARY KEY (ColorID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE ColorList_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER ColorList_seq_tr
  BEFORE INSERT
  ON ColorList
  FOR EACH ROW
  WHEN (NEW.ColorID IS NULL)
  BEGIN
    SELECT ColorList_seq.NEXTVAL
    INTO :NEW.ColorID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: TextureList
--------------------------------------------------------------

CREATE TABLE TextureList (
  TextureID   Number(10) NOT NULL,
  TextureName Char(64)   NOT NULL
  ,
  CONSTRAINT PK_TextureList PRIMARY KEY (TextureID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE TextureList_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER TextureList_seq_tr
  BEFORE INSERT
  ON TextureList
  FOR EACH ROW
  WHEN (NEW.TextureID IS NULL)
  BEGIN
    SELECT TextureList_seq.NEXTVAL
    INTO :NEW.TextureID
    FROM DUAL;
  END;
/




--------------------------------------------------------------
-- Table: TasteList
--------------------------------------------------------------

CREATE TABLE TasteList (
  TasteID   Number(10) NOT NULL,
  TasteName Char(64)   NOT NULL
  ,
  CONSTRAINT PK_TasteList PRIMARY KEY (TasteID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE TasteList_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER TasteList_seq_tr
  BEFORE INSERT
  ON TasteList
  FOR EACH ROW
  WHEN (NEW.TasteID IS NULL)
  BEGIN
    SELECT TasteList_seq.NEXTVAL
    INTO :NEW.TasteID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: CandyCombo
-- modifs :  CandyReferenceID -> CandyComboID
--------------------------------------------------------------

CREATE TABLE CandyCombo (
  CandyComboID Number(10) NOT NULL,
  CandyId      Number(10) NOT NULL,
  ColorID      Number(10) NOT NULL,
  TasteID      Number(10) NOT NULL,
  TextureID    Number(10) NOT NULL
  ,
  CONSTRAINT PK_CandyCombo PRIMARY KEY (CandyComboID)

  ,
  CONSTRAINT FK_CandyCombo_CandyList FOREIGN KEY (CandyId) REFERENCES CandyList (CandyId)
  ,
  CONSTRAINT FK_CandyCombo_ColorList0 FOREIGN KEY (ColorID) REFERENCES ColorList (ColorID)
  ,
  CONSTRAINT FK_CandyCombo_TasteList1 FOREIGN KEY (TasteID) REFERENCES TasteList (TasteID)
  ,
  CONSTRAINT FK_CandyCombo_TextureList2 FOREIGN KEY (TextureID) REFERENCES TextureList (TextureID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE CandyCombo_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER CandyCombo_seq_tr
  BEFORE INSERT
  ON CandyCombo
  FOR EACH ROW
  WHEN (NEW.CandyComboID IS NULL)
  BEGIN
    SELECT CandyCombo_seq.NEXTVAL
    INTO :NEW.CandyComboID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: Packaging
--------------------------------------------------------------

CREATE TABLE Packaging (
  PackagingID            Number(10) NOT NULL,
  PackagingName          Char(64)   NOT NULL,
  PackagingMaxInBox      Number(10) NOT NULL,
  PackagingCandyCapacity Number(10) NOT NULL
  ,
  CONSTRAINT PK_Packaging PRIMARY KEY (PackagingID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE Packaging_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER Packaging_seq_tr
  BEFORE INSERT
  ON Packaging
  FOR EACH ROW
  WHEN (NEW.PackagingID IS NULL)
  BEGIN
    SELECT Packaging_seq.NEXTVAL
    INTO :NEW.PackagingID
    FROM DUAL;
  END;
/




--------------------------------------------------------------
-- Table: CostByPackaging
-- mofid
-- ++ PackagingID as FrK
--------------------------------------------------------------

CREATE TABLE CostByPackaging (
  CostByPackagingID   Number(10)    NOT NULL,
  CostByPackagingCost Number(10, 0) NOT NULL,
  CandyId             Number(10)    NOT NULL,
  PackagingID         Number(10)    NOT NULL
  ,
  CONSTRAINT PK_CostByPackaging PRIMARY KEY (CostByPackagingID)

  ,
  CONSTRAINT FK_CostByPackaging_CandyList FOREIGN KEY (CandyId) REFERENCES CandyList (CandyId)
  ,
  CONSTRAINT FK_CostByPackaging_Packaging FOREIGN KEY (PackagingID) REFERENCES Packaging (PackagingID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE CostByPackaging_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER CostByPackaging_seq_tr
  BEFORE INSERT
  ON CostByPackaging
  FOR EACH ROW
  WHEN (NEW.CostByPackagingID IS NULL)
  BEGIN
    SELECT CostByPackaging_seq.NEXTVAL
    INTO :NEW.CostByPackagingID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: Ingredient
--------------------------------------------------------------

CREATE TABLE Ingredient (
  IngredientID         Number(10) NOT NULL,
  IngredientName       Char(64)   NOT NULL,
  IngredientStock      Number(10) NOT NULL,
  IngredientPalletSize Number(10) NOT NULL,
  IngredientPacketSize Number(10) NOT NULL
  ,
  CONSTRAINT PK_Ingredient PRIMARY KEY (IngredientID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE Ingredient_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER Ingredient_seq_tr
  BEFORE INSERT
  ON Ingredient
  FOR EACH ROW
  WHEN (NEW.IngredientID IS NULL)
  BEGIN
    SELECT Ingredient_seq.NEXTVAL
    INTO :NEW.IngredientID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: IngredientPurchasing
--------------------------------------------------------------

CREATE TABLE IngredientPurchasing (
  IngredientPurchasingID       Number(10) NOT NULL,
  IngredientPurchasingQuantity Number(10) NOT NULL,
  IngredientID                 Number(10) NOT NULL
  ,
  CONSTRAINT PK_IngredientPurchasing PRIMARY KEY (IngredientPurchasingID)

  ,
  CONSTRAINT FK_IngredientPurchasing_Ingredient FOREIGN KEY (IngredientID) REFERENCES Ingredient (IngredientID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE IngredientPurchasing_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER IngredientPurchasing_seq_tr
  BEFORE INSERT
  ON IngredientPurchasing
  FOR EACH ROW
  WHEN (NEW.IngredientPurchasingID IS NULL)
  BEGIN
    SELECT IngredientPurchasing_seq.NEXTVAL
    INTO :NEW.IngredientPurchasingID
    FROM DUAL;
  END;
/



--------------------------------------------------------------
-- Table: CandyRecipe
--------------------------------------------------------------

CREATE TABLE CandyRecipe (
  CandyRecipeID       Number(10) NOT NULL,
  CandyRecipeQuantity Number(10) NOT NULL,
  CandyId             Number(10) NOT NULL,
  IngredientID        Number(10) NOT NULL
  ,
  CONSTRAINT PK_CandyRecipe PRIMARY KEY (CandyRecipeID)

  ,
  CONSTRAINT FK_CandyRecipe_CandyList FOREIGN KEY (CandyId) REFERENCES CandyList (CandyId)
  ,
  CONSTRAINT FK_CandyRecipe_Ingredient0 FOREIGN KEY (IngredientID) REFERENCES Ingredient (IngredientID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE CandyRecipe_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER CandyRecipe_seq_tr
  BEFORE INSERT
  ON CandyRecipe
  FOR EACH ROW
  WHEN (NEW.CandyRecipeID IS NULL)
  BEGIN
    SELECT CandyRecipe_seq.NEXTVAL
    INTO :NEW.CandyRecipeID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: ManufacturingMachine
--------------------------------------------------------------

CREATE TABLE ManufacturingMachine (
  ManufacturingMachineID Number(10) NOT NULL
  ,
  CONSTRAINT PK_ManufacturingMachine PRIMARY KEY (ManufacturingMachineID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE ManufacturingMachine_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER ManufacturingMachine_seq_tr
  BEFORE INSERT
  ON ManufacturingMachine
  FOR EACH ROW
  WHEN (NEW.ManufacturingMachineID IS NULL)
  BEGIN
    SELECT ManufacturingMachine_seq.NEXTVAL
    INTO :NEW.ManufacturingMachineID
    FROM DUAL;
  END;
/




--------------------------------------------------------------
-- Table: ManufacturingMachineConfig
--------------------------------------------------------------

CREATE TABLE ManufacturingMachineConfig (
  ManufacturingMachineConfigID      Number(10) NOT NULL,
  ManufacturingMachineConfigCadency Number(10) NOT NULL,
  ManufacturingMachineConfigDelay   Number(10) NOT NULL,
  TasteID                           Number(10) NOT NULL
  ,
  CONSTRAINT PK_ManufacturingMachineConfig PRIMARY KEY (ManufacturingMachineConfigID)

  ,
  CONSTRAINT FK_ManufacturingMachineConfig_TasteList FOREIGN KEY (TasteID) REFERENCES TasteList (TasteID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE ManufacturingMachineConfig_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER ManufacturingMachineConfig_seq_tr
  BEFORE INSERT
  ON ManufacturingMachineConfig
  FOR EACH ROW
  WHEN (NEW.ManufacturingMachineConfigID IS NULL)
  BEGIN
    SELECT ManufacturingMachineConfig_seq.NEXTVAL
    INTO :NEW.ManufacturingMachineConfigID
    FROM DUAL;
  END;
/




--------------------------------------------------------------
-- Table: ManufacturingMachineSetup
--------------------------------------------------------------

CREATE TABLE ManufacturingMachineSetup (
  ManufacturingMachineSetupID  Number(10) NOT NULL,
  ManufacturingMachineConfigID Number(10) NOT NULL,
  ManufacturingMachineID       Number(10) NOT NULL
  ,
  CONSTRAINT PK_ManufacturingMachineSetup PRIMARY KEY (ManufacturingMachineSetupID)

  ,
  CONSTRAINT FK_ManufacturingMachineSetup_ManufacturingMachineConfig FOREIGN KEY (ManufacturingMachineConfigID) REFERENCES ManufacturingMachineConfig (ManufacturingMachineConfigID)
  ,
  CONSTRAINT FK_ManufacturingMachineSetup_ManufacturingMachine FOREIGN KEY (ManufacturingMachineID) REFERENCES ManufacturingMachine (ManufacturingMachineID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE ManufacturingMachineSetup_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER ManufacturingMachineSetup_seq_tr
  BEFORE INSERT
  ON ManufacturingMachineSetup
  FOR EACH ROW
  WHEN (NEW.ManufacturingMachineSetupID IS NULL)
  BEGIN
    SELECT ManufacturingMachineSetup_seq.NEXTVAL
    INTO :NEW.ManufacturingMachineSetupID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: CandyLot
--------------------------------------------------------------

CREATE TABLE CandyLot (
  CandyLotID                  Number(10)   NOT NULL,
  CandyLotCreation            Timestamp(0) NOT NULL,
  CandyLotVolume              Number(10)   NOT NULL,
  CandyComboID                Number(10)   NOT NULL,
  ManufacturingMachineSetupID Number(10)   NOT NULL
  ,
  CONSTRAINT PK_CandyLot PRIMARY KEY (CandyLotID)

  ,
  CONSTRAINT FK_CandyLot_CandyCombo FOREIGN KEY (CandyComboID) REFERENCES CandyCombo (CandyComboID)
  ,
  CONSTRAINT FK_CandyLot_ManufacturingMachineSetup0 FOREIGN KEY (ManufacturingMachineSetupID) REFERENCES ManufacturingMachineSetup (ManufacturingMachineSetupID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE CandyLot_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER CandyLot_seq_tr
  BEFORE INSERT
  ON CandyLot
  FOR EACH ROW
  WHEN (NEW.CandyLotID IS NULL)
  BEGIN
    SELECT CandyLot_seq.NEXTVAL
    INTO :NEW.CandyLotID
    FROM DUAL;
  END;
/



--------------------------------------------------------------
-- Table: ManufacturingMachineMaintenance
--------------------------------------------------------------

CREATE TABLE ManufacturingMachineMaintenance (
  ManufacturingMachineMaintenanceID   Number(10)   NOT NULL,
  ManufacturingMachineMaintenanceTime Timestamp(0) NOT NULL,
  ManufacturingMachineSetupID         Number(10)   NOT NULL
  ,
  CONSTRAINT PK_ManufacturingMachineMaintenance PRIMARY KEY (ManufacturingMachineMaintenanceID)

  ,
  CONSTRAINT FK_ManufacturingMachineMaintenance_ManufacturingMachineSetup FOREIGN KEY (ManufacturingMachineSetupID) REFERENCES ManufacturingMachineSetup (ManufacturingMachineSetupID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE ManufacturingMachineMaintenance_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER ManufacturingMachineMaintenance_seq_tr
  BEFORE INSERT
  ON ManufacturingMachineMaintenance
  FOR EACH ROW
  WHEN (NEW.ManufacturingMachineMaintenanceID IS NULL)
  BEGIN
    SELECT ManufacturingMachineMaintenance_seq.NEXTVAL
    INTO :NEW.ManufacturingMachineMaintenanceID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: CandyReference
-- modif :   CandyreferenceID_candyCombo -> candyComboID
--------------------------------------------------------------

CREATE TABLE CandyReference (
  CandyReferenceId Number(10) NOT NULL,
  PackagingID      Number(10) NOT NULL,
  CandyComboID     Number(10) NOT NULL
  ,
  CONSTRAINT PK_CandyReference PRIMARY KEY (CandyReferenceId)

  ,
  CONSTRAINT FK_CandyReference_Packaging FOREIGN KEY (PackagingID) REFERENCES Packaging (PackagingID)
  ,
  CONSTRAINT FK_CandyReference_CandyCombo0 FOREIGN KEY (CandyComboID) REFERENCES CandyCombo (CandyComboID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE CandyReference_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER CandyReference_seq_tr
  BEFORE INSERT
  ON CandyReference
  FOR EACH ROW
  WHEN (NEW.CandyReferenceId IS NULL)
  BEGIN
    SELECT CandyReference_seq.NEXTVAL
    INTO :NEW.CandyReferenceId
    FROM DUAL;
  END;
/



--------------------------------------------------------------
-- Table: PackagingMachine
--------------------------------------------------------------

CREATE TABLE PackagingMachine (
  PackagingMachineID       Number(10) NOT NULL,
  PackagingMachineCandency Number(10) NOT NULL,
  PackagingMachineDelay    Number(10) NOT NULL,
  PackagingID              Number(10) NOT NULL
  ,
  CONSTRAINT PK_PackagingMachine PRIMARY KEY (PackagingMachineID)

  ,
  CONSTRAINT FK_PackagingMachine_Packaging FOREIGN KEY (PackagingID) REFERENCES Packaging (PackagingID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE PackagingMachine_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER PackagingMachine_seq_tr
  BEFORE INSERT
  ON PackagingMachine
  FOR EACH ROW
  WHEN (NEW.PackagingMachineID IS NULL)
  BEGIN
    SELECT PackagingMachine_seq.NEXTVAL
    INTO :NEW.PackagingMachineID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: Employee
--------------------------------------------------------------

CREATE TABLE Employee (
  EmployeeID   Number(10) NOT NULL,
  EmployeeTeam Number(10) NOT NULL
  ,
  CONSTRAINT PK_Employee PRIMARY KEY (EmployeeID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE Employee_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER Employee_seq_tr
  BEFORE INSERT
  ON Employee
  FOR EACH ROW
  WHEN (NEW.EmployeeID IS NULL)
  BEGIN
    SELECT Employee_seq.NEXTVAL
    INTO :NEW.EmployeeID
    FROM DUAL;
  END;
/





--------------------------------------------------------------
-- Table: Country
--------------------------------------------------------------

CREATE TABLE Country (
  CountryID   Char(2)  NOT NULL,
  CountryName Char(64) NOT NULL
  ,
  CONSTRAINT PK_Country PRIMARY KEY (CountryID)
);

--------------------------------------------------------------
-- Table: TransportType
--------------------------------------------------------------

CREATE TABLE TransportType (
  TransportTypeID         Number(10) NOT NULL,
  TransportTypeName       Char(64)   NOT NULL,
  TransportTypePalletMax  Number(10) NOT NULL,
  TransportTypePalletSize Number(10) NOT NULL
  ,
  CONSTRAINT PK_TransportType PRIMARY KEY (TransportTypeID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE TransportType_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER TransportType_seq_tr
  BEFORE INSERT
  ON TransportType
  FOR EACH ROW
  WHEN (NEW.TransportTypeID IS NULL)
  BEGIN
    SELECT TransportType_seq.NEXTVAL
    INTO :NEW.TransportTypeID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: ShipmentType
--------------------------------------------------------------

CREATE TABLE ShipmentType (
  ShipmentTypeID        Number(10) NOT NULL,
  ShipmentTypeAvailable Char(1)    NOT NULL,
  CountryID             Char(2)    NOT NULL,
  TransportTypeID       Number(10) NOT NULL
  ,
  CONSTRAINT PK_ShipmentType PRIMARY KEY (ShipmentTypeID)

  ,
  CONSTRAINT FK_ShipmentType_Country FOREIGN KEY (CountryID) REFERENCES Country (CountryID)
  ,
  CONSTRAINT FK_ShipmentType_TransportType0 FOREIGN KEY (TransportTypeID) REFERENCES TransportType (TransportTypeID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE ShipmentType_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER ShipmentType_seq_tr
  BEFORE INSERT
  ON ShipmentType
  FOR EACH ROW
  WHEN (NEW.ShipmentTypeID IS NULL)
  BEGIN
    SELECT ShipmentType_seq.NEXTVAL
    INTO :NEW.ShipmentTypeID
    FROM DUAL;
  END;
/


CREATE TABLE Shipment (
  ShipmentID        Number(10)   NOT NULL,
  ShippingDeparture Timestamp(0) NOT NULL,
  ShipmentTypeID    Number(10)   NOT NULL
  ,
  CONSTRAINT PK_Shipment PRIMARY KEY (ShipmentID)

  ,
  CONSTRAINT FK_Shipment_ShipmentType FOREIGN KEY (ShipmentTypeID) REFERENCES ShipmentType (ShipmentTypeID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE Shipment_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER Shipment_seq_tr
  BEFORE INSERT
  ON Shipment
  FOR EACH ROW
  WHEN (NEW.ShipmentTypeID IS NULL)
  BEGIN
    SELECT Shipment_seq.NEXTVAL
    INTO :NEW.ShipmentTypeID
    FROM DUAL;
  END;
/




--------------------------------------------------------------
-- Table: ClientOrder
--------------------------------------------------------------

CREATE TABLE ClientOrder (
  ClientOrderID   Number(10)   NOT NULL,
  ClientOrderTime Timestamp(0) NOT NULL,
  CountryID       Char(2)      NOT NULL
  ,
  CONSTRAINT PK_ClientOrder PRIMARY KEY (ClientOrderID)

  ,
  CONSTRAINT FK_ClientOrder_Country FOREIGN KEY (CountryID) REFERENCES Country (CountryID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE ClientOrder_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER ClientOrder_seq_tr
  BEFORE INSERT
  ON ClientOrder
  FOR EACH ROW
  WHEN (NEW.ClientOrderID IS NULL)
  BEGIN
    SELECT ClientOrder_seq.NEXTVAL
    INTO :NEW.ClientOrderID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: Pallet
--------------------------------------------------------------

CREATE TABLE Pallet (
  PalletID       Number(10)   NOT NULL,
  PalletLoadTime Timestamp(0) NOT NULL,
  ShipmentID     Number(10)   NOT NULL,
  ClientOrderID  Number(10)   NOT NULL
  ,
  CONSTRAINT PK_Pallet PRIMARY KEY (PalletID)

  ,
  CONSTRAINT FK_Pallet_Shipment FOREIGN KEY (ShipmentID) REFERENCES Shipment (ShipmentID)
  ,
  CONSTRAINT FK_Pallet_ClientOrder0 FOREIGN KEY (ClientOrderID) REFERENCES ClientOrder (ClientOrderID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE Pallet_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER Pallet_seq_tr
  BEFORE INSERT
  ON Pallet
  FOR EACH ROW
  WHEN (NEW.PalletID IS NULL)
  BEGIN
    SELECT Pallet_seq.NEXTVAL
    INTO :NEW.PalletID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: CardboardBox
--------------------------------------------------------------

CREATE TABLE CardboardBox (
  CardboardBoxID            Number(10)   NOT NULL,
  CardboardBoxPalletization Timestamp(0) NOT NULL,
  PalletID                  Number(10)   NOT NULL
  ,
  CONSTRAINT PK_CardboardBox PRIMARY KEY (CardboardBoxID)

  ,
  CONSTRAINT FK_CardboardBox_Pallet FOREIGN KEY (PalletID) REFERENCES Pallet (PalletID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE CardboardBox_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER CardboardBox_seq_tr
  BEFORE INSERT
  ON CardboardBox
  FOR EACH ROW
  WHEN (NEW.CardboardBoxID IS NULL)
  BEGIN
    SELECT CardboardBox_seq.NEXTVAL
    INTO :NEW.CardboardBoxID
    FROM DUAL;
  END;
/





--------------------------------------------------------------
-- Table: OrderLine
--------------------------------------------------------------

CREATE TABLE OrderLine (
  OrderLineID       Number(10) NOT NULL,
  OrderLineQuantity Number(10) NOT NULL,
  ClientOrderID     Number(10) NOT NULL,
  CandyReferenceId  Number(10) NOT NULL
  ,
  CONSTRAINT PK_OrderLine PRIMARY KEY (OrderLineID)

  ,
  CONSTRAINT FK_OrderLine_ClientOrder FOREIGN KEY (ClientOrderID) REFERENCES ClientOrder (ClientOrderID)
  ,
  CONSTRAINT FK_OrderLine_CandyReference0 FOREIGN KEY (CandyReferenceId) REFERENCES CandyReference (CandyReferenceId)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE OrderLine_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER OrderLine_seq_tr
  BEFORE INSERT
  ON OrderLine
  FOR EACH ROW
  WHEN (NEW.OrderLineID IS NULL)
  BEGIN
    SELECT OrderLine_seq.NEXTVAL
    INTO :NEW.OrderLineID
    FROM DUAL;
  END;
/


--------------------------------------------------------------
-- Table: PackagingMachineMaintenance
--------------------------------------------------------------

CREATE TABLE PackagingMachineMaintenance (
  PackagingMachineMaintenanceID   Number(10)   NOT NULL,
  PackagingMachineMaintenanceTime Timestamp(0) NOT NULL,
  PackagingMachineID              Number(10)   NOT NULL
  ,
  CONSTRAINT PK_PackagingMachineMaintenance PRIMARY KEY (PackagingMachineMaintenanceID)

  ,
  CONSTRAINT FK_PackagingMachineMaintenance_PackagingMachine FOREIGN KEY (PackagingMachineID) REFERENCES PackagingMachine (PackagingMachineID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE PackagingMachineMaintenance_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER PackagingMachineMaintenance_seq_tr
  BEFORE INSERT
  ON PackagingMachineMaintenance
  FOR EACH ROW
  WHEN (NEW.PackagingMachineMaintenanceID IS NULL)
  BEGIN
    SELECT PackagingMachineMaintenance_seq.NEXTVAL
    INTO :NEW.PackagingMachineMaintenanceID
    FROM DUAL;
  END;
/

--------------------------------------------------------------
-- Table: Article
--------------------------------------------------------------

CREATE TABLE Article (
  ReferenceLotID     Number(10)   NOT NULL,
  ArticleCreation    Timestamp(0) NOT NULL,
  ArticleBoxing      Timestamp(0) NOT NULL,
  CandyLotID         Number(10)   NOT NULL,
  CandyReferenceId   Number(10)   NOT NULL,
  PackagingMachineID Number(10)   NOT NULL,
  EmployeeID         Number(10)   NOT NULL,
  CardboardBoxID     Number(10)
  ,
  CONSTRAINT PK_Article PRIMARY KEY (ReferenceLotID)

  ,
  CONSTRAINT FK_Article_CandyLot FOREIGN KEY (CandyLotID) REFERENCES CandyLot (CandyLotID)
  ,
  CONSTRAINT FK_Article_CandyReference0 FOREIGN KEY (CandyReferenceId) REFERENCES CandyReference (CandyReferenceId)
  ,
  CONSTRAINT FK_Article_PackagingMachine1 FOREIGN KEY (PackagingMachineID) REFERENCES PackagingMachine (PackagingMachineID)
  ,
  CONSTRAINT FK_Article_Employee2 FOREIGN KEY (EmployeeID) REFERENCES Employee (EmployeeID)
  ,
  CONSTRAINT FK_Article_CardboardBox FOREIGN KEY (CardboardBoxID) REFERENCES CardboardBox (CardboardBoxID)
);

-- Generate ID using sequence and trigger
CREATE SEQUENCE Article_seq
  START WITH 1
  INCREMENT BY 1;

CREATE OR REPLACE TRIGGER Article_seq_tr
  BEFORE INSERT
  ON Article
  FOR EACH ROW
  WHEN (NEW.ReferenceLotID IS NULL)
  BEGIN
    SELECT Article_seq.NEXTVAL
    INTO :NEW.ReferenceLotID
    FROM DUAL;
  END;
/

CREATE VIEW commandeClient AS
  SELECT
    C4.CLIENTORDERTIME,
    C2.CANDYNAME,
    C3.COLORNAME,
    T.TASTENAME,
    T2.TEXTURENAME,
    P.PACKAGINGNAME,
    O.ORDERLINEQUANTITY,
    C5.COUNTRYNAME
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

  ORDER BY CLIENTORDERTIME;