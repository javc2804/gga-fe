import { Grid, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import fondo from "../../assets/fondo.png";
import "./AuthLayout.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      className="container"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5447A",
        padding: 4,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Grid item className="box-shadow" xs={3}>
        <Typography
          variant="h4"
          sx={{ mb: 4, textAlign: "center", fontWeight: 600 }}
        >
          {title}
        </Typography>
        {children}
      </Grid>
      <img src={fondo} className="fondo" alt="fondo" />
      <img src={logo} className="logo" alt="logo" />
    </Grid>
  );
};

export default AuthLayout;
