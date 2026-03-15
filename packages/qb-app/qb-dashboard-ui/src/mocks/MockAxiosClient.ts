
import { handleMockApiServerRequest } from '@qb-dashboard-ui/mocks/MockApiRequestHandler';
import type { GraphQLBody } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import { type HttpAdapter, type HttpMethod } from '@qb/client-utils';

// This mock Axios client is used to bypass network requests on mobile
export class MockAxiosClient implements HttpAdapter {
  async request<TResponse, TData = unknown>(options: {
    url: string;
    method: HttpMethod;
    headers?: Record<string, string>,
    data?: TData;
  }): Promise<TResponse> {
    const { query, variables } = options.data as GraphQLBody;

    const response = handleMockApiServerRequest(query, variables);

    return response as TResponse;
  }
}
