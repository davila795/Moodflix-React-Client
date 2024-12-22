import GeneratedMovie from "./GeneratedMovie.tsx";
import {useParams} from "react-router-dom";
import GeneratedRandomMovie from "./GeneratedRandomMovie.tsx";

function GeneratedMovieWrapper() {
  const {haveEmotions, numMovies} = useParams<{ haveEmotions: string, numMovies: string }>();
  const numberOfMovies = numMovies ? parseInt(numMovies, 10) : 1;
  const haveEmotionsBool = haveEmotions === 'true';
  
  if (!haveEmotionsBool) {
    return <GeneratedRandomMovie numMovies={numberOfMovies}/>
  }

  return <GeneratedMovie numMovies={numberOfMovies}/>
}

export default GeneratedMovieWrapper;