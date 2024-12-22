import {Box, TextField} from '@mui/material';

type ProfileFieldProps = {
  label: string;
  value: string;
  onChange?: (newValue: string) => void;
  disabled?: boolean;
  type?: string;
};

function ProfileField({label, value, onChange, disabled = false, type = 'text'}: ProfileFieldProps) {
  return (
    <Box sx={{marginBottom: 3}}>
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        variant="outlined"
        type={type}
        InputLabelProps={{shrink: true}}
        sx={{backgroundColor: 'background.paper'}}
      />
    </Box>
  );
}

export default ProfileField;