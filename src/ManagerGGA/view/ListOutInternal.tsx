import {
  FiltersOutInternal,
  SummaryOutInternal,
  TableOutInternal,
} from "../components/out-internal";

const ListOutInternal = () => {
  return (
    <div style={{ overflowY: "auto", maxHeight: "90vh" }}>
      <h2>Listado gastos de funcionamiento </h2>
      <SummaryOutInternal />
      <FiltersOutInternal />
      <TableOutInternal />
    </div>
  );
};

export default ListOutInternal;
