import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createSubject, updateSubject } from '~/services/subject';
import Validation from '~/utils/Validation';
import { FiltersRef } from '~/utils/form';
import { Subject } from '../util/type';
import SaveIcon from '@mui/icons-material/Save';
import useArrange from '~/hooks/useArrange';
import useAuth from '~/hooks/useAuth';

interface SubjectForm {
  name: string;
  code: string;
}

const schema = Validation.shape({
  name: Validation.string(),
  code: Validation.string().required('Code is required'),
});

interface Props {
  editMode: boolean;
  editingItem: Subject | null;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: React.DispatchWithoutAction;
}

const SubjectForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { editMode, editingItem, setEditMode, refetch } = props;
  const { user } = useAuth();
  const { currentSemester } = useArrange();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  useEffect(() => {
    if (editingItem) {
      reset({
        code: editingItem.code,
        name: editingItem.name,
      });
    }
  }, [editingItem]);

  const onSubmit: SubmitHandler<SubjectForm> = async (value) => {
    if (editMode) {
      await updateSubject({
        id: editingItem?.id || -1,
        code: value.code,
        name: value.name,
      })
        .then((res) => {
          refetch();
          setEditMode(false);
          handleReset();
        })
        .catch((err) => {});
      return;
    }

    await createSubject({
      name: value.name,
      code: value.code,
      departmentHeadId: user?.id || 0,
      semesterId: currentSemester?.id || 0,
    })
      .then((res) => {
        refetch();
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
              Subject Code{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Stack direction="column">
              <TextField
                {...register('code')}
                variant="outlined"
                name="code"
                sx={{ width: 200 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.code?.message && `*${errors.code?.message}`}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column">
            <Typography variant="body2">
              Name{' '}
              {/* <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography> */}
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
              Subject
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

export default SubjectForm;
