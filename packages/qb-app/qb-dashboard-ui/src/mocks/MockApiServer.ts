
import type { MockApiServerProvider } from './MockApiServerDefs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createMockApiServer = (apiUrl: string): MockApiServerProvider => {
  return {
    start: async (): Promise<void> => {
    },

    stop: async (): Promise<void> => {
    },
  }
}
