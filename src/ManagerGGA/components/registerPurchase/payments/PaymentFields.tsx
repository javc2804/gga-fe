import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateEditPurchase } from "../../../../store/purchase/purchaseSlice";
interface PaymentFieldsProps {
  control: any;
  errors: any;
  trigger: any;
  values: {
    cantidad: number;
    precioUnitarioBs: number;
    precioUnitarioUsd: number;
    tasaBcv: number;
    montoTotalBs: number;
    montoTotalUsd: number;
  };
  setValues: (values: any) => void;
  setValue: (name: string, value: number) => void;
  calculateMontoTotalBs: (cantidad: number, precioUnitarioBs: number) => number;
  calculateMontoTotalUsd: (
    cantidad: number,
    precioUnitarioUsd: number
  ) => number;
  calculatePrecioUnitarioUsd: (
    precioUnitarioBs: number,
    tasaBcv: number
  ) => number;
  calculatePrecioUnitarioBs: (montoTotalBs: number, cantidad: number) => number;
  calculateTasaBcv: (
    precioUnitarioBs: number,
    precioUnitarioUsd: number
  ) => number;
}

export const PaymentFields: React.FC<PaymentFieldsProps> = ({
  control,
  errors,
  trigger,
  values,
  setValues,
  setValue,
  calculateMontoTotalBs,
  calculateMontoTotalUsd,
  calculatePrecioUnitarioUsd,
  calculatePrecioUnitarioBs,
  calculateTasaBcv,
}) => {
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);
  const dispatch = useDispatch();

  return (
    <>
      <Controller
        name="cantidad"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Cantidad"
            variant="outlined"
            error={!!errors.cantidad}
            helperText={errors.cantidad?.message}
            value={field.value || 0}
            onChange={(event) => {
              const newCantidad = Number(event.target.value);
              field.onChange(newCantidad);
              trigger("cantidad");

              const newMontoTotalUsd = calculateMontoTotalUsd(
                newCantidad,
                values.precioUnitarioUsd || editPurchase.precioUnitarioUsd
              );
              const newMontoTotalBs = calculateMontoTotalBs(
                newCantidad,
                values.precioUnitarioBs || editPurchase.precioUnitarioBs
              );

              if (Object.keys(editPurchase).length !== 0) {
                dispatch(
                  updateEditPurchase({
                    ...editPurchase,
                    cantidad: newCantidad,
                    montoTotalUsd: newMontoTotalUsd,
                    montoTotalBs: newMontoTotalBs,
                  })
                );
              }
              setValues({
                ...values,
                cantidad: newCantidad,
                montoTotalUsd: newMontoTotalUsd,
                montoTotalBs: newMontoTotalBs,
              });
              setValue("montoTotalUsd", newMontoTotalUsd);
              setValue("montoTotalBs", newMontoTotalBs);
            }}
          />
        )}
      />
      <Controller
        name="precioUnitarioBs"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Precio Unitario Bs"
            variant="outlined"
            error={!!errors.precioUnitarioBs}
            helperText={errors.precioUnitarioBs?.message}
            onChange={(event) => {
              field.onChange(event);
              trigger("precioUnitarioBs");
              const newPrecioUnitarioBs = Number(event.target.value);
              const newPrecioUnitarioUsd = calculatePrecioUnitarioUsd(
                newPrecioUnitarioBs,
                values.tasaBcv || editPurchase.tasaBcv
              );
              const newMontoTotalBs = calculateMontoTotalBs(
                values.cantidad || editPurchase.cantidad,
                newPrecioUnitarioBs
              );
              const newMontoTotalUsd = calculateMontoTotalUsd(
                values.cantidad || editPurchase.cantidad,
                newPrecioUnitarioUsd
              );
              if (Object.keys(editPurchase).length !== 0) {
                dispatch(
                  updateEditPurchase({
                    ...editPurchase,
                    precioUnitarioBs: newPrecioUnitarioBs,
                    precioUnitarioUsd: newPrecioUnitarioUsd,
                    montoTotalBs: newMontoTotalBs,
                    montoTotalUsd: newMontoTotalUsd,
                  })
                );
              }
              setValues({
                ...values,
                precioUnitarioBs: newPrecioUnitarioBs,
                precioUnitarioUsd: newPrecioUnitarioUsd,
                montoTotalBs: newMontoTotalBs,
                montoTotalUsd: newMontoTotalUsd,
              });
              setValue("precioUnitarioUsd", newPrecioUnitarioUsd);
              setValue("montoTotalBs", newMontoTotalBs);
              setValue("montoTotalUsd", newMontoTotalUsd);
            }}
          />
        )}
      />
      <Controller
        name="tasaBcv"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Tasa BCV"
            variant="outlined"
            error={!!errors.tasaBcv}
            helperText={errors.tasaBcv?.message}
            onChange={(event) => {
              field.onChange(event);
              trigger("tasaBcv");
              const newTasaBcv = Number(event.target.value);
              const newPrecioUnitarioUsd = calculatePrecioUnitarioUsd(
                values.precioUnitarioBs || editPurchase.precioUnitarioBs,
                newTasaBcv
              );
              const newMontoTotalUsd = calculateMontoTotalUsd(
                newPrecioUnitarioUsd,
                values.cantidad || editPurchase.cantidad
              );
              if (Object.keys(editPurchase).length !== 0) {
                dispatch(
                  updateEditPurchase({
                    ...editPurchase,
                    tasaBcv: newTasaBcv,
                    precioUnitarioUsd: newPrecioUnitarioUsd,
                    montoTotalUsd: newMontoTotalUsd,
                  })
                );
              }
              setValues({
                ...values,
                tasaBcv: newTasaBcv,
                precioUnitarioUsd: newPrecioUnitarioUsd,
                montoTotalUsd: newMontoTotalUsd,
              });
              setValue("precioUnitarioUsd", newPrecioUnitarioUsd);
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
            InputLabelProps={{ shrink: true }}
            error={!!errors.precioUnitarioUsd}
            helperText={errors.precioUnitarioUsd?.message}
            onChange={(event) => {
              field.onChange(event);
              trigger("precioUnitarioUsd");
              const newPrecioUnitarioUsd = Number(event.target.value);

              const newPrecioUnitarioBs = (
                (Number(values.tasaBcv) || editPurchase.tasaBcv) *
                newPrecioUnitarioUsd
              ).toFixed(2);

              const newMontoTotalUsd = calculateMontoTotalUsd(
                newPrecioUnitarioUsd,
                Number(values.cantidad) || editPurchase.cantidad
              );

              if (Object.keys(editPurchase).length !== 0) {
                dispatch(
                  updateEditPurchase({
                    ...editPurchase,
                    precioUnitarioUsd: newPrecioUnitarioUsd,
                    precioUnitarioBs: newPrecioUnitarioBs,
                  })
                );
              }
              setValues({
                ...values,
                precioUnitarioUsd: newPrecioUnitarioUsd,
                precioUnitarioBs: newPrecioUnitarioBs,
              });
              setValue("precioUnitarioBs", Number(newPrecioUnitarioBs));
              setValue("montoTotalUsd", newMontoTotalUsd);
            }}
          />
        )}
      />
      <Controller
        name="montoTotalBs"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Monto total Bs"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            error={!!errors.montoTotalBs}
            helperText={errors.montoTotalBs?.message}
            onChange={(event) => {
              field.onChange(event);
              trigger("montoTotalBs");
              const newMontoTotalBs = Number(event.target.value);
              const newPrecioUnitarioBs = calculatePrecioUnitarioBs(
                newMontoTotalBs,
                Number(values.cantidad) || editPurchase.cantidad
              );
              const newTasaBcv = calculateTasaBcv(
                newPrecioUnitarioBs,
                values.precioUnitarioUsd || editPurchase.precioUnitarioUsd
              );
              if (Object.keys(editPurchase).length !== 0) {
                dispatch(
                  updateEditPurchase({
                    ...editPurchase,
                    montoTotalBs: newMontoTotalBs,
                    precioUnitarioBs: newPrecioUnitarioBs,
                    tasaBcv: newTasaBcv,
                  })
                );
              }
              setValues({
                ...values,
                montoTotalBs: newMontoTotalBs,
                precioUnitarioBs: newPrecioUnitarioBs,
                tasaBcv: newTasaBcv,
              });
              setValue("precioUnitarioBs", newPrecioUnitarioBs);
              setValue("tasaBcv", newTasaBcv);
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
            InputLabelProps={{ shrink: true }}
            error={!!errors.montoTotalUsd}
            helperText={errors.montoTotalUsd?.message}
            onChange={(event) => {
              field.onChange(event);
              trigger("montoTotalUsd");
              const newMontoTotalUsd = Number(event.target.value);
              const newPrecioUnitarioUsd = calculatePrecioUnitarioUsd(
                newMontoTotalUsd,
                values.cantidad
              );
              const newTasaBcv = calculateTasaBcv(
                values.precioUnitarioBs || editPurchase.precioUnitarioBs,
                newPrecioUnitarioUsd
              );
              if (Object.keys(editPurchase).length !== 0) {
                dispatch(
                  updateEditPurchase({
                    ...editPurchase,
                    montoTotalUsd: newMontoTotalUsd,
                    precioUnitarioUsd: newPrecioUnitarioUsd,
                    tasaBcv: newTasaBcv,
                  })
                );
              }
              setValues({
                ...values,
                montoTotalUsd: newMontoTotalUsd,
                precioUnitarioUsd: newPrecioUnitarioUsd,
                tasaBcv: newTasaBcv,
              });
              setValue("precioUnitarioUsd", newPrecioUnitarioUsd);
              setValue("tasaBcv", newTasaBcv);
            }}
          />
        )}
      />
    </>
  );
};

export default PaymentFields;
