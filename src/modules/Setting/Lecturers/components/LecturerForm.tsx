import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { createLecturer, updateLecturer } from '~/services/lecturer';
import Validation from '~/utils/Validation';
import { FiltersRef } from '~/utils/form';
import SaveIcon from '@mui/icons-material/Save';

interface LecturerForm {
  name: string;
  shortName: string;
  email: string;
}

const schema = Validation.shape({
  email: Validation.string().required('Email is required'),
  shortName: Validation.string().required('ShortName is required'),
  name: Validation.string().required('Name is required'),
});

interface Props {
  lecturers: Lecturer[];
  setLecturers: React.Dispatch<React.SetStateAction<Lecturer[]>>;
  editMode: boolean;
  editingItem: Lecturer | null;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const LecturerForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { setLecturers, lecturers, editMode, editingItem, setEditMode } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LecturerForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  useEffect(() => {
    if (editingItem) {
      reset({
        email: editingItem.email,
        shortName: editingItem.shortName,
        name: editingItem.name,
      });
    }
  }, [editingItem]);

  const onSubmit: SubmitHandler<LecturerForm> = async (value) => {
    if (editMode) {
      await updateLecturer({
        id: editingItem?.id || -1,
        email: value.email,
        shortName: value.shortName,
        name: value.name,
      })
        .then((res) => {
          const newLecturers = lecturers.map((lecturer) => {
            if (lecturer.id === editingItem?.id) {
              return {
                ...editingItem,
                ...value,
                id: editingItem?.id,
              };
            }
            return lecturer;
          });
          setEditMode(false);
          setLecturers(newLecturers);
          handleReset();
        })
        .catch((err) => {});
      return;
    }

    await createLecturer({
      email: value.email,
      name: value.name,
      shortName: value.shortName,
    })
      .then((res) => {
        setLecturers([...lecturers, res.data]);
        handleReset();
      })
      .catch((err) => {});
  };

  const handleReset = () => {
    setEditMode(false);
    reset(schema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: handleSubmit(onSubmit),
  }));

  return (
    <Stack
      direction="row"
      sx={{
        maxWidth: 1200,
        px: 4,
        mt: 2,
        alignItems: 'flex-end',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'center', alignItems: 'flex-start' }}
        >
          <Stack direction="row">
            <Typography variant="body2">
              Email{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Stack direction="column">
              <TextField
                {...register('email')}
                variant="outlined"
                name="email"
                sx={{ width: 200 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.email?.message && `*${errors.email?.message}`}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row">
            <Typography variant="body2">
              Short Name{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Stack direction="column">
              <TextField
                {...register('shortName')}
                variant="outlined"
                name="shortName"
                sx={{ width: 200 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.shortName?.message && `*${errors.shortName?.message}`}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row">
            <Typography variant="body2">
              Name{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Stack direction="column">
              <TextField
                {...register('name')}
                variant="outlined"
                name="name"
                sx={{ width: 200 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.name?.message && `*${errors.name?.message}`}
              </Typography>
            </Stack>
          </Stack>
          <Button
            type="submit"
            startIcon={editMode ? <SaveIcon /> : <AddIcon />}
            size="medium"
            sx={{ width: 100 }}
          >
            Lecturer
          </Button>
          <Button size="medium" sx={{ width: 80 }} onClick={handleReset}>
            Clear
          </Button>
        </Stack>
      </form>
    </Stack>
  );
});

export default LecturerForm;
