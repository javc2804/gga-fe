import { Box } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
    textAlign: "center",
  },
};

const SummaryInventory = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.box}>
        {
          <Box>
            <h2>Total de Inventario</h2>
            <h2>1000</h2>
          </Box>
        }
      </Box>
    </Box>
  );
};

export default SummaryInventory;
