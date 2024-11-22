import { useEffect, useRef, useState } from "react";
import { TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { schema } from "../../../../helpers/validationsPaymentForm";
import { useCalculations } from "../../../hooks/purchase/useCalculations";
import { SparePartsAndDescriptions, Orders, PaymentFields } from "../..";
import { updateEditPurchase } from "../../../../store/purchase/purchaseSlice";

interface PaymentFormProps {
  initialValues: any;
  spareParts: any;
  sparePartVariants: any;
  onChange: any;
}

export const PaymentForm = ({
  initialValues,
  spareParts,
  sparePartVariants,
  onChange,
}: PaymentFormProps) => {
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);

  const dispatch = useDispatch();
  // const [formValues, setFormValues] = useState(() => {
  //   if (editPurchase && Object.keys(editPurchase).length !== 0) {
  //     return editPurchase;
  //   }
  //   return initialValues;
  // });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editPurchase || initialValues,
  });

  const {
    calculatePrecioUnitarioUsd,
    calculatePrecioUnitarioBs,
    calculateMontoTotalBs,
    calculateMontoTotalUsd,
    calculateTasaBcv,
  } = useCalculations();

  const [values, setValues] = useState({
    repuesto: "",
    descripcionRepuesto: "",
    descripcion: "",
    cantidad: 0,
    precioUnitarioBs: 0,
    precioUnitarioUsd: 0,
    tasaBcv: 0,
    montoTotalBs: 0,
    montoTotalUsd: 0,
  });
  const lastValuesRef = useRef(values);

  useEffect(() => {
    if (
      typeof onChange === "function" &&
      JSON.stringify(values) !== JSON.stringify(lastValuesRef.current)
    ) {
      if (Object.keys(editPurchase).length !== 0) {
        dispatch(updateEditPurchase({ ...editPurchase, ...values }));
      }
      onChange(values, errors);
      lastValuesRef.current = values;
    }
  }, [values, onChange, errors]);

  const onSubmit = (data: any) => {
    if (typeof onChange === "function") {
      onChange(data, errors);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <SparePartsAndDescriptions
        control={control}
        setValues={setValues}
        values={values}
        spareParts={spareParts}
        sparePartVariants={sparePartVariants}
      />
      <Controller
        name="descripcion"
        control={control}
        defaultValue="" // Asegúrate de que el valor inicial no sea `undefined`
        render={({ field }) => (
          <TextField
            {...field}
            label="Descripción"
            variant="outlined"
            error={!!errors.descripcion}
            onChange={(event) => {
              setValues({
                ...values,
                descripcion: event.target.value,
              });
              field.onChange(event); // update field value
              trigger("descripcion"); // validate field
              if (Object.keys(editPurchase).length !== 0) {
                dispatch(
                  updateEditPurchase({
                    ...editPurchase,
                    descripcion: event.target.value,
                  })
                ); // update Redux state
              }
            }}
          />
        )}
      />
      <PaymentFields
        control={control}
        errors={errors}
        trigger={trigger}
        values={values}
        setValues={setValues}
        setValue={setValue}
        calculateMontoTotalBs={calculateMontoTotalBs}
        calculateMontoTotalUsd={calculateMontoTotalUsd}
        calculatePrecioUnitarioUsd={calculatePrecioUnitarioUsd}
        calculatePrecioUnitarioBs={calculatePrecioUnitarioBs}
        calculateTasaBcv={calculateTasaBcv}
      />
      <Orders
        control={control}
        errors={errors}
        values={values}
        setValues={setValues}
        trigger={trigger}
      />
    </Box>
  );
};

export default PaymentForm;
