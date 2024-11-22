import { styled } from "@mui/material/styles";
import { Button, Grid, TextField, Link } from "@mui/material";

// styles.js

export const StyledButton = styled(Button)({
  height: "50px",
  background: "#17DBEB",
  color: "black",
  fontWeight: 600,
  fontSize: "18px",
  "&:hover": {
    background: "#0FA9D8",
  },
});

export const ForgotText = styled(Link)({
  fontSize: "24px",
  fontWeight: 600,
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "none",
  },
});

export const GridItem = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

export const InputContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  flexDirection: "column",
  marginTop: theme.spacing(4),
}));

export const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  width: "100%",
});

export const StyledBox = styled(TextField)({
  marginTop: "40px",
});
