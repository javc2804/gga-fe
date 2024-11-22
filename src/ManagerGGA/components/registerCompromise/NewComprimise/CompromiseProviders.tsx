import React, { useState } from "react";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateEditPurchase } from "../../../../store/purchase/purchaseSlice";

interface Provider {
  id: string;
  name: string;
}

interface InvoiceProvidersProps {
  control: Control;
  providers: Provider[];
  setFormState: React.Dispatch<
    React.SetStateAction<{
      nde: number;
      compromiso: string;
      proveedor: Provider | null;
    }>
  >;
}

export const CompromiseProviders: React.FC<InvoiceProvidersProps> = ({
  control,
  providers,
  setFormState,
}) => {
  const dispatch = useDispatch();
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);

  const [nde, setNde] = useState<number>(editPurchase.facNDE || "");
  const [compromiso, setCompromiso] = useState("");
  // const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
  // null
  // );

  // useEffect(() => {
  //   if (editPurchase && Object.keysditPurchase).length !== 0) {
  //     setnde(editPurchase.facNDE);
  //     setCompromiso(editPurchase.compromiso);
  //     const foundProvider = providers.find(
  //       (provider) => provider.name === editPurchase.proveedor
  //     );
  //     setSelectedProvider(foundProvider || null);
  //     setFormState((prevState) => ({
  //       ...prevState,
  //       proveedor: editPurchase.proveedor,
  //     }));
  //   }
  // }, [editPurchase]);

  const handlendeChange = (e: any) => {
    const newNde = Number(e.target.value);
    if (Object.keys(editPurchase).length !== 0) {
      dispatch(updateEditPurchase({ ...editPurchase, nde: newNde }));
    }
    setNde(newNde);
    setFormState((prevState) => ({ ...prevState, nde: newNde }));
  };

  const handleCompromisoChange = (e: any) => {
    setCompromiso(e.target.value);
    if (Object.keys(editPurchase).length !== 0) {
      dispatch(
        updateEditPurchase({ ...editPurchase, compromiso: e.target.value })
      );
    }
    setFormState((prevState) => ({ ...prevState, compromiso: e.target.value }));
  };

  const handlendeBlur = () => {
    if (Object.keys(editPurchase).length !== 0) {
      dispatch(updateEditPurchase({ ...editPurchase, facNDE: nde }));
    }
    setFormState((prevState) => ({ ...prevState, nde: nde }));
  };
  const handleCompromisoBlur = () => {
    if (Object.keys(editPurchase).length !== 0) {
      dispatch(updateEditPurchase({ ...editPurchase, compromiso: compromiso }));
    }
    setFormState((prevState) => ({ ...prevState, compromiso }));
  };

  const handleProviderChange = (field: any, _: any, value: any) => {
    field.onChange(value);
    if (Object.keys(editPurchase).length !== 0) {
      dispatch(updateEditPurchase({ ...editPurchase, proveedor: value.name })); // Actualiza editPurchase
    }
    setFormState((prevState) => ({ ...prevState, proveedor: value.name }));
  };

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={2}>
        <TextField
          label="NDE"
          variant="outlined"
          value={nde}
          onChange={handlendeChange}
          onBlur={handlendeBlur}
          fullWidth
          type="number"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Compromiso"
          variant="outlined"
          value={
            Object.keys(editPurchase).length !== 0
              ? editPurchase.compromiso
              : compromiso
          }
          onChange={handleCompromisoChange}
          onBlur={handleCompromisoBlur}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Controller
          name="provider"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={providers}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ flexGrow: 0.15 }}
              onChange={(event, value) =>
                handleProviderChange(field, event, value)
              }
              value={
                field.value ||
                providers.find(
                  (provider) => provider.name === editPurchase.proveedor
                ) ||
                null
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Registro Proveedor"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default CompromiseProviders;
