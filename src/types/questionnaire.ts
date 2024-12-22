export type Answer = {
  key: string;
  text: string;
}

export type Questionnaire = {
  question: string;
  answers: Answer[];
}[]

export type SubmitResponseItem = {
  question: string;
  answer: string;
}