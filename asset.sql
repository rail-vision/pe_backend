CREATE TABLE asset (

    asset_id VARCHAR(50) PRIMARY KEY DEFAULT
    ('AST-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8))),

    asset_code VARCHAR(100),

    owner_id VARCHAR(100),

    asset_name VARCHAR(255) NOT NULL,

    asset_description VARCHAR(500),

    purchase_date DATE,

    asset_currency VARCHAR(10),

    purchase_value DECIMAL(15,2)
        CHECK (purchase_value >= 0),

    current_value DECIMAL(15,2)
        CHECK (current_value >= 0),

    depreciation_percentage DECIMAL(5,2)
        CHECK (depreciation_percentage BETWEEN 0 AND 100),

    asset_life_years INT
        CHECK (asset_life_years >= 0),

    asset_liquidity_level DECIMAL(5,2)
        CHECK (asset_liquidity_level BETWEEN 0 AND 100),

    annual_asset_usage_level DECIMAL(5,2)
        CHECK (annual_asset_usage_level BETWEEN 0 AND 100),

    asset_manufacturer VARCHAR(255),

    manufacturing_country VARCHAR(100),

    warranty_period_months INT
        CHECK (warranty_period_months >= 0),

    maintenance_contract BOOLEAN,

    maintenance_contractor VARCHAR(255),

    annual_maintenance_cost DECIMAL(15,2)
        CHECK (annual_maintenance_cost >= 0),

    expected_mtbf_hours INT
        CHECK (expected_mtbf_hours >= 0),

    asset_category VARCHAR(100),

    asset_dimensions VARCHAR(100),

    asset_weight VARCHAR(100),

    asset_location_gps VARCHAR(255),

    asset_location_address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);