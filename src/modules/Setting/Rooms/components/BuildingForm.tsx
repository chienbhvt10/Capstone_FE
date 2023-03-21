import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

const BuildingForm = () => {
  const [shortName, setShortName] = useState<string>('');
  const [name, setName] = useState<string>('');

  const onCreateBuilding = () => {};

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeShortName = (event: ChangeEvent<HTMLInputElement>) => {
    setShortName(event.target.value);
  };

  return (
    <Stack
      direction="row"
      sx={{
        marginLeft: 0,
        maxWidth: 1300,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField
        value={name}
        onChange={onChangeName}
        variant="outlined"
        label="Name"
        sx={{ maxWidth: 300, width: 1 }}
      />
      <TextField
        value={shortName}
        onChange={onChangeShortName}
        variant="outlined"
        label="Short Name"
        sx={{ maxWidth: 300, width: 1 }}
      />
      <Button startIcon={<AddIcon />} onClick={onCreateBuilding}>
        Building
      </Button>
    </Stack>
  );
};

export default BuildingForm;
