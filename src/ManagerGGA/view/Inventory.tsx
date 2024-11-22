import FiltersInventory from "../components/Inventory/FiltersInventory";
// import SummaryInventory from "../components/Inventory/SummaryInventory";
import TableInventory from "../components/Inventory/TableInventory";

export const Inventory = () => {
  return (
    <div style={{ overflowY: "auto", maxHeight: "90vh" }}>
      <h2>Inventario</h2>
      {/* <SummaryInventory /> */}
      <FiltersInventory />
      <TableInventory />
    </div>
  );
};

export default Inventory;
