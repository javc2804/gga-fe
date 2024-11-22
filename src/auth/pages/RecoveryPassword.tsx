import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Avatar,
  Snackbar,
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
} from "@mui/material";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { authService } from "../../api/authService";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { AlertColor } from "@mui/material/Alert";
import { SyntheticEvent } from "react";
import { ForwardedRef } from "react";

const WhiteErrorOutlineIcon = styled(ErrorOutlineIcon)({
  color: "white",
});

const WhiteCheckCircleIcon = styled(CheckCircleIcon)({
  color: "white",
});

const Alert = React.forwardRef<HTMLDivElement, MuiAlertProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const Icon =
      props.severity === "success"
        ? WhiteCheckCircleIcon
        : WhiteErrorOutlineIcon;
    return <MuiAlert icon={<Icon />} ref={ref} {...props} />;
  }
);

const RecoveryPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<{
    severity: AlertColor;
    message: string;
    color: string;
  }>({
    severity: "success",
    message: "",
    color: "green",
  });

  const { token } = useParams<{ token?: string }>();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({
        severity: "error",
        message: "Las contraseñas no coinciden",
        color: "red",
      });
      setOpen(true);
      return;
    }
    if (!token) {
      setAlert({
        severity: "error",
        message: "Token no encontrado",
        color: "red",
      });
      setOpen(true);
      return;
    }
    const response = await authService.changePassword(token, password);
    if (response.ok) {
      setAlert({
        severity: "success",
        message: JSON.stringify(response.response.msg) || "",
        color: "green",
      });
    } else {
      setAlert({
        severity: "error",
        message: JSON.stringify(response.response) || "",
        color: "red",
      });
    }
    setOpen(true);
  };

  const handleClose = (_event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#17dbeb",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            component="form"
            noValidate
            sx={{ mt: 1, bgcolor: "#ffffff", p: 2, borderRadius: 2 }}
            onSubmit={handleSubmit}
          >
            <Avatar src={logo} sx={{ m: 1, width: 350, height: 350 }} />{" "}
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: "center" }}
            >
              Cambiar contraseña
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Nueva contraseña"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirmar nueva contraseña"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#f5447a" }}
            >
              Cambiar contraseña
            </Button>
          </Box>
        </Container>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%", bgcolor: alert.color, color: "white" }}
          >
            {alert.message || "No message"}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default RecoveryPassword;
