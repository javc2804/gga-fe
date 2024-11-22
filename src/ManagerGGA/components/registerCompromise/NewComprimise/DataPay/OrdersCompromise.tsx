import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import { updateEditPurchase } from "../../../../../store/purchase/purchaseSlice";

interface Props {
  control: any;
  errors: any;
  values: any;
  setValues: (values: any) => void;
  trigger: (name: string) => void;
}

export const OrdersCompromise: React.FC<Props> = ({
  control,
  errors,
  values,
  setValues,
  trigger,
}) => {
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);
  const dispatch = useDispatch();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="ocOs"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="OC/OS"
              variant="outlined"
              error={!!errors.ocOs}
              helperText={errors.ocOs?.message}
              onChange={(event) => {
                field.onChange(event);
                if (Object.keys(editPurchase).length !== 0) {
                  dispatch(
                    updateEditPurchase({
                      ...editPurchase,
                      ocOs: event.target.value,
                    })
                  );
                }
                setValues({
                  ...values,
                  ocOs: event.target.value,
                });
              }}
            />
          )}
        />
        <Controller
          name="fechaOcOs"
          control={control}
          rules={{ required: "Fecha de OC/OS es requerido" }}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label="Fecha OC/OS"
              value={value ? new Date(value) : null} // Convierte la cadena a un objeto Date
              onChange={(date: any) => {
                onChange(date);
                if (Object.keys(editPurchase).length !== 0) {
                  dispatch(
                    updateEditPurchase({
                      ...editPurchase,
                      fechaOcOs: format(date, "yyyy-MM-dd"),
                    })
                  );
                }
                setValues({
                  ...values,
                  fechaOcOs: format(date, "yyyy-MM-dd"),
                });
              }}
              format="dd/MM/yyyy"
            />
          )}
        />
        <Controller
          name="numeroOrdenPago"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nº de Orden de Pago"
              variant="outlined"
              error={!!errors.numeroOrdenPago}
              helperText={errors.numeroOrdenPago?.message}
              onChange={(event) => {
                field.onChange(event);
                trigger("numeroOrdenPago");
                const newNumeroOrdenPago = event.target.value;
                if (Object.keys(editPurchase).length !== 0) {
                  dispatch(
                    updateEditPurchase({
                      ...editPurchase,
                      numeroOrdenPago: newNumeroOrdenPago,
                    })
                  );
                }
                setValues({
                  ...values,
                  numeroOrdenPago: newNumeroOrdenPago,
                });
              }}
            />
          )}
        />
        <Controller
          name="observacion"
          control={control}
          rules={{ required: "Observación es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Observación"
              variant="outlined"
              multiline
              rows={4}
              error={!!errors.observacion}
              helperText={errors.observacion?.message}
              onChange={(event) => {
                field.onChange(event);
                const newObservacion = event.target.value;
                if (Object.keys(editPurchase).length !== 0) {
                  dispatch(
                    updateEditPurchase({
                      ...editPurchase,
                      observacion: newObservacion,
                    })
                  );
                }
                setValues({
                  ...values,
                  observacion: newObservacion,
                });
              }}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export default OrdersCompromise;
