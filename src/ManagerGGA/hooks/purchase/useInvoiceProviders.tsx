import { useState } from "react";

export const useInvoiceProviders = (initialState: any) => {
  const [formState, setFormState] = useState(initialState);

  const handleFacNDEChange = (e: any) => {
    setFormState((prevState: any) => ({
      ...prevState,
      facNDE: Number(e.target.value),
    }));
  };

  const handleProviderChange = (field: any, _: any, value: any) => {
    field.onChange(value);
    setFormState((prevState: any) => ({
      ...prevState,
      proveedor: value,
    }));
  };

  return { formState, handleFacNDEChange, handleProviderChange };
};
