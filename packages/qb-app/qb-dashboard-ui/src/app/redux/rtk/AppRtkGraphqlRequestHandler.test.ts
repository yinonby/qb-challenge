
import type { GraphQLFormattedError } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import type { HttpAdapter } from '@qb/client-utils';
import type { LoggerAdapter } from '@qb/utils';
import { handleGraphqlRequest } from './AppRtkGraphqlRequestHandler';

describe('AppRtkGraphqlRequestHandler', () => {
  const warnMock = jest.fn();
  const errorMock = jest.fn();
  const generateHttpAdapterMock = jest.fn();
  const loggerMock: Partial<LoggerAdapter> = {
    warn: warnMock,
    error: errorMock ,
  };
  const requestMock: jest.Mock = jest.fn();
  const httpAdapterMock: HttpAdapter = {
    request: requestMock,
  }
  generateHttpAdapterMock.mockReturnValueOnce(httpAdapterMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleGraphqlRequest', () => {
    it('returns data on successful request', async () => {
      const responseData = { foo: 'bar' };
      const response = { data: responseData };
      requestMock.mockResolvedValueOnce(response);

      const document = 'DOCUMENT';
      const result = await handleGraphqlRequest({
        url: '/test',
        graphql: { document: document },
        httpAdapter: httpAdapterMock,
        logger: loggerMock as LoggerAdapter,
      });

      expect(requestMock).toHaveBeenCalledTimes(1);
      expect(requestMock).toHaveBeenCalledWith({
        url: '/test',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apollo-require-preflight': 'true',
        },
        data: { query: document },
      });
      expect(result).toEqual({
        data: responseData,
      });
    });

    it('returns error on failed request, errors is empty', async () => {
      requestMock.mockResolvedValue({
        errors: [],
      });

      const result = await handleGraphqlRequest({
        url: '/test',
        graphql: { document: '' },
        httpAdapter: httpAdapterMock,
        logger: loggerMock as LoggerAdapter,
      });

      expect(requestMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        error: {
          status: 200,
          appErrCode: 'apiError:server',
          errMsg: undefined,
        },
      });
    });

    it('returns error on failed request, errors is not empty', async () => {
      const error: GraphQLFormattedError = {
        message: 'ERROR',
        extensions: { apiServerErrCode: 'apiError:unknown' },
      }
      requestMock.mockResolvedValue({
        errors: [error],
      });

      const result = await handleGraphqlRequest({
        url: '/test',
        graphql: { document: '' },
        httpAdapter: httpAdapterMock,
        logger: loggerMock as LoggerAdapter,
      });

      expect(requestMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        error: {
          status: 200,
          appErrCode: error.extensions.apiServerErrCode,
          errMsg: error.message,
        },
      });
    });
  });
});
