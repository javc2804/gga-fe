import { API_URL } from "./index";

export const authService = {
  login: (email: string, password: string) => {
    return API_URL.post("auth/login", {
      email,
      password,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  register: (
    email: string,
    password: string,
    name: string,
    lastName: string,
    role: string
  ) => {
    return API_URL.post("auth/register", {
      email,
      password,
      name,
      lastName,
      role,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  editUser: (
    email: string,
    password: string,
    name: string,
    lastName: string,
    role: string
  ) => {
    return API_URL.put("users/edit", {
      email,
      password,
      name,
      lastName,
      role,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },

  forgot: (email: string) => {
    return API_URL.post("auth/forgot-password", {
      email,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  changePassword: (token: string, password: string) => {
    return API_URL.post("auth/change-password", {
      token,
      password,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
