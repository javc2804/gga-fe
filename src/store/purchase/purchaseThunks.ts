import { AppDispatch } from "../store";
import {
  getPurchaseStart,
  getPurchaseSuccess,
  getPurchaseFailure,
  getListPurchase,
  getFilters,
  getSummary,
  loadingClosePurchase,
  getImportLoading,
  modalImport,
  getDataGraph,
  getCombined,
} from "./purchaseSlice";
import { purchaseService } from "../../api/purchaseService";
import {
  ClearCompromise,
  getCompromise,
  getCompromiseLoading,
} from "../compromises/compromisesSlices";

import { START_IMPORT } from "../purchase/purchaseActions";

//TODO: cambiar nombre de la funcion
export const startGetPurchase = (): any => async (dispatch: AppDispatch) => {
  dispatch(getPurchaseStart());
  try {
    const purchaseData = await purchaseService.getCombinedData();
    dispatch(getPurchaseSuccess(purchaseData));
    dispatch(getCombined(purchaseData.response));
  } catch (error: any) {
    if (error instanceof Error) {
      dispatch(getPurchaseFailure(error.message));
    } else {
      dispatch(getPurchaseFailure("An unknown error occurred."));
    }
  }
};
export const startGetPurchaseTrans =
  (id: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getCompromiseLoading());
    try {
      const purchaseData = await purchaseService.getPurchase(id);
      dispatch(ClearCompromise());
      dispatch(getCompromise(purchaseData));
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };
export const startGetCompromise =
  (id: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const purchaseData = await purchaseService.getCompromise(id);
      dispatch(getPurchaseSuccess(purchaseData));
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
    }
  };

export const startSavePurchase =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.savePurchase(purchaseData);
      if (result.ok) {
        dispatch(getPurchaseSuccess(result.response));
      } else {
        dispatch(getPurchaseFailure(result.response));
      }
      return result; // Asegúrate de que estás devolviendo el resultado aquí
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message }; // Y aquí
    }
  };
export const startEditPurchase =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.editPurchase(purchaseData);
      if (result.ok) {
        dispatch(getPurchaseSuccess(result.response));
      } else {
        dispatch(getPurchaseFailure(result.response));
      }
      return result; // Asegúrate de que estás devolviendo el resultado aquí
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message }; // Y aquí
    }
  };
export const startSavePurchaseAsing =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.savePurchaseAsing(purchaseData);
      if (result.ok) {
        dispatch(getPurchaseSuccess(result.response));
      } else {
        dispatch(getPurchaseFailure(result.response));
      }
      return result; // Asegúrate de que estás devolviendo el resultado aquí
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message }; // Y aquí
    }
  };
export const startSaveCompromise =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.saveCompromise(purchaseData);
      if (result.ok) {
        dispatch(getPurchaseSuccess(result.response));
      } else {
        dispatch(getPurchaseFailure(result.response));
      }
      return result; // Asegúrate de que estás devolviendo el resultado aquí
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message }; // Y aquí
    }
  };
export const startSaveTransCompromise =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getPurchaseStart());
    try {
      const result = await purchaseService.savePurchaseUpdateComprimise(
        purchaseData
      );
      if (result.ok) {
        dispatch(getPurchaseSuccess(result.response));
      } else {
        dispatch(getPurchaseFailure(result.response));
      }
      return result; // Asegúrate de que estás devolviendo el resultado aquí
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message }; // Y aquí
    }
  };
export const startGetListPurchase =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    const { filters, page, limit, startDate, endDate } = purchaseData;

    // Agrega los filtros y las fechas de inicio y fin a compromiseData
    const compromiseData = {
      ...filters,
      startDate,
      endDate,
    };

    dispatch(getPurchaseStart());

    try {
      const offset = page * limit;
      const result = await purchaseService.getListPurchase(
        compromiseData,
        limit,
        offset
      );
      if (result.ok) {
        dispatch(getListPurchase(result.response));
        dispatch(getSummary(result.response));
      } else {
        dispatch(getPurchaseFailure(result.response));
      }
      return result;
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message };
    }
  };

export const startHandleSearch =
  (
    filters: any,
    startDate: string,
    endDate: string,
    page: number = 0,
    limit: number = 5
  ): any =>
  async (dispatch: AppDispatch) => {
    const purchaseData = {
      filters,
      page,
      limit,
      startDate,
      endDate,
    };

    dispatch(startGetListPurchase(purchaseData));
    dispatch(getFilters(filters));
    // dispatch(getSummary());
  };
export const startExport =
  (filters: any, startDate: string, endDate: string): any =>
  async () => {
    const dataFilters = {
      filters,
      startDate,
      endDate,
    };
    try {
      await purchaseService.getExportPurchase(dataFilters);
      // dispatch(getPurchaseSuccess(purchaseData));
    } catch (error) {}
  };

export const startImport =
  (file: FormData): any =>
  async (dispatch: any) => {
    try {
      dispatch(getImportLoading());
      const imp = await purchaseService.importPurchase(file);

      if (imp.ok) {
        dispatch(loadingClosePurchase());
        dispatch(modalImport(true));
      }
      dispatch({ type: START_IMPORT, payload: imp });
    } catch (error) {
      console.error(error);
    }
  };
export const startDownload = (): any => async (dispatch: any) => {
  try {
    dispatch(getImportLoading());
    const imp = await purchaseService.getTemplateDownload();

    if (imp.ok) {
      // dispatch(loadingClosePurchase());
      // dispatch(modalImport(true));
    }
    // dispatch({ type: START_IMPORT, payload: imp });
  } catch (error) {
    console.error(error);
  }
};
export const startGraphsOut =
  (purchaseData: any): any =>
  async (dispatch: AppDispatch) => {
    const { filters, startDate, endDate } = purchaseData;

    const compromiseData = {
      ...filters,
      startDate,
      endDate,
    };

    try {
      const result = await purchaseService.getDataGraphsOut(compromiseData);
      if (result.ok) {
        dispatch(getDataGraph(result.response));
      } else {
        dispatch(getPurchaseFailure(result.response));
      }
      return result;
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(getPurchaseFailure(error.message));
      } else {
        dispatch(getPurchaseFailure("An unknown error occurred."));
      }
      return { ok: false, response: error.message };
    }
  };
export const startDownloadInvoice =
  (invoice: any): any =>
  async () => {
    try {
      await purchaseService.getDownloadInvoice(invoice);
      // dispatch(getPurchaseSuccess(purchaseData));
    } catch (error) {}
  };
export const startDeletePurchase =
  (ids: any): any =>
  async () => {
    try {
      await purchaseService.deletePurchase(ids);
      // dispatch(getPurchaseSuccess(purchaseData));
    } catch (error) {}
  };
