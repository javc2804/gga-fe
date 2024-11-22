import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PurchaseState {
  loading: boolean;
  error: string | null;
  purchase: any | null;
  purchaseEdit: any | null;
  saveStatus: "idle" | "loading" | "succeeded" | "failed";
  deliveryDate: string;
  paymentDate: string;
  orderDate: string;
  repuestos: string;
  formaDePago: string;
  ut: string;
  filters: any;
  summary: any;
  modal: any;
  graph: any;
  combined: any;
}

const initialState: PurchaseState = {
  loading: false,
  error: null,
  purchase: null,
  purchaseEdit: {},
  saveStatus: "idle",
  deliveryDate: new Date().toISOString(),
  paymentDate: new Date().toISOString(),
  orderDate: new Date().toISOString(),
  repuestos: "",
  formaDePago: "",
  ut: "",
  filters: {},
  summary: {},
  modal: false,
  graph: {},
  combined: {},
};

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    getPurchaseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getImportLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPurchaseSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.purchase = action.payload;
    },
    getPurchaseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    savePurchaseStart: (state) => {
      state.saveStatus = "loading";
    },
    savePurchaseSuccess: (state) => {
      state.saveStatus = "succeeded";
    },
    savePurchaseFailure: (state, action: PayloadAction<string>) => {
      state.saveStatus = "failed";
      state.error = action.payload;
    },
    setDeliveryDate: (state, action: PayloadAction<string>) => {
      state.deliveryDate = action.payload;
    },
    setPaymentDate: (state, action: PayloadAction<string>) => {
      state.paymentDate = action.payload;
    },
    setOrderDate: (state, action: PayloadAction<string>) => {
      state.orderDate = action.payload;
    },
    setRepuestos: (state, action: PayloadAction<string>) => {
      state.repuestos = action.payload;
    },
    setFormaDePago: (state, action: PayloadAction<string>) => {
      state.formaDePago = action.payload;
    },
    setUt: (state, action: PayloadAction<string>) => {
      state.ut = action.payload;
    },
    getListPurchase: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.purchase = action.payload;
    },
    loadingClosePurchase: (state) => {
      state.loading = false;
    },
    getFilters: (state, { payload }) => {
      state.filters = payload;
    },
    getSummary: (state, { payload }) => {
      state.summary = payload;
    },
    modalImport: (state, { payload }) => {
      state.modal = payload;
    },
    // editPurchase: (state, { payload }) => {
    //   state.purchaseEdit = payload;
    // },
    editPurchaseClear: (state) => {
      state.purchaseEdit = {};
    },
    updateEditPurchase: (state, { payload }) => {
      state.purchaseEdit = payload;
    },
    getDataGraph: (state, { payload }) => {
      state.graph = payload;
    },
    getCombined: (state, { payload }) => {
      state.combined = payload;
    },
  },
});

export const {
  getDataGraph,
  editPurchaseClear,
  getPurchaseStart,
  getPurchaseSuccess,
  getCombined,
  getPurchaseFailure,
  savePurchaseStart,
  savePurchaseSuccess,
  savePurchaseFailure,
  setDeliveryDate,
  setPaymentDate,
  setOrderDate,
  setRepuestos,
  setFormaDePago,
  setUt,
  getListPurchase,
  getFilters,
  getSummary,
  loadingClosePurchase,
  getImportLoading,
  modalImport,
  updateEditPurchase,
} = purchaseSlice.actions;

export const selectPurchase = (state: RootState) => state.purchase.purchase;
export const selectLoading = (state: RootState) => state.purchase.loading;
export const selectError = (state: RootState) => state.purchase.error;
export const selectSaveStatus = (state: RootState) => state.purchase.saveStatus;
export const selectDeliveryDate = (state: RootState) =>
  state.purchase.deliveryDate;
export const selectPaymentDate = (state: RootState) =>
  state.purchase.paymentDate;
export const selectOrderDate = (state: RootState) => state.purchase.orderDate;
export const selectRepuestos = (state: RootState) => state.purchase.repuestos;
export const selectFormaDePago = (state: RootState) =>
  state.purchase.formaDePago;
export const selectUt = (state: RootState) => state.purchase.ut;

export default purchaseSlice.reducer;
