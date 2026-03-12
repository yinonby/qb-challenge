
import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { createAppRtkBaseQuery } from './AppRtkBaseQuery';
import * as AppRtkGraphqlRequestHandler from './AppRtkGraphqlRequestHandler';

describe('AppRtkBaseQuery', () => {
  const warnMock = jest.fn();
  const errorMock = jest.fn();
  const generateHttpAdapterMock = jest.fn();
  const handleGraphqlRequestSpy = jest.spyOn(AppRtkGraphqlRequestHandler, 'handleGraphqlRequest');

  const api = {
    extra: {
      appRtkHttpAdapterGeneratorProvider: {
        generateHttpAdapter: generateHttpAdapterMock,
      },
      logger: { warn: warnMock, error: errorMock },
    }
  } as unknown as BaseQueryApi;
  const extraOptions = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAppRtkBaseQuery', () => {
    it('defaults status to 500 when httpAdapter is null', async () => {
      generateHttpAdapterMock.mockReturnValueOnce(null);

      const baseQuery = createAppRtkBaseQuery();

      const result = await baseQuery(
        {
          url: '/test',
          kind: 'graphql',
          graphql: { document: '' }
        },
        api,
        extraOptions
      );

      expect(errorMock).toHaveBeenCalled();
      expect(result).toEqual({
        error: {
          status: 500,
          appErrCode: 'apiError:server',
        },
      });
    });

    it('calls handleGraphqlRequest', async () => {
      const response = { data: 'bar' };
      handleGraphqlRequestSpy.mockResolvedValueOnce(response);

      const baseQuery = createAppRtkBaseQuery();

      const result = await baseQuery(
        {
          url: '/test',
          kind: 'graphql',
          graphql: { document: '' }
        },
        api,
        extraOptions
      );

      expect(handleGraphqlRequestSpy).toHaveBeenCalledTimes(1);
      expect(handleGraphqlRequestSpy).toHaveBeenCalledWith(expect.objectContaining({
        url: '/test',
        graphql: { document: '' }
      }));
      expect(result).toEqual(response);
    });
  });
});
