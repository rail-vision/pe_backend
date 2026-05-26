
{
  "assetId": "AST-1004",
  "assetCode": "GEN-2025-02",
  "ownerId": "OWN-5002",
  "assetName": "Test Generator",
  "assetDescription": "Demo asset",
  "purchaseDate": "2024-01-15",
  "assetCurrency": "USD",
  "purchaseValue": 50000,
  "currentValue": 45000,
  "depreciation": 10,
  "assetLife": 15,
  "assetLiquidityLevel": 80,
  "annualAssetUsageLevel": 75,
  "assetManufacturer": "Caterpillar",
  "assetManufacturingCountry": "USA",
  "assetWarrantyPeriod": 24,
  "assetMaintenanceContract": true,
  "assetMaintenanceContractor": "ABC Maintenance Ltd",
  "assetAnnualMaintenanceCost": 2500,
  "expectedMeanTimeBetweenFailure": 5000,
  "assetCategory": "MECHANICAL",
  "assetDimensions": "LARGE",
  "assetWeight": "HEAVY",
  "assetLocationGPS": "25.276987,55.296249",
  "assetLocationAddress": "Dubai Industrial Area Phase 2"
}
GET  http://localhost:5000/api/assets
POST http://localhost:5000/api/assets
PUT  http://localhost:5000/api/assets/<id>
UPDATE 
JSON 
{
  "assetName": "Updated Generator",
  "currentValue": 30000
}
DELETE http://localhost:5000/api/assets/<id>
JSON
{
  "message": "Asset deleted successfully"
}

/* People */
----->    sample data<---------------------
{
  "personId": "PER-1002",
  "employeeCode": "EMP-5002",
  "personName": "Ali Khan",
  "personStatus": "FULL_TIME",
  "designation": "Manager",
  "designationDescription": "Operations Manager",
  "workStatus": "ACTIVE",
  "personAddress": "Abu Dhabi",
  "country": "UAE",
  "functionalUnit": "Operations",
  "startDate": "2024-03-01T00:00:00.000Z",
  "workEmail": "ali@company.com",
  "personalEmail": "alikhan@gmail.com",
  "workPhone": "+971501112233",
  "expertise": "Operations Management",
  "workPeriod": "DAY_ONLY",
  "driversLicense": true
}
GET: http://localhost:5000/api/people
POST: http://localhost:5000/api/people
PUT: http://localhost:5000/api/people/<id>
DELETE: http://localhost:5000/api/people/<id>
