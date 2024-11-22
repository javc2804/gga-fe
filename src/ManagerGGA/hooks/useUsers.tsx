import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startDeleteUser, startGetUsers } from "../../store/users/usersThunk";

export const useUser = (initialRowsPerPage: number = 5) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [updateList, setUpdateList] = useState(false); // Nuevo estado para controlar la actualización de la lista
  const dispatch = useDispatch();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteUser = (email: string) => {
    dispatch(startDeleteUser(email));
    setUpdateList(!updateList); // Cambia el estado para forzar la actualización de la lista
  };

  useEffect(() => {
    dispatch(startGetUsers());
  }, [updateList]); // Ahora useEffect escucha los cambios en updateList

  return {
    deleteUser,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    setUpdateList,
  };
};
