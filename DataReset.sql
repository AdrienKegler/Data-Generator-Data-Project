DELETE IngredientPurchasing;
DELETE CandyCombo;
DELETE CandyLot;
DELETE ManufacturingMachineMaintenance;
DELETE Article;
DELETE OrderLine;
DELETE PackagingMachineMaintenance;
DELETE ClientOrder;
DELETE CardboardBox;
DELETE Pallet;
DELETE Shipment;


UPDATE Ingredient
	SET INGREDIENTSTOCK = 0;


COMMIT;