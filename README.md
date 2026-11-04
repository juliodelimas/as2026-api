# E-commerce Checkout API

REST API built with **Express** for a simplified e-commerce checkout flow. It exposes four main operations — **Register**, **Login**, **Cart**, and **Checkout** — and stores all data in memory (JavaScript variables), so nothing is persisted after the process restarts.

## How to Install

Requirements: **Node.js 18+** and **npm**.

```bash
git clone https://github.com/juliodelimas/as2026-api.git
cd as2026-api
npm install
```

## How to Run

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server starts on `http://localhost:3000` by default.

## Test Data

### Users

| ID | Name         | Email             | Password  |
|----|--------------|-------------------|-----------|
| 1  | Alice Santos | alice@example.com | alice123  |
| 2  | Bob Oliveira | bob@example.com   | bob123    |
| 3  | Carol Souza  | carol@example.com | carol123  |

### Products

| ID | Name                | Price  |
|----|---------------------|--------|
| 1  | Wireless Mouse      | 49.90  |
| 2  | Mechanical Keyboard | 129.90 |
| 3  | USB-C Hub           | 89.90  |

### Example flow

```bash
# 1) Login
curl -s -X POST http://localhost:3000/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@example.com","password":"alice123"}'

# 2) Add item to cart (replace TOKEN)
curl -s -X POST http://localhost:3000/cart \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"productId":1,"quantity":2}'

# 3) Checkout with cash (10% discount)
curl -s -X POST http://localhost:3000/checkout \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -d '{"paymentMethod":"cash"}'
```

## Business Rules

1. **Authentication** — `POST /cart` (read/write) and `POST /checkout` require a valid JWT from `POST /login` (or after registering and logging in). Send it as `Authorization: Bearer <token>`.
2. **Register** — creates a new user in memory. Duplicate emails are rejected.
3. **Cart** — authenticated users can add products by `productId` and `quantity`. Adding the same product again increases its quantity.
4. **Checkout payment discount**
   - **Cash** (`paymentMethod: "cash"`) → **10% discount** on the cart subtotal.
   - **Credit Card** (`paymentMethod: "credit_card"`) → **no discount**.
5. Checkout requires a non-empty cart. After a successful checkout, the user cart is cleared.
6. Data lives only in memory; restarting the API resets users (back to the 3 seed users), products, and carts.

## Important URLs

| Resource              | URL                                      |
|-----------------------|------------------------------------------|
| API base              | http://localhost:3000                    |
| Register              | `POST http://localhost:3000/register`    |
| Login                 | `POST http://localhost:3000/login`       |
| Cart (get / add)      | `GET` / `POST http://localhost:3000/cart`|
| Checkout              | `POST http://localhost:3000/checkout`    |
| Swagger UI            | http://localhost:3000/api-docs           |
| OpenAPI YAML          | http://localhost:3000/swagger.yaml       |
| Health check          | http://localhost:3000/health             |
