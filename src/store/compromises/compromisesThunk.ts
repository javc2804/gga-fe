import { AppDispatch } from "../store";
import { getCompromise, getCompromiseLoading } from "./compromisesSlices";
import { purchaseService } from "../../api/purchaseService";

export const startGetCompromise =
  (id: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getCompromiseLoading());
    try {
      const purchaseData = await purchaseService.getCompromise(id);
      dispatch(getCompromise(purchaseData));
    } catch (error: any) {
      if (error instanceof Error) {
        // dispatch(getPurchaseFailure(error.message));
      } else {
        // dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
