import {ServiceOption} from "../types/movies.ts";

export const filterStreamingOptions = (streamingOptions: ServiceOption[], userPlatforms: string[]) => {
  return streamingOptions.reduce((
    acc: { [key: string]: ServiceOption },
    option) => {

    const key = `${option.serviceName}-${option.accesType}`;
    if (userPlatforms.includes(option.serviceName) && !acc[key]) {
      acc[key] = option;
    }
    return acc;
  }, {});
}
