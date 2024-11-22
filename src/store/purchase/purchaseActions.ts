export const START_IMPORT = "START_IMPORT";

interface StartImportAction {
  type: typeof START_IMPORT;
  payload: FormData;
}

export type PurchaseActionTypes = StartImportAction; // Añade aquí otros tipos de acciones si los tienes
