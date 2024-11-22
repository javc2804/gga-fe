import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  RootState as StoreRootState,
  useAppDispatch,
} from "../../../../store/store";
import { useForm } from "react-hook-form";
import { Button, Box } from "@mui/material";

import { startGetPurchase } from "../../../../store/purchase/purchaseThunks";
import { useSnackbar } from "../../../../hooks/useSnackBar";
import { ErrorOutline, CheckCircle } from "@mui/icons-material";

import InvoiceTotalsCompromises from "./InvoiceTotalsCompromises";
import CompromiseProviders from "./CompromiseProviders";
import PaymentFormCompromise from "./DataPay/PaymentFormCompromise";
import useMultipleFormCompromise from "../../../hooks/compromises/useMultipleFormCompromise";

interface RegisterPurchaseProps {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  combinedData: any;
  params: any;
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

const initialValuesPayment = {
  repuesto: null,
  descripcionRepuesto: null,
  formaPago: "Credito",
  descripcion: "",
  cantidad: "",
  precioUnitarioUsd: "",
  montoTotalUsd: "",
  ocOs: "",
  fechaOcOs: null,
  numeroOrdenPago: "",
  observacion: "",
  nde: 0,
  proveedor: null,
  compromiso: "",
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

export const NewCompromise: React.FC<RegisterPurchaseProps> = () => {
  const dispatch = useAppDispatch();

  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);
  const { control } = useForm();

  const [formState, setFormState] = useState<{
    nde: number;
    compromiso: string;
    proveedor: Provider | null;
  }>({ nde: 0, compromiso: "", proveedor: null });

  const { SnackbarComponent, openSnackbar } = useSnackbar();
  const {
    forms,
    handleAddClick,
    handleRemoveClick,
    handlePaymentChange,
    totalFactUsd,
    setTotalFactUsd,
    handleSaveClick,
    isSaveButtonDisabled,
    setIsSaveButtonDisabled,
  } = useMultipleFormCompromise(
    initialValuesPayment,
    openSnackbar,
    formState.nde,
    formState.proveedor,
    formState.compromiso,
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

  // useEffect(() => {
  //   if (editPurchase && Object.keys(editPurchase).length !== 0) {
  //     console.log(editPurchase);
  //     setFormState({
  //       nde: editPurchase.facNDE,
  //       compromiso: editPurchase.compromiso,
  //       proveedor: editPurchase.proveedor,
  //     });
  //     // setTotalFactUsd(editPurchase.montoTotalUsd);
  //     // Aquí puedes agregar más campos si es necesario
  //   }
  // }, [editPurchase]);

  return (
    <>
      <CompromiseProviders
        control={control}
        providers={providers}
        setFormState={setFormState}
      />
      {forms.map((form, index) => (
        <Box key={index} sx={boxStyles}>
          <PaymentFormCompromise
            initialValues={form.payment}
            onChange={handlePaymentChange(form.id)}
            spareParts={spareParts}
            sparePartVariants={sparePartVariants}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {editPurchase &&
              Object.keys(editPurchase).length === 0 &&
              forms.length > 1 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveClick(form.id)}
                  sx={{ mr: 1 }}
                >
                  Borrar
                </Button>
              )}
            {editPurchase &&
              Object.keys(editPurchase).length === 0 &&
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
      <InvoiceTotalsCompromises
        totalFactUsd={totalFactUsd}
        setTotalFactUsd={setTotalFactUsd}
        handleSaveClick={() => handleSaveClick(false)}
        setIsSaveButtonDisabled={setIsSaveButtonDisabled}
        isSaveButtonDisabled={isSaveButtonDisabled}
      />
      {SnackbarComponent}
    </>
  );
};

export default NewCompromise;
