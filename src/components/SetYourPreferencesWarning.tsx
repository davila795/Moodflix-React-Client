import {Container, Typography, useTheme} from "@mui/material";
import {MIN_HEIGHT_CONTAINER, MOBILEBAR_HEIGHT} from "../constants/constants.ts";
import OptionCard from "./OptionCard.tsx";
import {FaFilm} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function SetYourPreferencesWarning() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 3,
        backgroundColor: 'background.default',
        minHeight: MIN_HEIGHT_CONTAINER,
        mb: MOBILEBAR_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant="h1"
        sx={{fontWeight: 600, mb: 3}}
      >
        Set Your Preferences First
      </Typography>

      <Typography
        variant="body1"
        sx={{textAlign: 'center', mb: 3}}
      >
        To get the best movie recommendations, please set your platforms and genres you want don't want to watch.
      </Typography>

      <OptionCard
        title="Set Your Preferences"
        description="Set your favorite genres and streaming platforms to get personalized movie recommendations."
        buttonText="Set Preferences"
        onClick={() => navigate('/profile')}
        icon={<FaFilm size={32} color={theme.palette.primary.main}/>}
      />
    </Container>
  );
}

export default SetYourPreferencesWarning;