import {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import ProfileField from '../components/ProfileField';
import GenresModal from '../components/GenresModal';
import {User} from '../types/user.ts';
import {MIN_HEIGHT_CONTAINER} from "../constants/constants.ts";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import PlatformsModal from "../components/PlatformsModal.tsx";

function Profile() {
  const currentUser = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<User>(currentUser);
  const [genresModalOpen, setGenresModalOpen] = useState(false);
  const [platformsModalOpen, setPlatformsModalOpen] = useState(false);

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: 'background.default',
        minHeight: MIN_HEIGHT_CONTAINER,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        justifyContent: 'center',
      }}
    >
      <Typography variant="h1" textAlign={"center"} sx={{marginBottom: 3}}>
        Profile
      </Typography>

      {/* Editable Profile Fields */}
      <ProfileField
        label="Username"
        value={user.userName}
        onChange={(value) => setUser({...user, userName: value})}
      />
      <ProfileField
        label="Email"
        value={user.email}
        onChange={(value) => setUser({...user, email: value})}
      />
      <ProfileField
        label="Birth Date"
        value={formatDateForInput(user.birthDate)}
        type="date"
        onChange={(value) => setUser({...user, birthDate: value})}
      />
      <ProfileField
        label="Country"
        value={String(user.country.countryName)}
        disabled
      />

      {/* Buttons */}
      <Box justifyContent={"center"} display={"flex"} gap={2} mt={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setGenresModalOpen(true)}
        >
          Genres
        </Button>
        <Button variant="contained"
                color="primary"
                onClick={() => setPlatformsModalOpen(true)}
        >
          Platforms
        </Button>
      </Box>

      {/* Genres Modal */}
      {genresModalOpen && (
        <GenresModal
          open={genresModalOpen}
          onClose={() => setGenresModalOpen(false)}
        />
      )}

      {/* Platforms Modal */}
      {platformsModalOpen && (
        <PlatformsModal
          open={platformsModalOpen}
          onClose={() => setPlatformsModalOpen(false)}
        />
      )}
    </Box>
  );
}

export default Profile;
