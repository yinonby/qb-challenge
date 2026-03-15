
import type { AppRtkErrorT } from '@qb-dashboard-ui/types/ErrorTypes';
import type {
  AppRtkHttpAdapterGeneratorProvider, AppRtkQueryArgs,
} from '@qb-dashboard-ui/types/NetworkTypes';
import type { HttpAdapter } from '@qb/client-utils';
import type { LoggerAdapter } from '@qb/utils';
import type { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/query';
import { handleGraphqlRequest } from './AppRtkGraphqlRequestHandler';

export const createAppRtkBaseQuery = (): BaseQueryFn<
  AppRtkQueryArgs,
  unknown,
  AppRtkErrorT
> =>
  async (args, api: BaseQueryApi) => {
    const { url } = args;
    const { appRtkHttpAdapterGeneratorProvider, logger } = api.extra as {
      appRtkHttpAdapterGeneratorProvider: AppRtkHttpAdapterGeneratorProvider,
      logger: LoggerAdapter,
    }
    const httpAdapter: HttpAdapter | null = appRtkHttpAdapterGeneratorProvider.generateHttpAdapter(api, url);

    try {
      if (httpAdapter === null) {
        // this is a bug
        logger.error("Unexpected error when generating an httpAdapter");
        throw new Error("Unexpected error when generating an httpAdapter");
      }

      // --------- GraphQL request handler ----------
      return await handleGraphqlRequest({
        url,
        graphql: args.graphql,
        httpAdapter,
        logger
      });
    } catch (error: unknown) {
      logger.warn("An error ocurred in AppRtkBaseQuery", error);

      return {
        error: {
          status: 500,
          appErrCode: 'apiError:server',
        }
      };
    }
  };
