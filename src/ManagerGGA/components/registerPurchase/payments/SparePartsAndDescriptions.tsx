import { Controller } from "react-hook-form";
import { TextField, Grid, Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateEditPurchase } from "../../../../store/purchase/purchaseSlice";

interface SparePartsProps {
  control: any;
  setValues: any;
  values: any;
  spareParts: any;
  sparePartVariants: any;
}

export const SparePartsAndDescriptions = ({
  control,
  setValues,
  values,
  spareParts,
  sparePartVariants,
}: SparePartsProps) => {
  const dispatch = useDispatch();
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);
  useEffect(() => {
    if (Object.keys(editPurchase).length !== 0) {
      setValues({
        ...values,
        repuesto: editPurchase.repuesto,
        descripcionRepuesto: editPurchase.descripcionRepuesto,
      });
    }
  }, [editPurchase, setValues, values]);

  const handleRepuestoChange = (_: any, data: any) => {
    if (data) {
      setValues({
        ...values,
        repuesto: data.type,
      });
      if (Object.keys(editPurchase).length !== 0) {
        dispatch(updateEditPurchase({ ...editPurchase, repuesto: data.type }));
      }
    } else {
      setValues({
        ...values,
        repuesto: "",
      });
      if (Object.keys(editPurchase).length !== 0) {
        dispatch(updateEditPurchase({ ...editPurchase, repuesto: "" }));
      }
    }
  };

  const handleDescripcionRepuestoChange = (_: any, data: any) => {
    if (data) {
      setValues({
        ...values,
        descripcionRepuesto: data.variant,
      });
      if (Object.keys(editPurchase).length !== 0) {
        dispatch(
          updateEditPurchase({
            ...editPurchase,
            descripcionRepuesto: data.variant,
          })
        );
      }
    } else {
      setValues({
        ...values,
        descripcionRepuesto: "",
      });
      if (Object.keys(editPurchase).length !== 0) {
        dispatch(
          updateEditPurchase({ ...editPurchase, descripcionRepuesto: "" })
        );
      }
    }
  };
  return (
    <Grid container spacing={2} style={{ width: "40%" }}>
      <Grid item xs={12} sm={6} md={4}>
        <Controller
          name="repuesto"
          control={control}
          rules={{ required: "Repuesto es requerido" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={spareParts}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.type
              }
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              value={values.repuesto || null} // Usa 'value' en lugar de 'defaultValue'
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Repuesto"
                  variant="outlined"
                  fullWidth
                />
              )}
              onChange={handleRepuestoChange}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Controller
          name="descripcionRepuesto"
          control={control}
          rules={{ required: "Descripción repuesto es requerido" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={sparePartVariants}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.variant
              }
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              value={values.descripcionRepuesto || null} // Usa 'value' en lugar de 'defaultValue'
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Descripción Repuesto"
                  variant="outlined"
                  fullWidth
                />
              )}
              onChange={handleDescripcionRepuestoChange}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Controller
          name="formaDePago"
          control={control}
          rules={{ required: "Forma de pago es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contado"
              variant="outlined"
              fullWidth
              defaultValue="contado"
              disabled
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default SparePartsAndDescriptions;
