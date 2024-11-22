import { Navigate, Route, Routes } from "react-router-dom";
import ListPurchasePage from "../pages/ListPurchasePage";
import RegisterOutPage from "../pages/RegisterOutPage";
import DetailCompromisePage from "../pages/DetailCompromisePage";
import GraphsOutPage from "../pages/GraphsOutPage";
import UsersPage from "../pages/UsersPage";
import ProvidersPage from "../pages/ProvidersPage";
import SparePartsPage from "../pages/SparePartsPage";
import CreateNoteInvoicePage from "../pages/CreateNoteInvoicePage";
import ListNoteInvoicesPage from "../pages/ListNoteInvoicesPage";
import InventoryPage from "../pages/InventoryPage";
import PrivateRoute from "./PrivateRoute";
import ListOutInternalPage from "../pages/ListOutInternalPage";
import RegisterOutInternalPage from "../pages/RegisterOutInternalPage";
import HistoryInventoryPage from "../pages/HistoryInventoryPage";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />} />
      <Route path="/register-out/:params?" element={<RegisterOutPage />} />
      <Route path="/notes-store" element={<DetailCompromisePage />} />
      <Route path="/list-purchases" element={<ListPurchasePage />} />
      <Route path="/graphs-out" element={<GraphsOutPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/spareparts" element={<SparePartsPage />} />
      <Route path="/note-invoices" element={<CreateNoteInvoicePage />} />
      <Route path="/note-invoices-list" element={<ListNoteInvoicesPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/register-internal" element={<RegisterOutInternalPage />} />
      <Route path="/list-internal" element={<ListOutInternalPage />} />
      <Route path="/inventory-history" element={<HistoryInventoryPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ManagerRoutes;
