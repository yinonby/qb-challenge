
import type { DashboardContextT } from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as DashboardLayout from '@qb-dashboard-ui/app/layout/DashboardLayout';
import * as ProductDetailsModel from '@qb-dashboard-ui/domains/product/model/ProductDetailsModel';
import { buildProductDetailsMock } from '@qb/models/test-utils';
import { __puiMocks } from '@qb/platform-ui';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ProductDetailsPageContent } from './ProductDetailsPageContent';

jest.mock('../../common/ModelLoadingView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ModelLoadingView: View,
  };
});

jest.mock('./ProductDetailsView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductDetailsView: View,
  };
});

jest.mock('./ProductImagesView', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    ProductImagesView: View,
  };
});

describe('ProductDetailsPageContent', () => {
  const { mock_useSearchParams, mock_useSetSearchParams, mock_isIos } = __puiMocks;
  const spy_useProductDetailsModel = jest.spyOn(ProductDetailsModel, 'useProductDetailsModel');

  const mock_setParams = jest.fn();
  mock_useSetSearchParams.mockReturnValue({ setParams: mock_setParams });

  const spy_useDashboard = jest.spyOn(DashboardLayout, 'useDashboard');
  const productsPerPage = 2;
  spy_useDashboard.mockReturnValue({
    productsPerPage: productsPerPage,
  } as DashboardContextT);

  beforeEach(() => {
    jest.clearAllMocks();

    mock_isIos.mockReturnValue(false);
    mock_useSearchParams.mockReturnValue({});
  });

  it('displays ModelLoadingView when loading', async () => {
    // setup mocks
    spy_useProductDetailsModel.mockReturnValue({
      isLoading: true,
      isError: false,
    });

    // render
    const { getByTestId } = render(
      <ProductDetailsPageContent productId='PID1' />
    );

    // verify components
    getByTestId('ModelLoadingViewTid');
  });

  it('displays ModelLoadingView when error', async () => {
    // setup mocks
    spy_useProductDetailsModel.mockReturnValue({
      isLoading: false,
      isError: true,
      appErrCode: 'apiError:unknown',
    });

    // render
    const { getByTestId } = render(
      <ProductDetailsPageContent productId='PID1' />
    );

    // verify components
    getByTestId('ModelLoadingViewTid');
  });

  it('displays content', async () => {
    // setup mocks
    spy_useProductDetailsModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productDetails: buildProductDetailsMock() },
    });

    // render
    const { getByTestId } = render(
      <ProductDetailsPageContent productId='PID1' />
    );

    // verify components
    getByTestId('ProductDetailsViewTid');
  });

  it('displays content, images view', async () => {
    // setup mocks
    spy_useProductDetailsModel.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { productDetails: buildProductDetailsMock() },
    });
    mock_useSearchParams.mockReturnValue({
      imgView: 'true',
    });

    // render
    const { getByTestId } = render(
      <ProductDetailsPageContent productId='PID1' />
    );

    // verify components
    getByTestId('ProductImagesViewTid');
  });
});
