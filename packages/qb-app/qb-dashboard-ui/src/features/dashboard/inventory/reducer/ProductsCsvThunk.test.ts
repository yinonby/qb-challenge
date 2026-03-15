
import { MockAxiosClient } from '@qb-dashboard-ui/mocks/MockAxiosClient';
import type { AppRtkErrorT } from '@qb-dashboard-ui/types/ErrorTypes';
import type { AppErrorCodeT } from '@qb/models';
import { fetchProductsCsv } from './ProductsCsvThunk';

jest.mock('@qb-dashboard-ui/mocks/MockAxiosClient', () => ({
  MockAxiosClient: jest.fn(),
}));

describe('fetchProductsCsv', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = {};

  const mockRequest = jest.fn();
  const mock_MockAxiosClient = MockAxiosClient as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mock_MockAxiosClient.mockImplementation(() => ({
      request: mockRequest,
    }));
  });

  it('should return csv data when request succeeds', async () => {
    const csvStr = 'id,name\n1,Test';

    mockRequest.mockResolvedValue({
      data: { csvStr },
    });

    const thunk = fetchProductsCsv({ langTag: 'en', timeZone: 'UTC' });

    const result = await thunk(dispatch, getState, extra);

    expect(mockRequest).toHaveBeenCalledWith({
      url: '/product/csv',
      method: 'POST',
      data: {
        query: expect.anything(),
        variables: { langTag: 'en', timeZone: 'UTC' },
      },
    });

    expect(result.type).toBe('/product/csv/fulfilled');
    expect(result.payload).toEqual({
      data: { csvStr },
    });
  });

  it('should return error when API returns error', async () => {
    const error: AppRtkErrorT = {
      status: 400,
      appErrCode: 'apiError:test' as AppErrorCodeT,
    };

    mockRequest.mockResolvedValue({
      error,
    });

    const thunk = fetchProductsCsv({ langTag: 'en', timeZone: undefined });

    const result = await thunk(dispatch, getState, extra);

    expect(result.type).toBe('/product/csv/fulfilled');
    expect(result.payload).toEqual({ error });
  });

  it('should return server error when request throws', async () => {
    mockRequest.mockRejectedValue(new Error('network error'));

    const thunk = fetchProductsCsv({ langTag: 'en', timeZone: 'UTC' });

    const result = await thunk(dispatch, getState, extra);

    expect(result.type).toBe('/product/csv/fulfilled');
    expect(result.payload).toEqual({
      error: {
        status: 200,
        appErrCode: 'apiError:unknown',
      },
    });
  });
});
