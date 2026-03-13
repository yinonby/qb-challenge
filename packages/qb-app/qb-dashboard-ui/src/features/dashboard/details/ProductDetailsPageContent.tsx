
import { useAppLocalization } from '@qb-dashboard-ui/app/localization/AppLocalizationProvider';
import { useProductDetailsModel } from '@qb-dashboard-ui/domains/product/model/ProductDetailsModel';
import { ModelLoadingView } from '@qb-dashboard-ui/features/common/ModelLoadingView';
import type { ProductDetailsPageSearchParamsT } from '@qb-dashboard-ui/types/UrlDefs';
import type { ProductIdT } from '@qb/models';
import { useSearchParams } from '@qb/platform-ui';
import { RnuiAppContent } from '@qb/rnui';
import React, { type FC } from 'react';
import { ProductDetailsView } from './ProductDetailsView';
import { ProductImagesView } from './ProductImagesView';

type ProductDetailsPageContentPropsT = {
  productId: ProductIdT,
}

export const ProductDetailsPageContent: FC<ProductDetailsPageContentPropsT> = (props) => {
  const { productId } = props;
  const { langCode } = useAppLocalization();
  const searchParams = useSearchParams<ProductDetailsPageSearchParamsT>();
  const { imgView } = searchParams;
  const { isLoading, isError, appErrCode, data } = useProductDetailsModel({
    langCode,
    productId,
  });

  if (isLoading || isError) {
    return <ModelLoadingView
      testID='ModelLoadingViewTid'
      isLoading={isLoading}
      appErrCode={isError ? appErrCode : null}
    />;
  }

  return (
    <RnuiAppContent testID="RnuiAppContentTid">
      {imgView === 'true' ?
        <ProductImagesView testID='ProductImagesViewTid' productDetails={data.productDetails} /> :
        <ProductDetailsView testID='ProductDetailsViewTid' productDetails={data.productDetails} />
      }
    </RnuiAppContent>
  );
};
