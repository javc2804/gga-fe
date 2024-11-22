import { API_URL } from "./index";

export const providersService = {
  getProviders: () => {
    return API_URL.get("providers/list")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  createProviders: (data: any) => {
    return API_URL.post("providers", {
      data,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  deleteProvider: (data: any) => {
    return API_URL.post("providers/delete", {
      data,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },

  editProviders: (data: any) => {
    return API_URL.post("providers/edit", {
      data,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  exportProviders: () => {
    return API_URL.get("providers/export", { responseType: "blob" }) // Solicitar el archivo como un Blob
      .then((response) => {
        // Crear un URL para el Blob, lo que permite descargarlo o mostrarlo en el navegador
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Crear un elemento <a> temporal para simular un clic de descarga
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "providers.xlsx"); // Establecer el nombre del archivo descargado

        // Agregar el enlace al documento y hacer clic en él para iniciar la descarga
        document.body.appendChild(link);
        link.click();

        // Limpiar removiendo el enlace del DOM después de la descarga
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }

        // Opcional: liberar el objeto URL creado
        window.URL.revokeObjectURL(url);

        // Retornar un estado de éxito
        return { ok: true };
      })
      .catch((error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje al usuario
        console.error("Error downloading the file", error);
        return { ok: false, response: error.response.data.msg };
      });
  },
};
