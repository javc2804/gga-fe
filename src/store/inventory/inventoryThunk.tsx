import { inventoryService } from "../../api/inventoryService";
import { AppDispatch } from "../store";
import {
  getInventory,
  getInventoryByDescription,
  getInventoryHistory,
} from "./inventorySlice";

export const startGetInventory = (): any => async (dispatch: AppDispatch) => {
  try {
    const result = await inventoryService.getInventory();
    dispatch(getInventory(result));
  } catch (error: any) {
    if (error instanceof Error) {
      // dispatch(getPurchaseFailure(error.message));
    } else {
      // dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
export const startGetInventoryByDescription =
  (description: any): any =>
  async (dispatch: AppDispatch) => {
    console.log(description);
    try {
      const result = await inventoryService.getInventoryByDescription(
        description
      );
      dispatch(getInventoryByDescription(result));
    } catch (error: any) {
      if (error instanceof Error) {
        // dispatch(getPurchaseFailure(error.message));
      } else {
        // dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
export const startAddInventory =
  (description: any): any =>
  async (dispatch: AppDispatch) => {
    try {
      const result = await inventoryService.addInventory(description);
      dispatch(getInventoryByDescription(result));
    } catch (error: any) {
      if (error instanceof Error) {
        // dispatch(getPurchaseFailure(error.message));
      } else {
        // dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
export const startGetHistoryInventory =
  (): any => async (dispatch: AppDispatch) => {
    try {
      const result = await inventoryService.history();
      dispatch(getInventoryHistory(result));
    } catch (error: any) {
      if (error instanceof Error) {
        // dispatch(getPurchaseFailure(error.message));
      } else {
        // dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
