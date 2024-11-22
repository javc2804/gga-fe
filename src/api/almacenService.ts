import { API_URL } from "./index";

export const almacenService = {
  getTransactions: () => {
    return API_URL.get("note-invoices/transactions")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  createNDE: (data: any) => {
    return API_URL.post("note-invoices", { data })

      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
