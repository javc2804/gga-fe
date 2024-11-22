import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useInventory } from "../hooks/useInventory";

// import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import { useCreateUser } from "../../auth/pages/hooks/useCreateUser";

interface Proveedor {
  cantidad: string;
  name: string;
  user_rel: string;
  id: string;
}

interface AgregarInventoryModalProps {
  open: boolean;
  handleClose: () => void;
  proveedor?: Proveedor;
  onProveedorCreationFeedback?: (data: {}) => void;
}
const AgregarInventoryModal: React.FC<AgregarInventoryModalProps> = ({
  open,
  handleClose,
  proveedor,
  onProveedorCreationFeedback,
}) => {
  const { addInventory } = useInventory();
  const [name, setName] = useState(proveedor ? proveedor.name : "");
  const [cantidad, setCantidad] = useState("");
  const [id, setId] = useState(proveedor ? proveedor.id : "");

  useEffect(() => {
    setName(proveedor ? proveedor.name : "");
    setId(proveedor ? proveedor.id : ""); // Asegurar que el ID también se actualice
  }, [proveedor]);

  const handleSubmit = async () => {
    const proveedorData = {
      id,
      name,
      cantidad,
      user_rel: localStorage.getItem("email"),
    };

    const response = await addInventory(proveedorData);
    if (response && response.wasSuccessful) {
      const message = "Agregado con éxito";
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
      <DialogTitle>Añadir Inventario anteriores</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Repuesto"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Cantidad"
          type="text"
          fullWidth
          variant="standard"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
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
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarInventoryModal;
