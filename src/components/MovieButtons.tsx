import {Box, Button} from "@mui/material";

type MovieButtonsProps = {
  refresh: () => Promise<void>;
}

function MovieButtons({refresh}: MovieButtonsProps) {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', gap: 2, mt: 3}}>
      <Button variant="text" onClick={refresh} color={"secondary"}>
        Refresh
      </Button>
    </Box>
  )
}

export default MovieButtons;