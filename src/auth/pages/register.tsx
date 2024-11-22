import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import AuthLayout from "../layout/AuthLayout";
import {
  StyledButton,
  GridItem,
  GridContainer,
  InputContainer,
  StyledTextField,
  // StyledBox,
} from "./styles";
import {
  Snackbar,
  SnackbarContent,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
  Box,
  SelectChangeEvent,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { hideSnackbar } from "../../store/auth/authSlice";
import { Link } from "react-router-dom";
import { useCreateUser } from "./hooks/useCreateUser";

interface RootState {
  auth: {
    snackbar: any;
  };
}

interface Errors {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
}

export const Register = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state: RootState) => state.auth);
  const { createUser } = useCreateUser();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const onRoleChange = (event: SelectChangeEvent<string>) => {
    onInputChange({
      target: {
        name: "role",
        value: event.target.value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  const formData = {
    email: "",
    password: "",
    name: "",
    lastName: "",
    role: "",
  };

  const {
    formState: { email, password, name, lastName, role },
    onInputChange,
  } = useForm(formData);

  const [errors, setErrors] = useState<Errors>({});
  // const onClose = (event: any, reason: any) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   dispatch(hideSnackbar());
  // };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const response = await createUser({
      email,
      password,
      name,
      lastName,
      role,
    });

    if (response) {
      if (response.wasSuccessful) {
        setErrors({});
      } else {
        setErrors(response.errors);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <AuthLayout title={"Registrar usuario"}>
        <Box style={windowWidth <= 600 ? { marginTop: "-50px" } : {}}>
          <form onSubmit={onSubmit}>
            <GridContainer container>
              <InputContainer item xs={12}>
                <StyledTextField
                  label="Nombre"
                  type="text"
                  placeholder="Nombre"
                  fullWidth
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  helperText={errors.name}
                  error={!!errors.name}
                  style={{ marginBottom: "1%" }}
                />
                <StyledTextField
                  label="Apellido"
                  type="text"
                  placeholder="Apellido"
                  fullWidth
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  helperText={errors.lastName}
                  error={!!errors.lastName}
                  style={{ marginBottom: "1%" }}
                />
                <StyledTextField
                  label="Correo"
                  type="email"
                  placeholder="correo@correo.com"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  helperText={errors.email}
                  error={!!errors.email}
                  style={{ marginBottom: "1%" }}
                />
                <StyledTextField
                  label="Clave"
                  type="password"
                  placeholder="Clave"
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  helperText={errors.password}
                  error={!!errors.password}
                  style={{ marginBottom: "1%" }}
                />
                <FormControl fullWidth>
                  <InputLabel id="role-label">Rol</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={role}
                    label="Rol"
                    onChange={onRoleChange}
                    name="role"
                    error={!!errors.role}
                  >
                    <MenuItem value={"operator"}>Operador</MenuItem>
                    <MenuItem value={"store"}>Almacén</MenuItem>
                  </Select>
                  {!!errors.role && (
                    <FormHelperText error>{errors.role}</FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
            </GridContainer>
            <GridContainer container>
              <GridItem item xs={12} sm={6}>
                <StyledButton type="submit" variant="contained" fullWidth>
                  Registrar
                </StyledButton>
              </GridItem>
              <GridItem
                item
                xs={12}
                sm={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  textAlign: "right",
                }}
              >
                <Link
                  to="/auth/login"
                  style={{
                    color: "black",
                    fontSize: "1.3em",
                    whiteSpace: "nowrap",
                  }}
                >
                  ¿Ya tienes cuenta?
                </Link>
              </GridItem>
            </GridContainer>
          </form>
        </Box>
      </AuthLayout>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => dispatch(hideSnackbar())}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              {snackbar.type === "success" ? (
                <CheckCircleIcon style={{ marginRight: "8px" }} />
              ) : (
                <ErrorIcon style={{ marginRight: "8px" }} />
              )}
              {snackbar.message}
            </span>
          }
          style={{
            color: "white",
            backgroundColor: snackbar.type === "success" ? "green" : "red",
            fontSize: "20px",
          }}
        />
      </Snackbar>
    </>
  );
};

export default Register;
