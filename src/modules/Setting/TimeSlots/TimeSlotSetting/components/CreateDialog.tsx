import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Dialog,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createTimeSlotSegment } from '~/services/timeslot';
import Validation from '~/utils/Validation';
import { FiltersRef } from '~/utils/form';
import { CreateSegmentData } from '../../utils/type';

interface CreateTimeSlotForm {
  name: string;
  daySession: number;
}

const schema = Validation.shape({
  name: Validation.string().required('Name is required'),
  daySession: Validation.number().typeError('Day session is required'),
});

interface Props {
  open: boolean;
  onGetValueSegment: () => CreateSegmentData[];
  onCloseCreateDialog: () => void;
  refetch: React.DispatchWithoutAction;
}

const CreateTimeSlotDialog = forwardRef<FiltersRef, Props>((props, ref) => {
  const { open, onCloseCreateDialog, onGetValueSegment, refetch } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTimeSlotForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const onSubmit: SubmitHandler<CreateTimeSlotForm> = async (value) => {
    const segmentValue = onGetValueSegment();
    await createTimeSlotSegment({
      daySession: value.daySession,
      name: value.name,
      segments: segmentValue,
    }).then((res) => {
      refetch();
      onCloseCreateDialog();
    });
  };

  const handleReset = () => {
    reset(schema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: handleSubmit(onSubmit),
  }));

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      PaperProps={{ sx: { p: 2 } }}
      onClose={onCloseCreateDialog}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="column"
          spacing={2}
          sx={{ justifyContent: 'center', alignItems: 'flex-start' }}
        >
          <Stack direction="column">
            <Typography variant="body2">
              Name{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <TextField
              {...register('name')}
              variant="outlined"
              name="name"
              fullWidth
              sx={{ width: 200 }}
            />
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errors.name?.message && `*${errors.name?.message}`}
            </Typography>
            <Typography variant="body2">
              Day Session{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>

            <Select {...register('daySession')} name="daySession">
              <MenuItem value={1}>AM</MenuItem>
              <MenuItem value={0}>PM</MenuItem>
            </Select>
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {errors.daySession?.message && `*${errors.daySession?.message}`}
            </Typography>
          </Stack>

          <Button type="submit" startIcon={<AddIcon />} size="medium" fullWidth>
            Time Slot
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
});

export default CreateTimeSlotDialog;
