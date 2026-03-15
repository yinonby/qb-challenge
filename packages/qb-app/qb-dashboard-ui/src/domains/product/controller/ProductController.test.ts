
import { AppError } from '@qb-dashboard-ui/types/ErrorTypes';
import { act, renderHook } from '@testing-library/react-native';
import { extractAppErrorCodeFromUnknownObject } from '../model/AppRtkErrorUtils';
import { useUpdateProducBatchMutation } from '../rtk/ProductRtkApi';
import { useProductController } from './ProductController';

jest.mock('../rtk/ProductRtkApi');
jest.mock('../model/AppRtkErrorUtils');

describe('useProductController', () => {
  const mockUpdateProductBatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useUpdateProducBatchMutation as jest.Mock).mockReturnValue([
      mockUpdateProductBatch,
    ]);
  });

  it('calls updateProductBatch with correct params', async () => {
    const mockData = { success: true };

    mockUpdateProductBatch.mockResolvedValue({
      data: mockData,
      error: undefined,
    });

    const { result } = renderHook(() => useProductController());

    const payload = [{ productId: 'p1', newStock: 10, reason: 'MOCK_REASON' }];

    await act(async () => {
      await result.current.onUpdateProductBatch(payload);
    });

    expect(mockUpdateProductBatch).toHaveBeenCalledWith({
      updateProductStockInfos: payload,
    });
  });

  it('returns data when mutation succeeds', async () => {
    const mockData = { success: true };

    mockUpdateProductBatch.mockResolvedValue({
      data: mockData,
      error: undefined,
    });

    const { result } = renderHook(() => useProductController());

    let response;

    await act(async () => {
      response = await result.current.onUpdateProductBatch([]);
    });

    expect(response).toEqual(mockData);
  });

  it('throws AppError when mutation returns error', async () => {
    const mockError = { status: 500 };

    mockUpdateProductBatch.mockResolvedValue({
      error: mockError,
      data: undefined,
    });

    (extractAppErrorCodeFromUnknownObject as jest.Mock).mockReturnValue('SERVER_ERROR');

    const { result } = renderHook(() => useProductController());

    await expect(
      result.current.onUpdateProductBatch([])
    ).rejects.toBeInstanceOf(AppError);

    expect(extractAppErrorCodeFromUnknownObject).toHaveBeenCalledWith(mockError);
  });
});
