import {useState} from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Rating,
} from '@mui/material';
import {UserHistory} from '../types/history.ts';

type UserHistoryCardProps = {
  history: UserHistory;
  onRate: (registerId: number, rating: number) => void;
};

function UserHistoryCard({history, onRate}: UserHistoryCardProps) {
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (value: number | null) => {
    setRating(value);
    if (value !== null) {
      onRate(history.registerId, value);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          marginBottom: 2,
          boxShadow: 2,
          backgroundColor: 'background.paper',
        }}
      >
        {/* Movie Poster */}
        <CardMedia
          component="img"
          image={history.movie.horizontalPoster.w360} // Use horizontal poster
          alt={history.movie.title}
          sx={{
            width: 120,
            height: 80,
            borderRadius: 1,
            marginRight: 2,
          }}
        />

        {/* Movie Details */}
        <CardContent sx={{flex: 1, padding: 0, '&:last-child': {paddingBottom: 0}}}>
          <Typography
            variant="h2"
            sx={{fontSize: '1rem', fontWeight: 600, marginBottom: 1}}
          >
            {history.movie.title}
          </Typography>
          <Typography variant="body2" sx={{color: 'text.secondary', marginBottom: 1}}>
            {history.movie.directors.join(', ')}
          </Typography>
          <Box sx={{display: 'flex', gap: 1, marginBottom: 1, flexWrap: 'wrap'}}>
            {history.movie.genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                sx={{
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
          <Typography
            variant="body2"
            sx={{color: 'text.secondary', fontSize: '0.75rem'}}
          >
            Watched on: {new Date(history.registerDate).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            sx={{color: 'text.secondary', fontSize: '0.75rem', marginBottom: 1}}
          >
            Emotions: {history.emotionName.join(', ')}
          </Typography>

          {/* Star Rating */}
          <Box>
            <Rating
              value={rating}
              onChange={(_, value) => handleRatingChange(value)}
              size="small"
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default UserHistoryCard;
