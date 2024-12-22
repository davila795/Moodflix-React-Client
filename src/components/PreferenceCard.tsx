import {Box, Card, CardContent, Typography} from '@mui/material';

type PlatformCardProps = {
  preference: { id: string; name: string; icon?: string };
  isSelected: boolean;
  onToggle: (id: string) => void;
};

function PreferenceCard({preference, isSelected, onToggle}: PlatformCardProps) {
  return (
    <Card
      onClick={() => onToggle(preference.id)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        cursor: 'pointer',
        border: isSelected ? '2px solid #4CAF50' : '1px solid #ccc',
        backgroundColor: isSelected ? 'rgba(76, 175, 80, 0.1)' : 'background.paper',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(255, 255, 255, 0.5)',
        },
      }}
    >
      <Box
        component="img"
        src={preference.icon}
        alt={preference.name}
        sx={{width: 40, height: 40, marginRight: 2}}
      />
      <CardContent>
        <Typography variant="h3" sx={{fontSize: '1rem', fontWeight: 500}}>
          {preference.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PreferenceCard;
