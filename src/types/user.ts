export type User = {
  userId: number | null;
  userName: string;
  email: string;
  birthDate: string;
  country: Country;
}

type Country = {
  countryId: number | null,
  countryCode: string,
  countryName: string
}