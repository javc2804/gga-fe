import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  RootState as StoreRootState,
  useAppDispatch,
} from "../../../store/store";
import { useForm } from "react-hook-form";
import { Button, Box } from "@mui/material";
import { PaymentForm, InvoiceTotals } from "../../components/";
import { startGetPurchase } from "../../../store/purchase/purchaseThunks";
import { useSnackbar } from "../../../hooks/useSnackBar";
import { ErrorOutline, CheckCircle } from "@mui/icons-material";

import useMultipleForm from "../../hooks/purchase/useMultipleForm";
import InvoiceProviders from "../../components/registerPurchase/invoices/InvoiceProviders";

interface RegisterPurchaseProps {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  params: any; // Asegúrate de reemplazar 'any' con el tipo correcto
}

interface Provider {
  id: string;
  name: string;
}

interface ResponseType {
  providers?: Provider[];
  spareParts?: any[];
  sparePartVariants?: any[];
}

const initialValuesInput = {
  ut: "",
  marcaModelo: "",
  eje: "",
  subeje: "",
};

const initialValuesPayment = {
  repuesto: null,
  descripcionRepuesto: null,
  formaPago: "Contado",
  descripcion: "",
  cantidad: "",
  precioUnitarioBs: "",
  tasaBcv: "",
  precioUnitarioUsd: "",
  montoTotalUsd: "",
  montoTotalBs: "",
  ocOs: "",
  fechaOcOs: null,
  numeroOrdenPago: "",
  observacion: "",
  facNDE: 0,
  proveedor: null,
};

const boxStyles = {
  p: 4,
  mb: 4,
  mr: 4,
  mt: 2,
  ml: 2,
  borderRadius: 4,
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.45)",
};
export const RegisterPurchase: React.FC<RegisterPurchaseProps> = (
  {
    // params,
  }
) => {
  // console.log(params);
  const dispatch = useAppDispatch();
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);

  const { control } = useForm();

  const [formState, setFormState] = useState<{
    facNDE: number;
    proveedor: Provider | null;
  }>({ facNDE: 0, proveedor: null });

  const { SnackbarComponent, openSnackbar } = useSnackbar();
  const {
    forms,
    handleAddClick,
    handleRemoveClick,
    // handleInputChange,
    handlePaymentChange,
    totalFactUsd,
    totalFactBs,
    setTotalFactUsd,
    setTotalFactBs,
    handleSaveClick,
    setIsSaveButtonDisabled,
    isSaveButtonDisabled,
  } = useMultipleForm(
    initialValuesInput,
    initialValuesPayment,
    openSnackbar,
    formState.facNDE,
    formState.proveedor,
    ErrorOutline,
    CheckCircle
  );
  const purchase = useSelector(
    (state: StoreRootState) => state.purchase.purchase
  );

  // const response: ResponseType = purchase ? purchase.response : {};
  let response: ResponseType = {};

  if (purchase && purchase.response) {
    response = purchase.response;
  }
  const { providers = [], spareParts = [], sparePartVariants = [] } = response;

  useEffect(() => {
    dispatch(startGetPurchase());
  }, [dispatch]);

  return (
    <>
      <InvoiceProviders
        control={control}
        providers={providers}
        setFormState={setFormState}
      />
      {forms.map((form, index) => (
        <Box key={index} sx={boxStyles}>
          <PaymentForm
            initialValues={form.payment}
            onChange={handlePaymentChange(form.id)}
            spareParts={spareParts}
            sparePartVariants={sparePartVariants}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {forms.length > 1 && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveClick(form.id)}
                sx={{ mr: 1 }}
              >
                Borrar
              </Button>
            )}
            {Object.keys(editPurchase).length === 0 &&
              index === forms.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddClick}
                >
                  Agregar
                </Button>
              )}
          </Box>
        </Box>
      ))}
      <InvoiceTotals
        totalFactUsd={totalFactUsd}
        totalFactBs={totalFactBs}
        setTotalFactUsd={setTotalFactUsd}
        setTotalFactBs={setTotalFactBs}
        handleSaveClick={() => handleSaveClick(false)}
        setIsSaveButtonDisabled={setIsSaveButtonDisabled}
        isSaveButtonDisabled={isSaveButtonDisabled}
      />
      {SnackbarComponent}
    </>
  );
};

export default RegisterPurchase;
