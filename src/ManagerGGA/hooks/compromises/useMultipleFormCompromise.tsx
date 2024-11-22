import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startEditPurchase,
  startSaveCompromise,
} from "../../../store/purchase/purchaseThunks";

const useMultipleFormCompromise = (
  initialValuesPayment: any,
  openSnackbar: any,
  nde: any,
  proveedor: any,
  compromiso: any,
  ErrorOutline: any,
  CheckCircle: any
) => {
  const dispatch = useDispatch();

  const [forms, setForms] = useState([
    {
      id: 0,
      payment: initialValuesPayment,
      errors: {},
    },
  ]);
  const [nextId, setNextId] = useState(1);
  const [totalFactUsd, setTotalFactUsd] = useState(0);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  const handleAddClick = () => {
    setForms([
      ...forms,
      {
        id: nextId,
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

        const newForms = prevForms.map((form) => {
          if (form.id === id) {
            totalUsd += parseFloat(newValues.deudaTotalUsd);
            totalBs += parseFloat(newValues.deudaTotalBs);
            return { ...form, payment: newValues, errors: newErrors };
          } else {
            totalUsd += parseFloat(form.payment.deudaTotalUsd);
            totalBs += parseFloat(form.payment.deudaTotalBs);
            return form;
          }
        });

        setTotalFactUsd(totalUsd);
        console.log(totalFactUsd);

        return newForms;
      });
    },
    [setForms]
  );

  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);

  const handleSaveClick = async (isEdit?: boolean) => {
    let result;
    const userEmail = localStorage.getItem("email");
    if (!isEdit) {
      const combinedForms = forms.map((form) => {
        form.payment.nde = nde;
        form.payment.proveedor = proveedor;
        form.payment.compromiso = compromiso;
        delete form.payment.precioUnitarioUsd;
        delete form.payment.montoTotalUsd;
        return {
          id: form.id,
          ...form.payment,
          user_rel: userEmail,
          errors: form.errors,
        };
      });

      let errorField = null;
      const hasErrors = forms.some((form) => {
        const requiredFields = [
          "nde",
          "compromiso",
          "proveedor",
          "cantidad",
          // "montoTotalUsd",
          "numeroOrdenPago",
          "deudaUnitarioUsd",
          "repuesto",
          "descripcionRepuesto",
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

      if (nde === "0" || "") {
        openSnackbar(
          `Error al guardar, NDE debe estar lleno y distinto a 0`,
          "error",
          ErrorOutline
        );
        return;
      }
      result = await dispatch(startSaveCompromise(combinedForms));
    } else {
      const adjustedEditPurchase = {
        ...editPurchase,
        user_rel: userEmail,
      };
      let errorField = null;
      const requiredFields = [
        "facNDE",
        "compromiso",
        "proveedor",
        "cantidad",
        "numeroOrdenPago",
        "deudaUnitarioUsd",
        "repuesto",
        "descripcionRepuesto",
        "fechaOcOs",
      ];

      const hasErrors = requiredFields.some((field) => {
        const hasError =
          !adjustedEditPurchase[field] || adjustedEditPurchase[field] === null;
        if (hasError) {
          errorField = field;
        }
        return hasError;
      });

      if (hasErrors) {
        openSnackbar(
          `Error al editar, verifica el campo ${errorField}`,
          "error",
          ErrorOutline
        );
        return;
      }

      if (adjustedEditPurchase.nde === "0" || "") {
        openSnackbar(
          `Error al editar, NDE debe estar lleno y distinto a 0`,
          "error",
          ErrorOutline
        );
        return;
      }

      result = await dispatch(startEditPurchase(adjustedEditPurchase));
    }
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
    setTotalFactUsd,
    handleSaveClick,
    setIsSaveButtonDisabled,
    isSaveButtonDisabled,
  };
};

export default useMultipleFormCompromise;
