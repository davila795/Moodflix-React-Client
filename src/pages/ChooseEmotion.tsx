import {Box, Typography, Grid, Button} from '@mui/material';
import BasicEmotionCard from "../components/BasicEmotionCard.tsx";
import {BASIC_EMOTIONS, MIN_HEIGHT_CONTAINER} from "../constants/constants.ts";
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addDesiredEmotion} from "../features/emotions/emotionsSlice.ts";
import {RootState} from "../app/store.ts";
import {toast} from "sonner";

const EMOTION_ICONS = {
  Joy: <SentimentVerySatisfiedIcon/>,
  Fear: <SentimentDissatisfiedIcon/>,
  Anger: <SentimentNeutralIcon/>,
  Sadness: <SentimentVeryDissatisfiedIcon/>,
}

function ChooseEmotion() {
  const desiredEmotionId = useSelector((state: RootState) => state.emotions.desiredEmotionId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {numMovies} = useParams<{ numMovies: string }>();

  const handleEmotionClick = (emotionId: number) => {
    dispatch(addDesiredEmotion(emotionId));
  };

  const handleSubmit = () => {
    if (desiredEmotionId) {
      navigate(`/movies/generateMovie/emotions/${false}/${numMovies}`);
    } else {
      toast.warning('Please select an emotion to continue.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: MIN_HEIGHT_CONTAINER,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        padding: 3,
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h1"
        sx={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 3}}
      >
        Choose How You Want to Feel
      </Typography>

      {/* Emotion Cards */}
      <Grid container spacing={2} justifyContent="center" sx={{marginBottom: 4}}>
        {Object.entries(BASIC_EMOTIONS).map(([name, {id, color}]) => (
          <Grid item xs={6} sm={4} key={id}>
            <BasicEmotionCard
              emotion={name}
              color={color}
              icon={EMOTION_ICONS[name as keyof typeof EMOTION_ICONS]}
              selected={desiredEmotionId === id}
              onClick={() => handleEmotionClick(id)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Submit Button */}
      <Button
        variant="text"
        color="primary"
        onClick={handleSubmit}
        disabled={!desiredEmotionId}
        sx={{
          paddingX: 4,
        }}
      >
        Continue
      </Button>
    </Box>
  );
}

export default ChooseEmotion;
