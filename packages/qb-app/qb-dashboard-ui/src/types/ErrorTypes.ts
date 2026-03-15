
import type { AppErrorCodeT } from '@qb/models';

export type AppRtkErrorT = {
  status: number,
  appErrCode: AppErrorCodeT,
  errMsg?: string,
}

export class AppError extends Error {
  constructor(public appErrCode: AppErrorCodeT) {
    super(appErrCode);
    this.name = 'AppError';
  }
}
