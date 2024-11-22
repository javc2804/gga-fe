import { useDispatch as _useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { startCreatingUser, startEditUser } from "../../../store/auth/thunks";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es requerido")
    .matches(/^[A-Za-z]+$/, "El nombre sólo debe contener letras"),
  lastName: yup
    .string()
    .required("El apellido es requerido")
    .matches(/^[A-Za-z]+$/, "El apellido sólo debe contener letras"),
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .min(6, "La clave debe tener al menos 6 caracteres")
    .required("La clave es requerida"),
  role: yup.string().required("El rol es requerido"),
});

export const useCreateUser = () => {
  const useDispatch = () => _useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const createUser = async (userDetails: {
    email: string;
    password: string;
    name: string;
    lastName: string;
    role: string;
  }) => {
    try {
      await formSchema.validate(userDetails, { abortEarly: false });
      const response = await dispatch(startCreatingUser(userDetails));

      if (response.wasSuccessful) {
        if (location.pathname !== "/users") {
          setTimeout(() => {
            navigate("/auth/login");
          }, 4000);
        }
        return { wasSuccessful: true, errors: {} };
      }
    } catch (error: any) {
      const errors = error.inner.reduce(
        (acc: any, curr: any) => ({ ...acc, [curr.path]: curr.message }),
        {}
      );
      return { wasSuccessful: false, errors };
    }
  };
  const editUser = async (userDetails: {
    email: string;
    password: string;
    name: string;
    lastName: string;
    role: string;
  }) => {
    try {
      await formSchema.validate(userDetails, { abortEarly: false });
      const response = await dispatch(startEditUser(userDetails));

      if (response.wasSuccessful) {
        return { wasSuccessful: true, errors: {} };
      }
    } catch (error: any) {
      const errors = error.inner.reduce(
        (acc: any, curr: any) => ({ ...acc, [curr.path]: curr.message }),
        {}
      );
      return { wasSuccessful: false, errors };
    }
  };

  return { createUser, editUser };
};
