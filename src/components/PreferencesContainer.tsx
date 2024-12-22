import {useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import PlatformCard from "./StreamingOptionCard.tsx";
import {MIN_HEIGHT_CONTAINER} from "../constants/constants.ts";

function PreferencesContainer({handleSave, preferences}) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleTogglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((platformId) => platformId !== id) : [...prev, id]
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        backgroundColor: 'background.default',
        minHeight: MIN_HEIGHT_CONTAINER,
      }}
    >
      <Typography variant="h1" sx={{fontSize: '1.5rem', marginBottom: 3}}>
        Edit Platforms
      </Typography>

      <Grid container spacing={2} sx={{maxWidth: 600}}>
        {preferences.map((preference) => (
          <Grid item xs={12} sm={6} key={preference.id}>
            <PlatformCard
              platform={preference}
              isSelected={selectedPlatforms.includes(preference.id)}
              onToggle={handleTogglePlatform}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSave(selectedPlatforms)}
        sx={{marginTop: 3, textTransform: 'uppercase'}}
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default PreferencesContainer;