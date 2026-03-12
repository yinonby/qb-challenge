
import type { AppErrorCodeT } from '@qb/models';

type ModelT<T, ERR_T> =
  | { isLoading: true; isError: false; appErrCode?: undefined; data?: undefined }
  | { isLoading: false; isError: true; appErrCode: ERR_T; data?: undefined }
  | { isLoading: false; isError: false; appErrCode?: undefined; data: T;  };

export type AppModelT<T> = ModelT<T, AppErrorCodeT>;
