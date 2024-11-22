import * as yup from "yup";
export const schema = yup.object().shape({
  precioUnitarioBs: yup
    .string()
    .required("El precio unitario en Bs es requerido")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "El precio unitario en Bs debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  precioUnitarioUsd: yup
    .string()
    .required("El precio unitario en $ es requerido")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "El precio unitario en $ debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  cantidad: yup
    .string()
    .required("La cantidad es requerida")
    .test(
      "is-number",
      "La cantidad debe ser un número entero",
      (value) => !isNaN(Number(value)) && Number.isInteger(Number(value))
    )
    .test(
      "is-positive",
      "La cantidad debe ser un número positivo",
      (value) => Number(value) > 0
    )
    .test(
      "no-decimal-point",
      "La cantidad no puede contener un punto decimal",
      (value) => !value.includes(".")
    ),
  tasaBcv: yup
    .string()
    .required("La tasa Bcv es requerida")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "La tasa Bcv debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  montoTotalUsd: yup
    .string()
    .required("El monto total $ es requerida")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "El monto total $ debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  montoTotalBs: yup
    .string()
    .required("El monto total Bs es requerida")
    .test(
      "not-start-with-decimal-point",
      "El número no puede comenzar con un punto decimal",
      (value) => !value.startsWith(".")
    )
    .test(
      "not-start-with-zero",
      "El número no puede comenzar con cero a menos que sea decimal",
      (value) => !value.startsWith("0") || value.startsWith("0.")
    )
    .test(
      "no-trailing-decimal-point",
      "No puede terminar con un punto decimal sin especificar los decimales",
      (value) => !value.endsWith(".")
    )
    .test(
      "is-number",
      "El campo solo admite números",
      (value) => !isNaN(Number(value))
    )
    .test(
      "is-positive",
      "El monto total Bs debe ser un número positivo",
      (value) => Number(value) > 0
    ),
  ocOs: yup
    .number()
    .typeError("OC/OS debe ser un número entero")
    .integer("OC/OS debe ser un número entero")
    .required("OC/OS es requerido"),
  numeroOrdenPago: yup
    .string()
    .required("El número orden de pago es requerida")
    .test(
      "is-number",
      "La cantidad debe ser un número entero",
      (value) => !isNaN(Number(value)) && Number.isInteger(Number(value))
    )
    .test(
      "is-positive",
      "número orden de pago debe ser un número positivo",
      (value) => Number(value) > 0
    )
    .test(
      "no-decimal-point",
      "No puede contener un punto decimal",
      (value) => !value.includes(".")
    ),
  fechaOcOs: yup.date().required("Fecha de OC/OS es requerido"),
});
