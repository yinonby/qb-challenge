/* istanbul ignore file -- @preserve */

import { ConsoleLogger } from '@qb/client-utils';
import type { LoggerAdapter } from '@qb/utils';

export const useClientLogger = (): LoggerAdapter => {
  return new ConsoleLogger();
};
