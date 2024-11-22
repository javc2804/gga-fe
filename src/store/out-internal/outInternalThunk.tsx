import { outInternalService } from "../../api/outInternalService";
import { AppDispatch } from "../store";
import { createOutInternal, getListOutInternal } from "./outInternalSlice";

export const startCreateOutInternal =
  (data: any): any =>
  async (dispatch: AppDispatch) => {
    try {
      const resp = await outInternalService.createOutInternal(data);
      dispatch(createOutInternal(resp.response));
    } catch (error: any) {
      if (error instanceof Error) {
        // dispatch(getPurchaseFailure(error.message));
      } else {
        // dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
export const startGetOutInternal = (): any => async (dispatch: AppDispatch) => {
  try {
    const resp = await outInternalService.getOutInternal();
    dispatch(getListOutInternal(resp.response));
  } catch (error: any) {
    if (error instanceof Error) {
      // dispatch(getPurchaseFailure(error.message));
    } else {
      // dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
