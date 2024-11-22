import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startSavePurchaseAsing,
  startGetPurchaseTrans,
} from "../../../store/purchase/purchaseThunks";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Grid,
  Divider,
  Box,
  // useMediaQuery,
  // useTheme,
  Snackbar,
  Alert,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import UTData from "../../components/detailsCompromise/UTData";
import CostData from "../../components/detailsCompromise/CostData";
import ViewDetailCompromise from "../../components/registerCompromise/DetailCompromise/ViewDetailCompromise";
import InvoiceTotalsDetail from "../../components/registerCompromise/DetailCompromise/InvoiceTotalsDetail";
import Loading from "../../../components/Loading";
import { AlertColor } from "@mui/material/Alert";

const DetailsCompromise = () => {
  useEffect(() => {
    dispatch(startGetPurchaseTrans(invoice.note_number));
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const invoice = location.state?.invoice || {};
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [snackbarType, setSnackbarType] = useState<AlertColor>("success");
  const [costData, setCostData] = useState(
    invoice.invoices.map(() => ({
      precioUnitarioBs: 0,
      montoTotalBs: 0,
      precioUnitarioUsd: 0,
      montoTotalUsd: 0,
      deudaUnitarioUsd: 0,
      deudaTotalUsd: 0,
    }))
  );

  const [checkedState, setCheckedState] = useState(() =>
    invoice.invoices.map(() => false)
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCheckboxChange = (index: number) => {
    setCheckedState((prevCheckedState: any) =>
      prevCheckedState.map((item: any, itemIndex: any) =>
        index === itemIndex ? !item : item
      )
    );
  };

  const handleCostDataChange = (index: any, newCostData: any) => {
    setCostData((prevCostData: any) =>
      prevCostData.map((item: any, i: any) =>
        i === index ? newCostData : item
      )
    );
  };

  const handleSave = () => {
    checkedState.forEach((isChecked: any, index: any) => {
      if (isChecked) {
        console.log(`Checkbox ${index} está marcado.`);
      }
    });

    const userEmail = { user_rel: localStorage.getItem("email") };
    const {
      id,
      fechaOcOs,
      facNDE,
      tasaBcv,
      numeroOrdenPago,
      ocOs,
      observacion,
      proveedor,
      descripcionRepuesto,
      repuesto,
      formaPago,
      compromiso = null,
      deudaUnitarioUsd,
      precioUnitarioBs,
    } = compromise.response;
    const updatedInvoices = invoice.invoices.map((inv: any, index: any) => {
      const { fleet, ...restInv } = inv; // Extraer fleet y el resto de las propiedades de inv
      const isChecked = checkedState[index]; // Determinar si el índice actual está marcado

      const updatedInvoice = {
        ...restInv, // Propiedades de inv sin fleet
        ...userEmail,
        ...costData[index],
        facNDE,
        tasaBcv,
        numeroOrdenPago,
        ocOs,
        observacion,
        proveedor,
        precioUnitarioBs,
        deudaUnitarioUsd: formaPago === "contado" ? 0 : deudaUnitarioUsd,
        deudaTotalUsd:
          formaPago === "contado"
            ? 0
            : Number(inv.quantity) * Number(deudaUnitarioUsd),
        montoTotalBs:
          formaPago !== "contado"
            ? 0
            : Number(inv.quantity) * Number(precioUnitarioBs),
        cantidad: inv.quantity,
        fechaOcOs,
        ut: fleet.ut,
        eje: fleet.eje,
        subeje: fleet.subeje,
        marcaModelo: fleet.marcaModelo,
        descripcionRepuesto,
        repuesto,
        formaPago,
        compromiso,
        processed: isChecked ? true : false,
      };

      return updatedInvoice;
    });
    const updatedInvoice = {
      ...invoice,
      invoices: updatedInvoices,
      idTransaction: id,
    };

    dispatch(startSavePurchaseAsing(updatedInvoice))
      .then(() => {
        setSnackbarMessage("Guardado con éxito");
        setSnackbarType("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch(() => {
        setSnackbarMessage("No se logró guardar");
        setSnackbarType("error");
        setSnackbarOpen(true);
      });
  };

  const resp = useSelector((state: any) => state.compromises);
  const isLoading = useSelector((state: any) => state.compromises.loading);
  const { compromise } = resp;
  const [modoPago, setModoPago] = useState(false);
  useEffect(() => {
    if (compromise.response?.formaPago === "contado") {
      setModoPago(false);
    } else {
      setModoPago(true);
    }
  }, [compromise.response?.formaPago]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ViewDetailCompromise
            showFields={modoPago}
            compromise={compromise.response}
          />

          <Box style={{ overflow: "auto", maxHeight: "90vh" }}>
            <Grid container direction="column">
              <Grid item>
                <Paper
                  elevation={3}
                  style={{
                    width: "97%",
                    marginLeft: "1%",
                    marginBottom: "20px",
                    height: "400px", // Ajuste este valor según sus necesidades
                    overflowY: "auto", // Esto habilitará el desplazamiento vertical cuando el contenido exceda la altura fija
                  }}
                >
                  <Box sx={{ p: 4, mr: 4, mt: 2, ml: 2 }}>
                    <h3>Asignación</h3>
                  </Box>
                  <Grid container spacing={2} direction="row">
                    {invoice.invoices.map((invoiceData: any, index: any) => (
                      <React.Fragment key={index}>
                        <Grid item xs={5}>
                          <UTData invoiceData={invoiceData} />
                        </Grid>
                        <Grid item xs={5}>
                          <CostData
                            compromise={compromise.response}
                            invoiceData={costData[index]}
                            invoice={invoice.invoices[index]}
                            onValuesChangeProp={(newCostData: any) =>
                              handleCostDataChange(index, newCostData)
                            }
                            showFields={{ modoPago: modoPago }}
                          />
                        </Grid>
                        <Grid item xs={2} container alignItems="center">
                          <Grid item xs={2} container alignItems="center">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checkedState[index]}
                                  onChange={() => handleCheckboxChange(index)}
                                />
                              }
                              label=""
                            />
                          </Grid>
                        </Grid>
                        {index < invoice.invoices.length - 1 && (
                          <Divider style={{ width: "100%", margin: "1% 0" }} />
                        )}
                      </React.Fragment>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <InvoiceTotalsDetail
              totalFactUsd={0}
              totalFactBs={0}
              handleSave={handleSave}
              compromise={compromise.response}
              costData={costData}
              invoice={invoice}
              showFields={modoPago}
            />
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                severity={snackbarType}
                icon={
                  snackbarType === "success" ? (
                    <CheckCircleIcon />
                  ) : (
                    <ErrorIcon />
                  )
                }
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>
        </>
      )}
    </>
  );
};

export default DetailsCompromise;
