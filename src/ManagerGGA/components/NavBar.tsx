import { LoginOutlined, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  drawerWidth?: number;
  onMenuClick: () => void; // Define the type of onMenuClick here
  open: boolean;
}

export const Navbar = ({
  drawerWidth = 240,
  onMenuClick,
  open,
}: NavbarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(startLogout());
    navigate("/auth/login");
  };

  const userName =
    `${localStorage.getItem("name")} ${localStorage.getItem("lastName")} ` ||
    "Usuario desconocido";

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#17dbeb",
        width: { sm: open ? `calc(100% - ${drawerWidth}px)` : "100%" }, // Cambia esto
        ml: { sm: open ? `${drawerWidth}px` : "0px" },
      }}
    >
      <Toolbar>
        <IconButton onClick={onMenuClick}>
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            GGA 360 Vision Map
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography noWrap component="div">
              {userName}
            </Typography>
            <IconButton color="inherit" onClick={logOut}>
              <LoginOutlined />
            </IconButton>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
