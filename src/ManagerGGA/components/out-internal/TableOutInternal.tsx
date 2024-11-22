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
  // Button,
} from "@mui/material";
import { useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import BlockIcon from "@mui/icons-material/Block";
import { useDispatch, useSelector } from "react-redux";
import { startGetOutInternal } from "../../../store/out-internal/outInternalThunk";

export const TableOutInternal = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetOutInternal());
  }, []);
  const rows = useSelector((state: any) => state.outInternal.list?.row || []);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formFieldOptions = [
    { value: "", label: "Seleccione un tipo de gasto" }, // Opción por defecto

    { value: "apoyoInstitucional", label: "Apoyo institucional" },
    { value: "ayuda", label: "Ayuda" },
    { value: "bolsaDeTrabajo", label: "Bolsa de trabajo" },
    {
      value: "bonoVarios",
      label: "Bono (Coordinador, Vialidad, Recaudación y Apoyo Institucional)",
    },
    { value: "donacion", label: "Donación" },
    { value: "honorarios", label: "Honorarios" },
    { value: "viaticos", label: "Viáticos" },
    { value: "funcionamiento", label: "Funcionamiento" },
    { value: "nomina", label: "Nómina" },
    { value: "bonoCoordinadores", label: "Bono coordinadores" },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Fecha Creación
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Proveedor/Beneficiario
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Descripcion del gasto
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Tipo de gasto
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Tasa Bcv
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Monto Compromiso $
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Monto pagado $
              </TableCell>

              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell>{row.proveedorBeneficiario}</TableCell>
                    <TableCell>{row.descripcionGasto}</TableCell>
                    <TableCell>
                      {formFieldOptions.find(
                        (option) => option.value === row.tipoGasto
                      )?.label || "Tipo de gasto no encontrado"}
                    </TableCell>{" "}
                    <TableCell>{row.tasaBcv}</TableCell>
                    <TableCell>{row.montoCompromisoUsd}</TableCell>
                    <TableCell>{row.montoPagadoUsd}</TableCell>
                    <TableCell>
                      <DeleteIcon sx={{ color: "red" }} />
                      <EditIcon sx={{ marginLeft: 1, color: "orange" }} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default TableOutInternal;
