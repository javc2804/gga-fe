import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { startLogin } from "../../store/auth/thunks";
import { hideSnackbar } from "../../store/auth/authSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import {
  StyledButton,
  GridItem,
  GridContainer,
  InputContainer,
  StyledTextField,
} from "./styles";

import { NavLink } from "react-router-dom";

interface ForgotTextProps {
  to: string;
  children: React.ReactNode;
}

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { snackbar } = useSelector((state: any) => state.auth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await dispatch(startLogin({ email, password }));
    if (result.wasSuccessful) {
      navigate("/");
    }
  };

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  const handleAlertClose = (event: React.SyntheticEvent) => {
    handleClose(event, "clickaway");
  };

  const ForgotText = ({ to, children }: ForgotTextProps) => (
    <NavLink
      to={to}
      style={{
        textDecoration: "none",
        color: "inherit",
        fontSize: "21px",
        fontWeight: 600,
      }}
    >
      {children}
    </NavLink>
  );
  return (
    <>
      <AuthLayout title={"Iniciar Sesión"}>
        <form onSubmit={handleSubmit}>
          <GridContainer container>
            <InputContainer item xs={12}>
              <StyledTextField
                label="Correo"
                type="email"
                placeholder="correo@correo.com"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <StyledTextField
                label="Clave"
                type="password"
                placeholder="Clave"
                fullWidth
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <GridItem item xs={12}>
              <GridContainer container justifyContent="flex-end">
                <ForgotText to="/auth/forgot">¿Olvidaste la clave?</ForgotText>
              </GridContainer>
            </GridItem>
            <GridContainer container spacing={2}>
              <GridItem item xs={12} sm={6}>
                <StyledButton type="submit" variant="contained" fullWidth>
                  Iniciar
                </StyledButton>
              </GridItem>
              <GridItem item xs={12} sm={6}>
                <Link to="/auth/register">
                  <StyledButton type="submit" variant="contained" fullWidth>
                    Registrar
                  </StyledButton>
                </Link>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </form>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            style={{
              backgroundColor: "red",
              fontSize: "20px",
            }}
            severity={snackbar.type}
            onClose={handleAlertClose}
            icon={
              snackbar.type === "error" ? (
                <ErrorIcon style={{ color: "white" }} />
              ) : (
                <CheckCircleIcon style={{ color: "white" }} />
              )
            }
          >
            <AlertTitle style={{ color: "white" }}>
              {snackbar.message}
            </AlertTitle>
          </Alert>
        </Snackbar>
      </AuthLayout>
    </>
  );
};

export default Login;
