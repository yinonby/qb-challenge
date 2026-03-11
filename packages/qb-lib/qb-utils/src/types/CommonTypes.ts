
export type GeoLocationCoordsT = {
  latitude: number,
  longitude: number,
}


const _langCodes = ['en', 'es' , 'fr'];
export type LangCodeT = typeof _langCodes[number];
export const langCodes: LangCodeT[] = _langCodes as unknown as LangCodeT[];

export type CurrencyCodeT = 'EUR' | 'USD' | 'GBP';

export type PriceT = {
  currencyCode: CurrencyCodeT,
  rate: number,
}
