import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EmotionsResponse} from "../../types/emotions.ts";
import {Questionnaire, SubmitResponseItem} from "../../types/questionnaire.ts";
import {RootState} from "../../app/store.ts";

export const questionnaireApi = createApi({
  reducerPath: 'questionnaireApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7116/api',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), // Adjust base URL as needed
  endpoints: (builder) => ({
    fetchQuestions: builder.query<Questionnaire, void>({
      query: () => '/Questionary', // API endpoint for fetching questions
    }),
    submitResponses: builder.mutation<EmotionsResponse, SubmitResponseItem[]>({
      query: (body) => ({
        url: 'Questionary',
        method: 'POST',
        body,
      })
    })
  }),
});

export const {useSubmitResponsesMutation, useFetchQuestionsQuery} = questionnaireApi;
