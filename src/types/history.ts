import {MovieAPI, MovieAPIImageSet} from "./movies.ts";

export type UserHistory = {
  registerId: number;
  userId: number;
  registerDate: Date;
  emotionName: string[];
  movie: UserHistoryMovie;
}

export type UserHistoryMovie =
  Pick<MovieAPI, 'title' | 'overview' | 'genres' | 'directors'>
  & Pick<MovieAPIImageSet, 'horizontalPoster'>
  & {
  movieId: number;
}

