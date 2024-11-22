import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSpareParts } from "../hooks/useSpareParts";

// import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import { useCreateUser } from "../../auth/pages/hooks/useCreateUser";

interface SpareParts {
  id: number;
  createdAt: string;
  spareParts: string;
  spareParts_variant: string;
}

interface SparePartsModalProps {
  open: boolean;
  handleClose: () => void;
  SpareParts?: SpareParts | null;
  onSparePartsCreationFeedback?: (data: {}) => void;
  initialValues?: SpareParts | null;
}

const SparePartsModal: React.FC<SparePartsModalProps> = ({
  open,
  handleClose,
  SpareParts,
  onSparePartsCreationFeedback,
}) => {
  console.log(SpareParts);
  const { createSpareParts } = useSpareParts();
  const [sparePart, setsparePart] = useState(
    SpareParts ? SpareParts.spareParts : ""
  );
  const [spareParts_variant, setSpareParts_variant] = useState(
    SpareParts ? SpareParts.spareParts_variant : ""
  );

  useEffect(() => {
    setsparePart(SpareParts ? SpareParts.spareParts : "");
    setSpareParts_variant(SpareParts ? SpareParts.spareParts_variant : ""); // Asegurar que el ID también se actualice
  }, [SpareParts]);

  const handleSubmit = async () => {
    const SparePartsData = {
      name: sparePart,
      spareParts_variant,
      user_rel: localStorage.getItem("email"),
    };

    const response = await createSpareParts(SparePartsData);

    if (response && response.wasSuccessful) {
      const message = SpareParts
        ? "SpareParts editado con éxito"
        : "SpareParts creado con éxito";
      onSparePartsCreationFeedback &&
        onSparePartsCreationFeedback({
          msg: message,
          type: "success",
        });
    } else {
      onSparePartsCreationFeedback &&
        onSparePartsCreationFeedback({
          msg: "Ocurrió un error, inténtelo de nuevo",
          type: "error",
        });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Añadir Repuesto</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Repuesto"
          type="text"
          fullWidth
          variant="standard"
          value={sparePart}
          onChange={(e) => setsparePart(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Descripcion de repuesto"
          type="text"
          fullWidth
          variant="standard"
          value={spareParts_variant}
          onChange={(e) => setSpareParts_variant(e.target.value)}
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
          {SpareParts ? "Editar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SparePartsModal;
