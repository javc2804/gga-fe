// ManagerGGALayout.tsx

import React, { useState, ReactNode } from "react";
import { Box, Toolbar } from "@mui/material";
import { Navbar, SideBar } from "../components/";

const drawerWidth = 240;

interface ManagerGGALayoutProps {
  children: ReactNode;
}

const ManagerGGALayout: React.FC<ManagerGGALayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true); // Cambia esto a true

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        drawerWidth={drawerWidth}
        onMenuClick={handleMenuClick}
        open={open}
      />
      <SideBar
        drawerWidth={drawerWidth}
        open={open}
        onClose={handleMenuClick}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default ManagerGGALayout;
