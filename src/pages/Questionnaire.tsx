// src/pages/Questionnaire.tsx
import {useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  useFetchQuestionsQuery,
  useSubmitResponsesMutation
} from "../features/api/questionnaireApi.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setEmotions} from "../features/emotions/emotionsSlice.ts";
import {SubmitResponseItem} from "../types/questionnaire.ts";
import {MIN_HEIGHT_CONTAINER} from "../constants/constants.ts";
import ErrorPageLoading from "../components/errors/ErrorPageLoading.tsx";
import LoadingPage from "../components/LoadingPage.tsx";

function Questionnaire() {
  const {data: questions, isLoading, isError} = useFetchQuestionsQuery();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]); // Track selected answers
  const [submitResponses, {isLoading: isSubmitting,}] = useSubmitResponsesMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAnswerSelect = (answer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions!.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    const formattedResponses: SubmitResponseItem[] = questions!.map((q, index) => ({
      question: q.question,
      answer: selectedAnswers[index]!,
    }));

    const emotions = await submitResponses(formattedResponses).unwrap();
    dispatch(setEmotions(emotions));
    navigate('/results');
  };

  if (isLoading) {
    return <LoadingPage/>;
  }

  if (isError) {
    return <ErrorPageLoading message={'Error loading questions. Please try again later.'}/>;
  }

  if (!questions) {
    return (
      <Typography variant="h2" sx={{textAlign: 'center', marginTop: '2rem'}}>
        No questions found.
      </Typography>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: MIN_HEIGHT_CONTAINER,
        backgroundColor: 'background.default',
        color: 'text.primary',
        padding: 3,
      }}
    >
      <Typography variant="h1" sx={{fontSize: '1.5rem', marginBottom: 3}}>
        Question {currentQuestionIndex + 1}/{questions.length}
      </Typography>

      <Card
        sx={{
          width: '100%',
          maxWidth: 500,
          backgroundColor: 'background.paper',
          padding: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h2" sx={{fontSize: '1.25rem', marginBottom: 2}}>
            {currentQuestion.question}
          </Typography>

          {currentQuestion.answers.map((answer, index) => (
            <Button
              key={index}
              variant={selectedAnswer === answer.key ? 'contained' : 'outlined'} // Highlight selected answer
              fullWidth
              sx={{
                marginBottom: 2,
                textTransform: 'none',
                fontSize: '0.95rem',
                color: selectedAnswer === answer.key ? 'white' : 'primary.main',
                '&:hover': {
                  backgroundColor: selectedAnswer === answer.key ? 'primary.main' : 'none',
                  color: 'white',
                },
              }}
              onClick={() => handleAnswerSelect(answer.key)}
            >
              {answer.text}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 500,
          marginTop: 3,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          disabled={currentQuestionIndex === 0}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedAnswer || isSubmitting} // Disable if no answer is selected or submitting
          >
            {isSubmitting ? <CircularProgress size={24} sx={{color: 'white'}}/> : 'Submit'}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!selectedAnswer} // Disable if no answer is selected
          >
            Next
          </Button>
        )}
      </Box>

    </Box>
  );
}

export default Questionnaire;
