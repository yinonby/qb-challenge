# Qiibee Challenge
Qiibee Take-Home Coding Challenge

- [Back to main README](../README.md)

## Components Overview

### Functional components

#### Listing
- ProductListingPageContent: handles data fetching, loading and errors.
- ListingView (renders main layout): FiltersButton, ClearFilterButton, apply-all Button, PaginationControl, ProductListingGrid.
- ProductListingGrid: a grid of product cards.
- ProductSummaryView: presents full product details, in a table layout inside a card.

#### Product Details
- ProductDetailsPageContent: handles data fetching, loading and errors.
- ProductDetailsView: presents full product details, with images in a AirbnbImageGrid component; reuses ProductListingGrid for related products rendering.
- ProductImagesView: presents all images of a product.

####  Inventory
- ProductInventoryPageContent: handles data fetching, loading and errors.
- InventoryView (renders main layout): FiltersButton, ClearFilterButton, apply-all Button, PaginationControl, ProductInventoryTable.
- ProductInventoryTableRow: contains a button to edit the product stock.

#### Shared Functional Components
- ModelLoadingView: presents loading indicator, and errors as snackbars
- ClearFilterButton
- PaginationControl
- SortSelect
- CategorySelect
- AvailabilitySelect
- AvailabilityRangeSelect
- OpenCartButton
- AddToCartButton
- AirbnbImageGrid
- PaginationControl
- ShareButton
- ProductListingGrid

## Data Fetching and State Management
- DashboardLayout: this is the root layout, state mangement for the app (uses react context, provides api url etc.)
- RnuiProvider: state management for the `qb/rnui` package (theme, styles etc.)
- AppLocalizationProvider: state management for localization (language code, change language).
- AppErrorHandlingProvider: state management for error handling (recent errors, error callbacks).
- ReduxProvider: state management for redux (from react-redux), initialized with the application's store (creates using createReduxStore()).
- CartSlice: state management for cart (uses redux slice).
- CartProvider: model management and controller that wraps around CartSlice and hides it from the application.
- InventoryUpdateSlice: state management for product batch stock updates (uses redux slice).
- InventoryUpdateProvider: model management and controller that wraps around InventoryUpdateSlice and hides it from the application.
- ProductsCsvThunk: uses `createAsyncThunk` to create a thunk for csv fetching.
