
import type { AppErrorHandlingContextT } from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import * as AppErrorHandlingProvider from '@qb-dashboard-ui/app/error-handling/AppErrorHandlingProvider';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Share } from 'react-native';
import { AirbnbImageGrid } from './AirbnbImageGrid';

describe('AirbnbImageGrid', () => {
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

  it('renders grid with 5 images', () => {
    const images = [
      'img1',
      'img2',
      'img3',
      'img4',
      'img5',
    ];
    const { getByTestId } = render(
      <AirbnbImageGrid images={images} />
    );

    getByTestId('Image_1');
    getByTestId('Image_2_of_5');
    getByTestId('Image_3_of_5');
    getByTestId('Image_4_of_5');
    getByTestId('Image_5_of_5');
  });

  it('renders grid with 3 images', () => {
    const images = [
      'img1',
      'img2',
      'img3',
    ];
    const { getByTestId } = render(
      <AirbnbImageGrid images={images} />
    );

    getByTestId('Image_1');
    getByTestId('Image_2_of_3');
    getByTestId('Image_3_of_3');
  });

  it('renders grid with 2 images', () => {
    const images = [
      'img1',
      'img2',
    ];
    const { getByTestId } = render(
      <AirbnbImageGrid images={images} />
    );

    getByTestId('Image_1');
    getByTestId('Image_2_of_2');
  });

  it('renders grid with 1 image', () => {
    const images = [
      'img1',
    ];
    const { getByTestId } = render(
      <AirbnbImageGrid images={images} />
    );

    getByTestId('Image_1');
  });
});
