import { almacenService } from "../../api/almacenService";
import { AppDispatch } from "../store";
import { getTransactions } from "./almacenSlice";

export const startGetTransactions =
  (): any => async (dispatch: AppDispatch) => {
    try {
      const result = await almacenService.getTransactions();
      dispatch(getTransactions(result));
    } catch (error: any) {
      if (error instanceof Error) {
        // dispatch(getPurchaseFailure(error.message));
      } else {
        // dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
export const startCreateNDE =
  (data: any): any =>
  async (dispatch: AppDispatch) => {
    try {
      const result = await almacenService.createNDE(data);
      dispatch(getTransactions(result));
    } catch (error: any) {
      if (error instanceof Error) {
        // dispatch(getPurchaseFailure(error.message));
      } else {
        // dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
