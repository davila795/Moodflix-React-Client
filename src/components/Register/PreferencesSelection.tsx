import {Card, CardContent, Grid, Typography} from "@mui/material";

function PreferencesSelection(preferences, handleGenreToggle, selectedGenres) {
  return (
    <>
      <Grid container spacing={2} sx={{marginTop: 1}}>
        {preferences.map((preference) => (
          <Grid item xs={4} key={preference.id}>
            <Card
              onClick={() => handleGenreToggle(preference.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                border: selectedGenres.includes(preference.id)
                  ? '2px solid #4CAF50'
                  : '1px solid #ccc',
              }}
            >
              <CardContent>
                <Typography>{preference.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default PreferencesSelection;