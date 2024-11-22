import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  startExportSpareParts,
  startGetSpareParts,
} from "../../store/spareParts/sparePartsThunk";
import SparePartsModal from "../components/SparePartsModal";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSnackbar } from "../../hooks/useSnackBar";

interface SpareParts {
  id: number;
  createdAt: string;
  spareParts: string;
  spareParts_variant: string;
}

const rows = [
  // Supongamos que estos son tus datos
  { id: 1, name: "Item 1", detail: "Detail 1" },
  { id: 2, name: "Item 2", detail: "Detail 2" },
  // Agrega más filas según tus datos
];

const SpareParts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetSpareParts());
  }, []);

  const spareParts = useSelector((state: any) => state.spareParts.list);
  const { SnackbarComponent } = useSnackbar();

  const [selectedSpareparts, setSelectedSpareparts] =
    useState<SpareParts | null>(null);
  const [openSparePartsModal, setopenSparePartsModal] = useState(false);
  // const [sparePartsCreationMessage, setSparePartsCreationMessage] =
  //   useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportData = () => {
    dispatch(startExportSpareParts());
  };

  const handleSparePartsCreationFeedback = (data: any) => {
    console.log(data);
    // openSnackbar(
    //   `${data.msg}`,
    //   data.type,
    //   data.type === "success" ? CheckCircleIcon : ErrorOutlineIcon
    // );

    // dispatch(startGetSpareParts());

    // setSparePartsCreationMessage(data);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          padding: 2,
        }}
      >
        Gestión de repuestos
      </Typography>
      <Box sx={{ marginY: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedSpareparts(null); // Restablecer el usuario seleccionado a null
            setopenSparePartsModal(true);
          }}
        >
          Crear repuesto
        </Button>
        <SparePartsModal
          open={openSparePartsModal}
          handleClose={() => {
            setopenSparePartsModal(false);
          }}
          SpareParts={selectedSpareparts}
          onSparePartsCreationFeedback={handleSparePartsCreationFeedback} // Añadir esta línea
          initialValues={selectedSpareparts}
        />
        <Button variant="contained" color="secondary" onClick={exportData}>
          Exportar repuesto
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#333",
                "& .MuiTableCell-head": { color: "#000000" }, // Cambiado a negro más oscuro
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>Fecha creación</TableCell>
              <TableCell>Repuesto</TableCell>
              <TableCell>Descripción de repuesto</TableCell>
              <TableCell>Creado por</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(spareParts) &&
              spareParts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((part) => (
                  <TableRow key={part.id}>
                    <TableCell>{part.id}</TableCell>
                    <TableCell>
                      {new Date(part.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{part.sparePart.type}</TableCell>
                    <TableCell>{part.variant}</TableCell>
                    <TableCell>{part.userid}</TableCell>
                    <TableCell>
                      {part.status ? "Activo" : "Inactivo"}
                    </TableCell>{" "}
                    <TableCell align="center">
                      <Box
                        display="flex"
                        justifyContent="start"
                        alignItems="start"
                      >
                        <IconButton
                          onClick={() => {
                            /* función para editar */
                          }}
                          style={{ color: "#0079cc" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            /* función para eliminar */
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {SnackbarComponent}
    </Paper>
  );
};

export default SpareParts;
