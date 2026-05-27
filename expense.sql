CREATE TABLE expense (

    expense_id VARCHAR(50) PRIMARY KEY DEFAULT
    ('EXP-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8))),
    -- Auto-generated alphanumeric Expense ID

    expense_transaction_id VARCHAR(100),

    expense_destination VARCHAR(255),
    -- Name of person/company receiving payment

    expense_destination_type VARCHAR(150),
    -- Salary, Asset Purchase, Utilities, Investment, etc.

    expense_type VARCHAR(100),
    -- Operational / Non-Operational / Investment

    expense_currency VARCHAR(10),
    -- INR, USD, EUR, etc.

    expense_amount DECIMAL(15,2)
        CHECK (expense_amount >= 0),

    expense_date DATE,

    expense_frequency VARCHAR(50),
    -- One-off / Recurring

    recurring_expense_start_date DATE,

    recurring_expense_frequency_months INT
        CHECK (recurring_expense_frequency_months >= 0),

    recurring_expense_period_years INT
        CHECK (recurring_expense_period_years >= 0),

    percentage_tax_applied DECIMAL(5,2)
        CHECK (percentage_tax_applied BETWEEN 0 AND 100),

    supplier_invoice_date DATE,

    payment_terms_days INT
        CHECK (payment_terms_days >= 0),

    tds_percentage DECIMAL(5,2)
        CHECK (tds_percentage BETWEEN 0 AND 100),

    payment_mode VARCHAR(50),
    -- Cash / Bank Transfer / UPI / Card / etc.

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);