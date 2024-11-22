import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { startGraphsOut } from "../../store/purchase/purchaseThunks";

const useGraphsOut = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [dateRange, setDateRange] = useState([
    new Date(new Date().getFullYear(), 0, 1),
    new Date(),
  ]);

  const onSearch = useCallback(() => {
    const startDate = new Date(dateRange[0]).toISOString();
    const endDate = new Date(dateRange[1]).toISOString();
    dispatch(startGraphsOut({ filters, startDate, endDate }));
  }, [dispatch, filters, dateRange]);

  const updateFilter = useCallback((field: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);
  const [filterValues, setFilterValues] = useState({});

  return {
    filters,
    dateRange,
    setDateRange,
    onSearch,
    updateFilter,
    clearFilters,
    filterValues,
    setFilterValues,
  };
};

export default useGraphsOut;
