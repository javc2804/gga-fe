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

const ViewDetailCompromise = ({ compromise, showFields }: any) => {
  if (!compromise) {
    return null;
  }

  return (
    <Box sx={boxStyles}>
      <Box sx={title}>
        <h3>Compromiso</h3>
      </Box>

      <TextField
        label={showFields ? "NDE" : "Fac/NDE"}
        value={compromise.facNDE}
        InputProps={{ readOnly: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />

      <TextField
        label="Proveedor"
        value={compromise.proveedor}
        InputProps={{ readOnly: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />

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

      <TextField
        label="Cantidad"
        value={compromise.cantidad}
        InputProps={{ readOnly: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />

      {!showFields && (
        <TextField
          label="Tasa BCV"
          value={compromise.tasaBcv}
          InputProps={{ readOnly: true }}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        />
      )}

      <TextField
        label="Precio unitario $"
        value={compromise.precioUnitarioUsd || compromise.deudaUnitarioUsd}
        InputProps={{ readOnly: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />

      <TextField
        label="Monto total $"
        value={compromise.montoTotalUsd || compromise.deudaTotalUsd}
        InputProps={{ readOnly: true }}
        InputLabelProps={{ shrink: true }}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      />

      {!showFields && (
        <>
          <TextField
            label="Precio unitario Bs"
            value={compromise.precioUnitarioBs}
            InputProps={{ readOnly: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />

          <TextField
            label="Monto total Bs"
            value={compromise.montoTotalBs}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
        </>
      )}

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
    </Box>
  );
};

export default ViewDetailCompromise;
