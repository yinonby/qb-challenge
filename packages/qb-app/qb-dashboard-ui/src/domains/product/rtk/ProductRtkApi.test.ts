
import { appRtkApiReducerPath } from '@qb-dashboard-ui/app/redux/rtk/AppRtkApi';
import type {
  GetProductDetailsResponseT,
  GetProductSummariesPaginatedResponseT,
  UpdateProductBatchResponseT
} from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import type { AppRtkHttpAdapterGeneratorProvider } from '@qb-dashboard-ui/types/NetworkTypes';
import { AxiosClient, type HttpAdapter } from '@qb/client-utils';
import { buildProductDetailsMock } from '@qb/models/test-utils';
import type { LoggerAdapter } from '@qb/utils';
import { configureStore } from '@reduxjs/toolkit';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  productRtkApiEndpoints,
  productRtkApiMiddleware, productRtkApiReducer,
} from './ProductRtkApi';

const apiUrl = 'https://api.test';
const productId1 = 'PID1';
let currentRequest: 'getProductsPage' | 'getProductDetails' | 'updateProducBatcht' | 'error' = 'error';

const getProductResponse: GetProductDetailsResponseT = {
  data: {
    productDetails: buildProductDetailsMock({
      productId: productId1,
    }),
  },
};

const getProductsPageResponse: GetProductSummariesPaginatedResponseT = {
  data: {
    data: [],
    total: 0,
    page: 0,
    limit: 12,
  },
};

const productUpdateResponse: UpdateProductBatchResponseT = {
  data: {
    stockHistoryItemId: 'CHANGE1',
    productId: 'PID1',
    previousStock: 4,
    newStock: 5,
    reason: 'eason',
    change: 4,
    changeTs: 200,
  },
};

export const server = setupServer(
  http.post(apiUrl + '/product/graphql', () => {
    if (currentRequest === 'getProductsPage') {
      return HttpResponse.json(getProductsPageResponse);
    } else if (currentRequest === 'getProductDetails') {
      return HttpResponse.json(getProductResponse);
    } else if (currentRequest === 'updateProducBatcht') {
      return HttpResponse.json(productUpdateResponse);
    } else if (currentRequest === 'error') {
      return HttpResponse.json({
        errors: [{ message: 'ERROR' }],
      });
    }
  }),
);

export const createTestStore = () => {
  const appRtkHttpAdapterGeneratorProviderMock: AppRtkHttpAdapterGeneratorProvider = {
    generateHttpAdapter: (): HttpAdapter | null => {
      return new AxiosClient(apiUrl);
    }
  }
  const logger: LoggerAdapter = {
    trace: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }

  // gameUiConfigReducer is needed inside appRtkApiReducer to get gameUiConfig
  return configureStore({
    reducer: {
      [appRtkApiReducerPath]: productRtkApiReducer,
    },
    middleware: (gDM) => gDM({
      thunk: {
        extraArgument: {
          appRtkHttpAdapterGeneratorProvider: appRtkHttpAdapterGeneratorProviderMock,
          logger: logger,
        },
      },
    }).concat(productRtkApiMiddleware),
  });
}


describe('ProductRtkApi', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  describe('getProductSummariesPaginated', () => {
    it('succeeds', async () => {
      const store = createTestStore();

      currentRequest = 'getProductsPage';
      const rtkResult = await store.dispatch(
        productRtkApiEndpoints.getProductSummariesPaginated.initiate({
          langCode: 'en',
          pageNum: 2,
          productsPerPage: 5,
          category: 'beauty',
          availability: { minStock: undefined, maxStock: 0 },
          sort: 'priceAscending',
        })
      );

      expect(rtkResult.data).toEqual(getProductsPageResponse.data);
    });

    it('fails and handles error', async () => {
      const store = createTestStore();

      currentRequest = 'error';
      const rtkResult = await store.dispatch(
        productRtkApiEndpoints.getProductSummariesPaginated.initiate({
          langCode: 'en',
          pageNum: 2,
          productsPerPage: 5,
          category: 'beauty',
          availability: { minStock: undefined, maxStock: 0 },
          sort: 'priceAscending',
        })
      );

      expect(rtkResult.isError).toBeTruthy();
      expect(rtkResult.data).toBeUndefined();
    });
  });

  describe('getProductDetails', () => {
    it('succeeds', async () => {
      const store = createTestStore();

      currentRequest = 'getProductDetails';
      const rtkResult = await store.dispatch(
        productRtkApiEndpoints.getProductDetails.initiate({
          langCode: 'en',
          productId: 'PID1',
        })
      );

      expect(rtkResult.data).toEqual(getProductResponse.data);
    });

    it('fails and handles error', async () => {
      const store = createTestStore();

      currentRequest = 'error';
      const rtkResult = await store.dispatch(
        productRtkApiEndpoints.getProductDetails.initiate({
          langCode: 'en',
          productId: 'PID1',
        })
      );

      expect(rtkResult.isError).toBeTruthy();
      expect(rtkResult.data).toBeUndefined();
    });
  });

  describe('updateProducBatcht', () => {
    it('succeeds', async () => {
      const store = createTestStore();

      currentRequest = 'updateProducBatcht';
      const rtkResult = await store.dispatch(
        productRtkApiEndpoints.updateProducBatcht.initiate({
          productStockUpdates: [{
            productId: 'PID1',
            newStock: 30,
            reason: 'reason',
          }],
        })
      );

      expect(rtkResult.data).toEqual(productUpdateResponse.data);
    });

    it('fails and handles error', async () => {
      const store = createTestStore();

      currentRequest = 'error';
      const rtkResult = await store.dispatch(
        productRtkApiEndpoints.updateProducBatcht.initiate({
          productStockUpdates: [{
            productId: 'PID1',
            newStock: 30,
            reason: 'reason',
          }],
        })
      );

      expect(rtkResult.error).toBeDefined();
      expect(rtkResult.data).toBeUndefined();
    });
  });
});
