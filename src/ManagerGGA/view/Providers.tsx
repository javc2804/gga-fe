import { useState } from "react";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  startDeleteProveedor,
  startExportProviders,
  startGetProviders,
} from "../../store/providersOut/providersThunk";
import ProviderModal from "../components/ProviderModal";
import { useSnackbar } from "../../hooks/useSnackBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { DeleteDialog } from "../../components/DeleteDialog";

interface Proveedor {
  createdAt: string;
  name: string;
  user_rel: string;
  status: boolean;
  id: string; // Asegúrate de que 'id' esté definido
}

export const Providers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetProviders());
  }, []);
  const providers = useSelector((state: any) => state.providers.list);
  const { openSnackbar, SnackbarComponent } = useSnackbar();
  const [selectedProvider, setselectedProvider] = useState<string | null>(null);
  const [openProveedorModal, setopenProveedorModal] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(
    null
  );
  const [, setproveedorCreationMessage] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [, setSnackbarOpen] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportData = () => {
    dispatch(startExportProviders());
  };

  const handleProveedorCreationFeedback = (data: any) => {
    openSnackbar(
      `${data.msg}`,
      data.type,
      data.type === "success" ? CheckCircleIcon : ErrorOutlineIcon
    );

    dispatch(startGetProviders());

    setproveedorCreationMessage(data);
  };

  const handleConfirm = async () => {
    console.log(selectedProvider);
    if (selectedProvider) {
      const resp = await dispatch(startDeleteProveedor(selectedProvider));
      if (resp.wasSuccessful) {
        openSnackbar(
          "Proveedor eliminado con éxito",
          "success",
          CheckCircleIcon
        );
        dispatch(startGetProviders());
      } else {
        openSnackbar(
          "Ocurrio un error vuelva a intentarl",
          "error",
          ErrorOutlineIcon
        );
      }
      setSnackbarOpen(true);
    }
    setOpenDeleteDialog(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h1>Gestión de Proveedores</h1>
      <Box display="block" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedProveedor(null); // Restablecer el usuario seleccionado a null
            setopenProveedorModal(true);
          }}
        >
          Crear Proveedor
        </Button>
        <ProviderModal
          open={openProveedorModal}
          handleClose={() => {
            setopenProveedorModal(false);
            // setproveedorCreationMessage("");
          }}
          proveedor={selectedProveedor}
          onProveedorCreationFeedback={handleProveedorCreationFeedback}
        />
        <Button variant="contained" color="secondary" onClick={exportData}>
          Exportar Proveedores
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Fecha Creación
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Nombre
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Creado por
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Estado
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(Array.isArray(providers)
              ? providers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : []
            ).map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>
                  {new Date(provider.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{provider.name}</TableCell>
                <TableCell>{provider.user_rel}</TableCell>
                <TableCell>{provider.status ? "Activo" : "Inactivo"}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="start" alignItems="start">
                    <IconButton
                      onClick={() => {
                        setSelectedProveedor(provider);
                        setopenProveedorModal(true);
                      }}
                      style={{ color: "#0079cc" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setOpenDeleteDialog(true);
                        setselectedProvider(provider.id); // Store user's email when delete icon is clicked
                      }}
                      style={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={() => handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeleteDialog
        open={openDeleteDialog}
        handleClose={() => {
          setOpenDeleteDialog(false);
          setselectedProvider(null);
        }}
        handleConfirm={handleConfirm}
      />
      {SnackbarComponent}
    </Paper>
  );
};
export default Providers;
