import React, { useCallback } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import {
  startExport,
  startImport,
  startHandleSearch,
  startDownload,
} from "../../../store/purchase/purchaseThunks";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";
// type HeaderType =
//   | "ut"
//   | "proveedor"
//   | "repuesto"
//   | "descripcionRepuesto"
//   | "eje"
//   | "subeje";

type HandleSearch = ((page?: number) => void) &
  ((event: React.MouseEvent<HTMLButtonElement>) => void);

interface FiltersProps {
  headers: string[];
  filters: any;
  dateRange: any;
  setDateRange: any;
  clearFilters: any;
  updateFilter: (field: any, value: any) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  headers,
  filters,
  dateRange,
  setDateRange,
  updateFilter,
  clearFilters,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExport = () => {
    dispatch(startExport(filters, dateRange[0], dateRange[1]));
  };

  const handleDownload = () => {
    dispatch(startDownload());
  };

  const handleSearch: HandleSearch = useCallback(
    (arg?: number | React.MouseEvent<HTMLButtonElement>) => {
      let page = 0;
      if (typeof arg === "number") {
        page = arg;
      }
      dispatch(startHandleSearch(filters, dateRange[0], dateRange[1], page, 5));
    },
    [dispatch, filters, dateRange]
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        await dispatch(startImport(formData));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const modal = useSelector((state: any) => state.purchase.modal);
  const combined = useSelector((state: any) => state.purchase.combined);
  // console.log(combined);

  const graphs = () => {
    navigate("/graphs-out");
  };

  return (
    <>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {headers.map((header, index) => {
          if (
            header === "ut" ||
            header === "eje" ||
            header === "subeje" ||
            header === "proveedor" ||
            header === "repuesto" ||
            header === "descripcionRepuesto"
          ) {
            let options = [];
            if (combined) {
              if (header === "ut") options = combined.fleets || [];
              if (header === "eje") options = combined.eje || [];
              if (header === "subeje") options = combined.subeje || [];

              if (header === "proveedor")
                options = (combined.providers || []).filter(
                  (provider: any) => provider && provider.name
                );
              if (header === "repuesto")
                options = (combined.spareParts || []).filter(
                  (sparePart: any) => sparePart && sparePart.type
                );
              if (header === "descripcionRepuesto")
                options = (combined.sparePartVariants || []).filter(
                  (variant: any) => variant && variant.variant
                );
            }

            return (
              <FormControl key={`${header}-${index}`}>
                <Autocomplete
                  freeSolo
                  options={options.map((option: any) =>
                    header === "ut"
                      ? option.ut
                      : header === "proveedor"
                      ? option.name
                      : header === "repuesto"
                      ? option.type
                      : header === "descripcionRepuesto"
                      ? option.variant
                      : header === "eje"
                      ? option.eje
                      : header === "subeje"
                      ? option.subeje
                      : ""
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Filtrar por ${header}`}
                      variant="outlined"
                    />
                  )}
                  value={filters[header] || ""}
                  onInputChange={(_e, newValue) =>
                    updateFilter(header, newValue)
                  }
                />
              </FormControl>
            );
          } else if (
            header !== "createdAt" &&
            header !== "formaPago" &&
            header !== "deudaTotalUsd"
          ) {
            return (
              <TextField
                key={`${header}-${index}`}
                label={`Filtrar por ${header}`}
                value={filters[header] || ""}
                onChange={(e) => updateFilter(header, e.target.value)}
              />
            );
          } else if (header === "deudaTotalUsd") {
            return (
              <div
                key={`${header}-${index}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  key={`${header}Min`}
                  label={`Deuda mínima`}
                  value={filters[header]?.min || ""}
                  onChange={(e) =>
                    updateFilter(header, {
                      ...filters[header],
                      min: e.target.value,
                    })
                  }
                  style={{ flex: 1, marginRight: "5px" }}
                />
                <TextField
                  key={`${header}Max`}
                  label={`Deuda máxima`}
                  value={filters[header]?.max || ""}
                  onChange={(e) =>
                    updateFilter(header, {
                      ...filters[header],
                      max: e.target.value,
                    })
                  }
                  style={{ flex: 1, marginLeft: "5px" }}
                />
              </div>
            );
          } else if (header === "formaPago") {
            return (
              <FormControl key={`${header}-${index}`}>
                <InputLabel id="formaPago-label">Forma de Pago</InputLabel>
                <Select
                  key={`${header}-${index}`}
                  labelId="formaPago-label"
                  value={filters[header] || ""}
                  onChange={(e) => updateFilter(header, e.target.value)}
                >
                  <MenuItem value="">Ambos</MenuItem>
                  <MenuItem value="credito">Crédito</MenuItem>
                  <MenuItem value="contado">Contado</MenuItem>
                </Select>
              </FormControl>
            );
          } else if (header === "createdAt") {
            return (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                key={`LocalizationProvider-${index}`}
              >
                <DatePicker
                  key={`datePickerStart-${index}`}
                  label="Fecha inicial"
                  format="dd/MM/yyyy"
                  value={dateRange[0]}
                  onChange={(newValue) =>
                    setDateRange([newValue, dateRange[1]])
                  }
                />
                <DatePicker
                  key={`datePickerEnd-${index}`}
                  label="Fecha final"
                  format="dd/MM/yyyy"
                  value={dateRange[1]}
                  onChange={(newValue) =>
                    setDateRange([dateRange[0], newValue])
                  }
                />
              </LocalizationProvider>
            );
          }
        })}
      </Box>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        onClick={handleSearch}
      >
        Buscar
      </Button>

      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        onClick={clearFilters}
      >
        Limpiar Filtros
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        onClick={graphs}
      >
        Ver Gráficos
      </Button>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleExport}
          style={{
            backgroundColor: "#00dde9",
            color: "#fff",
            margin: "10px",
          }}
        >
          Exportar
        </Button>
        <Button
          variant="contained"
          style={{
            margin: "10px",
            backgroundColor: "#f5447a",
            color: "#fff",
          }}
          component="label"
        >
          Importar
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
        <Button
          onClick={handleDownload}
          variant="contained"
          color="primary"
          component="label"
          style={{ margin: "10px" }}
        >
          Descargar Plantilla
        </Button>
      </Box>
    </>
  );
};
