import { Controller } from "react-hook-form";
import { TextField, Grid, Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateEditPurchase } from "../../../../../store/purchase/purchaseSlice";

interface SparePartsProps {
  control: any;
  setValues: any;
  values: any;
  spareParts: any;
  sparePartVariants: any;
}

export const SparePartsAndDescriptionsCompromise = ({
  control,
  setValues,
  values,
  spareParts,
  sparePartVariants,
}: SparePartsProps) => {
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);
  const dispatch = useDispatch();
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Repuesto"
                  variant="outlined"
                  fullWidth
                />
              )}
              onChange={(_, data) => {
                field.onChange(data);
                if (data) {
                  if (Object.keys(editPurchase).length !== 0) {
                    dispatch(
                      updateEditPurchase({
                        ...editPurchase,
                        repuesto: data.type,
                      })
                    );
                  }
                  setValues({
                    ...values,
                    repuesto: data.type,
                  });
                } else {
                  if (Object.keys(editPurchase).length !== 0) {
                    dispatch(
                      updateEditPurchase({
                        ...editPurchase,
                        repuesto: null,
                      })
                    );
                  }
                  setValues({
                    ...values,
                    repuesto: null,
                  });
                }
              }}
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Descripción Repuesto"
                  variant="outlined"
                  fullWidth
                />
              )}
              onChange={(_, data) => {
                field.onChange(data); // Esto es necesario para que react-hook-form rastree los cambios
                if (data) {
                  if (Object.keys(editPurchase).length !== 0) {
                    dispatch(
                      updateEditPurchase({
                        ...editPurchase,
                        descripcionRepuesto: data.variant,
                      })
                    );
                  }
                  setValues({
                    ...values,
                    descripcionRepuesto: data.variant,
                  });
                } else {
                  if (Object.keys(editPurchase).length !== 0) {
                    dispatch(
                      updateEditPurchase({
                        ...editPurchase,
                        descripcionRepuesto: null,
                      })
                    );
                  }
                  setValues({
                    ...values,
                    descripcionRepuesto: null,
                  });
                }
              }}
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
              label="Crédito"
              variant="outlined"
              fullWidth
              defaultValue="Credito"
              disabled
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default SparePartsAndDescriptionsCompromise;
