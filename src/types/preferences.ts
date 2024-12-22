export type Genre = {
  genreId: number,
  genreName: string
}
export type GenreNotPreferred = Genre & { isPreferred: boolean };

export type Country = {
  countryId: number,
  countryCode: string,
  countryName: string
}

export type Platform = {
  platformId: number,
  platformName: string
}