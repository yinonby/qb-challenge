
import type { UpdateProductStockInfoT } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import type { ProductIdT } from '@qb/models';

export type InventoryUpdateReducerActionT =
  | { type: 'ADD_INVENTORY_UPDATE_ITEM'; updateProductStockInfo: UpdateProductStockInfoT }
  | { type: 'REMOVE_INVENTORY_UPDATE_ITEM'; productId: ProductIdT }

  export type InventoryUpdateReducerStateT = {
    updateProductStockInfoContainers: UpdateProductStockInfoContainerT[],
  }

type UpdateProductStockInfoContainerT = {
  updateProductStockInfo: UpdateProductStockInfoT | null,
}
