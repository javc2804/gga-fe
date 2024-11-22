import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Autocomplete,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startCreateNDE } from "../../store/almacen/almacenThunk";
import { useSnackbar } from "../../hooks/useSnackBar";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import { startGetInventoryByDescription } from "../../store/inventory/inventoryThunk";

interface Fleet {
  ut: string;
}

type FormularioType = {
  id: any;
  id_items: number;
  quantity: string;
  spare_part: any;
  spare_part_variant: any;
  observation: string;
  note_number: any;
  provider: any;
  delivered_by: string;
  inventario: string;
  marcaModelo: string;
  status: boolean;
  subeje?: string;
  eje?: string;
  ut?: string;
};

const CreateNoteInvoice = () => {
  const { SnackbarComponent, openSnackbar } = useSnackbar();
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { dataFacNDE } = location.state || {};
  const [cantidadAsignada, setCantidadAsignada] = useState(0);

  useEffect(() => {
    dispatch(startGetInventoryByDescription(dataFacNDE.descripcionRepuesto));
  }, []);

  const res = useSelector((state: any) => state.inventory.totalDescription);

  const totalDescription =
    res.response && res.response.length >= 0 ? res.response[0] : null;
  const result = useSelector((state: any) => state.purchase.combined);
  // const [delivered_by, setdelivered_by] = useState("");
  // const [inventario, setinventario] = useState("");

  const [formularios, setFormularios] = useState<FormularioType[]>([
    {
      id: dataFacNDE.id,
      id_items: 1,
      quantity: "",
      spare_part: dataFacNDE.repuesto,
      spare_part_variant: dataFacNDE.descripcionRepuesto,
      observation: "",
      note_number: dataFacNDE.facNDE,
      provider: dataFacNDE.proveedor,
      delivered_by: "",
      inventario: "",
      marcaModelo: "",
      status: false,
      subeje: dataFacNDE.subeje || "",
    },
  ]);
  const [nextId, setNextId] = useState(2);

  const handleCantidadChange = (event: any, index: any) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].quantity = event.target.value;
    setFormularios(updatedFormularios);
  };

  const handleObservacionChange = (event: any, index: any) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].observation = event.target.value;
    setFormularios(updatedFormularios);
  };

  const agregarFormulario = () => {
    setFormularios(
      formularios.concat([
        {
          id: dataFacNDE.id,
          id_items: nextId,
          quantity: "",
          spare_part: dataFacNDE.repuesto,
          spare_part_variant: dataFacNDE.descripcionRepuesto,
          observation: "",
          note_number: dataFacNDE.facNDE,
          provider: dataFacNDE.proveedor,
          delivered_by: "",
          inventario: "",
          marcaModelo: "",
          status: false,
          subeje: dataFacNDE.subeje || "",
        },
      ])
    );
    setNextId(nextId + 1);
  };

  const eliminarFormulario = (idItemSeleccionado: any) => {
    if (formularios.length > 1) {
      const formulariosActualizados = formularios.filter(
        (formulario) => formulario.id_items !== idItemSeleccionado
      );
      setFormularios(formulariosActualizados);
    } else {
      console.log("No se puede eliminar el único formulario restante.");
    }
  };

  const handleUTChange = (value: any, index: any) => {
    const updatedFormularios = [...formularios];
    const selectedFleet = result.fleets.find(
      (fleet: any) => fleet.ut === value.ut
    );
    if (selectedFleet) {
      updatedFormularios[index] = {
        ...updatedFormularios[index],
        ut: value.ut,
        marcaModelo: selectedFleet.marcaModelo,
        eje: selectedFleet.eje,
        subeje: selectedFleet.subeje,
      };
    }
    setFormularios(updatedFormularios);
  };

  const handleEntregadoChange = (event: any, index: any) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].delivered_by = event.target.value;
    setFormularios(updatedFormularios);
  };

  const handleinventarioChange = (event: any, index: any) => {
    const updatedFormularios = [...formularios];
    updatedFormularios[index].inventario = event.target.value;
    setFormularios(updatedFormularios);
  };

  const save = () => {
    const formulariosConUserRel = formularios.map((formulario) => ({
      ...formulario,
      user_rel: localStorage.getItem("email") || "",
    }));

    const totalCantidad = formulariosConUserRel.reduce(
      (acc, formulario) => acc + Number(formulario.quantity || 0),
      0
    );

    if (totalDescription.cantidad < totalCantidad) {
      openSnackbar(
        "Error, la cantidad total supera la cantidad disponible.",
        "error",
        ErrorOutline
      );
      return;
    }

    const todosCamposRellenados = formulariosConUserRel.every((formulario) => {
      return Object.values(formulario).every((valor) => {
        const valorComoCadena = String(valor).trim();
        return valorComoCadena !== "";
      });
    });

    if (todosCamposRellenados) {
      setIsSaveButtonDisabled(true);
      dispatch(startCreateNDE(formulariosConUserRel));
      openSnackbar("Guardado exitosamente", "success", CheckCircle);
    } else {
      openSnackbar(
        `Error, Todos los campos deben estar rellenados.`,
        "error",
        ErrorOutline
      );
    }
  };

  const calcularSumatoria = () => {
    const sumatoria = formularios.reduce(
      (acc, formulario) => acc + Number(formulario.quantity || 0),
      0
    );
    setCantidadAsignada(sumatoria);
  };

  useEffect(() => {
    calcularSumatoria();
  }, [formularios]);

  return (
    <div style={{ overflowY: "auto", maxHeight: "85vh" }}>
      <h2>Crear nota de entrega</h2>
      {formularios.map((formulario, index) => (
        <Paper
          key={formulario.id}
          elevation={3}
          style={{
            padding: "20px",
            marginBottom: "2%",
            borderRadius: "15px",
            backgroundColor: "white",
          }}
        >
          <form>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Autocomplete
                  options={Array.isArray(result.fleets) ? result.fleets : []}
                  getOptionLabel={(option: Fleet) => option.ut}
                  onChange={(_event, value) => handleUTChange(value, index)}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="UT"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  sx={{ width: 150 }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Modelo/Marca"
                  variant="outlined"
                  fullWidth
                  value={formulario.marcaModelo}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Eje"
                  variant="outlined"
                  fullWidth
                  value={formulario.eje}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Sub Eje"
                  variant="outlined"
                  fullWidth
                  value={formulario.subeje}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Fac/NDE"
                  variant="outlined"
                  value={dataFacNDE.facNDE}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Observación"
                  onChange={(event) => handleObservacionChange(event, index)}
                  value={formulario.observation}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              {/* Segunda fila */}
              <Grid item xs={2}>
                <TextField
                  onChange={(event) => handleCantidadChange(event, index)}
                  value={formulario.quantity}
                  label="Cantidad"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>Entregado por</InputLabel>
                  <Select
                    label="Entregado por"
                    value={formulario.delivered_by} // Usar el valor del estado del formulario actual
                    onChange={(event) => handleEntregadoChange(event, index)}
                  >
                    <MenuItem value="store">Almacen</MenuItem>
                    <MenuItem value="direct">Directo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>Inventario</InputLabel>
                  <Select
                    label="inventario"
                    value={formulario.inventario} // Usar el valor del estado del formulario actual
                    onChange={(event) => handleinventarioChange(event, index)}
                  >
                    <MenuItem value="actual">Actual</MenuItem>
                    <MenuItem value="anteriores">Años anteriores</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Proveedor"
                  variant="outlined"
                  value={dataFacNDE.proveedor}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Repuesto"
                  variant="outlined"
                  value={dataFacNDE.repuesto}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  disabled
                  label="Descripción Repuesto"
                  variant="outlined"
                  value={dataFacNDE.descripcionRepuesto}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              ></Grid>
            </Grid>
          </form>
          {index === formularios.length - 1 && (
            <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={agregarFormulario}
                style={{ marginRight: 10 }}
              >
                Agregar
              </Button>
              {formularios.length > 1 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => eliminarFormulario(formulario.id_items)}
                >
                  Eliminar
                </Button>
              )}
            </Grid>
          )}
          {index < formularios.length - 1 && (
            <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => eliminarFormulario(formulario.id_items)}
              >
                Eliminar
              </Button>
            </Grid>
          )}
        </Paper>
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <TextField
          label="Cantidad Disponible"
          variant="outlined"
          value={totalDescription?.cantidad || 0}
          style={{ marginBottom: 10 }}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          label="Cantidad asignada"
          value={cantidadAsignada}
          disabled
          variant="outlined"
          style={{ marginBottom: 10 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={save}
          disabled={isSaveButtonDisabled}
          style={{ marginRight: 10 }}
        >
          Guardar
        </Button>
        {SnackbarComponent}
      </div>
    </div>
  );
};

export default CreateNoteInvoice;
