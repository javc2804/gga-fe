import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthRoutes from "../auth/routes/AuthRoutes";
import ManagerRoutes from "../ManagerGGA/routes/ManagerRoutes";
import { useSelector, useDispatch } from "react-redux";
import CheckingAuth from "../ui/components/CheckingAuth";
import { login } from "../store/auth";

export const RoutesComponent: React.FC = () => {
  const { status } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const lastName = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");
    const estado = localStorage.getItem("status");
    if (token) {
      dispatch(login({ name, lastName, email, estado, token }));
    }
  }, []);

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Router>
      <Routes>
        {status === "authenticated" ? (
          <>
            <Route path="/*" element={<ManagerRoutes />} />
          </>
        ) : (
          <>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/*" element={<Navigate to="/auth/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
