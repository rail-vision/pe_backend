CREATE TABLE income (

    income_id VARCHAR(50) PRIMARY KEY DEFAULT
    ('INC-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8))),
    -- Auto-generated alphanumeric Income ID

    income_transaction_id VARCHAR(100),

    income_source VARCHAR(255),
    -- Customer or source name

    income_source_type VARCHAR(100),
    -- Example:
    -- Sales, R&D, Donation, Asset Sale, Royalty, Bank Interest

    income_type VARCHAR(100),
    -- Operational, Non-Operational, Investment

    income_currency VARCHAR(10),
    -- Example: INR, USD, EUR

    income_amount DECIMAL(15,2)
        CHECK (income_amount >= 0),

    income_date DATE,

    income_frequency VARCHAR(50),
    -- One-off / Recurring

    recurring_income_start_date DATE,

    recurring_income_frequency_months INT
        CHECK (recurring_income_frequency_months >= 0),
    -- Number of months

    recurring_income_period_years INT
        CHECK (recurring_income_period_years >= 0),

    percentage_tax_applied DECIMAL(5,2)
        CHECK (percentage_tax_applied BETWEEN 0 AND 100),

    invoice_date DATE,

    payment_terms_days INT
        CHECK (payment_terms_days >= 0),

    tds_percentage DECIMAL(5,2)
        CHECK (tds_percentage BETWEEN 0 AND 100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);