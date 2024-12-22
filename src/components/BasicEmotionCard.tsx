import {Typography, Card, Box} from '@mui/material';


type EmotionCardProps = {
  emotion: string;
  color: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
};

function BasicEmotionCard({emotion, color, selected, onClick, icon}: EmotionCardProps) {

  return (
    <Card
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        backgroundColor: selected ? color : 'background.paper',
        border: selected ? `4px solid ${color}` : '1px solid #ddd',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: `0 8px 16px ${color}`,
        },
        borderRadius: 2,
        padding: 1,
      }}
    >
      {/* Emotion Icon */}
      <Box
        sx={{
          fontSize: '2.5rem',
          color: selected ? 'white' : color,
          marginBottom: 1,
        }}
      >
        {icon}
      </Box>

      {/* Emotion Name */}
      <Typography
        variant="body2"
      >
        {emotion}
      </Typography>
    </Card>
  );
}

export default BasicEmotionCard;
