const prisma = require("../config/prisma");

const assetSchema  = require("../validations/asset.validation");
const peopleSchema = require("../validations/people.validation");

/*
|--------------------------------------------------------------------------
| MODULE MAP
|--------------------------------------------------------------------------
*/

const MODULE_MAP = {
  assets: {
    schema:  assetSchema,
    model:   () => prisma.asset,
    autoIds: (row, batchTimestamp, i) => {
      row.assetId   ??= `AST-${batchTimestamp}-${i}`;
      row.assetCode ??= `CODE-${i + 1}`;
      row.ownerId   ??= `OWNER-${i + 1}`;
    },
    preserveIds: (row) => ({
      assetId:   row.assetId,
      assetCode: row.assetCode,
      ownerId:   row.ownerId,
    }),
  },

  people: {
    schema:  peopleSchema,
    model:   () => prisma.people,
    autoIds: (row, batchTimestamp, i) => {
      row.personId ??= `PER-${batchTimestamp}-${i}`;
    },
    preserveIds: (row) => ({
      personId: row.personId,
    }),
  },

  /*
  | Uncomment as you build new modules:
  |
  | income: {
  |   schema:      incomeSchema,
  |   model:       () => prisma.income,
  |   autoIds:     (row, ts, i) => { row.incomeId ??= `INC-${ts}-${i}`; },
  |   preserveIds: (row) => ({ incomeId: row.incomeId }),
  | },
  | expense:   { ... },
  | inventory: { ... },
  | suppliers: { ... },
  | data:      { ... },
  */
};

/*
|--------------------------------------------------------------------------
| COERCION HELPERS
|--------------------------------------------------------------------------
*/

const NUMERIC_FIELDS = [
  "purchaseValue",
  "currentValue",
  "depreciation",
  "assetLife",
  "assetLiquidityLevel",
  "annualAssetUsageLevel",
  "assetWarrantyPeriod",
  "assetAnnualMaintenanceCost",
  "expectedMeanTimeBetweenFailure",
  "quantity",
  "price",
  "salary",
  "amount",
];

const BOOLEAN_FIELDS = [
  "isActive",
  "isVerified",
  "isDepreciated",
  "assetMaintenanceContract",
  "driversLicense",
];

const DATE_FIELDS = [
  "purchaseDate",
  "warrantyExpiry",
  "dateOfBirth",
  "joiningDate",
   "startDate",
  "createdAt",
  "updatedAt",
];

const coerceNumbers = (row) => {
  for (const field of NUMERIC_FIELDS) {
    if (typeof row[field] === "string" && row[field].trim() !== "") {
      const num = Number(row[field]);
      if (!Number.isNaN(num)) row[field] = num;
    }
  }
};

const coerceBooleans = (row) => {
  for (const field of BOOLEAN_FIELDS) {
    if (row[field] === "true")  row[field] = true;
    if (row[field] === "false") row[field] = false;
  }
};

const coerceDates = (row) => {
  for (const field of DATE_FIELDS) {
    if (typeof row[field] === "string" && row[field].trim() !== "") {
      const d = new Date(row[field]);
      if (!Number.isNaN(d.getTime())) row[field] = d;
    }
    
  }
};

/*CORE PROCESSOR*/

const processUpload = async (module, rows) => {

  // 1. Resolve module config
  const config = MODULE_MAP[module];

  if (!config) {
    throw Object.assign(
      new Error(
        `Module "${module}" is not supported. ` +
        `Supported: ${Object.keys(MODULE_MAP).join(", ")}.`
      ),
      { code: "INVALID_MODULE" }
    );
  }

  const { schema, model, autoIds, preserveIds } = config;
  const prismaModel    = model();
  const batchTimestamp = Date.now();

  // 2. Per-row processing
  const validRows = [];
  const errors    = [];

  for (let i = 0; i < rows.length; i++) {
    const row = { ...rows[i] };

    autoIds(row, batchTimestamp, i);
    coerceNumbers(row);
    coerceBooleans(row);
    coerceDates(row);

    const validation = schema.safeParse(row);

    if (!validation.success) {
      const firstError = validation.error.issues[0];
      errors.push({
        row:     i + 1,
        field:   firstError.path?.[0] ?? "unknown",
        message: firstError.message,
      });
      continue;
    }

    const validatedData = {
      ...validation.data,
      ...preserveIds(row),
    };

    validRows.push(validatedData);
  }

  // 3. Batch insert
  let skippedRows = 0;

  if (validRows.length > 0) {
    const result = await prismaModel.createMany({
      data:           validRows,
      skipDuplicates: true,
    });
    skippedRows = validRows.length - result.count;
  }

  // 4. Response
  return {
    importedRows: validRows.length - skippedRows,
    failedRows:   errors.length,
    skippedRows,
    errors,
  };
};

module.exports = { processUpload };