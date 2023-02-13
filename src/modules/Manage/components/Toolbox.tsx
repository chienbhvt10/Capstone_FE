import { TextField, Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SyntheticEvent, useState } from 'react';
import images from '~/assets/images';
import Image from '~/components/Image';

interface Props {}

interface Option {
  id: number;
  label: string;
}

const options: Option[] = [
  {
    id: 1,
    label: 'value1',
  },
  {
    id: 2,
    label: 'value2',
  },
  {
    id: 3,
    label: 'value3',
  },
  {
    id: 4,
    label: 'value4',
  },
];

const selectedOptions1: Option = {
  id: 1,
  label: 'Activated',
};

const selectedOptions2: Option = {
  id: 1,
  label: 'All Email',
};

const Toolbox = (props: Props) => {
  const [option1Selector, setOption1Selector] = useState<Option | null>(
    selectedOptions1
  );

  const [option2Selector, setOption2Selector] = useState<Option | null>(
    selectedOptions2
  );

  const onChangeOption1Selector = (
    event: SyntheticEvent,
    newValue: Option | null
  ) => {
    setOption1Selector(newValue);
  };

  const onChangeOption2Selector = (
    event: SyntheticEvent,
    newValue: Option | null
  ) => {
    setOption2Selector(newValue);
  };

  return (
    <Stack spacing={2} direction="column" sx={{ display: 'block' }}>
      <Stack direction="row">
        <Button>Add new department’s lecturer</Button>
        <Button
          startIcon={
            <Image
              src={images.iconExport}
              alt=""
              sx={{ width: 20, height: 20 }}
            />
          }
        >
          Export in import format
        </Button>
      </Stack>
      <Stack direction="row">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          sx={{ width: 250 }}
          value={option1Selector}
          onChange={onChangeOption1Selector}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          sx={{ width: 250 }}
          value={option2Selector}
          onChange={onChangeOption2Selector}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Stack>
    </Stack>
  );
};

export default Toolbox;
