
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ProductNameInput } from './ProductNameInput';

// mocks

jest.mock('@qb-dashboard-ui/app/localization/AppLocalizationProvider', () => {
  return {
    useAppLocalization: jest.fn(),
  };
});

// tests

describe('ProductNameInput', () => {
  const mockT = jest.fn();
  const mock_useAppLocalization = useAppLocalization as jest.Mock;
  mock_useAppLocalization.mockReturnValue({
    t: mockT,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockT.mockImplementation((key: string) => key);
  });

  it('renders label using localization', () => {
    const { getByTestId } = render(
      <ProductNameInput value="abc" onChange={jest.fn()} />
    );

    expect(mockT).toHaveBeenCalledWith('app:productName');

    const input = getByTestId('ProductNameInputTid');
    expect(input).toBeTruthy();
  });

  it('uses empty string when value is undefined', () => {
    const { getByTestId } = render(
      <ProductNameInput value={undefined} onChange={jest.fn()} />
    );

    const input = getByTestId('ProductNameInputTid');

    expect(input.props.value).toBe('');
  });

  it('calls onChange when text changes', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <ProductNameInput value="123" onChange={onChange} />
    );

    const input = getByTestId('ProductNameInputTid');

    fireEvent.changeText(input, '456');

    expect(onChange).toHaveBeenCalledWith('456');
  });

  it('renders provided value', () => {
    const { getByTestId } = render(
      <ProductNameInput value="789" onChange={jest.fn()} />
    );

    const input = getByTestId('ProductNameInputTid');

    expect(input.props.value).toBe('789');
  });
});
