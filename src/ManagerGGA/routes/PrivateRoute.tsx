import { Navigate } from "react-router-dom";
import { ManagerGGAPage } from "../pages/ManagerGGAPage";
import ListNoteInvoicesPage from "../pages/ListNoteInvoicesPage";

export const PrivateRoute = () => {
  const role = localStorage.getItem("role");

  if (role === "store") {
    return <ListNoteInvoicesPage />;
  } else if (role === "operator") {
    return <ManagerGGAPage />;
  } else if (role === "admin") {
    return <ManagerGGAPage />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
