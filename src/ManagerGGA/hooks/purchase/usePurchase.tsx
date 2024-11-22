import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  selectPurchase,
  setDeliveryDate,
  setPaymentDate,
  setOrderDate,
  setRepuestos,
  setFormaDePago,
  setUt,
} from "../../../store/purchase/purchaseSlice";

export const usePurchase = () => {
  // const dispatch = useDispatch();

  const deliveryDate = useSelector(
    (state: RootState) => state.purchase.deliveryDate
  );
  const paymentDate = useSelector(
    (state: RootState) => state.purchase.paymentDate
  );
  const orderDate = useSelector((state: RootState) => state.purchase.orderDate);
  const repuestos = useSelector((state: RootState) => state.purchase.repuestos);
  const formaDePago = useSelector(
    (state: RootState) => state.purchase.formaDePago
  );
  const ut = useSelector((state: RootState) => state.purchase.ut);

  const purchase = useSelector(selectPurchase);

  // useEffect(() => {
  //   if (!purchase) {
  //     dispatch(startGetPurchase());
  //   }
  // }, [dispatch, purchase]);

  const handleSave = useCallback(() => {
    console.log("Guardar clicked");
  }, []);

  const handleClear = useCallback(() => {
    console.log("limpiar clicked");
  }, []);

  // const handleSetDeliveryDate = useCallback(
  //   (date: Date) => {
  //     dispatch(setDeliveryDate(date));
  //   },
  //   [dispatch]
  // );

  // const handleSetPaymentDate = useCallback(
  //   (date: Date) => {
  //     dispatch(setPaymentDate(date));
  //   },
  //   [dispatch]
  // );

  // const handleSetOrderDate = useCallback(
  //   (date: Date) => {
  //     dispatch(setOrderDate(date));
  //   },
  //   [dispatch]
  // );

  // const handleSetRepuestos = useCallback(
  //   (repuestos: string) => {
  //     dispatch(setRepuestos(repuestos));
  //   },
  //   [dispatch]
  // );

  // const handleSetFormaDePago = useCallback(
  //   (formaDePago: string) => {
  //     dispatch(setFormaDePago(formaDePago));
  //   },
  //   [dispatch]
  // );

  // const handleSetUt = useCallback(
  //   (ut: string) => {
  //     dispatch(setUt(ut));
  //   },
  //   [dispatch]
  // );

  return {
    deliveryDate,
    setDeliveryDate,
    paymentDate,
    setPaymentDate,
    orderDate,
    setOrderDate,
    repuestos,
    setRepuestos,
    formaDePago,
    setFormaDePago,
    ut,
    setUt,
    purchase,
    handleSave,
    handleClear,
  };
};
