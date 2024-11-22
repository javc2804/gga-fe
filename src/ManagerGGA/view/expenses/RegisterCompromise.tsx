import React, { useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import {
  NewCompromise,
  PayCompromise,
} from "../../components/registerCompromise/";
import { useSelector } from "react-redux";
import { RootState as StoreRootState } from "../../../store/store";

interface RegisterCompromiseProps {
  selectedValueProp: string;
  selectedValue: any;
  params: any;
}

export const RegisterCompromise: React.FC<RegisterCompromiseProps> = ({
  selectedValueProp,
  params,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState(selectedValueProp || "");
  const combinedData = useSelector(
    (state: StoreRootState) => state.purchase.purchase
  );

  let Component;
  switch (selectedValue) {
    case "new":
      Component = (
        <NewCompromise
          combinedData={combinedData}
          params={params}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      );

      break;
    case "pay":
      Component = (
        <NewCompromise
          combinedData={combinedData}
          params={params}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      );

      Component = (
        <PayCompromise
          combinedData={combinedData}
          params={params}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      );
      break;
    // case "detail":
    //   Component = <DetailCompromise combinedData={combinedData} />;
    //   break;
    default:
      Component = null;
  }

  return (
    <div>
      <Select displayEmpty value={selectedValue} onChange={handleChange}>
        <MenuItem value="">Selecciona tipo</MenuItem>
        <MenuItem value={"new"}>
          {Object.keys(params).length === 0
            ? "Registrar nuevo"
            : "Editar Compromiso"}{" "}
        </MenuItem>
        {params ? <MenuItem value={"pay"}>Pagar Compromiso</MenuItem> : null}
        {/* <MenuItem value={"detail"}>Detalle Compromiso</MenuItem> */}
      </Select>
      {Component}
    </div>
  );
};

export default RegisterCompromise;
