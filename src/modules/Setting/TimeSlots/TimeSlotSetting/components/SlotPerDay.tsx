import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Slot } from '../../utils/type';

interface Props {
  setCurrentSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
  setNumberSlots: React.Dispatch<React.SetStateAction<number>>;
  numberSlots: number;
  currentSlots: Slot[];
}

const SlotPerDay = (props: Props) => {
  const { setCurrentSlots, setNumberSlots, numberSlots, currentSlots } = props;

  const onIncrementSlot = () => {
    setNumberSlots((numberSlots) => {
      setCurrentSlots((currentSlot) => [
        ...currentSlot,
        {
          id: numberSlots + 1,
          slotDays: [
            {
              id: 1,
              selected: false,
            },
            {
              id: 2,
              selected: false,
            },
            {
              id: 3,
              selected: false,
            },
            {
              id: 4,
              selected: false,
            },
            {
              id: 5,
              selected: false,
            },
            {
              id: 6,
              selected: false,
            },
            {
              id: 7,
              selected: false,
            },
          ],
        },
      ]);
      return numberSlots + 1;
    });
  };

  const onDecrementSlot = () => {
    setNumberSlots((numberSlots) => {
      if (numberSlots > 0) {
        return numberSlots - 1;
      }
      return 0;
    });
    setCurrentSlots((currentSlot) => {
      if (numberSlots > 0) {
        currentSlot.pop();
        return currentSlot;
      }
      return [];
    });
  };

  const onClearSelection = () => {
    const newCurrentSlots = currentSlots.map((item) => ({
      ...item,
      slotDays: item.slotDays.map((item) => ({ ...item, selected: false })),
    }));
    setCurrentSlots(newCurrentSlots);
  };

  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', justifyContent: 'center', mb: 1 }}
    >
      <Typography variant="body2">Number of slot(s)/day</Typography>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={onDecrementSlot} size="small">
          <RemoveIcon />
        </Button>
        <Button disabled size="small">
          {numberSlots >= 0 && numberSlots}
        </Button>
        <Button onClick={onIncrementSlot} size="small">
          <AddIcon />
        </Button>
      </ButtonGroup>
      <Button onClick={onClearSelection}>Clear Selection</Button>
    </Stack>
  );
};

export default SlotPerDay;
