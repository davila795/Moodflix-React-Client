import {Container, Typography, useTheme} from '@mui/material';
import OptionCard from '../components/OptionCard';
import {FaRandom, FaFilm, FaSmile} from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {MIN_HEIGHT_CONTAINER, MOBILEBAR_HEIGHT} from "../constants/constants.ts";
import SetYourPreferencesWarning from "../components/SetYourPreferencesWarning.tsx";

function Movies() {
  const theme = useTheme();
  const navigate = useNavigate();
  const preferences = useSelector((state: RootState) => state.userPreferences);
  const emotions = useSelector((state: RootState) => state.emotions.emotions);

  const handleRandomMovie = (numMovies: number = 1) => {
    navigate(`/movies/${numMovies}/selectEmotion`);
  };

  const handleMoodMovies = () => {
    if (emotions.length === 0) {
      navigate('/questionnaire');
    } else {
      navigate('/results');
    }
  }

  if (preferences.genres.length === 0 || preferences.platforms.length === 0) {
    return <SetYourPreferencesWarning/>;
  }

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
        Explore Your Movie Options
      </Typography>

      <OptionCard
        title="Surprise Me with a Movie!"
        description="Feeling adventurous? Let us surprise you with a random movie recommendation!"
        buttonText="Surprise Me"
        onClick={() => handleRandomMovie()}
        icon={<FaRandom size={32} color={theme.palette.primary.main}/>}
      />

      <OptionCard
        title="Pick Your Favorite from 3 Choices!"
        description="Not sure what to watch? Choose your favorite from five handpicked movies."
        buttonText="Show Me 3 Movies"
        onClick={() => handleRandomMovie(3)}
        icon={<FaFilm size={32} color={theme.palette.text.secondary}/>}
      />

      <OptionCard
        title="Discover Movies Based on Your Feelings!"
        description="Take a fun quiz to match your mood with the perfect movie."
        buttonText="Find Movies by Mood"
        onClick={handleMoodMovies}
        icon={<FaSmile size={32} color={theme.palette.secondary.main}/>}
      />
    </Container>
  );
}

export default Movies;
