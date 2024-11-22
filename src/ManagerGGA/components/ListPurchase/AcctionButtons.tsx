import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const ActionButtons = () => (
  <>
    <Tooltip title="Editar">
      <IconButton>
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Eliminar">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </>
);

export default ActionButtons;
