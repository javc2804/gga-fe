import { useDispatch as _useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

import { startAddInventory } from "../../store/inventory/inventoryThunk";

export const useInventory = () => {
  const useDispatch = () => _useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  const addInventory = async (proveedorDetails: any) => {
    try {
      const response = await dispatch(startAddInventory(proveedorDetails));
      console.log(response);
      if (response.wasSuccessful) {
        return { wasSuccessful: true, errors: {} };
      }
    } catch (error: any) {
      return { wasSuccessful: false, error };
    }
  };

  return { addInventory };
};
