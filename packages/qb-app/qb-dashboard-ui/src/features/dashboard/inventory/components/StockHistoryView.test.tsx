
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { buildProductStockHistoryItemMock } from '@qb/models/test-utils';
import { __puiMocks } from '@qb/platform-ui';
import { tsToLocalDateString } from '@qb/utils';
import { render } from '@testing-library/react-native';
import React from 'react';
import { StockHistoryView } from './StockHistoryView';

// mocks

jest.mock('@qb/utils', () => ({
  tsToLocalDateString: jest.fn(),
}));

jest.mock('@qb-dashboard-ui/app/localization/AppLocalizationProvider', () => ({
  useAppLocalization: jest.fn(),
}));

// tests

describe('StockHistoryView', () => {
  const mockT = jest.fn();
  const mockLocale = { langTag: 'en-US', timeZone: 'UTC' };
  const { mock_usePlatformUiDeviceLocale } = __puiMocks;
  const mock_tsToLocalDateString = tsToLocalDateString as jest.Mock;
  const mock_useAppLocalization = useAppLocalization as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mock_useAppLocalization.mockReturnValue({ t: mockT });
    mock_usePlatformUiDeviceLocale.mockReturnValue(mockLocale);
    mock_tsToLocalDateString.mockImplementation((ts) => `date:${ts}`);
    mockT.mockImplementation((key) => key);
  });

  it('renders stock history items sorted by changeTs descending', () => {
    const productStockHistoryItems = [
      buildProductStockHistoryItemMock({ changeTs: 1000, previousStock: 5, newStock: 10, change: 5 }),
      buildProductStockHistoryItemMock({ changeTs: 2000, previousStock: 3, newStock: 7, change: 4 }),
    ];

    const { getAllByText } = render(<StockHistoryView productStockHistoryItems={productStockHistoryItems} />);

    // Should sort: 2000 first, then 1000
    const dateTexts = getAllByText(/date:/).map((el) => el.props.children);
    expect(dateTexts).toEqual(['date:2000', 'date:1000']);
  });

  it('calls localization function for labels', () => {
    const productStockHistoryItems = [
      buildProductStockHistoryItemMock({ changeTs: 1000, previousStock: 5, newStock: 10, change: 5 }),
    ];

    render(<StockHistoryView productStockHistoryItems={productStockHistoryItems} />);

    expect(mockT).toHaveBeenCalledWith('app:changedOn');
    expect(mockT).toHaveBeenCalledWith('app:prevStockLevel');
    expect(mockT).toHaveBeenCalledWith('app:newStockLevel');
    expect(mockT).toHaveBeenCalledWith('app:changeNum');
  });

  it('renders stock values correctly', () => {
    const productStockHistoryItems = [
      buildProductStockHistoryItemMock({ changeTs: 1234, previousStock: 335, newStock: 1330, change: 255 }),
    ];

    const { getByText } = render(<StockHistoryView productStockHistoryItems={productStockHistoryItems} />);

    expect(getByText('335')).toBeTruthy();
    expect(getByText('1330')).toBeTruthy();
    expect(getByText('255')).toBeTruthy(); // change
    expect(getByText('date:1234')).toBeTruthy();
  });

  it('renders empty list without crashing', () => {
    const view = render(<StockHistoryView productStockHistoryItems={[]} />);
    expect(view).toBeTruthy();
  });
});
