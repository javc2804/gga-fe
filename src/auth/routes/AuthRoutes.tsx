import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Register } from "../pages";
import ForgotPassword from "../pages/ForgotPassword";
import RecoveryPassword from "../pages/RecoveryPassword";
export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot" element={<ForgotPassword />} />
      <Route path="recovery/:token" element={<RecoveryPassword />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AuthRoutes;
