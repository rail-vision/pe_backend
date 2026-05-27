-- CreateTable
CREATE TABLE "asset" (
    "asset_id" VARCHAR(50) NOT NULL DEFAULT ('AST-'::text || upper(SUBSTRING(md5((random())::text) FROM 1 FOR 8))),
    "asset_code" VARCHAR(100),
    "owner_id" VARCHAR(100),
    "asset_name" VARCHAR(255) NOT NULL,
    "asset_description" VARCHAR(500),
    "purchase_date" DATE,
    "asset_currency" VARCHAR(10),
    "purchase_value" DECIMAL(15,2),
    "current_value" DECIMAL(15,2),
    "depreciation_percentage" DECIMAL(5,2),
    "asset_life_years" INTEGER,
    "asset_liquidity_level" DECIMAL(5,2),
    "annual_asset_usage_level" DECIMAL(5,2),
    "asset_manufacturer" VARCHAR(255),
    "manufacturing_country" VARCHAR(100),
    "warranty_period_months" INTEGER,
    "maintenance_contract" BOOLEAN,
    "maintenance_contractor" VARCHAR(255),
    "annual_maintenance_cost" DECIMAL(15,2),
    "expected_mtbf_hours" INTEGER,
    "asset_category" VARCHAR(100),
    "asset_dimensions" VARCHAR(100),
    "asset_weight" VARCHAR(100),
    "asset_location_gps" VARCHAR(255),
    "asset_location_address" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asset_pkey" PRIMARY KEY ("asset_id")
);

-- CreateTable
CREATE TABLE "expense" (
    "expense_id" VARCHAR(50) NOT NULL DEFAULT ('EXP-'::text || upper(SUBSTRING(md5((random())::text) FROM 1 FOR 8))),
    "expense_transaction_id" VARCHAR(100),
    "expense_destination" VARCHAR(255),
    "expense_destination_type" VARCHAR(150),
    "expense_type" VARCHAR(100),
    "expense_currency" VARCHAR(10),
    "expense_amount" DECIMAL(15,2),
    "expense_date" DATE,
    "expense_frequency" VARCHAR(50),
    "recurring_expense_start_date" DATE,
    "recurring_expense_frequency_months" INTEGER,
    "recurring_expense_period_years" INTEGER,
    "percentage_tax_applied" DECIMAL(5,2),
    "supplier_invoice_date" DATE,
    "payment_terms_days" INTEGER,
    "tds_percentage" DECIMAL(5,2),
    "payment_mode" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("expense_id")
);

-- CreateTable
CREATE TABLE "income" (
    "income_id" VARCHAR(50) NOT NULL DEFAULT ('INC-'::text || upper(SUBSTRING(md5((random())::text) FROM 1 FOR 8))),
    "income_transaction_id" VARCHAR(100),
    "income_source" VARCHAR(255),
    "income_source_type" VARCHAR(100),
    "income_type" VARCHAR(100),
    "income_currency" VARCHAR(10),
    "income_amount" DECIMAL(15,2),
    "income_date" DATE,
    "income_frequency" VARCHAR(50),
    "recurring_income_start_date" DATE,
    "recurring_income_frequency_months" INTEGER,
    "recurring_income_period_years" INTEGER,
    "percentage_tax_applied" DECIMAL(5,2),
    "invoice_date" DATE,
    "payment_terms_days" INTEGER,
    "tds_percentage" DECIMAL(5,2),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "income_pkey" PRIMARY KEY ("income_id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "supplier_id" TEXT NOT NULL,
    "supplier_code" TEXT,
    "supplier_start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplier_type" TEXT,
    "supplier_description" TEXT,
    "supplier_certifications" TEXT,
    "supplier_organisation_size" TEXT,
    "supplier_turnover_currency" TEXT,
    "supplier_turnover" DECIMAL(15,2),
    "supplier_turnover_year" INTEGER,
    "supplier_employees_for_turnover_year" INTEGER,
    "supplier_blacklisted" BOOLEAN NOT NULL DEFAULT false,
    "supplier_blacklist_date" TIMESTAMP(3),
    "supplier_headquarter_country" TEXT,
    "supplier_headquarter_city" TEXT,
    "supplier_local_address" TEXT,
    "supplier_pincode" TEXT,
    "supplier_email" TEXT,
    "supplier_country_code" TEXT,
    "supplier_telephone" TEXT,
    "supplier_linkedin" TEXT,
    "supplier_website" TEXT,
    "supplier_references" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "DataAsset" (
    "data_id" TEXT NOT NULL,
    "data_type" TEXT,
    "data_status" TEXT,
    "data_redundancy" TEXT,
    "data_storage_medium" TEXT,
    "encryption_used" TEXT,
    "data_behind_firewall" TEXT,
    "data_content" TEXT,
    "data_confidentiality_score" INTEGER,
    "data_activity" TEXT,
    "data_owner" TEXT,
    "data_users" TEXT,
    "data_creation_month" INTEGER,
    "data_creation_year" INTEGER,
    "data_frequency_type" TEXT,
    "data_frequency_interval" TEXT,
    "data_start_date" TIMESTAMP(3),
    "data_currency_years" INTEGER,
    "ip_data" BOOLEAN,
    "data_retention_years" INTEGER,
    "recurring_data_size_gb" DECIMAL(10,2),
    "non_recurring_data_size_gb" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataAsset_pkey" PRIMARY KEY ("data_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_supplier_code_key" ON "Supplier"("supplier_code");
