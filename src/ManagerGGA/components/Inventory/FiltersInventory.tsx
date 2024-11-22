import { TextField, Button } from "@mui/material";
import AgregarInventoryModal from "../AgregarInventoryModal";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const FiltersInventory = () => {
  const [openAgregarModal, setOpenAgregarModal] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const { openSnackbar } = useSnackbar();

  const handleButtonClick = () => {
    setSelectedProveedor(null);
    setOpenAgregarModal(true);
  };
  const handleProveedorCreationFeedback = (data: any) => {
    console.log(data);
    openSnackbar(
      `${data.msg}`,
      data.type,
      data.type === "success" ? CheckCircleIcon : ErrorOutlineIcon
    );

    // dispatch(startGetInventory());

    // setproveedorCreationMessage(data);
  };

  useEffect(() => {
    // dispatch(startGetInventory());
  }, []);
  return (
    <div>
      {[...Array(1)].map((_, index) => (
        <TextField
          key={index}
          label={`Buscar`}
          variant="outlined"
          margin="normal"
        />
      ))}
      <div>
        <Button variant="contained" color="primary" style={{ margin: "8px" }}>
          Buscar
        </Button>
        {/* <Button variant="contained" color="secondary" style={{ margin: "8px" }}>
          Limpiar filtros
        </Button> */}
        {/* <Button variant="contained" color="secondary" style={{ margin: "8px" }}>
          Crear
        </Button> */}
        <Button variant="contained" color="warning" style={{ margin: "8px" }}>
          Exportar
        </Button>
        <Button
          onClick={() => handleButtonClick()}
          variant="contained"
          color="secondary"
          style={{ margin: "8px" }}
        >
          Crear
        </Button>
      </div>
      <AgregarInventoryModal
        open={openAgregarModal}
        handleClose={() => {
          setOpenAgregarModal(false);
          // setproveedorCreationMessage("");
        }}
        proveedor={selectedProveedor || undefined}
        onProveedorCreationFeedback={handleProveedorCreationFeedback}
      />
    </div>
  );
};

export default FiltersInventory;
