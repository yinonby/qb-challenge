
import type { AppErrorCodeT } from '@qb/models';

export function extractAppErrorCodeFromUnknownObject(error: unknown): AppErrorCodeT {
  if (hasAppErrCode(error)) {
    return error.appErrCode;
  }
  return 'apiError:unknown';
}

function hasAppErrCode(error: unknown): error is { appErrCode: AppErrorCodeT } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'appErrCode' in error &&
    typeof error.appErrCode === 'string'
  );
}
