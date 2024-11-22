import { TextField, Button } from "@mui/material";

export const FiltersOutInternal = () => {
  return (
    <div>
      {[...Array(4)].map((_, index) => (
        <TextField
          key={index}
          label={`Campo ${index + 1}`}
          variant="outlined"
          margin="normal"
        />
      ))}
      <div>
        <Button variant="contained" color="primary" style={{ margin: "8px" }}>
          Buscar
        </Button>
        <Button variant="contained" color="secondary" style={{ margin: "8px" }}>
          Limpiar filtros
        </Button>
        <Button variant="contained" style={{ margin: "8px" }}>
          Descargar plantilla
        </Button>
        <Button variant="contained" color="success" style={{ margin: "8px" }}>
          Importar
        </Button>
        <Button variant="contained" color="warning" style={{ margin: "8px" }}>
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default FiltersOutInternal;
