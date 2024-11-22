import React, { useState, useCallback } from "react";
import { CustomSnackbar } from "../components/CustomSnackbar";
import { AlertProps, SvgIconProps } from "@mui/material";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
  Icon: React.ElementType<SvgIconProps>;
};

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
    Icon: () => null,
  });

  const openSnackbar = useCallback(
    (
      message: string,
      severity: AlertProps["severity"],
      Icon: React.ElementType<SvgIconProps>
    ) => {
      setSnackbar({ open: true, message, severity, Icon });
    },
    []
  );

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const SnackbarComponent = (
    <CustomSnackbar
      open={snackbar.open}
      handleClose={closeSnackbar}
      message={snackbar.message}
      severity={snackbar.severity}
      Icon={snackbar.Icon}
    />
  );

  return { openSnackbar, SnackbarComponent };
};
