import { useState } from "react";
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
  Button,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import { useUser } from "../hooks/useUsers";
import { DeleteDialog } from "../../components/DeleteDialog";
import {
  startGetUsers,
  startToggleStatusUser,
} from "../../store/users/usersThunk";
import { useSnackbar } from "../../hooks/useSnackBar";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import UserModal from "../../ManagerGGA/components/UserModal";

interface User {
  createdAt: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  status: boolean;
  password?: string; // Make password optional
}

// interface UserModalProps {
//   open: boolean;
//   handleClose: () => void;
//   user?: User; // Existing line
//   initialValues?: User | null; // Add this line
// }

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [openUserModal, setOpenUserModal] = useState(false);
  const [, setUserCreationMessage] = useState("");
  const { openSnackbar, SnackbarComponent } = useSnackbar();
  const [, setSnackbarOpen] = useState(false);

  const toggleUserStatus = (email: any) => {
    dispatch(startToggleStatusUser(email));
    openSnackbar(
      "Estado del usuario cambiado con éxito",
      "success",
      CheckCircleIcon
    );
    setSnackbarOpen(true);
    setUpdateList((prevState) => !prevState);
  };

  const {
    deleteUser,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    setUpdateList,
  } = useUser();

  const handleConfirm = async () => {
    if (selectedUserEmail) {
      await deleteUser(selectedUserEmail);
      openSnackbar("Usuario eliminado con éxito", "success", CheckCircleIcon);
      setSnackbarOpen(true); // Open the snackbar
    }
    setOpenDeleteDialog(false);
  };

  const handleUserCreationFeedback = (data: any) => {
    openSnackbar(
      `${data.msg}`,
      data.type,
      data.type === "success" ? CheckCircleIcon : ErrorOutlineIcon
    );

    dispatch(startGetUsers());

    setUserCreationMessage(data);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h1>Gestión de usuarios</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedUser(null); // Restablecer el usuario seleccionado a null
            setOpenUserModal(true);
          }}
        >
          Crear usuario
        </Button>
        <UserModal
          open={openUserModal}
          handleClose={() => {
            setOpenUserModal(false);
            setUserCreationMessage("");
          }}
          user={selectedUser}
          onUserCreationFeedback={handleUserCreationFeedback} // Añadir esta línea
          initialValues={selectedUser}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Fecha Creación
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Nombre y apellido
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Correo
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Rol
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(users.list) &&
                users.list
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user: User, index: number) => {
                    // Obtén el correo electrónico del localStorage
                    const loggedInUserEmail = localStorage.getItem("email");

                    // Si el correo del usuario actual es igual al del localStorage, no renderizar la fila
                    if (user.email === loggedInUserEmail) return null;

                    return (
                      <TableRow key={index}>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>{`${user.name} ${user.lastName}`}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.role === "store"
                            ? "Almacenista"
                            : "Administración"}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Eliminar">
                            <DeleteIcon
                              sx={{
                                marginLeft: 1,
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setOpenDeleteDialog(true);
                                setSelectedUserEmail(user.email); // Store user's email when delete icon is clicked
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Editar">
                            <EditIcon
                              sx={{
                                marginLeft: 1,
                                color: "orange",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setSelectedUser(user);
                                setOpenUserModal(true);
                              }}
                            />
                          </Tooltip>
                          {user.status ? (
                            <Tooltip title="Desactivar">
                              <CheckCircleIcon
                                sx={{
                                  marginLeft: 1,
                                  color: "green",
                                  cursor: "pointer",
                                }}
                                onClick={() => toggleUserStatus(user.email)}
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Activar">
                              <BlockIcon
                                sx={{
                                  marginLeft: 1,
                                  color: "grey",
                                  cursor: "pointer",
                                }}
                                onClick={() => toggleUserStatus(user.email)}
                              />
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={users.list.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <DeleteDialog
          open={openDeleteDialog}
          handleClose={() => {
            setOpenDeleteDialog(false);
            setSelectedUserEmail(null);
          }}
          handleConfirm={handleConfirm}
        />
      </Paper>
      {SnackbarComponent}
    </>
  );
};

export default Users;
