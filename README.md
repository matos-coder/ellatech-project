# NestJS Users & Products Service (Take‑home)

Small backend service implemented for the Ellatech take‑home assignment.  
Stack: NestJS, TypeORM, PostgreSQL, Docker Compose. Includes DTO validation, TypeORM migrations, and basic transaction history for product adjustments.

## What this repo contains
- API to manage users, products and product adjustment transactions
- Docker Compose setup to run API + Postgres locally
- TypeORM entities & migrations
- Swagger API docs
- Basic validation and HTTP status handling

## Quick start

1. Clone
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

2. Run with Docker Compose (Windows)
```powershell
docker compose up --build
```
- API: http://localhost:3000
- Swagger: http://localhost:3000/api

3. (Optional) Run migrations locally (inside container or host with env configured)
```bash
# generate
npm run migration:generate --name=<migration-name>

# run
npm run migration:run

# revert
npm run migration:revert
```

4. Tests
```bash
npm run test          # unit
npm run test:e2e      # e2e
npm run test:cov      # coverage
```

## API — Required endpoints

1) Create user
- POST /users
- Body:
```json
{ "name": "Matias", "email": "matias@example.com" }
```
- Returns 201 with created user

2) Create product
- POST /products
- Body:
```json
{
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 45000,
  "status": "active"
}
```
- Returns 201 with created product

3) Adjust product (price/status) — records a transaction
- PUT /products/adjust
- Body:
```json
{
  "productId": "uuid-here",
  "price": 48000,
  "status": "active"
}
```
- Creates a transaction record; returns 200 with updated product

4) Get product status + transaction summary
- GET /status/:productId
- Returns current product data and basic transaction summary

5) List transactions
- GET /transactions
- Returns transactions sorted by date (latest first)

All endpoints use DTO validation (class-validator). Errors return appropriate HTTP codes and a structured JSON response.

Example cURL:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Matias","email":"matias@test.com"}'
```

## Data model (summary)
- User: id (uuid), name, email, createdAt
- Product: id (uuid), name, description, price, status, createdAt, updatedAt
- Transaction: id (uuid), productId (FK), oldPrice, newPrice, oldStatus, newStatus, createdAt

## Migrations
TypeORM migrations are included and can be run with the scripts above. Generate new migrations when changing entities.

## Assumptions & trade-offs
- Product status stored as string (active/inactive/out_of_stock).
- Every product adjustment always creates a transaction entry.
- No authentication/authorization (kept out to respect timebox).
- No pagination on transactions (can be added).
- Simpler error handling (HttpException & basic wrappers) to fit timebox.

## Deliverables
- GitHub repository link (provide when submitting)
- This README with run/test steps and basic API docs
- Notes on assumptions / trade-offs (above)

## Discussion points (for interview)
- Data model and constraints
- Validation, error handling, and transaction safety (DB transactions)
- Improvements with more time (auth, pagination, more robust error filters, enums & constraints, rate limits, extended tests)

If anything is unclear, update the README or reply to the assignment email with questions.