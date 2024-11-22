import { TableCell, TableSortLabel } from "@mui/material";

type SortableTableHeaderProps = {
  header: string;
  orderBy: string;
  order: "asc" | "desc";
  onSortRequest: (header: string) => void;
};

export const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  header,
  orderBy,
  order,
  onSortRequest,
}) => (
  <TableCell key={header}>
    <TableSortLabel
      active={orderBy === header}
      direction={orderBy === header ? order : "asc"}
      onClick={() => onSortRequest(header)}
      style={{ color: "black", fontWeight: "bold" }}
    >
      {header}
    </TableSortLabel>
  </TableCell>
);

export default SortableTableHeader;
