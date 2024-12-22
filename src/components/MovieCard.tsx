import {Box, Card, CardMedia, Typography, Chip, Grid, IconButton, Collapse, Button} from '@mui/material';
import {MovieAPI} from "../types/movies.ts";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryIcon from "@mui/icons-material/History";
import {useEffect, useState} from "react";
import {useAddToUserHistoryMutation} from "../features/api/userHistoryApi.ts";
import StreamingOptionCard from "./StreamingOptionCard.tsx";
import {filterStreamingOptions} from "../utils/filterStreamingOptions.ts";
import {toast} from "sonner";

function MovieCard({movie}: { movie: MovieAPI }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const primaryPoster = movie.imageSet.verticalPoster.w480;
  const emotionId = useSelector((state: RootState) => state.emotions.emotions).map((emotion) => emotion.id);
  const userPlatforms = useSelector((state: RootState) => state.userPreferences.platforms).map(platform => platform.platformName);

  const [addToUserHistory, {isLoading, isError, isSuccess}] = useAddToUserHistoryMutation();

  const streamingOptionsFiltered = movie.streamingOptions.serviceOptions ? filterStreamingOptions(movie.streamingOptions.serviceOptions, userPlatforms) : {};

  const addToHistory = async (movie: MovieAPI) => {
    const historyRecord = {
      ...movie,
      emotionId: emotionId,
    }
    await addToUserHistory(historyRecord);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Movie added to history.');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to add movie to history.');
    }
  }, [isError]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        backgroundColor: 'background.paper',
        boxShadow: 3,
        marginBottom: 3,
      }}
    >
      {/* Movie Poster */}
      <CardMedia
        component="img"
        image={primaryPoster}
        alt={movie.title}
        sx={{
          width: '100%',
          maxWidth: 300,
          borderRadius: 2,
          marginBottom: 3,
        }}
      />

      {/* Movie Details */}
      <Typography variant="h1" sx={{marginBottom: 3}}>
        {movie.title}
      </Typography>

      {/* Streaming Options */}
      <Box sx={{width: '100%'}}>
        <Grid container spacing={2}>
          {Object.values(streamingOptionsFiltered).map((option, index) =>
            <StreamingOptionCard option={option} key={index}/>
          )}
        </Grid>
      </Box>

      {/* Dropdown Toggle */}
      <IconButton onClick={() => setIsExpanded((prev) => !prev)} sx={{marginBottom: 2}}>
        {isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
      </IconButton>

      {/* Collapsible Content */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Typography variant="body2" sx={{marginBottom: 2, color: 'text.secondary'}}>
          {movie.overview}
        </Typography>
        <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 2}}>
          {movie.genres.map((genre) => (
            <Chip key={genre} label={genre} sx={{backgroundColor: 'secondary.main', color: 'white'}}/>
          ))}
        </Box>
        <Typography variant="body2" sx={{marginBottom: 2, fontStyle: 'italic', color: 'text.secondary'}}>
          Directed by: {movie.directors.join(', ')}
        </Typography>
        <Typography variant="body2" sx={{marginBottom: 3, color: 'text.secondary'}}>
          Runtime: {movie.runtime} minutes
        </Typography>
      </Collapse>

      <Button variant="contained" disabled={isLoading || isSuccess} color="primary"
              onClick={() => addToHistory(movie)}>
        <HistoryIcon sx={{marginRight: 1}}/>
        Add to History
      </Button>

    </Card>
  );
}

export default MovieCard;
