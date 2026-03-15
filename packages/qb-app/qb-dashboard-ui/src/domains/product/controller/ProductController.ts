
import type { UpdateProductBatchResponseT, UpdateProductStockInfoT } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import { AppError } from '@qb-dashboard-ui/types/ErrorTypes';
import { extractAppErrorCodeFromUnknownObject } from '../model/AppRtkErrorUtils';
import { useUpdateProducBatchMutation } from '../rtk/ProductRtkApi';

export type ProductControllerT = {
  onUpdateProductBatch: (
    updateProductStockInfos: UpdateProductStockInfoT[],
  ) => Promise<UpdateProductBatchResponseT['data']>,
}

export function useProductController(): ProductControllerT {
  const [
    updateProductBatch,
  ] = useUpdateProducBatchMutation();

  const handleUpdateProductBatch = async (
    updateProductStockInfos: UpdateProductStockInfoT[],
  ): Promise<UpdateProductBatchResponseT['data']> => {
    const { error, data } = await updateProductBatch({ updateProductStockInfos: updateProductStockInfos });
    if (error !== undefined) {
      throw new AppError(extractAppErrorCodeFromUnknownObject(error));
    }
    return data;
  };

  return {
    onUpdateProductBatch: handleUpdateProductBatch,
  }
}
