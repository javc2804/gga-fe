import { Snackbar, Alert, AlertProps, SvgIconProps } from "@mui/material";
import React from "react";

type CustomSnackbarProps = {
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: AlertProps["severity"];
  Icon: React.ElementType<SvgIconProps>;
};

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  handleClose,
  message,
  severity,
  Icon,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert
      onClose={handleClose}
      severity={severity}
      icon={<Icon />}
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default CustomSnackbar;
