import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TablePagination,
} from "@mui/material";
import { fetchNoteInvoices } from "../../store/notes/noteInvoicesThunks";
import { RootState } from "../../store/store";
import { keyframes } from "@emotion/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "@emotion/styled";
import Loading from "../../components/Loading";
import PrintIcon from "@mui/icons-material/Print";
import Tooltip from "@mui/material/Tooltip";
import {
  startDownloadInvoice,
  startGetPurchase,
} from "../../store/purchase/purchaseThunks";

export const NotesAdmin = () => {
  const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

  const BlinkingWarningIcon = styled(WarningIcon)`
    animation: ${blink} 1s step-end infinite;
    color: orange;
  `;
  const dispatch = useDispatch();
  const noteInvoices = useSelector(
    (state: RootState) => state.noteInvoices.noteInvoices
  );

  const [page, setPage] = useState(0); // Estado para la página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Estado para el límite de registros por página
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    dispatch(startGetPurchase());
    dispatch(fetchNoteInvoices(page, rowsPerPage)).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <Loading />;
  }

  const printNote = (invoice: any) => {
    dispatch(startDownloadInvoice(invoice));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                Fac/NDE
              </TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                Fecha
              </TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                Estado
              </TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                Acción
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noteInvoices.length > 0 ? (
              noteInvoices
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((invoice: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{invoice.note_number}</TableCell>
                    <TableCell>
                      {new Date(invoice.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {invoice.status ? (
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
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Ver">
                          <IconButton
                            color="primary"
                            aria-label="view"
                            onClick={() =>
                              navigate("/notes-store", { state: { invoice } })
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Imprimir">
                          <IconButton
                            color="primary"
                            aria-label="print"
                            onClick={() => printNote(invoice)}
                          >
                            <PrintIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay notas de entrega en este momento
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={noteInvoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={() => handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </TableContainer>
    </div>
  );
};

export default NotesAdmin;
