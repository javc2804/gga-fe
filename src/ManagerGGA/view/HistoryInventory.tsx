import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useUser } from "../hooks/useUsers";

import { startGetHistoryInventory } from "../../store/inventory/inventoryThunk";

interface History {
  createdAt: string;
  spare_part_variant: any;
  ut: any;
  marcaModelo: any;
  eje: any;
  quantity: any;
  provider: any;
  inventario: any;
  user_rel: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const HistoryInventory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetHistoryInventory());
  }, []);

  const resp = useSelector((state: any) => state.inventory.history);
  const historys = resp.response;

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useUser();

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h1>Historial de movimiento inventario</h1>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Fecha Creación
                </TableCell>

                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Repuesto
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Ut
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Marca/Modelo
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Eje
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Salida
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Proveedor
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Inventario
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Responsable
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(historys) &&
                historys
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((history: History, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{formatDate(history.createdAt)}</TableCell>
                        <TableCell>{`${history.spare_part_variant}`}</TableCell>
                        <TableCell>{history.ut}</TableCell>
                        <TableCell>{history.marcaModelo}</TableCell>
                        <TableCell>{history.eje}</TableCell>
                        <TableCell>{history.quantity}</TableCell>
                        <TableCell>{history.provider}</TableCell>
                        <TableCell>{history.inventario}</TableCell>
                        <TableCell>{history.user_rel}</TableCell>
                      </TableRow>
                    );
                  })}
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
    </>
  );
};

export default HistoryInventory;
