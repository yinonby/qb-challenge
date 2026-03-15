
import type {
  ApiServerErrorCodeT, AppClientErrorCodeT, AppTextTranslationKeyT,
  ProductCategoryTranslationKeyT,
  SortOptionTranslationKeyT,
} from '@qb/models';
import enAppTranslationsJson from '../../assets/translations/en/app.json';
import enErrosTranslationsJson from '../../assets/translations/en/errors.json';
import frAppTranslationsJson from '../../assets/translations/fr/app.json';
import frErrosTranslationsJson from '../../assets/translations/fr/errors.json';

type ExpandKeyT<K extends string> =
  K extends `${infer A}:${infer B}`
  ? { [Key in A]: ExpandKeyT<B> }
  : { [Key in K]: string };

type UnionToIntersectionT<U> =
  (U extends any ? (x: U) => void : never) extends
  (x: infer I) => void ? I : never;

// these structures guarantee that the json files have imlementation for all translation keys
type AppTranslationShapeT = UnionToIntersectionT<ExpandKeyT<AppTextTranslationKeyT>>;
type ProductCategoryTranslationShapeT = UnionToIntersectionT<ExpandKeyT<ProductCategoryTranslationKeyT>>;
type SortOptionTranslationShapeT = UnionToIntersectionT<ExpandKeyT<SortOptionTranslationKeyT>>;
type ApiServerErrorTranslationShapeT = UnionToIntersectionT<ExpandKeyT<ApiServerErrorCodeT>>;
type AppClientErrorTranslationShapeT = UnionToIntersectionT<ExpandKeyT<AppClientErrorCodeT>>;

// currently only support english
const enResource = {
  apiError: enErrosTranslationsJson.apiError,
  appClientError: enErrosTranslationsJson.appClientError,
  app: enAppTranslationsJson.app,
  category: enAppTranslationsJson.category,
  sort: enAppTranslationsJson.sort,
} satisfies AppTranslationShapeT
  & ProductCategoryTranslationShapeT
  & SortOptionTranslationShapeT
  & ApiServerErrorTranslationShapeT
  & AppClientErrorTranslationShapeT
;

const frResource = {
  apiError: frErrosTranslationsJson.apiError,
  appClientError: frErrosTranslationsJson.appClientError,
  app: frAppTranslationsJson.app,
  category: frAppTranslationsJson.category,
  sort: frAppTranslationsJson.sort,
} satisfies AppTranslationShapeT
  & ProductCategoryTranslationShapeT
  & SortOptionTranslationShapeT
  & ApiServerErrorTranslationShapeT
  & AppClientErrorTranslationShapeT
;

export const getI18nResources = () => {
  return {
    en: enResource,
    fr: frResource,
  }
}
