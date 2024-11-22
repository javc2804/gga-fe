import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { startGetTransactions } from "../../store/almacen/almacenThunk";
import { useNavigate } from "react-router-dom";
import { startGetPurchase } from "../../store/purchase/purchaseThunks";
import Loading from "../../components/Loading";

const ListNoteInvoices = () => {
  const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

  const BlinkingWarningIcon = styled(WarningIcon)`
    animation: ${blink} 1s step-end infinite;
    color: orange;
  `;
  const columns = [
    { id: "facNDE", label: "facNDE", minWidth: 100 },
    { id: "proveedor", label: "Proveedor", minWidth: 200 },
    { id: "repuesto", label: "Repuesto", minWidth: 150 },
    { id: "descripcionRepuesto", label: "Descripción ", minWidth: 150 },
    // { id: "cantidad", label: "Cantidad", minWidth: 100 },
    // { id: "precioUnitarioBs", label: "Precio Unitario Bs", minWidth: 150 },
    // { id: "montoTotalBs", label: "Monto Total Bs", minWidth: 150 },
    { id: "status", label: "Estado", minWidth: 100 },
    { id: "acciones", label: "Acciones", minWidth: 100 },
  ];

  const distpach = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    distpach(startGetPurchase());
    distpach(startGetTransactions()).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const result = useSelector((state: any) => state.almacen.list);
  const rows = result.response;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isRowsArray = Array.isArray(rows);

  const showData = (row: any) => {
    const dataFacNDE = {
      id: row.id,
      facNDE: row.facNDE,
      cantidad: row.cantidad,
      proveedor: row.proveedor,
      repuesto: row.repuesto,
      descripcionRepuesto: row.descripcionRepuesto,
    };
    navigate("/note-invoices", { state: { dataFacNDE } });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{ minWidth: column.minWidth, fontWeight: "bold" }} // Aplicando fontWeight más fuerte
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isRowsArray &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "status") {
                        return (
                          <TableCell key={column.id}>
                            {row.status ? (
                              <Box display="flex" alignItems="center">
                                Completado
                                <CheckCircleIcon sx={{ color: "green" }} />
                              </Box>
                            ) : (
                              <Box display="flex" alignItems="center">
                                Pendiente
                                <BlinkingWarningIcon />
                              </Box>
                            )}
                          </TableCell>
                        );
                      } else if (column.id === "acciones") {
                        // Aquí se maneja la columna de Acciones
                        return (
                          <TableCell key={column.id}>
                            <Box display="flex" gap={1}>
                              <Tooltip
                                title="Ver"
                                onClick={() => {
                                  showData(row);
                                }}
                              >
                                <IconButton color="primary" aria-label="view">
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Imprimir">
                                <IconButton color="primary" aria-label="print">
                                  <PrintIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        );
                      } else {
                        return <TableCell key={column.id}>{value}</TableCell>;
                      }
                    })}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />
    </Paper>
  );
};

export default ListNoteInvoices;
