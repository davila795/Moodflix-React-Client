import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../app/store';
import {Typography, Box, Button, Card, CardContent, Grid} from '@mui/material';
import {setEmotions} from "../features/emotions/emotionsSlice.ts";
import {MIN_HEIGHT_CONTAINER} from "../constants/constants.ts";

function Results() {
  const emotions = useSelector((state: RootState) => state.emotions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRestart = () => {
    dispatch(setEmotions({emotions: [], description: ''}));
    navigate('/questionnaire');
  };

  const handleGetMovie = () => {
    navigate(`/movies/${1}/selectEmotion`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: MIN_HEIGHT_CONTAINER,
        backgroundColor: 'background.default',
        color: 'text.primary',
        padding: 3,
      }}
    >
      <Typography variant="h1" sx={{marginBottom: 3}}>
        Your Emotional Results
      </Typography>

      <Grid container spacing={2} sx={{marginBottom: 2}}>
        {emotions.emotions.map((emotion, index) => (
          <Grid item xs={12} sm={6} key={emotion.name}>
            <Card
              sx={{
                backgroundColor: 'background.paper',
                boxShadow: 3,
                padding: 2,
                textAlign: 'center',
                border: index === 0 ? '2px solid #4CAF50' : undefined, // Highlight top emotion
              }}
            >
              <CardContent>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: index === 0 ? 'bold' : 'normal',
                    color: index === 0 ? 'primary.main' : 'text.primary',
                  }}
                >
                  {index + 1}. {emotion.name}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1rem',
                    color: 'text.secondary',
                  }}
                >
                  Score: {emotion.score}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          mb: 3,
        }}
        textAlign={"center"}
      >
        {emotions.description}
      </Typography>


      <Box sx={{display: 'flex', gap: 2}}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRestart}
          sx={{textTransform: 'uppercase'}}
        >
          Restart Questionnaire
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetMovie}
          sx={{textTransform: 'uppercase'}}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}

export default Results;
