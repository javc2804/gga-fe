import { styled } from "@mui/material/styles";
import { CircularProgress, Grid } from "@mui/material";

const StyledCircularProgress = styled(CircularProgress)({
  color: "#f5447a",
});
export const CheckingAuth = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", padding: 4 }}
      >
        <Grid container item direction="row" justifyContent="center">
          <StyledCircularProgress />
        </Grid>
      </Grid>
    </>
  );
};

export default CheckingAuth;
