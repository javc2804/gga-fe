import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          width: 80,
          height: 80,
          border: "8px solid",
          borderColor: "transparent",
          borderTopColor: "#17dbeb",
          borderBottomColor: "#f5447a",
          borderRadius: "50%",
          animation: `${spin} 1s linear infinite`,
        },
      }}
    />
  );
};

export default Loading;
