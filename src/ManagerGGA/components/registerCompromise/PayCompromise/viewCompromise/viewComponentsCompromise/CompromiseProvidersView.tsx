import React, { useState } from "react";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { Controller, Control } from "react-hook-form";

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
  const [nde, setnde] = useState<number>(0);
  const [compromiso, setCompromiso] = useState("");

  const handlendeChange = (e: any) => {
    setnde(Number(e.target.value));
  };
  const handleCompromisoChange = (e: any) => {
    setCompromiso(e.target.value);
  };

  const handlendeBlur = () => {
    setFormState((prevState) => ({ ...prevState, nde: nde }));
  };
  const handleCompromisoBlur = () => {
    setFormState((prevState) => ({ ...prevState, compromiso: compromiso }));
  };

  const handleProviderChange = (field: any, _: any, value: any) => {
    field.onChange(value);
    setFormState((prevState) => ({ ...prevState, proveedor: value.name }));
  };

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={2}>
        <TextField
          label="NDE"
          variant="outlined"
          onChange={handlendeChange}
          onBlur={handlendeBlur}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Compromiso"
          variant="outlined"
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
              value={field.value || null} // Asegúrate de que el valor no sea undefined
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
