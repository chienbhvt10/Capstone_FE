import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { SyntheticEvent, useState } from 'react';

interface Option {
  id: number;
  title: string;
}

interface Props {
  options: Option[];
  label?: string;
  renderOptionAllowRemove?: boolean;
}

const AutocompleteCustom = (props: Props) => {
  const { options, label, renderOptionAllowRemove = false } = props;
  const [roomsSelector, setRoomsSelector] = useState<Option | null>(null);

  const onChangeSelector = (event: SyntheticEvent, newValue: Option | null) => {
    setRoomsSelector(newValue);
  };

  const onShowRemovePopup = () => {};

  return (
    <Autocomplete
      sx={{ width: 1 }}
      size="small"
      filterSelectedOptions
      getOptionLabel={(option) => option.title || ''}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      options={options}
      renderOption={(props, option, { selected }) => (
        <li
          style={{ display: 'flex', justifyContent: 'space-between' }}
          {...props}
        >
          {option.title}
          {renderOptionAllowRemove && (
            <IconButton onClick={onShowRemovePopup}>
              <ClearIcon />
            </IconButton>
          )}
        </li>
      )}
      value={roomsSelector}
      onChange={onChangeSelector}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} />
      )}
    />
  );
};

export default AutocompleteCustom;
