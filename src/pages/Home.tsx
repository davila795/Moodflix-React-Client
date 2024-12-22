import {Box, Typography, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {MIN_HEIGHT_CONTAINER} from "../constants/constants.ts";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

function Home() {
  const userName = useSelector((state: RootState) => state.user.userName);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: MIN_HEIGHT_CONTAINER,
        backgroundColor: 'background.default',
        background: 'url(/bg_final_edit.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
          zIndex: 1,
        },
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          padding: 2,
          borderRadius: 2,
          textAlign: 'center',
          position: 'absolute',
          top: '10%',
          left: '0',
          zIndex: 2,
          width: '100%',
        }}
      >
        <Typography variant="h1" sx={{fontSize: '2rem', fontWeight: 'bold', fontStyle: "italic"}}>
          MoodFlix
        </Typography>
        <Typography variant="body1" sx={{fontSize: '1rem', marginTop: 1, fontStyle: "italic"}}>
          Your emotion, our recommendation
        </Typography>

      </Box>

      {/* Footer Section */}
      {!userName && (
        <Box
          sx={{
            padding: 3,
            textAlign: 'center',
            border: '1px solid #e0e0e030',
            borderRadius: 2,
            zIndex: 2,
            backgroundColor: 'rgba(49,51,49,0.81)',
          }}
        >
          <Typography variant="h2" sx={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 2}}>
            Get Started
          </Typography>
          <Box sx={{display: 'flex', gap: 2, justifyContent: 'center'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
              sx={{textTransform: 'uppercase', paddingX: 4}}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/register')}
              sx={{textTransform: 'uppercase', paddingX: 4}}
            >
              Register
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Home;
