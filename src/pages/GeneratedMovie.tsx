import {useGenerateRandomMovieMutation} from "../features/api/moviesApi.ts";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import MovieList from "../components/MovieList.tsx";

function GeneratedMovie({numMovies}: { numMovies: number }) {
  const emotions = useSelector((state: RootState) => state.emotions.emotions);
  const [generateRandomMovie, {isLoading, isError}] = useGenerateRandomMovieMutation();

  const fetchMoviesOnEmotions = async (recentMoviesTitles: string[]) => {
    const ids = emotions.map(emotion => emotion.id);
    const result = await generateRandomMovie({
      body: {
        moviesSuggested: recentMoviesTitles,
        emotionId: null,
        emotionsId: ids,
      },
      movieCount: numMovies
    }).unwrap();
    return result;
  }

  return <MovieList isLoading={isLoading} isError={isError} fetchMovies={fetchMoviesOnEmotions}/>;
}

export default GeneratedMovie;
