import {Box, CircularProgress} from "@mui/material";
import {MIN_HEIGHT_CONTAINER} from "../constants/constants.ts";

function LoadingPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: MIN_HEIGHT_CONTAINER,
        backgroundColor: 'background.default',
      }}
    >
      <CircularProgress color="primary"/>
    </Box>
  )
}

export default LoadingPage;