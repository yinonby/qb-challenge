
import type { AppErrorHandlingContextT } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import * as AppErrorHandlingProvider from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import { fireEvent, render } from '@testing-library/react-native';
import React, { act } from 'react';
import { Share } from 'react-native';
import { ShareButton } from './ShareButton';

// mocks

jest.mock('@qb-dashboard-ui/logger/ClientLogger', () => ({
  useClientLogger: () => ({
    info: jest.fn(),
  }),
}));

// tests

describe('ShareButton', () => {
  const spy_useAppErrorHandling = jest.spyOn(AppErrorHandlingProvider, 'useAppErrorHandling');
  const mock_onUnknownError = jest.fn();
  spy_useAppErrorHandling.mockReturnValue({
    onUnknownError: mock_onUnknownError,
  } as unknown as AppErrorHandlingContextT)
  const spy_share = jest.spyOn(Share, 'share');

  beforeEach(() => {
    jest.clearAllMocks();

    spy_share.mockImplementation();
  });

  it('renders share icon button', () => {
    const { getByTestId } = render(
      <ShareButton shareStr="hello world" />
    );

    expect(getByTestId('RnuiIconButtonTid')).toBeTruthy();
  });

  it('calls Share.share with the correct message', async () => {
    const { getByTestId } = render(
      <ShareButton shareStr="share this text" />
    );

    fireEvent.press(getByTestId('RnuiIconButtonTid'));

    expect(spy_share).toHaveBeenCalledWith({
      message: 'share this text',
    });
  });

  it('handles share errors with AbortError', async () => {
    class AbortError extends Error {
      constructor() {
        super('AbortError');
        this.name = 'AbortError';
      }
    }
    spy_share.mockRejectedValue(new AbortError());

    const { getByTestId } = render(
      <ShareButton shareStr="test" />
    );

    await act(async () => {
      fireEvent.press(getByTestId('RnuiIconButtonTid'));
    })

    expect(mock_onUnknownError).not.toHaveBeenCalled()
  });

  it('handles share errors with onUnknownError', async () => {
    const error = 'ERROR';
    spy_share.mockRejectedValue(error);

    const { getByTestId } = render(
      <ShareButton shareStr="test" />
    );

    await act(async () => {
      fireEvent.press(getByTestId('RnuiIconButtonTid'));
    })

    expect(mock_onUnknownError).toHaveBeenCalledWith(error)
  });

  it('applies custom style', () => {
    const style = { marginTop: 10 };

    const { getByTestId } = render(
      <ShareButton shareStr="test" style={style} />
    );

    expect(getByTestId('RnuiIconButtonTid').props.style).toMatchObject(style);
  });
});
