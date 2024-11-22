import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  RootState as StoreRootState,
  useAppDispatch,
} from "../../../../store/store";
// import { useForm } from "react-hook-form";
import { Button, Box } from "@mui/material";
import { startGetCompromise } from "../../../../store/compromises/compromisesThunk";
import { useSnackbar } from "../../../../hooks/useSnackBar";
import { ErrorOutline, CheckCircle } from "@mui/icons-material";
import InvoiceProviderPay from "./viewCompromise/viewComponentsCompromise/InvoiceProviderPay";
import ViewCompromise from "./viewCompromise/ViewCompromise";
import InvoiceTotalsCompromisesPay from "./viewCompromise/viewComponentsCompromise/InvoiceTotalsCompromisesPay";
import useMultipleFormCompromisePay from "../../../hooks/compromises/pay/useMultipleFormCompromisePay";
import PaymentFormCompromisePay from "./payment/PaymentFormCompromisePay";
import Loading from "../../../../components/Loading";

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
  fleets?: any[];
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

export const PayCompromise: React.FC<RegisterPurchaseProps> = () => {
  const dispatch = useAppDispatch();
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);

  useEffect(() => {
    if (editPurchase && editPurchase.id) {
      dispatch(startGetCompromise(editPurchase.id));
    }
  }, [dispatch, editPurchase]);
  const resp = useSelector((state: any) => state.compromises);
  const isLoading = useSelector((state: any) => state.compromises.loading);
  const { compromise } = resp;
  // const { control } = useForm();
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
    setTotalCantidad,
    totalCantidad,
    isSaveButtonDisabled,
  } = useMultipleFormCompromisePay(
    initialValuesInput,
    initialValuesPayment,
    openSnackbar,
    formState.facNDE,
    formState.proveedor,
    ErrorOutline,
    CheckCircle,
    compromise
  );
  const purchase = useSelector(
    (state: StoreRootState) => state.purchase.purchase
  );

  // const response: ResponseType = purchase ? purchase.response : {};
  let response: ResponseType = {};

  if (purchase && purchase.response) {
    response = purchase.response;
  }
  const {
    // fleets = [],
    // providers = [],
    spareParts = [],
    sparePartVariants = [],
  } = response;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ViewCompromise compromise={compromise.response} />
          {forms.map((form, index) => (
            <Box key={index} sx={boxStyles}>
              <InvoiceProviderPay
                // control={control}
                // providers={providers}
                setFormState={setFormState}
              />
              <PaymentFormCompromisePay
                initialValues={form.payment}
                onChange={handlePaymentChange(form.id)}
                spareParts={spareParts}
                sparePartVariants={sparePartVariants}
                compromise={compromise}
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
                {index === forms.length - 1 && (
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
          <InvoiceTotalsCompromisesPay
            totalFactUsd={totalFactUsd}
            totalFactBs={totalFactBs}
            totalCantidad={totalCantidad}
            compromise={compromise}
            setTotalFactUsd={setTotalFactUsd}
            setTotalFactBs={setTotalFactBs}
            setTotalCantidad={setTotalCantidad}
            handleSaveClick={() => handleSaveClick()}
            isSaveButtonDisabled={isSaveButtonDisabled}
          />
          {SnackbarComponent}
        </>
      )}
    </>
  );
};

export default PayCompromise;
