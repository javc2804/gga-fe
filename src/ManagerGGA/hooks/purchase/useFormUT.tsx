import { useState } from "react";

type InitialValuesType = {
  ut: string;
  marcaModelo: string;
  eje: string;
  subeje: string;
};

const useForm = (
  initialValues: InitialValuesType,
  fleets: InitialValuesType[]
) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.id]: event.target.value,
    }));
  };

  const handleAutoCompleteChange = (field: any) => (_: any, newValue: any) => {
    setValues((prevValues) => {
      const selectedUt = fleets.find((item) => item.ut === newValue);
      return {
        ...prevValues,
        [field]: newValue,
        marcaModelo: selectedUt ? selectedUt.marcaModelo : "",
        eje: selectedUt ? selectedUt.eje : "",
        subeje: selectedUt ? selectedUt.subeje : "",
      };
    });
  };

  return { values, handleChange, handleAutoCompleteChange };
};

export default useForm;
