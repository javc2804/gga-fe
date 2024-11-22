import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  totalFactBs: number;
  setTotalFactUsd: (value: number) => void;
  setTotalFactBs: (value: number) => void;
  setIsSaveButtonDisabled: any;
  isSaveButtonDisabled: any;
  handleSaveClick: (data: any) => any;
}

export const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({
  totalFactUsd,
  totalFactBs,
  setTotalFactUsd,
  setTotalFactBs,
  handleSaveClick,
  // setIsSaveButtonDisabled,
  isSaveButtonDisabled,
}) => {
  const editPurchase = useSelector((state: any) => state.purchase.purchaseEdit);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 3.7 }}>
      {Object.keys(editPurchase).length === 0 && (
        <>
          <TextField
            label="Total factura $"
            variant="outlined"
            sx={{ mr: 1 }}
            value={Number(totalFactUsd).toFixed(2)}
            onChange={(e) => setTotalFactUsd(Number(e.target.value))}
          />
          <TextField
            label="Total factura Bs"
            variant="outlined"
            sx={{ mr: 1 }}
            value={totalFactBs.toString()}
            onChange={(e) => setTotalFactBs(Number(e.target.value))}
          />
        </>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSaveClick(Object.keys(editPurchase).length !== 0)}
        disabled={isSaveButtonDisabled}
      >
        {Object.keys(editPurchase).length === 0 ? "Guardar" : "Editar"}
      </Button>
    </Box>
  );
};

export default InvoiceTotals;
