import { TextField, Box, Grid } from "@mui/material";

const UTData = ({ invoiceData }: any) => {
  const { quantity, createdAt } = invoiceData;
  const { ut, marcaModelo, eje, subeje } = invoiceData.fleet;
  return (
    <div style={{ maxHeight: "100%", overflowY: "auto" }}>
      <Grid container spacing={1} sx={{ p: 3 }}>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField
              label="Fecha Entrega"
              value={
                createdAt ? new Date(createdAt).toLocaleDateString("es-ES") : ""
              }
              disabled
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="UT" value={ut} disabled fullWidth />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField
              label="Marca/Modelo"
              value={marcaModelo}
              disabled
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="Eje" value={eje} disabled fullWidth />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="Sub-Eje" value={subeje} disabled fullWidth />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={2}>
            <TextField label="Cantidad" value={quantity} disabled fullWidth />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default UTData;
