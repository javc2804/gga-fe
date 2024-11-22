import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface InvoiceTotalsProps {
  totalFactUsd: number;
  totalFactBs: number;
  handleSave: () => void;
  compromise: any;
  costData: any;
  invoice: any;
  showFields: boolean;
}

export const InvoiceTotalsDetail: React.FC<InvoiceTotalsProps> = ({
  // totalFactUsd,
  // totalFactBs,
  handleSave,
  compromise,
  // costData,
  invoice,
  showFields,
}) => {
  let sumQuantity = invoice.invoices
    .filter(
      (invoice: any) => !invoice.status && invoice.inventario !== "anteriores"
    ) // Agrega condición para inventario
    .reduce((sum: any, cost: any) => sum + cost.quantity, 0);
  let totalQuantity =
    compromise && compromise.cantidad ? compromise.cantidad - sumQuantity : 0;

  const totalInvoiceAmount =
    compromise && invoice.invoices
      ? invoice.invoices
          .filter(
            (invoice: any) =>
              !invoice.status && invoice.inventario !== "anteriores"
          ) // Agrega condición para inventario
          .reduce((total: any, currentInvoice: any) => {
            const unitPrice =
              compromise.formaPago === "contado"
                ? compromise.precioUnitarioUsd
                : compromise.deudaUnitarioUsd;
            return total + currentInvoice.quantity * unitPrice;
          }, 0)
      : 0;

  const montoTotalUsd =
    compromise &&
    (compromise.formaPago === "contado"
      ? (compromise.montoTotalUsd - totalInvoiceAmount).toFixed(2)
      : (compromise.deudaTotalUsd - totalInvoiceAmount).toFixed(2));

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 3.7 }}>
      <TextField
        label="Cantidad"
        variant="outlined"
        sx={{ mr: 1 }}
        value={totalQuantity}
      />
      <TextField
        label={showFields ? "Deuda" : "Por asignar"}
        variant="outlined"
        value={montoTotalUsd}
        sx={{ mr: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        // disabled={invoice.status === true}
      >
        Guardar
      </Button>
    </Box>
  );
};

export default InvoiceTotalsDetail;
