import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  setTotalFactUsd: (value: number) => void;
  handleSaveClick: (isEdit: boolean) => void;
  setIsSaveButtonDisabled: any;
  isSaveButtonDisabled: any;
}

export const InvoiceTotalsCompromises: React.FC<InvoiceTotalsProps> = ({
  totalFactUsd,
  // setTotalFactUsd,
  handleSaveClick,
  // setIsSaveButtonDisabled,
  isSaveButtonDisabled,
}) => {
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);
  const [totalDebt, setTotalDebt] = useState(totalFactUsd);

  useEffect(() => {
    setTotalDebt(totalFactUsd); // Actualizar el campo con el valor inicial
  }, [totalFactUsd]);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 3.7 }}>
      {editPurchase && Object.keys(editPurchase).length === 0 && (
        <TextField
          label="Total deuda $"
          variant="outlined"
          sx={{ mr: 1 }}
          value={totalDebt ? totalDebt.toString() : ""}
          onChange={(e) => setTotalDebt(Number(e.target.value))}
          disabled
        />
      )}

      <Button
        variant="contained"
        disabled={isSaveButtonDisabled}
        color="primary"
        onClick={() => handleSaveClick(Object.keys(editPurchase).length !== 0)}
      >
        {editPurchase && Object.keys(editPurchase).length !== 0
          ? "Editar"
          : "Guardar"}
      </Button>
    </Box>
  );
};

export default InvoiceTotalsCompromises;
