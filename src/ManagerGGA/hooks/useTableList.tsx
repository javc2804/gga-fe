// useTableList.tsx
import { useState, useMemo, useEffect } from "react";
import {
  startGetListPurchase,
  startHandleSearch,
} from "../../store/purchase/purchaseThunks";
import { useDispatch, useSelector } from "react-redux";
// import { getSummary } from "../../store/purchase/purchaseSlice";

interface IRow {
  ID: number;
  Fecha: string;
  UT: string;
  Eje: string;
  "Sub-eje": string;
  "NDE(a)": string;
  FacProv: string;
  Proveedor: string;
  Compromiso: string;
  Repuesto: string;
  Cantidad: number;
  "Total Bs": number;
  "Total $": number;
  "Deuda $": number;
  [key: string]: string | number;
}

const useTableList = (initialData: IRow[]) => {
  const dispatch = useDispatch();

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [, setData] = useState({ count: 0, rows: [] });

  const currentYear = new Date().getFullYear();
  const [dateRange] = useState([new Date(currentYear, 0, 1), new Date()]);
  const [offset, setOffset] = useState(0);
  const startDate = new Date(dateRange[0]).toISOString();
  const endDate = new Date(dateRange[1]).toISOString();

  const [dataDate, setDataDate] = useState({
    startDate,
    endDate,
    page: 0,
    limit: 5,
    offset,
    filters: {},
  });

  // const [filters, setFilters] = useState({}); // Define filters state

  useEffect(() => {
    setDataDate({
      ...dataDate,
      page,
      limit: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(startGetListPurchase(dataDate));
      if (result.ok) {
        // Check if response is not null and has a rows property
        if (result.response && Array.isArray(result.response.rows)) {
          setData(result.response); // Update data with the response
        } else {
          console.error("Unexpected response format:", result.response);
          setData({ count: 0, rows: [] }); // Set default data
        }
      }
    };

    fetchData();
  }, [dataDate]);
  const filtersState = useSelector((state: any) => state.purchase.filters);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    newPage = Number(newPage); // Convert newPage to a number
    if (isNaN(newPage) || isNaN(rowsPerPage)) {
      console.error("Invalid page number or rows per page");
      return;
    }
    setPage(newPage);
    const newOffset = newPage * rowsPerPage; // no need to add 1 here
    setOffset(newOffset); // Now you can use setOffset here
    const newDataDate = {
      ...dataDate,
      page: newPage,
      offset: newOffset,
      filters: filtersState,
    }; // Update dataDate with filters
    setDataDate(newDataDate);
    dispatch(
      startHandleSearch(
        filtersState, // Use the current filters
        newDataDate.startDate,
        newDataDate.endDate,
        newPage,
        newDataDate.limit
      )
    );
  };

  const handleSortRequest = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (isNaN(newRowsPerPage)) {
      console.error("Invalid rows per page");
      return;
    }
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    const newOffset = 0; // Reset offset when changing rows per page
    setOffset(newOffset);
    const newDataDate = {
      ...dataDate,
      page: 0,
      offset: newOffset,
      limit: newRowsPerPage,
      filters: filtersState,
    };
    setDataDate(newDataDate);
    dispatch(
      startHandleSearch(
        filtersState,
        newDataDate.startDate,
        newDataDate.endDate,
        0,
        newRowsPerPage
      )
    );
  };

  const sortedData = useMemo(() => {
    return [...initialData].sort((a: IRow, b: IRow) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [initialData, orderBy, order]);

  return {
    sortedData,
    order,
    orderBy,
    page,
    rowsPerPage,
    handleSortRequest,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default useTableList;
