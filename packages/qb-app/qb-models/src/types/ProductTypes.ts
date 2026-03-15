
import { type LangCodeT, type PriceT } from '@qb/utils';

// Database structures

const _qbLangCodes = ['en', 'fr'] as const satisfies readonly LangCodeT[];
export type QbLangCodeT = typeof _qbLangCodes[number];
export const qbLangCodes: QbLangCodeT[] = [..._qbLangCodes];
export const DEFAULT_QB_LANG_CODE = 'en';

export type ProductIdT = string;

const _productCategories = ['beauty', 'entertainment' , 'food' , 'electronics'] as const;
export type ProductCategoryT = typeof _productCategories[number];
export const productCategories: ProductCategoryT[] = [..._productCategories];

export type ProductT = BaseProductT & ProductTranslatedValuesT;

export type BaseProductT = {
  productId: ProductIdT,
  price: PriceT,
  imageUrls: string[],
  category: ProductCategoryT,
  stock: number,
  reorderLevel: number,
  popularity: number, // 0-100
  reviews?: {
    count: number,
    rating: number, // 0-5
  },
  createdAtTs: number,
  stockHistoryItems: ProductStockHistoryItemT[],
}

export type StockHistoryItemIdT = string;
export type ProductStockHistoryItemT = {
  stockHistoryItemId: StockHistoryItemIdT,
  productId: ProductIdT,
  previousStock: number,
  newStock: number,
  reason: string,
  change: number,
  changeTs: number,
};

export type ProductTranslatedValuesT = {
  langCode: QbLangCodeT,
  name: string,
  description: string,
  fullDescription: string,
  specifications?: Record<string, TranslatedProductSpecificationT>,
}

export type TranslatedProductSpecificationT = {
  specificationText: string,
  specificationValue: string | number,
}

// API structures

export type AvailabilityOptionT = { // range limit
  minStock: number | undefined,
  maxStock: number | undefined,
}

const _sortOptions = ['priceAscending', 'priceDescending', 'popularity', 'newest'] as const;
export type SortT = typeof _sortOptions[number];
export const sortOptions: SortT[] = [..._sortOptions];
export const DEFAULT_SORT_OPTION = 'priceAscending';

export type ProductSummaryT = Pick<ProductT,
  | 'productId'
  | 'name'
  | 'description'
  | 'price'
  | 'category'
  | 'stock'
  | 'popularity'
  | 'createdAtTs'
> & {
  langCode: QbLangCodeT,
  imageUrl: string,
};

export function toProductSummary(product: ProductT): ProductSummaryT {
  return {
    productId: product.productId,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
    popularity: product.popularity,
    createdAtTs: product.createdAtTs,
    langCode: product.langCode,
    imageUrl: product.imageUrls[0],
  }
}

export type ProductDetailsT = Pick<ProductT,
  | 'productId'
  | 'name'
  | 'description'
  | 'fullDescription'
  | 'price'
  | 'imageUrls'
  | 'category'
  | 'stock'
  | 'popularity'
  | 'reviews'
  | 'createdAtTs'
> & {
  langCode: QbLangCodeT,
  specifications?: Record<string, TranslatedProductSpecificationT>,
  lastStockUpdateTs: number,
};

export function toProductDetails(product: ProductT): ProductDetailsT {
  const lastStockUpdateTs = product.stockHistoryItems.length ?
    product.stockHistoryItems[product.stockHistoryItems.length - 1].changeTs : product.createdAtTs;

  return {
    productId: product.productId,
    name: product.name,
    description: product.description,
    fullDescription: product.fullDescription,
    price: product.price,
    imageUrls: product.imageUrls,
    specifications: product.specifications,
    category: product.category,
    stock: product.stock,
    popularity: product.popularity,
    reviews: product.reviews,
    createdAtTs: product.createdAtTs,
    langCode: product.langCode,
    lastStockUpdateTs: lastStockUpdateTs,
  }
}

export type ProductInventoryDetailsT = Pick<ProductT,
  | 'productId'
  | 'name'
  | 'category'
  | 'reorderLevel'
> & {
  currentStock: number,
  lastStockUpdateTs: number,
};
