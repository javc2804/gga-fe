import { useDispatch as _useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { startCreateSpareParts } from "../../store/spareParts/sparePartsThunk";

export const useSpareParts = () => {
  const useDispatch = () => _useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  const createSpareParts = async (sparePartsDetails: { name: string }) => {
    try {
      const response = await dispatch(startCreateSpareParts(sparePartsDetails));
      if (response.wasSuccessful) {
        return { wasSuccessful: true, errors: {} };
      }
    } catch (error: any) {
      return { wasSuccessful: false, error };
    }
  };
  // const editProvider = async (sparePartsDetails: { name: string }) => {
  //   try {
  //     const response = await dispatch(startEditProveedor(sparePartsDetails));

  //     if (response.wasSuccessful) {
  //       return { wasSuccessful: true, errors: {} };
  //     }
  //   } catch (error: any) {
  //     return { wasSuccessful: false, error };
  //   }
  // };

  return { createSpareParts };
};
