import {Box, Typography} from '@mui/material';
import UserHistoryCard from '../components/UserHistoryCard';
import {useGetUserHistoryQuery} from "../features/api/userHistoryApi.ts";
import {useEffect} from "react";
import {MIN_HEIGHT_CONTAINER, MOBILEBAR_HEIGHT} from "../constants/constants.ts";
import LoadingPage from "../components/LoadingPage.tsx";
import ErrorPageLoading from "../components/errors/ErrorPageLoading.tsx";

function UserHistory() {
  const {data: history, isLoading, isError, refetch} = useGetUserHistoryQuery();

  useEffect(() => {
    refetch();
  }, []);
  const handleRate = (registerId: number, rating: number) => {
    console.log(`Rated movie with registerId ${registerId}: ${rating} stars`);
    // Add logic to save the rating (e.g., send to an API)
  };

  if (isLoading) {
    return <LoadingPage/>;
  }

  if (isError) {
    return <ErrorPageLoading message={'Failed to load history'}/>;
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: 'background.default',
        minHeight: MIN_HEIGHT_CONTAINER,
        mb: MOBILEBAR_HEIGHT
      }}
    >
      <Typography variant="h1" sx={{marginBottom: 3, fontWeight: 600}}>
        View History
      </Typography>

      {history?.map((historyItem) => (
        <UserHistoryCard
          key={historyItem.registerId}
          history={historyItem}
          onRate={handleRate}
        />
      ))}
    </Box>
  );
}

export default UserHistory;