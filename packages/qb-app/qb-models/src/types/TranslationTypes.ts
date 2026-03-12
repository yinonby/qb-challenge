
import type { ApiServerErrorCodeT } from './ErrorTypes';
import type { ProductCategoryT, SortT } from './ProductTypes';

export type AppTextTranslationKeyT =
  | 'app:dashboard'
  | 'app:productListing'
  | 'app:productDetails'
  | 'app:inventoryManagement'
  | 'app:productName'
  | 'app:description'
  | 'app:fullDescription'
  | 'app:price'
  | 'app:category'
  | 'app:stockLevel'
  | 'app:prevStockLevel'
  | 'app:newStockLevel'
  | 'app:reorderLevel'
  | 'app:popularity'
  | 'app:reviews'
  | 'app:count'
  | 'app:rating'
  | 'app:reason'
  | 'app:changeNum'
  | 'app:lastUpdateTime'
  | 'app:next'
  | 'app:previous'
  | 'app:filterAndSort'
  | 'app:sort'
  | 'app:all'
  | 'app:availability'
  | 'app:inStock'
  | 'app:outOfStock'
  | 'app:apply'
  | 'app:noProducts'
  | 'app:darkMode'
  | 'app:language'
;

export type ProductCategoryTranslationKeyT =
  | 'category:beauty'
  | 'category:entertainment'
  | 'category:food'
  | 'category:electronics'
;

export const productCategoryToTranslationKeyMap: Record<ProductCategoryT, ProductCategoryTranslationKeyT> = {
  beauty: 'category:beauty',
  entertainment: 'category:entertainment',
  food: 'category:food',
  electronics: 'category:electronics',
}

export type SortOptionTranslationKeyT =
  | 'sort:priceAscending'
  | 'sort:priceDescending'
  | 'sort:popularity'
  | 'sort:newest'
;

export const sortOptionToTranslationKeyMap: Record<SortT, SortOptionTranslationKeyT> = {
  priceAscending: 'sort:priceAscending',
  priceDescending: 'sort:priceDescending',
  popularity: 'sort:popularity',
  newest: 'sort:newest',
}

export type AppTranslationKeyT =
  | ApiServerErrorCodeT
  | ProductCategoryTranslationKeyT
  | SortOptionTranslationKeyT
  | AppTextTranslationKeyT
;
