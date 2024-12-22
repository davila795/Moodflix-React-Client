import {useGenerateRandomMovieMutation} from "../features/api/moviesApi.ts";
import MovieList from "../components/MovieList.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {useEffect, useState} from "react";
import {MovieAPI} from "../types/movies.ts";
import {setRecentMovies} from "../features/movie/recentMoviesSlice.ts";
import LoadingPage from "../components/LoadingPage.tsx";
import ErrorPageLoading from "../components/errors/ErrorPageLoading.tsx";

function GeneratedRandomMovie({numMovies}: { numMovies: number }) {
  const [generateRandomMovie, {isLoading, isError, error}] = useGenerateRandomMovieMutation();

  const [movies, setMovies] = useState<MovieAPI[]>([]);

  const errorNotFound = (error && 'originalStatus' in error && error.originalStatus === 404);

  const {desiredEmotionId, emotions} = useSelector((state: RootState) => state.emotions);

  const emotionsId = emotions.length > 0 ? emotions.map(emotion => emotion.id) : [];

  const moviesSuggested = useSelector((state: RootState) => state.recentMovies)
    .map(movie => movie.title);

  const dispatch = useDispatch();

  const fetchRandomMovies = async () => {
    const result = await generateRandomMovie({
      body: {
        moviesSuggested,
        emotionId: desiredEmotionId,
        emotionsId,
      },
      movieCount: numMovies
    }).unwrap();
    dispatch(setRecentMovies(result));
    setMovies(result);
  }

  useEffect(() => {
    if (movies.length === 0 || errorNotFound) {
      fetchRandomMovies();
    }
  }, [movies, error]);

  if (isError && !errorNotFound) {
    return <ErrorPageLoading message={'Error loading movies. Please try again.'}/>;
  }

  if (isLoading || errorNotFound) {
    return <LoadingPage/>;
  }

  return <MovieList movies={movies} refresh={fetchRandomMovies}/>;
}

export default GeneratedRandomMovie;
