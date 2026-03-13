
import { toProductDetails, toProductSummary, type ProductDetailsT, type ProductSummaryT, type ProductT } from '../../src/types/ProductTypes';

const baseProduct: ProductT = {
  langCode: 'en',
  productId: 'PID1',
  name: 'product name',
  description: 'description',
  fullDescription: 'full description',
  price: {
    currencyCode: 'EUR',
    rate: 3,
  },
  imageUrls: ['fake-url'],
  specifications: {
    weight: {
      specificationText: 'weight',
      specificationValue: '1.3kg',
    }
  },
  category: 'beauty',
  stock: 1,
  reorderLevel: 10,
  popularity: 5,
  reviews: {
    count: 4,
    rating: 4.5,
  },
  createdAtTs: 100,
  stockHistoryItems: [],
};

export const buildProductMock = (overrides?: Partial<ProductT>): ProductT => ({
  ...baseProduct,
  ...overrides,
});

const baseProductSummary = toProductSummary(baseProduct);
export const buildProductSummaryMock = (overrides?: Partial<ProductSummaryT>): ProductSummaryT => ({
  ...baseProductSummary,
  ...overrides,
});

const baseProductDetails = toProductDetails(baseProduct);
export const buildProductDetailsMock = (overrides?: Partial<ProductDetailsT>): ProductDetailsT => ({
  ...baseProductDetails,
  ...overrides,
});
