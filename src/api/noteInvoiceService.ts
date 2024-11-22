import { API_URL } from "./index";

export const noteInvoiceService = {
  getNoteInvoices: (page = 1, limit = 5) => {
    return API_URL.get(`note-invoices?page=${page}&limit=${limit}`)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
