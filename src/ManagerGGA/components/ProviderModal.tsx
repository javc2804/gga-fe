import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useProveedor } from "../hooks/useProveedor";

// import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import { useCreateUser } from "../../auth/pages/hooks/useCreateUser";

interface Proveedor {
  createdAt: string;
  name: string;
  user_rel: string;
  status: boolean;
  id: string; // Asegúrate de que 'id' esté definido
}
interface ProviderModalProps {
  open: boolean;
  handleClose: () => void;
  proveedor?: Proveedor | null;
  onProveedorCreationFeedback?: (data: {}) => void;
}
const ProviderModal: React.FC<ProviderModalProps> = ({
  open,
  handleClose,
  proveedor,
  onProveedorCreationFeedback,
}) => {
  console.log(proveedor);
  const { createProveedor, editProvider } = useProveedor();
  const [name, setName] = useState(proveedor ? proveedor.name : "");
  const [id, setId] = useState(proveedor ? proveedor.id : "");

  useEffect(() => {
    setName(proveedor ? proveedor.name : "");
    setId(proveedor ? proveedor.id : ""); // Asegurar que el ID también se actualice
  }, [proveedor]);

  const handleSubmit = async () => {
    const proveedorData = {
      id,
      name,
      user_rel: localStorage.getItem("email"),
    };

    const response = proveedor
      ? await editProvider(proveedorData)
      : await createProveedor(proveedorData);

    if (response && response.wasSuccessful) {
      const message = proveedor
        ? "Proveedor editado con éxito"
        : "Proveedor creado con éxito";
      onProveedorCreationFeedback &&
        onProveedorCreationFeedback({
          msg: message,
          type: "success",
        });
    } else {
      onProveedorCreationFeedback &&
        onProveedorCreationFeedback({
          msg: "Ocurrió un error, inténtelo de nuevo",
          type: "error",
        });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Añadir Proveedor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            fontSize: "1.2em",
            width: "50%",
          }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            fontSize: "1.2em",
            width: "50%",
          }}
          onClick={handleSubmit}
        >
          {proveedor ? "Editar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProviderModal;
