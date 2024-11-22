import { useCallback } from "react";

export const useCalculations = () => {
  const calculatePrecioUnitarioUsd = useCallback(
    (precioUnitarioBs: number, tasaBcv: number) => {
      if (precioUnitarioBs === 0 || tasaBcv === 0 || !tasaBcv) {
        return 0;
      }
      if (!isNaN(precioUnitarioBs) && !isNaN(tasaBcv) && tasaBcv !== 0) {
        return Number((precioUnitarioBs / tasaBcv).toFixed(2));
      }

      return 0;
    },
    []
  );

  const calculatePrecioUnitarioBs = useCallback(
    (montoTotalBs: number, cantidad: number) => {
      if (isNaN(montoTotalBs) || isNaN(cantidad) || cantidad === 0) {
        return 0;
      }
      return Number((montoTotalBs / cantidad).toFixed(2));
    },
    []
  );

  const calculateMontoTotalBs = useCallback(
    (cantidad: number, precioUnitarioBs: number) => {
      if (
        cantidad === 0 ||
        precioUnitarioBs === 0 ||
        isNaN(cantidad) ||
        isNaN(precioUnitarioBs)
      ) {
        return 0;
      }

      const result = cantidad * precioUnitarioBs;
      return Number(result.toFixed(2)); // round to 2 decimal places and convert to number
    },
    []
  );

  const calculateMontoTotalUsd = useCallback(
    (cantidad: number, precioUnitarioUsd: number) => {
      if (cantidad === 0) {
        return 0;
      }
      if (!isNaN(cantidad) && !isNaN(precioUnitarioUsd)) {
        const result = cantidad * precioUnitarioUsd;

        return Number(result.toFixed(2)); // round to 2 decimal places and convert to number
      }

      return 0;
    },
    []
  );

  const calculateTasaBcv = useCallback(
    (precioUnitarioBs: number, precioUnitarioUsd: number) => {
      const epsilon = 0.0001; // or some small value
      if (
        isNaN(precioUnitarioBs) ||
        isNaN(precioUnitarioUsd) ||
        Math.abs(precioUnitarioUsd) < epsilon
      ) {
        return 0;
      }

      return Number((precioUnitarioBs / precioUnitarioUsd).toFixed(2));
    },
    []
  );

  return {
    calculatePrecioUnitarioUsd,
    calculatePrecioUnitarioBs,
    calculateMontoTotalBs,
    calculateMontoTotalUsd,
    calculateTasaBcv,
  };
};
