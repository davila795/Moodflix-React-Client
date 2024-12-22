import {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';

type EditableFieldProps = {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
};

function EditableField({label, value, onSave}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  return (
    <Box sx={{marginBottom: 3}}>
      <Typography variant="h2" sx={{fontSize: '1rem', fontWeight: 600, marginBottom: 1}}>
        {label}
      </Typography>
      {isEditing ? (
        <Box sx={{display: 'flex', gap: 2}}>
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      ) : (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">{value}</Typography>
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default EditableField;
