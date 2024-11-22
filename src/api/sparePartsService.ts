import { API_URL } from "./index";

export const SparePartsService = {
  getSpareParts: () => {
    return API_URL.get("spare-parts/list")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  createSpareParts: (data: any) => {
    return API_URL.post("spare-parts", {
      data,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  exportSpareParts: () => {
    return API_URL.get("spare-parts/export", { responseType: "blob" }) // Solicitar el archivo como un Blob
      .then((response) => {
        // Crear un URL para el Blob, lo que permite descargarlo o mostrarlo en el navegador
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Crear un elemento <a> temporal para simular un clic de descarga
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "repuestos.xlsx"); // Establecer el nombre del archivo descargado

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
