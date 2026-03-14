
import type { ProductSummaryT } from '@qb/models';
import { buildProductSummaryMock } from '@qb/models/test-utils';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ProductInventoryTable } from './ProductInventoryTable';

jest.mock('@qb-dashboard-ui/app/localization/AppLocalizationProvider', () => ({
  useAppLocalization: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@qb-dashboard-ui/types/GenericStyles', () => ({
  useGenericStyles: () => ({
    flexRow: {},
    flexRowReverse: {},
  }),
}));

describe('ProductInventoryTable', () => {
  const products: ProductSummaryT[] = [
    buildProductSummaryMock({ name: 'Product 1', stock: 10 }),
    buildProductSummaryMock({ name: 'Product 2', stock: 5 }),
  ];

  it('renders product rows', () => {
    const { getByText } = render(
      <ProductInventoryTable productSummaries={products} />
    );

    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('toggles individual checkbox', () => {
    const { getAllByTestId } = render(
      <ProductInventoryTable productSummaries={products} />
    );

    const checkboxes = getAllByTestId('ItemCheckbox');
    const checkbox1 = checkboxes[0];
    expect(checkbox1.props.status).toEqual('unchecked');

    fireEvent.press(checkbox1);
    expect(checkbox1.props.status).toEqual('checked');
  });

  it('toggles all-items checkbox', () => {
    const { getAllByTestId, getByTestId } = render(
      <ProductInventoryTable productSummaries={products} />
    );

    const allItemCheckbox = getByTestId('AllItemsCheckbox');
    expect(allItemCheckbox.props.status).toEqual('unchecked');

    const checkboxes = getAllByTestId('ItemCheckbox');
    const checkbox1 = checkboxes[0];
    expect(checkbox1.props.status).toEqual('unchecked');
    const checkbox2 = checkboxes[1];
    expect(checkbox2.props.status).toEqual('unchecked');

    fireEvent.press(checkbox1);
    expect(allItemCheckbox.props.status).toEqual('indeterminate');

    fireEvent.press(checkbox2);
    expect(allItemCheckbox.props.status).toEqual('checked');
  });

  it('toggles all items when select-all checkbox pressed', () => {
    const { getAllByTestId, getByTestId } = render(
      <ProductInventoryTable productSummaries={products} />
    );

    const allItemCheckbox = getByTestId('AllItemsCheckbox');
    expect(allItemCheckbox.props.status).toEqual('unchecked');

    const checkboxes = getAllByTestId('ItemCheckbox');
    const checkbox1 = checkboxes[0];
    expect(checkbox1.props.status).toEqual('unchecked');
    const checkbox2 = checkboxes[1];
    expect(checkbox2.props.status).toEqual('unchecked');

    fireEvent.press(allItemCheckbox);
    expect(allItemCheckbox.props.status).toEqual('checked');
    expect(checkbox1.props.status).toEqual('checked');
    expect(checkbox2.props.status).toEqual('checked');

    fireEvent.press(allItemCheckbox);
    expect(allItemCheckbox.props.status).toEqual('unchecked');
    expect(checkbox1.props.status).toEqual('unchecked');
    expect(checkbox2.props.status).toEqual('unchecked');
  });
});
