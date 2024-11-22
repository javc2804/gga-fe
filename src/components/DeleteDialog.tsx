import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

type DeleteDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleConfirm: (row: any | null) => void;
};

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ fontSize: "1.4em" }}>
        {"Confirmar eliminación"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ fontSize: "2.2em" }}
        >
          ¿Estás seguro de que quieres eliminar?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            fontSize: "1.2em",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => handleConfirm(null)}
          color="primary"
          autoFocus
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            fontSize: "1.2em",
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
