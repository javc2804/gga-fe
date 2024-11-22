import React from "react";
import { TextField, Button, Grid } from "@mui/material";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  totalFactBs: number;
  totalCantidad: number;
  compromise: any;
  isSaveButtonDisabled: any;
  setTotalFactUsd: (value: number) => void;
  setTotalCantidad: (value: number) => void;
  setTotalFactBs: (value: number) => void;
  // totalCantidad: (value: number) => void;
  handleSaveClick: () => any;
}
export const InvoiceTotalsCompromisesPay: React.FC<InvoiceTotalsProps> = ({
  totalFactUsd,
  totalFactBs,
  compromise,
  setTotalFactUsd,
  setTotalFactBs,
  handleSaveClick,
  setTotalCantidad,
  totalCantidad,
  isSaveButtonDisabled,
}) => {
  // console.log(totalFactUsd);
  const totalDeuda =
    compromise && compromise.response ? compromise.response.deudaTotalUsd : 0;
  const cantidadTotal =
    compromise && compromise.response ? compromise.response.cantidad : 0;

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end"
      spacing={2}
    >
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="Total factura $"
              variant="outlined"
              value={totalFactUsd.toFixed(2)}
            />
          </Grid>
          <Grid item style={{ marginTop: "20px" }}>
            <TextField
              label="Total deuda $ "
              variant="outlined"
              value={(totalDeuda - totalFactUsd).toFixed(2)}
              onChange={(e) =>
                setTotalFactUsd(totalDeuda - Number(e.target.value))
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="Total factura Bs"
              variant="outlined"
              value={isNaN(totalFactBs) ? "0" : totalFactBs.toString()}
              onChange={(e) => setTotalFactBs(Number(e.target.value))}
            />
          </Grid>
          <Grid item style={{ marginTop: "20px" }}>
            <TextField
              label="Cantidad Deuda"
              variant="outlined"
              value={
                isNaN(cantidadTotal) || isNaN(totalCantidad)
                  ? "0"
                  : (cantidadTotal - totalCantidad).toString()
              }
              onChange={(e) => setTotalCantidad(Number(e.target.value))}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          disabled={isSaveButtonDisabled}
          onClick={() => {
            handleSaveClick();
          }}
        >
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
};

export default InvoiceTotalsCompromisesPay;
