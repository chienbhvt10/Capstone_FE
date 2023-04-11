import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createSubject, updateSubject } from '~/services/subject';
import Validation from '~/utils/Validation';
import { FiltersRef } from '~/utils/form';
import SaveIcon from '@mui/icons-material/Save';
import useArrange from '~/hooks/useArrange';
import { Semester } from '../util/type';
import { createSemester, updateSemester } from '~/services/semester';

interface SemesterForm {
  semester: string;
  year: string;
  isNow: boolean;
}

const schema = Validation.shape({
  semester: Validation.string().required('Semester is required'),
  year: Validation.string().required('Year is required'),
});

interface Props {
  editMode: boolean;
  editingItem: Semester | null;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SemesterForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { editMode, editingItem, setEditMode } = props;
  const { refetchSubject } = useArrange();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SemesterForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  useEffect(() => {
    if (editingItem) {
      reset({
        isNow: editingItem.isNow,
        year: editingItem.year,
        semester: editingItem.semester,
      });
    }
  }, [editingItem]);

  const onSubmit: SubmitHandler<SemesterForm> = async (value) => {
    if (editMode) {
      await updateSemester({
        id: editingItem?.id || -1,
        year: value.year,
        semester: value.semester,
      })
        .then((res) => {
          refetchSubject();
          setEditMode(false);
          handleReset();
        })
        .catch((err) => {});
      return;
    }

    await createSemester({
      year: value.year,
      semester: value.semester,
    })
      .then((res) => {
        refetchSubject();
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
        alignItems: 'flex-start',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="column"
          spacing={0}
          sx={{
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 0.5,
          }}
        >
          <Stack direction="column">
            <Typography variant="body2">
              Semester{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Stack direction="column">
              <TextField
                {...register('semester')}
                variant="outlined"
                name="code"
                sx={{ width: 200 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.semester?.message && `*${errors.semester?.message}`}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column">
            <Typography variant="body2">
              Year{' '}
              {/* <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography> */}
            </Typography>
            <Stack direction="column">
              <TextField
                {...register('year')}
                variant="outlined"
                name="name"
                sx={{ width: 200 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.year?.message && `*${errors.year?.message}`}
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
              Semester
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

export default SemesterForm;
