import { useState } from "react";
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
import { authService } from "../../api/authService";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

type AlertState = {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  color: string;
};

const WhiteErrorOutlineIcon = styled(ErrorOutlineIcon)({
  color: "white",
});

const WhiteCheckCircleIcon = styled(CheckCircleIcon)({
  color: "white",
});

const Alert = React.forwardRef<HTMLDivElement, MuiAlertProps>((props, ref) => {
  const Icon =
    props.severity === "success" ? WhiteCheckCircleIcon : WhiteErrorOutlineIcon;
  return <MuiAlert icon={<Icon />} ref={ref} {...props} />;
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    severity: "success",
    message: "",
    color: "green",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await authService.forgot(email);
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

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
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
              Olvidé mi contraseña
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Dirección de correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#f5447a" }}
            >
              Restablecer contraseña
            </Button>
            <Button
              component={Link}
              to="/auth/login" // reemplaza esto con la ruta a la que quieres navegar
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#f5447a" }}
            >
              Volver
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

export default ForgotPassword;
