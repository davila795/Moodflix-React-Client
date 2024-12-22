import {Box, Button} from '@mui/material';
import {MovieAPI} from '../types/movies.ts';
import MovieCard from './MovieCard.tsx';
import {MIN_HEIGHT_CONTAINER, MOBILEBAR_HEIGHT} from "../constants/constants.ts";

type MovieListProps = {
  movies: MovieAPI[];
  refresh: () => Promise<void>
}

function MovieList({movies, refresh}: MovieListProps) {

  return (
    <Box
      sx={{padding: 3, backgroundColor: 'background.default', minHeight: MIN_HEIGHT_CONTAINER, mb: MOBILEBAR_HEIGHT}}>
      {movies.map((movie) =>
        <MovieCard key={movie.id} movie={movie}/>
      )}
      {movies.length > 0 && (
        <Box sx={{display: 'flex', justifyContent: 'center', gap: 2, mt: 3}}>
          <Button variant="text" onClick={refresh} color={"secondary"}>
            Refresh
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default MovieList;