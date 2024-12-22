import {MIN_HEIGHT_CONTAINER} from "../../constants/constants.ts";
import {Box, Typography} from "@mui/material";

function ErrorPageLoading({message}: { message: string }) {
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
      <Typography variant="h2" color="error">
        {message}
      </Typography>
    </Box>
  )
}

export default ErrorPageLoading;