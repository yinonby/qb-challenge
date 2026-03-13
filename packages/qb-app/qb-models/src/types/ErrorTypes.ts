
export type ApiServerErrorCodeT =
  | 'apiError:server'
  | 'apiError:unknown'
  | 'apiError:invalidInput'
;

export type AppClientErrorCodeT =
  | 'appClientError:unknown'
;

export type AppErrorCodeT = ApiServerErrorCodeT | AppClientErrorCodeT; // here we can add more error types