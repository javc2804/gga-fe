import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { startSaveTransCompromise } from "../../../../store/purchase/purchaseThunks";

const useMultipleFormCompromisePay = (
  initialValuesInput: any,
  initialValuesPayment: any,
  openSnackbar: any,
  facNDE: any,
  proveedor: any,
  ErrorOutline: any,
  CheckCircle: any,
  compromise: any
) => {
  console.log(compromise);
  const dispatch = useDispatch();

  const [forms, setForms] = useState([
    {
      id: 0,
      input: initialValuesInput,
      payment: initialValuesPayment,
      errors: {},
    },
  ]);
  const [nextId, setNextId] = useState(1);
  const [totalFactUsd, setTotalFactUsd] = useState(0); // Agregado
  const [totalFactBs, setTotalFactBs] = useState(0); // Agregado
  const [totalCantidad, setTotalCantidad] = useState(0); // Agregado
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false); // Agregado
  const handleAddClick = () => {
    setForms([
      ...forms,
      {
        id: nextId,
        input: initialValuesInput,
        payment: initialValuesPayment,
        errors: {},
      },
    ]);
    setNextId(nextId + 1);
  };

  const handleRemoveClick = (id: any) => {
    const list = forms.filter((form) => form.id !== id);
    setForms(list);
  };

  const handleInputChange = useCallback(
    (id: any) => (newValues: any, newErrors: any) => {
      setForms((prevForms) =>
        prevForms.map((form) =>
          form.id === id
            ? { ...form, input: newValues, errors: newErrors }
            : form
        )
      );
    },
    [setForms]
  );

  const handlePaymentChange = useCallback(
    (id: any) => (newValues: any, newErrors: any) => {
      setForms((prevForms) => {
        let totalUsd = 0;
        let totalBs = 0;
        let totalCantidad = 0;

        const newForms = prevForms.map((form) => {
          if (form.id === id) {
            totalUsd += parseFloat(newValues.montoTotalUsd);
            totalBs += parseFloat(newValues.montoTotalBs);
            totalCantidad += newValues.cantidad;
            return { ...form, payment: newValues, errors: newErrors };
          } else {
            totalUsd += parseFloat(form.payment.montoTotalUsd);
            totalBs += parseFloat(form.payment.montoTotalBs);
            totalCantidad += form.payment.cantidad;
            return form;
          }
        });
        setTotalFactUsd(totalUsd);
        setTotalFactBs(totalBs);
        setTotalCantidad(totalCantidad);

        return newForms;
      });
    },
    [setForms]
  );

  const handleSaveClick = async () => {
    const userEmail = localStorage.getItem("email");
    const combinedForms = forms.map((form) => {
      form.payment.facNDE = facNDE;
      form.payment.proveedor = proveedor;
      form.payment.repuesto = compromise.response.repuesto;
      form.payment.descripcionRepuesto =
        compromise.response.descripcionRepuesto;
      form.payment.compromiso = compromise.response.compromiso;
      form.payment.precioUnitarioUsd = compromise.response.deudaUnitarioUsd;
      form.payment.id = compromise.response.id;
      form.payment.ut = compromise.response.ut;
      form.payment.eje = compromise.response.eje;
      form.payment.subeje = compromise.response.subeje;
      form.payment.marcaModelo = compromise.response.marcaModelo;
      return {
        id: form.id,
        ...form.input,
        ...form.payment,
        user_rel: userEmail,
        errors: form.errors,
      };
    });

    let errorField = null;
    const hasErrors = forms.some((form) => {
      const requiredFields = [
        "facNDE",
        "cantidad",
        "montoTotalBs",
        "montoTotalUsd",
        "numeroOrdenPago",
        "precioUnitarioBs",
        "precioUnitarioUsd",
        "tasaBcv",
        // "repuesto",
        // "descripcionRepuesto",
        "fechaOcOs",
      ];

      return requiredFields.some((field) => {
        const hasError = !form.payment[field] || form.payment[field] === null;
        if (hasError) {
          errorField = field;
        }
        return hasError;
      });
    });

    if (hasErrors) {
      openSnackbar(
        `Error al guardar, verifica el campo ${errorField}`,
        "error",
        ErrorOutline
      );
      return;
    }

    if (facNDE === "0" || "") {
      openSnackbar(
        `Error al guardar, Fac/NDE debe estar lleno y distinto a 0`,
        "error",
        ErrorOutline
      );
      return;
    }

    const totalCantidad = forms.reduce(
      (sum, form) => sum + form.payment.cantidad,
      0
    );

    if (totalCantidad > compromise.response.cantidad) {
      openSnackbar(
        `Error al guardar, la cantidad asignada es mayor a la disponible`,
        "error",
        ErrorOutline
      );
      return;
    }
    const totalMontoTotalUsd = forms.reduce(
      (sum, form) => sum + form.payment.montoTotalUsd,
      0
    );

    if (totalMontoTotalUsd > compromise.response.deudaTotalUsd) {
      openSnackbar(
        `Error al guardar, el monto total USD asignado es mayor al disponible`,
        "error",
        ErrorOutline
      );
      return;
    }

    const result = await dispatch(startSaveTransCompromise(combinedForms));
    if (result.ok) {
      openSnackbar("Guardado exitosamente", "success", CheckCircle);
      setIsSaveButtonDisabled(true);
    } else {
      openSnackbar(
        `Error al guardar: ${result.response}`,
        "error",
        ErrorOutline
      );
    }
  };

  return {
    forms,
    handleAddClick,
    handleRemoveClick,
    handleInputChange,
    handlePaymentChange,
    totalFactUsd,
    totalFactBs,
    setTotalFactUsd,
    setTotalFactBs,
    setTotalCantidad,
    totalCantidad,
    handleSaveClick,
    isSaveButtonDisabled,
  };
};

export default useMultipleFormCompromisePay;
