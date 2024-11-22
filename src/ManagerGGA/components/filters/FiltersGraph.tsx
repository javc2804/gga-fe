import { TextField, Select, MenuItem, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface FiltersGraphProps {
  headers: string[];
  filters: any;
  dateRange: any;
  setDateRange: any;
  clearFilters: any;
  updateFilter: (field: any, value: any) => void;
  onSearch: () => void;
}

const FiltersGraph: React.FC<FiltersGraphProps> = ({
  headers,
  filters,
  updateFilter,
  dateRange,
  setDateRange,
  onSearch,
  clearFilters,
}) => {
  const dataFilter = useSelector((state: any) => state.purchase.filters);
  const initialFilters = {}; // Define initialFilters
  const [, setLocalFilters] = useState(initialFilters);
  useEffect(() => {
    setLocalFilters(dataFilter);
  }, [dataFilter]);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px",
        gridAutoFlow: "dense",
      }}
    >
      {headers.map((header: any, index) =>
        header !== "createdAt" ? (
          header !== "formaPago" ? (
            header !== "deudaTotalUsd" ? (
              <TextField
                key={`${header}-${index}`}
                label={`Filtrar por ${header}`}
                value={dataFilter[header] || filters[header] || ""}
                onChange={(e) => updateFilter(header, e.target.value)}
              />
            ) : (
              <div
                key={`${header}-${index}`}
                style={{ display: "flex", gridColumn: "span 2" }}
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
                />
              </div>
            )
          ) : (
            <Select
              key={`${header}-${index}`}
              label="Forma de Pago"
              value={filters[header] || ""}
              onChange={(e) => updateFilter(header, e.target.value)}
            >
              <MenuItem value="credito">Crédito</MenuItem>
              <MenuItem value="contado">Contado</MenuItem>
            </Select>
          )
        ) : (
          <LocalizationProvider
            key={`datePicker-${index}`}
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              label="Fecha inicial"
              format="dd/MM/yyyy"
              value={dateRange[0]}
              onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
            />
            <DatePicker
              label="Fecha final"
              format="dd/MM/yyyy"
              value={dateRange[1]}
              onChange={(newValue) => setDateRange([dateRange[0], newValue])}
            />
          </LocalizationProvider>
        )
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={onSearch}
        style={{ gridColumn: "span 3" }}
      >
        Buscar
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={clearFilters} // Add this line
        style={{ gridColumn: "span 3" }}
      >
        Limpiar Filtros
      </Button>
    </div>
  );
};

export default FiltersGraph;
