import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

interface PaymentFieldsProps {
  control: any;
  errors: any;
  trigger: any;
  values: {
    cantidad: number;
    precioUnitarioUsd: number;
    montoTotalUsd: number;
  };
  setValues: (values: any) => void;
  setValue: (name: string, value: number) => void;
  calculateMontoTotalUsd: (
    cantidad: number,
    precioUnitarioUsd: number
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
              const newMontoTotalUsd = calculateMontoTotalUsd(
                newCantidad,
                values.precioUnitarioUsd
              );
              setValues({
                ...values,
                cantidad: newCantidad,
                montoTotalUsd: newMontoTotalUsd,
              });
              setValue("montoTotalUsd", newMontoTotalUsd);
            }}
          />
        )}
      />
      <Controller
        name="precioUnitarioUsd"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Precio unitario $"
            variant="outlined"
            error={!!errors.precioUnitarioUsd}
            helperText={errors.precioUnitarioUsd?.message}
            onChange={(event) => {
              field.onChange(event);
              const newPrecioUnitarioUsd = Number(event.target.value);
              const newMontoTotalUsd = calculateMontoTotalUsd(
                values.cantidad,
                newPrecioUnitarioUsd
              );
              setValues({
                ...values,
                precioUnitarioUsd: newPrecioUnitarioUsd,
                montoTotalUsd: newMontoTotalUsd,
              });
              setValue("montoTotalUsd", newMontoTotalUsd);
            }}
          />
        )}
      />

      <Controller
        name="montoTotalUsd"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Monto total $"
            variant="outlined"
            error={!!errors.montoTotalUsd}
            helperText={errors.montoTotalUsd?.message}
            disabled
          />
        )}
      />
    </>
  );
};

export default PaymentFieldsCompromise;
