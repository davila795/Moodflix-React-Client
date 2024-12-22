import {ServiceOption} from "../types/movies.ts";
import {Box, Grid, Typography} from "@mui/material";

function StreamingOptionCard({option}: { option: ServiceOption }) {
  return (
    <Grid item xs={6}>
      <Box
        component="a"
        href={option.link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          textDecoration: 'none',
          textTransform: 'capitalize',
          backgroundColor: 'background.default',
          borderRadius: 2,
          padding: 2,
          boxShadow: 1,
          '&:hover': {
            boxShadow: "0 1px 4px rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <img
          src={option.imageSet.darkThemeImage}
          alt={option.serviceName}
          style={{height: 40, marginRight: 10}}
        />
      </Box>
      <Typography
        display={"block"}
        mt={1}
        variant="caption"
        color="text.secondary"
        textAlign={"center"}
        textTransform={"capitalize"}>
        {option.accesType}
      </Typography>
    </Grid>
  )
}

export default StreamingOptionCard;
