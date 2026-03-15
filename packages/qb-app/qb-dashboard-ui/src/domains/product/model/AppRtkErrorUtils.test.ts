
import { extractAppErrorCodeFromUnknownObject } from './AppRtkErrorUtils';

describe('AppRtkErrorUtils', () => {
  describe('extractAppErrorCodeFromUnknownObject', () => {
    it('returns appErrCode when present on the object', () => {
      const error = { appErrCode: 'ERROR' } as unknown;
      const code = extractAppErrorCodeFromUnknownObject(error);
      expect(code).toBe('ERROR');
    });

    it('returns default when appErrCode is not present (e.g., SerializedError shape)', () => {
      const serializedLike = { message: 'oops', name: 'Error' } as unknown;
      const code = extractAppErrorCodeFromUnknownObject(serializedLike);
      expect(code).toBe('apiError:unknown');
    });
  });
});
