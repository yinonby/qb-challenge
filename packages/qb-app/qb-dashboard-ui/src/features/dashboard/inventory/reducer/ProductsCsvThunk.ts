
import { extractAppErrorCodeFromUnknownObject } from '@qb-dashboard-ui/domains/product/model/AppRtkErrorUtils';
import { mock_getProductInventoryAsCsv } from '@qb-dashboard-ui/mocks/MockApiServerDefs';
import { MockAxiosClient } from '@qb-dashboard-ui/mocks/MockAxiosClient';
import type { AppRtkErrorT } from '@qb-dashboard-ui/types/ErrorTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

type ExportProductsCsvResponseT =
  | { error: AppRtkErrorT; data?: undefined }
  | { error?: undefined; data: { csvStr: string }}
;

export const fetchProductsCsv = createAsyncThunk<
  ExportProductsCsvResponseT,                     // returned CSV string
  { langTag: string, timeZone: string | undefined },    // thunk argument
  { rejectValue: string }
>(
  '/product/csv',
  async ({ langTag, timeZone }) => {
    try {
      const mockAxiosClient = new MockAxiosClient();
      const result = await mockAxiosClient.request({
        url: '/product/csv',
        method: 'POST',
        data: {
          query: mock_getProductInventoryAsCsv,
          variables: { langTag, timeZone }
        }
      }) as ExportProductsCsvResponseT;

      if (result.error !== undefined) {
        return {
          error: result.error
        }
      }

      return { data: result.data };
    } catch (error: unknown) {
      return {
        error: {
          status: 200,
          appErrCode: extractAppErrorCodeFromUnknownObject(error),
        }
      }
    }
  }
);
