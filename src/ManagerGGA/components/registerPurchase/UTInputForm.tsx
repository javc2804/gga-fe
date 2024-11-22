import { useEffect, useRef, memo } from "react";
import { TextField, Box, Autocomplete, Grid } from "@mui/material";
import useForm from "../../hooks/purchase/useFormUT";

type InitialValuesType = {
  ut: string;
  marcaModelo: string;
  eje: string;
  subeje: string;
};

type UTInputFormProps = {
  initialValues?: InitialValuesType[];
  fleets?: InitialValuesType[];
  disabled?: boolean;
  onChange?: (values: InitialValuesType) => void;
};

export const UTInputForm: React.FC<UTInputFormProps> = ({
  initialValues = [],
  fleets = [],
  disabled = false,
  onChange,
}) => {
  const initialValuesObject: InitialValuesType =
    initialValues.length > 0
      ? initialValues[0]
      : {
          ut: "",
          marcaModelo: "",
          eje: "",
          subeje: "",
        };

  const { values, handleChange, handleAutoCompleteChange } = useForm(
    initialValuesObject,
    fleets
  );

  const lastValuesRef = useRef(values);

  useEffect(() => {
    if (typeof onChange === "function" && values !== lastValuesRef.current) {
      onChange(values);
      lastValuesRef.current = values;
    }
  }, [values, onChange]);

  const utOptions = fleets.map((item) => item.ut);
  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item>
          <Autocomplete
            id="ut"
            options={utOptions}
            value={utOptions.includes(values.ut) ? values.ut : null}
            onChange={handleAutoCompleteChange("ut")}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="UT"
                variant="outlined"
                disabled={disabled}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            id="marcaModelo"
            label="Marca/Model"
            variant="outlined"
            value={values.marcaModelo}
            onChange={handleChange}
            disabled={true}
            fullWidth
          />
        </Grid>

        <Grid item>
          <TextField
            id="eje"
            label="Eje"
            variant="outlined"
            value={values.eje}
            onChange={handleChange}
            disabled={true}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            id="subeje"
            label="Sub-eje"
            variant="outlined"
            value={values.subeje}
            onChange={handleChange}
            disabled={true}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(UTInputForm);
