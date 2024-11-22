import { API_URL } from "./index";

export const userService = {
  getUsers: () => {
    return API_URL.get("users/list")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  deleteUser: (email: any) => {
    return API_URL.post("users/delete", { email })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  toggleStatus: (email: any) => {
    return API_URL.post("users/toggle-status", { email })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
