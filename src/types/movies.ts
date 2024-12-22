export type MovieAPI = {
  id: number;
  title: string;
  overview: string;
  genres: string[];
  directors: string[];
  runtime: number;
  imageSet: MovieAPIImageSet;
  streamingOptions: StreamingOptions;
}

export type MovieAPIImageSet = {
  verticalPoster: VerticalPoster;
  horizontalPoster: HorizontalPoster;
}

export type HorizontalPoster = {
  w360: string;
  w480: string;
  w720: string;
}

export type VerticalPoster = {
  w240: string;
  w360: string;
  w480: string;
}

export type StreamingOptions = {
  serviceOptions: ServiceOption[];
}

export type ServiceOption = {
  serviceName: string;
  accesType: string;
  link: string;
  imageSet: ServiceOptionImageSet;
}

export type ServiceOptionImageSet = {
  lightThemeImage: string;
  darkThemeImage: string;
  whiteImage: string;
}
