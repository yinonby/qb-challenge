# Qiibee Challenge
Qiibee Take-Home Coding Challenge

- [Back to main README](../README.md)

## Requirements

#### Screen 1: [Product Listing Page](http://localhost:4100/app/dashboard/listing)

- ✅ Display products in a grid or table layout
- ✅ Show: Product name, image, price, stock status, category
- ✅ **Filtering:** Filter by category and availability (in stock/out of stock)
- ✅ **Sorting:** Sort by price (ascending/descending), popularity, or newest
- ✅ **Pagination:** Load 12 products per page with "Load More" or pagination controls
- ✅ **(web only)** **Search:** Real-time search by product name
- ✅ **Loading & Error States:** Display loading skeletons and error messages gracefully

#### Screen 2: [Product Details Page](http://localhost:4100/app/dashboard/product/APL-IP17PRO256)

- ✅ Display complete product information
- ✅ Show: Full description, images, pricing, specifications, reviews count
- ✅ **Stock Info:** Current inventory level, last updated timestamp
- ✅ **Related Products:** Show 3-4 similar products from the same category
- ✅ **Actions:** Add to cart, View inventory, Share product
- ✅ **Back Navigation:** Easy way to return to product list

#### Screen 3: [Inventory Management Page](http://localhost:4100/app/dashboard/inventory)
- ✅ Table showing all products with current stock levels
- ✅ **Update Stock:** Inline or modal-based stock adjustment
- ✅ **Bulk Actions:** Select multiple products to adjust stock levels at once
- ✅ **History/Logging:** Show recent stock changes (timestamp, change amount, reason)
- ✅ **Filters:** Filter by category, low stock threshold
- ✅ **(web only)** **Export:** Option to export inventory data (CSV or similar)

## Nice-to-Haves (If Time Permits)

- ✅ Dark mode toggle
- Product comparison feature
- Advanced filtering with date ranges
- Real-time stock level updates
- ✅ Unit tests for Redux slices, components, pure functions
- Integration tests
- E2E tests with Playwright
- Performance monitoring
- Optimistic updates for stock changes

### Key Redux Patterns Expected

- ✅ **Async Thunks:** Use `createAsyncThunk` for all API calls
- ✅ **Loading States:** Track `loading`, `error`, `status` for each slice
- ✅ **Error Handling:** Proper error messages and fallback states
- **Normalized State:** Consider normalizing product data to avoid duplication
- **Selectors:** Use memoized selectors for derived data (via `reselect` or `createSelector`)
- ✅ **Middleware:** Handle side effects properly (thunks, listeners, or RTK Query if preferred)

## Extras
- ✅ Language selection (currently English or French).
- ✅ Cart
