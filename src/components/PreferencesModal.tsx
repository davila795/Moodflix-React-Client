import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

type PreferencesModalProps = {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  handleSave: () => void;
  children: React.ReactNode;
  title: string;
  description: string;
}

function PreferencesModal({isLoading, onClose, open, handleSave, title, description, children}: PreferencesModalProps) {

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{marginBottom: 2}}>
          {description}
        </Typography>
        {/**/}
        {children}
        {/**/}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained" disabled={isLoading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>

  )
}

export default PreferencesModal;
