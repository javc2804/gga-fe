import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MoneyIcon from "@mui/icons-material/Money";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BuildIcon from "@mui/icons-material/Build";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import Logo from "../../assets/logo.png";

const getIcon = (iconName: any) => {
  switch (iconName) {
    case "Money":
      return <MoneyIcon />;
    case "ListAlt":
      return <ListAltIcon />;
    case "AddBox":
      return <AddBoxIcon />;
    case "List":
      return <ListIcon />;
    case "BarChart":
      return <BarChartIcon />;
    case "PeopleOutline":
      return <PeopleOutlineIcon />;
    case "Suppliers":
      return <BusinessCenterIcon />;
    case "AutoParts":
      return <BuildIcon />;
    case "HomeWorkIcon":
      return <HomeWorkIcon />;
    case "Inventory":
      return <ListIcon />;
    default:
      return null;
  }
};

interface SideBarProps {
  drawerWidth?: number;
  open: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  icon?: string; // Add this line to include the 'icon' property
  subMenu?: MenuItem[];
  route?: string; // Assuming you might also need a 'route' property based on your menu structure
}

interface OpenSubMenuState {
  [key: string]: boolean;
}

const selectedStyle = {
  "&.Mui-selected": {
    backgroundColor: "#f5447a",
    color: "white",
    "&:hover": {
      backgroundColor: "#f5447a",
    },
  },
};

export const SideBar = ({ drawerWidth = 240, open, onClose }: SideBarProps) => {
  let menuData: MenuItem[] = JSON.parse(localStorage.getItem("menu") || "[]");
  const [openSubMenu, setOpenSubMenu] = useState<OpenSubMenuState>({});
  const [selectedItem, setSelectedItem] = useState<string>("");
  const navigate = useNavigate(); // Paso 2: Crea una instancia de useNavigate

  const toggleSubMenu = (name: string) => {
    // Asegura que el submenú seleccionado se mantenga abierto
    setOpenSubMenu((prevOpenSubMenu) => ({
      ...Object.keys(prevOpenSubMenu).reduce((acc, key) => {
        acc[key] = false; // Cierra todos los submenús
        return acc;
      }, {} as OpenSubMenuState),
      [name]: true, // Abre el submenú seleccionado
    }));
  };

  const handleMenuItemClick = (name: string, route?: string) => {
    if (selectedItem === name) {
      return;
    }
    setSelectedItem(name);
    // Encuentra el menú padre del ítem seleccionado y ábrelo
    const parentMenuName = menuData.find((item) =>
      item.subMenu?.some((subItem) => subItem.name === name)
    )?.name;
    if (parentMenuName) {
      setOpenSubMenu((prevOpenSubMenu) => ({
        ...Object.keys(prevOpenSubMenu).reduce((acc, key) => {
          acc[key] = false; // Cierra todos los submenús
          return acc;
        }, {} as OpenSubMenuState),
        [parentMenuName]: true, // Asegura que el submenú del ítem seleccionado se mantenga abierto
      }));
    }
    if (route) {
      navigate(route);
    }
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: open ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={open ? "persistent" : "temporary"}
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar sx={{ justifyContent: "center", flexDirection: "column" }}>
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "200px",
                height: "auto",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            />
          </Link>
          <Typography variant="h6" noWrap>
            {localStorage.getItem("role") === "operator"
              ? "Administración"
              : localStorage.getItem("role") === "admin"
              ? "Administrador"
              : "Almacén"}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuData.map((item, index) => (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => {
                  toggleSubMenu(item.name);
                  handleMenuItemClick(item.name, item.route); // Pasa item.route como argumento
                }}
                selected={selectedItem === item.name}
                sx={{ ...selectedStyle }}
              >
                <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
                <ListItemText primary={item.name} />
                {item.subMenu ? (
                  openSubMenu[item.name] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
              {item.subMenu && (
                <Collapse
                  in={openSubMenu[item.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subMenu.map((subItem, subIndex) => (
                      <ListItemButton
                        key={subIndex}
                        sx={{
                          pl: 4,
                          ...selectedStyle,
                        }}
                        onClick={() =>
                          handleMenuItemClick(subItem.name, subItem.route)
                        } // Pasa subItem.route como argumento
                        selected={selectedItem === subItem.name}
                      >
                        <ListItemIcon>{getIcon(subItem.icon)}</ListItemIcon>
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
