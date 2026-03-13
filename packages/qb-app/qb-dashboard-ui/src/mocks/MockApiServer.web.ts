
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { handleMockApiServerRequest } from './MockApiRequestHandler';
import {
  type GetProductsPageParamsT,
  type GraphQLBody,
  type MockApiServerProvider
} from './MockApiServerDefs';

export const createMockApiServer = (apiUrl: string): MockApiServerProvider => {
  const server = setupWorker(
    http.post(apiUrl + '/product/graphql', async ({ request }) => {
      const body = await request.json() as GraphQLBody;
      const { query, variables } = body;

      const response = handleMockApiServerRequest(query, variables as GetProductsPageParamsT);
      return HttpResponse.json(response);
    }),
  );

  return {
    start: async (): Promise<void> => {
      await server.start({
        onUnhandledRequest: 'bypass',
      });
    },

    stop: async (): Promise<void> => {
      server.stop();
    },
  }
}

