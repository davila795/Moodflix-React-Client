import {Checkbox, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";

type PreferenceModalItemProps = {
  id: number;
  name: string;
  checkSelected: (id: number) => boolean;
  handleToggle: ({id, name}: { id: number, name: string }, isSelected: boolean) => void;
}

function PreferenceModalItem({id, name, checkSelected, handleToggle}: PreferenceModalItemProps) {
  return (
    <ListItem>
      <ListItemText primary={name}/>
      <ListItemSecondaryAction>
        <Checkbox
          checked={checkSelected(id)}
          onChange={(e) => handleToggle({id, name}, e.target.checked)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default PreferenceModalItem;