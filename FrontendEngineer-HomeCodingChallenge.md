# Frontend Engineer - Take-Home Coding Challenge

**Tech Stack:** React, Redux Toolkit, React Router, TypeScript (recommended), TailWindCss/CSS-in-JS (EmotionJs)

---

## Challenge Overview

You're building a **Product Inventory Management Dashboard** for an e-commerce platform. This is a real-world feature that requires you to manage complex state, handle async operations, and create a responsive, user-friendly interface.

The challenge evaluates your ability to:

- Build scalable, reusable UI components
- Manage application state with Redux Toolkit
- Handle side effects and async operations
- Integrate with APIs
- Write clean, maintainable code
- Think about user experience, 100% responsiveness and accessibility
- Maintain loading states in redux to disable/show loading submit button

---

## Feature Specification

### Core Requirements

You need to implement three interconnected screens that allow users to:

1. **Browse Products** – View a paginated list of products with filtering and sorting
2. **View Product Details** – Inspect detailed information about a selected product
3. **Manage Inventory** – Update stock levels and manage product availability

### Feature Details

#### Screen 1: Product Listing Page

- Display products in a grid or table layout
- Show: Product name, image, price, stock status, category
- **Filtering:** Filter by category and availability (in stock/out of stock)
- **Sorting:** Sort by price (ascending/descending), popularity, or newest
- **Pagination:** Load 12 products per page with "Load More" or pagination controls
- **Search:** Real-time search by product name
- **Loading & Error States:** Display loading skeletons and error messages gracefully

#### Screen 2: Product Details Page

- Display complete product information
- Show: Full description, images, pricing, specifications, reviews count
- **Stock Info:** Current inventory level, last updated timestamp
- **Related Products:** Show 3-4 similar products from the same category
- **Actions:** Add to cart, View inventory, Share product
- **Back Navigation:** Easy way to return to product list

#### Screen 3: Inventory Management Page

- Table showing all products with current stock levels
- **Update Stock:** Inline or modal-based stock adjustment
- **Bulk Actions:** Select multiple products to adjust stock levels at once
- **History/Logging:** Show recent stock changes (timestamp, change amount, reason)
- **Filters:** Filter by category, low stock threshold
- **Export:** Option to export inventory data (CSV or similar)

---

## API Specification

### Mock API Endpoints

You'll need to integrate with these mock endpoints (just for reference). Use **msw (Mock Service Worker)**, **json-server**, or a custom mock implementation.

#### 1. Get All Products

```
GET /api/products?page=1&limit=12&sort=name&order=asc&category=electronics&inStock=true

Response:
{
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "High-quality noise-cancelling headphones",
      "price": 199.99,
      "category": "electronics",
      "image": "https://...",
      "stock": 45,
      "popularity": 95,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    ...
  ],
  "total": 156,
  "page": 1,
  "limit": 12
}
```

#### 2. Get Product Details

```
GET /api/products/:id

Response:
{
  "id": 1,
  "name": "Wireless Headphones",
  "description": "High-quality noise-cancelling headphones with...",
  "fullDescription": "...",
  "price": 199.99,
  "images": ["https://...", "https://..."],
  "specifications": {
    "color": "Black",
    "weight": "250g",
    "batteryLife": "30 hours",
    "connectivity": "Bluetooth 5.0"
  },
  "category": "electronics",
  "stock": 45,
  "reviews": {
    "count": 234,
    "rating": 4.5
  },
  "lastStockUpdate": "2024-01-20T14:22:00Z",
  "relatedProducts": [2, 5, 8]
}
```

#### 3. Get Inventory List

```
GET /api/inventory?category=all&lowStockThreshold=10

Response:
{
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "category": "electronics",
      "currentStock": 45,
      "reorderLevel": 20,
      "lastUpdated": "2024-01-20T14:22:00Z"
    },
    ...
  ]
}
```

#### 4. Update Product Stock

```
PUT /api/inventory/:id

Request:
{
  "quantity": 50,
  "reason": "Restock from supplier"
}

Response:
{
  "id": 1,
  "previousStock": 45,
  "newStock": 50,
  "change": 5,
  "reason": "Restock from supplier",
  "timestamp": "2024-01-20T15:30:00Z"
}
```

#### 5. Get Stock History

```
GET /api/inventory/:id/history

Response:
{
  "data": [
    {
      "id": "log_123",
      "productId": 1,
      "previousStock": 40,
      "newStock": 45,
      "change": 5,
      "reason": "Restock from supplier",
      "timestamp": "2024-01-20T14:22:00Z"
    },
    ...
  ]
}
```

#### 6. Bulk Update Stock

```
POST /api/inventory/bulk-update

Request:
{
  "updates": [
    { "id": 1, "quantity": 50, "reason": "Restock" },
    { "id": 2, "quantity": 30, "reason": "Damage removal" }
  ]
}

Response:
{
  "success": true,
  "updated": 2,
  "results": [...]
}
```

---

### Key Redux Patterns Expected

- **Async Thunks:** Use `createAsyncThunk` for all API calls
- **Loading States:** Track `loading`, `error`, `status` for each slice
- **Error Handling:** Proper error messages and fallback states
- **Normalized State:** Consider normalizing product data to avoid duplication
- **Selectors:** Use memoized selectors for derived data (via `reselect` or `createSelector`)
- **Middleware:** Handle side effects properly (thunks, listeners, or RTK Query if preferred)

---

## Deliverables

1. **Complete React Application** with all three screens
2. **Mock API Setup** (choose your preferred method)
3. **Redux Store** with proper structure and slices
4. **README.md** explaining:
   - How to set up and run the project
   - Architecture decisions and trade-offs
   - Any assumptions made
   - What you'd do differently with more time
5. **Optional: Component Documentation** for complex components

---

## Getting Started

### Starter Template (Optional)

Use Vite, Create React App or your preferred setup:

```bash
npm create vite@latest product-dashboard -- --template react-ts
cd product-dashboard
npm install redux @reduxjs/toolkit react-redux axios
npm install -D tailwindcss postcss autoprefixer
```

### Mock API Options

Choose one approach:

1. **Mock Service Worker (MSW)** – Intercept API calls in the browser
2. **json-server** – Simple file-based API server
3. **Custom Mock Implementation** – Simple async/await simulation
4. **RTK Query** – Redux Toolkit's built-in data fetching solution

---

## Nice-to-Haves (If Time Permits)

- Dark mode toggle
- Product comparison feature
- Advanced filtering with date ranges
- Real-time stock level updates
- Unit tests for Redux slices, components, pure functions
- Integration tests
- E2E tests with Playwright
- Performance monitoring
- Optimistic updates for stock changes

---

## Submission Instructions

1. **Code Repository:** Provide a GitHub link (or zip file if preferred)
2. **Clear Instructions:** Include setup and run commands
3. **Demo Video (Optional):** 3-5 minute walkthrough of features
4. **Reflection Document:** Brief explanation of decisions made

---

## Questions?

If you have clarifications needed, document your assumptions in your README and proceed with reasonable implementations. We value pragmatic decision-making.

**Good luck! We're excited to see your work.**
