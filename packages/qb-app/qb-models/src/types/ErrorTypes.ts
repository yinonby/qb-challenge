
export type ApiServerErrorCodeT =
  | 'apiError:server'
  | 'apiError:unknown'
  | 'apiError:invalidInput'
;

export type AppClientErrorCodeT =
  | 'appClientError:unknown'
  | 'appClientError:someProductsNotUpdated'
  | 'appClientError:invalidRange'
;

export type AppErrorCodeT = ApiServerErrorCodeT | AppClientErrorCodeT; // here we can add more error types