import { TextField, Box } from "@mui/material";
const boxStyles = {
  p: 4,
  mb: 4,
  mr: 4,
  mt: 2,
  ml: 2,
  borderRadius: 4,
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.45)",
};
const title = {
  mb: 5,
};
const ViewCompromise = ({ compromise }: any) => {
  if (!compromise) {
    return null;
  }
  const hasUt = compromise.ut;

  return (
    <Box sx={boxStyles}>
      <Box sx={title}>
        <h3>Compromiso</h3>
      </Box>
      {!hasUt && (
        <>
          <TextField
            label="NDE"
            value={compromise.facNDE}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />

          <TextField
            label="Compromiso"
            value={compromise.compromiso}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />

          <TextField
            label="Proveedor"
            value={compromise.proveedor}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
        </>
      )}
      {hasUt && (
        <>
          <TextField
            label="UT"
            value={compromise.ut}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
          <TextField
            label="Marca/Modelo"
            value={compromise.marcaModelo}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
          <TextField
            label="Eje"
            value={compromise.eje}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
          <TextField
            label="Sub-Eje"
            value={compromise.subeje}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
        </>
      )}
      <TextField
        label="Repuesto"
        value={compromise.repuesto}
        InputProps={{ readOnly: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />
      <TextField
        label="Descripción repuesto"
        value={compromise.descripcionRepuesto}
        InputProps={{ readOnly: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />
      {!hasUt && (
        <>
          <TextField
            label="Forma de pago"
            value={compromise.formaPago}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
          <TextField
            label="Descripción"
            value={compromise.descripcion}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
        </>
      )}
      <TextField
        label="Cantidad"
        value={compromise.cantidad}
        InputProps={{ readOnly: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />

      <TextField
        label="Deuda unitario $"
        value={compromise.deudaUnitarioUsd}
        InputProps={{ readOnly: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />

      <TextField
        label="Deuda total $"
        value={compromise.deudaTotalUsd}
        InputProps={{ readOnly: true }}
        InputLabelProps={{ shrink: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />

      {!hasUt && (
        <>
          <TextField
            label="OC/OS"
            value={compromise.ocOs}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
          <TextField
            label="Fecha OC/OC"
            value={new Date(compromise.fechaOcOs).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
          <TextField
            label="Número orden de pago"
            value={compromise.numeroOrdenPago}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
          <TextField
            label="Observación"
            value={compromise.observacion}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
        </>
      )}
    </Box>
  );
};

export default ViewCompromise;
