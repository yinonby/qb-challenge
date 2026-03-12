
export type ApiServerErrorCodeT =
  | 'apiError:server'
  | 'apiError:unknown'
  | 'apiError:invalidInput'
;

export type AppErrorCodeT = ApiServerErrorCodeT; // here we can add more error types