import { useSelector } from "react-redux";

export const SummaryOutInternal = () => {
  const sumatorias = useSelector(
    (state: any) =>
      state.outInternal?.list?.sumatorias || {
        apoyoInstitucional: {},
        ayuda: {},
        bolsaDeTrabajo: {},
        bonoCoordinadores: {},
        bonoVarios: {},
        donacion: {},
        funcionamiento: {},
        honorarios: {},
        nomina: {},
        viaticos: {},
      }
  );

  const {
    apoyoInstitucional,
    ayuda,
    bolsaDeTrabajo,
    bonoCoordinadores,
    bonoVarios,
    donacion,
    funcionamiento,
    honorarios,
    nomina,
    viaticos,
  } = sumatorias;

  const cellStyle = { padding: "0 32px" }; // Ajusta el valor según tus necesidades
  const containerStyle = {
    margin: "0 auto", // Centra el contenedor
    maxWidth: "90%", // Ajusta al ancho máximo deseado
    border: "1px solid #ccc", // Borde gris claro
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra suave
    padding: "20px", // Espaciado interno
    borderRadius: "8px", // Bordes redondeados (opcional)
  };

  return (
    <div style={containerStyle}>
      <h2>Resumen de Gastos</h2>
      <table>
        <thead>
          <tr>
            <th style={cellStyle}>DESCRIPCIÓN</th>
            <th style={cellStyle}>Factura Bolívares</th>
            <th style={cellStyle}>Pagado Bolívares</th>
            <th style={cellStyle}>Factura $</th>
            <th style={cellStyle}>Pagado $</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>APOYO INSTITUCIONAL</td>
            <td style={cellStyle}>
              {apoyoInstitucional.totalMontoCompromisoBs}
            </td>
            <td style={cellStyle}>
              {apoyoInstitucional.totalMontoCompromisoUsd}
            </td>
            <td style={cellStyle}>{apoyoInstitucional.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{apoyoInstitucional.totalMontoPagadoUsd}</td>
          </tr>
          <tr>
            <td style={cellStyle}>AYUDA</td>
            <td style={cellStyle}>{ayuda.totalMontoCompromisoBs}</td>
            <td style={cellStyle}>{ayuda.totalMontoCompromisoUsd}</td>
            <td style={cellStyle}>{ayuda.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{ayuda.totalMontoPagadoUsd}</td>
          </tr>
          <tr>
            <td style={cellStyle}>BOLSA DE TRABAJO</td>
            <td style={cellStyle}>{bolsaDeTrabajo.totalMontoCompromisoBs}</td>
            <td style={cellStyle}>{bolsaDeTrabajo.totalMontoCompromisoUsd}</td>
            <td style={cellStyle}>{bolsaDeTrabajo.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{bolsaDeTrabajo.totalMontoPagadoUsd}</td>
          </tr>
          <tr>
            <td style={cellStyle}>
              BONO (COORDINADOR, VIALIDAD, RECAUDACIÓN Y APOYO INSTITUCIONAL)
            </td>
            <td style={cellStyle}>{bonoVarios.totalMontoCompromisoBs}</td>
            <td style={cellStyle}>{bonoVarios.totalMontoCompromisoUsd}</td>
            <td style={cellStyle}>{bonoVarios.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{bonoVarios.totalMontoPagadoUsd}</td>
          </tr>
          <tr>
            <td style={cellStyle}>DONACION</td>
            <td style={cellStyle}>{donacion.totalMontoCompromisoBs}</td>
            <td style={cellStyle}>{donacion.totalMontoCompromisoUsd}</td>
            <td style={cellStyle}>{donacion.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{donacion.totalMontoPagadoUsd}</td>
          </tr>
          <tr>
            <td style={cellStyle}>HONORARIOS</td>
            <td style={cellStyle}>{honorarios.totalMontoCompromisoBs}</td>
            <td style={cellStyle}>{honorarios.totalMontoCompromisoUsd}</td>
            <td style={cellStyle}>{honorarios.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{honorarios.totalMontoPagadoUsd}</td>
          </tr>
          <tr>
            <td style={cellStyle}>VIATICOS</td>
            <td style={cellStyle}>{viaticos.totalMontoCompromisoBs}</td>
            <td style={cellStyle}>{viaticos.totalMontoCompromisoUsd}</td>
            <td style={cellStyle}>{viaticos.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{viaticos.totalMontoPagadoUsd}</td>
          </tr>
          <tr>
            <td style={cellStyle}>FUNCIONAMIENTO</td>
            <td style={cellStyle}>{funcionamiento.totalMontoCompromisoBs}</td>
            <td style={cellStyle}>{funcionamiento.totalMontoCompromisoUsd}</td>
            <td style={cellStyle}>{funcionamiento.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{funcionamiento.totalMontoPagadoUsd}</td>
          </tr>
          <tr>
            <td style={cellStyle}>NOMINA</td>
            <td style={cellStyle}>{nomina.totalMontoCompromisoBs}</td>
            <td style={cellStyle}>{nomina.totalMontoCompromisoUsd}</td>
            <td style={cellStyle}>{nomina.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{nomina.totalMontoPagadoUsd}</td>
          </tr>

          <tr>
            <td style={cellStyle}>BONO COORDINADORES</td>
            <td style={cellStyle}>
              {bonoCoordinadores.totalMontoCompromisoBs}
            </td>
            <td style={cellStyle}>
              {bonoCoordinadores.totalMontoCompromisoUsd}
            </td>
            <td style={cellStyle}>{bonoCoordinadores.totalMontoPagadoBs}</td>
            <td style={cellStyle}>{bonoCoordinadores.totalMontoPagadoUsd}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SummaryOutInternal;
