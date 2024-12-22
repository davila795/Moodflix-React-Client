// src/components/OptionCard.tsx
import {ReactNode} from 'react';
import {Card, CardContent, CardActions, Typography, Button, Box} from '@mui/material';

type OptionCardProps = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  icon: ReactNode;
};

function OptionCard({title, description, buttonText, onClick, icon}: OptionCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: '1rem auto',
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardContent>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
          {icon}
          <Typography variant="h2">
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{marginTop: 1, color: 'text.secondary'}}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" fullWidth onClick={onClick}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}

export default OptionCard;
