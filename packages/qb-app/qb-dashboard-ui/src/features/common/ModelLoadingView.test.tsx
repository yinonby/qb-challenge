
import type { AppErrorHandlingContextT } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import * as AppErrorHandlingProvider from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import { render } from '@testing-library/react-native';
import React from 'react';
import { ModelLoadingView } from './ModelLoadingView';

// tests

describe('ModelLoadingView', () => {
  const spy_useAppErrorHandling = jest.spyOn(AppErrorHandlingProvider, 'useAppErrorHandling');
  const mock_onAppError = jest.fn();

  spy_useAppErrorHandling.mockReturnValue({ onAppError: mock_onAppError } as unknown as AppErrorHandlingContextT);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading screen', () => {
    const { getByTestId } = render(
      <ModelLoadingView isLoading={true} appErrCode={null} />
    );

    getByTestId("RnuiActivityIndicator-tid");
  });

  it('renders error', () => {
    render(
      <ModelLoadingView isLoading={false} appErrCode={'apiError:server'} />
    );

    expect(mock_onAppError).toHaveBeenCalledWith("apiError:server");
  });
});
