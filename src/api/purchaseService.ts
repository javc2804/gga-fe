import { API_URL } from "./index";

export const purchaseService = {
  getCombinedData: () => {
    return API_URL.get("combinedData")
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getCompromise: (id: any) => {
    return API_URL.post("transaction/compromise", { id })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getPurchase: (id: any) => {
    return API_URL.post("transaction/get-transaction", { id })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },

  savePurchase: (purchaseData: any) => {
    return API_URL.post("transaction", purchaseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  editPurchase: (purchaseData: any) => {
    return API_URL.post("transaction/edit-purchase", purchaseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  savePurchaseAsing: (purchaseData: any) => {
    return API_URL.post("transaction/asing", purchaseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  savePurchaseUpdateComprimise: (purchaseData: any) => {
    return API_URL.post("transaction/trans-compromise", purchaseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  saveCompromise: (compromiseData: any) => {
    return API_URL.post("transaction/new-compromise", compromiseData)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  deletePurchase: (ids: any) => {
    return API_URL.post("transaction/delete", ids)
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getListPurchase: (compromiseData: any, limit: number, offset: number) => {
    return API_URL.get(`transaction/list`, {
      params: {
        ...compromiseData,
        offset: offset || 0,
        limit,
      },
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getExportPurchase: (dataFilters: any) => {
    return API_URL.get(`transaction/export`, {
      params: {
        dataFilters,
      },
      responseType: "blob", // tell axios to download the response as a blob
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reporte.xls");
        document.body.appendChild(link);
        link.click();
        return { ok: true };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getDownloadInvoice: (invoiceData: any) => {
    return API_URL.post(`note-invoices/download-invoice`, invoiceData, {
      responseType: "arraybuffer", // Asegura que la respuesta sea un flujo binario
      headers: {
        Accept: "application/pdf", // Solicita específicamente un PDF
      },
    })
      .then((response) => {
        // Crear un Blob con los datos de la respuesta
        const blob = new Blob([response.data], { type: "application/pdf" });
        // Crear un enlace para la descarga
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "invoice.pdf"); // Nombre del archivo a descargar
        document.body.appendChild(link);
        link.click(); // Iniciar la descarga

        // Limpieza: eliminar el enlace después de la descarga
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(link);

        return { ok: true };
      })
      .catch((error) => {
        console.error("Error al descargar el archivo", error);

        // Manejo de errores
        const errorMsg =
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "Error desconocido";
        return { ok: false, response: errorMsg };
      });
  },

  importPurchase: (file: any) => {
    return API_URL.post(`/upload/matriz`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response: any) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },

  getTemplateDownload: () => {
    return API_URL.get("download-template", { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "plantilla.xlsm"); // o el nombre del archivo que desees
        document.body.appendChild(link);
        link.click();
        return { ok: true };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  getDataGraphsOut: (compromiseData: any) => {
    return API_URL.get(`graphs-out`, {
      params: {
        ...compromiseData,
      },
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
