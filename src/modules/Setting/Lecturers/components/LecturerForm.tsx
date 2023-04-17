import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useArrange from '~/hooks/useArrange';
import useAuth from '~/hooks/useAuth';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { createLecturer, updateLecturer } from '~/services/lecturer';
import Validation from '~/utils/Validation';
import { FiltersRef } from '~/utils/form';

interface LecturerForm {
  name: string;
  shortName: string;
  email: string;
  quota: number;
  minQuota: number;
}

const schema = Validation.shape({
  email: Validation.string().required('Email is required'),
  shortName: Validation.string().required('ShortName is required'),
  name: Validation.string(),
  quota: Validation.number().default(0).required('Quota is required'),
  minQuota: Validation.number().default(0).required('MinQuota is required'),
});

interface Props {
  editMode: boolean;
  editingItem: Lecturer | null;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: React.DispatchWithoutAction;
}

const LecturerForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { editMode, editingItem, setEditMode, refetch } = props;
  const { currentSemester } = useArrange();
  const { user } = useAuth();
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
        minQuota: editingItem.minQuota,
        quota: editingItem.quota,
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
        minQuota: value.minQuota,
        quota: value.quota,
      })
        .then((res) => {
          refetch();
          setEditMode(false);
          handleReset();
        })
        .catch((err) => {});
      return;
    }

    await createLecturer({
      email: value.email,
      name: value.name,
      shortName: value.shortName,
      minQuota: value.minQuota,
      quota: value.quota,
      departmentHeadId: user?.id || 0,
      semesterId: currentSemester?.id || 0,
    })
      .then((res) => {
        handleReset();
        refetch();
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
        alignItems: 'flex-start',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="column"
          spacing={0}
          sx={{
            p: 2,
            border: editMode ? '1px solid #FD5555' : '1px solid #ccc',
            borderRadius: 0.5,
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="body2">
              Email{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Stack direction="column" spacing={1}>
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

          <Stack direction="column">
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

          <Stack direction="column">
            <Typography variant="body2">Name </Typography>
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
          <Stack direction="column">
            <Typography variant="body2">
              Quota{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Stack direction="column">
              <TextField
                {...register('quota')}
                variant="outlined"
                name="quota"
                sx={{ width: 200 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.quota?.message && `*${errors.quota?.message}`}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column">
            <Typography variant="body2">
              Min Quota{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Stack direction="column">
              <TextField
                {...register('minQuota')}
                variant="outlined"
                name="minQuota"
                sx={{ width: 200 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.minQuota?.message && `*${errors.minQuota?.message}`}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button
              type="submit"
              startIcon={editMode ? <SaveIcon /> : <AddIcon />}
              size="medium"
              sx={{
                width: 100,
                backgroundColor: editMode ? '#FD5555' : '#3DA2FF',
                '&:hover': {
                  backgroundColor: editMode ? '#ff2727' : '#3DA2FF',
                },
              }}
            >
              Lecturer
            </Button>
            <Button size="medium" sx={{ width: 80 }} onClick={handleReset}>
              Clear
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
});

export default LecturerForm;
