
import type { GraphQLFormattedError } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import type { AppRtkErrorT } from '@qb-dashboard-ui/types/ErrorTypes';
import type { AppRtkQueryReturnValue } from '@qb-dashboard-ui/types/NetworkTypes';
import type { HttpAdapter } from '@qb/client-utils';
import type { LoggerAdapter } from '@qb/utils';

export type GraphqlResponseT = {
  data: null | object,
  errors?: GraphQLFormattedError[]
};

export const handleGraphqlRequest = async (args: {
  url: string,
  graphql: {
    document: string; // GraphQL query string
    variables?: Record<string, string | number | object>;
  },
  httpAdapter: HttpAdapter,
  logger: LoggerAdapter,
}): Promise<AppRtkQueryReturnValue<unknown, AppRtkErrorT>> => {
  const { url, graphql, httpAdapter, logger } = args;
  const { document, variables } = graphql;

  const result = await httpAdapter.request({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apollo-require-preflight': 'true',
    },
    data: { query: document, variables },
  }) as GraphqlResponseT;

   // GraphQL responses usually have { data, errors }

  if (result.errors !== undefined) {
    logger.warn('Graphql query responded with errors', result.errors);

    return {
      error: {
        status: 200,
        appErrCode: result.errors.length ? result.errors[0].extensions.apiServerErrCode : 'apiError:server',
        errMsg: result.errors.length ? result.errors[0].message : undefined,
      }
    }
  }

  return { data: result.data };
}
