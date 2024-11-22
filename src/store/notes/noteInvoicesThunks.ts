import {
  getNoteInvoicesStart,
  getNoteInvoicesSuccess,
  getNoteInvoicesFailure,
} from "./noteInvoicesSlice";
import { noteInvoiceService } from "../../api/noteInvoiceService";

export const fetchNoteInvoices =
  (page = 1, limit = 5): any =>
  async (dispatch: any) => {
    dispatch(getNoteInvoicesStart());
    try {
      const response = await noteInvoiceService.getNoteInvoices(page, limit);

      if (response.ok) {
        dispatch(getNoteInvoicesSuccess(response.response.noteInvoices));
      } else {
        dispatch(getNoteInvoicesFailure(response.response.noteInvoices));
      }
    } catch (error: any) {
      dispatch(getNoteInvoicesFailure(error.toString()));
    }
  };
