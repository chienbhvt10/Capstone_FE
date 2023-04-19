import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createBuilding, updateBuilding } from '~/services/distance';
import Validation from '~/utils/Validation';
import { FiltersRef } from '~/utils/form';
import { Building } from '../util/type';
import useArrange from '~/hooks/useArrange';
import useAuth from '~/hooks/useAuth';
import useNotification from '~/hooks/useNotification';

interface BuildingForm {
  name: string;
  shortName: string;
}

const schema = Validation.shape({
  shortName: Validation.string().required('ShortName is required'),
  name: Validation.string(),
});

interface Props {
  editMode: boolean;
  editingItem: Building | null;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: React.DispatchWithoutAction;
}

const BuildingForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { editingItem, setEditMode, editMode, refetch } = props;
  const { user } = useAuth();
  const { currentSemester } = useArrange();
  const setNotification = useNotification();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BuildingForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  useEffect(() => {
    if (editingItem) {
      reset({
        shortName: editingItem.shortName,
        name: editingItem.name,
      });
    }
  }, [editingItem]);

  const onSubmit: SubmitHandler<BuildingForm> = async (value) => {
    if (editMode) {
      await updateBuilding({
        id: editingItem?.id || -1,
        shortName: value.shortName,
        name: value.name,
      })
        .then((res) => {
          if (res.isSuccess) {
            refetch();
            setEditMode(false);
            handleReset();
            setNotification({
              message: 'Update successfully',
              severity: 'success',
            });
            return;
          }
          setNotification({ message: res.message, severity: 'error' });
        })
        .catch((err) => {
          setNotification({ message: 'Update fail', severity: 'error' });
        });
      return;
    }

    await createBuilding({
      name: value.name || null,
      shortName: value.shortName,
      semesterId: currentSemester?.id || null,
      departmentHeadId: user?.id || null,
    })
      .then((res) => {
        if (res.isSuccess) {
          refetch();
          handleReset();
          setNotification({
            message: 'Create successfully',
            severity: 'success',
          });
          return;
        }
        setNotification({ message: res.message, severity: 'error' });
      })
      .catch((err) => {
        setNotification({ message: 'Create fail', severity: 'error' });
      });
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
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
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
              Building
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

export default BuildingForm;
