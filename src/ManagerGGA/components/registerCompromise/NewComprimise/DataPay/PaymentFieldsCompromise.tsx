import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateEditPurchase } from "../../../../../store/purchase/purchaseSlice";

interface PaymentFieldsProps {
  control: any;
  errors: any;
  trigger: any;
  values: {
    cantidad: number;
    deudaUnitarioUsd: number;
    deudaTotalUsd: number;
  };
  setValues: (values: any) => void;
  setValue: (name: string, value: number) => void;
  calculateMontoTotalUsd: (
    cantidad: number,
    deudaUnitarioUsd: number
  ) => number;
}

export const PaymentFieldsCompromise: React.FC<PaymentFieldsProps> = ({
  control,
  errors,
  trigger,
  values,
  setValues,
  setValue,
  calculateMontoTotalUsd,
}) => {
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);
  const dispatch = useDispatch();

  return (
    <>
      <Controller
        name="cantidad"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Cantidad"
            variant="outlined"
            error={!!errors.cantidad}
            helperText={errors.cantidad?.message}
            onChange={(event) => {
              field.onChange(event);
              trigger("cantidad");
              const newCantidad = Number(event.target.value);
              const newDeudaTotalUsd = calculateMontoTotalUsd(
                newCantidad,
                values.deudaUnitarioUsd || editPurchase.deudaUnitarioUsd
              );

              if (Object.keys(editPurchase).length !== 0) {
                dispatch(
                  updateEditPurchase({
                    ...editPurchase,
                    cantidad: newCantidad,
                    deudaTotalUsd: newDeudaTotalUsd,
                  })
                );
              }

              setValues({
                ...values,
                cantidad: newCantidad,
                deudaTotalUsd: newDeudaTotalUsd,
              });
              setValue("deudaTotalUsd", newDeudaTotalUsd);
            }}
          />
        )}
      />
      <Controller
        name="deudaUnitarioUsd"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Deuda unitario $"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.deudaUnitarioUsd}
            helperText={errors.deudaUnitarioUsd?.message}
            onChange={(event) => {
              field.onChange(event);
              const newDeudaUnitarioUsd = Number(event.target.value);
              const newDeudaTotalUsd = calculateMontoTotalUsd(
                values.cantidad,
                newDeudaUnitarioUsd
              );
              if (Object.keys(editPurchase).length !== 0) {
                dispatch(
                  updateEditPurchase({
                    ...editPurchase,
                    deudaUnitarioUsd: newDeudaUnitarioUsd,
                    deudaTotalUsd: newDeudaTotalUsd,
                  })
                );
              }
              setValues({
                ...values,
                deudaUnitarioUsd: newDeudaUnitarioUsd,
                deudaTotalUsd: newDeudaTotalUsd,
              });
              setValue("deudaTotalUsd", newDeudaTotalUsd);
            }}
          />
        )}
      />

      <Controller
        name="deudaTotalUsd"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Deuda total $"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.deudaTotalUsd}
            helperText={errors.deudaTotalUsd?.message}
            disabled
          />
        )}
      />
    </>
  );
};

export default PaymentFieldsCompromise;
