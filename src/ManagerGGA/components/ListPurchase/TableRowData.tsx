import { TableRow, TableCell, Box, Checkbox } from "@mui/material";
import { IRow } from "../../view/expenses/ListPurchase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateEditPurchase } from "../../../store/purchase/purchaseSlice";
import { DeleteDialog } from "../../../components/DeleteDialog";
import { useState } from "react";
import { startDeletePurchase } from "../../../store/purchase/purchaseThunks";

type ActionButtonsProps = {
  id: IRow;
  handleDelete: (row: IRow) => void;
};

type TableRowDataProps = {
  row: IRow;
  headers: string[];
  onCheckboxChange: (row: IRow, isChecked: boolean) => void; // Nuevo prop para manejar el cambio de checkbox
  selectedRows: any;
};

const columnToDataKeyMap: { [key: string]: string } = {
  Acciones: "acciones",
};

const cursor = {
  cursor: "pointer",
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  id,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (data: IRow) => {
    dispatch(updateEditPurchase(data));
    navigate(`/register-out/`);
  };

  return (
    <Box>
      <EditIcon style={cursor} color="primary" onClick={() => handleEdit(id)} />
      <DeleteIcon
        style={cursor}
        color="error"
        onClick={() => handleDelete(id)}
      />
    </Box>
  );
};

export const TableRowData: React.FC<TableRowDataProps> = ({
  row,
  headers,
  onCheckboxChange,
  selectedRows,
}) => {
  const dispach = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IRow | null>(null);

  const handleDelete = (selectedRow: IRow) => {
    setSelectedRow(selectedRow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (row: IRow) => {
    const idsToUse = selectedRows.length > 0 ? selectedRows : [row.id];
    dispach(startDeletePurchase(idsToUse));
    setOpen(false);
  };

  return (
    <>
      <TableRow key={row.id}>
        <TableCell padding="checkbox">
          <Checkbox onChange={(e) => onCheckboxChange(row, e.target.checked)} />
        </TableCell>
        {headers.map((header, index) => {
          const dataKey = columnToDataKeyMap[header] || header;
          if (dataKey === "") {
            return <TableCell key={`${row.id}-${index}`}></TableCell>;
          }
          return dataKey !== "acciones" ? (
            <TableCell key={`${row.id}-${index}`}>
              {dataKey === "createdAt"
                ? new Date(row[dataKey]).toLocaleDateString("en-GB")
                : row[dataKey]}
            </TableCell>
          ) : (
            <TableCell key={`${row.id}-actions`}>
              <ActionButtons id={row} handleDelete={() => handleDelete(row)} />
            </TableCell>
          );
        })}
      </TableRow>
      <DeleteDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={() => {
          if (selectedRow) {
            handleConfirm(selectedRow);
          }
        }}
      />
    </>
  );
};
