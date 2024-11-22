import { API_URL } from "./index";

export const outInternalService = {
  createOutInternal: (data: any) => {
    return API_URL.post("out-internal", { data })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getOutInternal: () => {
    return API_URL.get("out-internal/list")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
