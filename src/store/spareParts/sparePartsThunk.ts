import { SparePartsService } from "../../api/sparePartsService";
import { AppDispatch } from "../store";
import { getList } from "./sparePartsSlice";

export const startGetSpareParts = (): any => async (dispatch: AppDispatch) => {
  try {
    const providers = await SparePartsService.getSpareParts();
    dispatch(getList(providers.response));
  } catch (error: any) {
    if (error instanceof Error) {
      // dispatch(getPurchaseFailure(error.message));
    } else {
      // dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
export const startCreateSpareParts =
  (data: any): any =>
  async (dispatch: AppDispatch) => {
    try {
      const providers = await SparePartsService.createSpareParts(data);
      dispatch(getList(providers.response));
    } catch (error: any) {
      if (error instanceof Error) {
        // dispatch(getPurchaseFailure(error.message));
      } else {
        // dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
export const startExportSpareParts = (): any => async () => {
  try {
    SparePartsService.exportSpareParts();
  } catch (error: any) {
    if (error instanceof Error) {
      // dispatch(getPurchaseFailure(error.message));
    } else {
      // dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
