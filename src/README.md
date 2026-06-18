1. PostgreSQL Database Setup
•	Installed PostgreSQL and pgAdmin.
•	Created the main database: enterprise_management_system.
•	Connected the PostgreSQL database to the backend using Prisma ORM.

2. Prisma Setup

Installed Prisma ORM and Prisma Client:

npm install prisma @prisma/client

Initialized Prisma:

npx prisma init

Configured .env file with PostgreSQL connection string:

DATABASE_URL="postgresql://postgres:password@localhost:5432/enterprise_management_system"
3. Prisma Schema Design

Created Prisma models/schemas for:

Income
Expense
Supplier
Data Asset
Inventory

inside:

prisma/schema.prisma
4. Database Migration

Generated PostgreSQL tables using Prisma migrations:

npx prisma migrate dev --name init

This:

created database tables
synchronized Prisma schema with PostgreSQL
generated Prisma Client
5. Prisma Client Configuration

Configured reusable Prisma connection:

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
6. CRUD API Development

Built backend APIs for all modules using:

Node.js
Express.js
Prisma ORM

Implemented:

GET ALL
GET BY ID
CREATE
UPDATE
DELETE

for:

Income
Expense
Supplier
Data Asset
Inventory
7. Validation Layer

Implemented Joi validation for:

required fields
numeric validations
email validations
percentage validations
date validations
duplicate prevention
8. Duplicate Prevention

Added duplicate checks and unique validations for:

transaction IDs
supplier codes
emails
serial numbers
barcodes

using:

Prisma unique constraints
backend validation logic
9. Database Relationships

Implemented relational mapping such as:

Supplier ↔ Inventory

using:

foreign keys
Prisma relational models
10. API Testing

Tested APIs using Postman for:

valid requests
invalid requests
CRUD operations
duplicate entries
validation errors
11. Prisma Studio Integration

Used Prisma Studio to:

visualize database tables
inspect records
verify schemas
demonstrate backend data locally

Command used:

npx prisma studio

Prisma Studio runs on:

http://localhost:5555
12. Dynamic Backend Preparation

Prepared backend architecture for:

dynamic templates
field selection
dynamic table generation
configurable enterprise workflows