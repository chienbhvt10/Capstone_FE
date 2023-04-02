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

interface SubjectForm {
  name: string;
  code: string;
  department: string;
}

const schema = Validation.shape({
  name: Validation.string().required('Name is required'),
  code: Validation.string().required('Code is required'),
  department: Validation.string().required('Department is required'),
});

interface Props {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  editMode: boolean;
  editingItem: Subject | null;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubjectForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { subjects, setSubjects, editMode, editingItem, setEditMode } = props;

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
        department: editingItem.department,
        name: editingItem.name,
      });
    }
  }, [editingItem]);

  const onSubmit: SubmitHandler<SubjectForm> = async (value) => {
    if (editMode) {
      await updateSubject({
        id: editingItem?.id || -1,
        code: value.code,
        department: value.department,
        name: value.name,
      })
        .then((res) => {
          const newSubject = subjects.map((subject) => {
            if (subject.id === editingItem?.id) {
              return {
                ...editingItem,
                ...value,
                id: editingItem?.id,
              };
            }
            return subject;
          });
          setEditMode(false);
          setSubjects(newSubject);
          handleReset();
        })
        .catch((err) => {});
      return;
    }

    await createSubject({
      department: value.department,
      name: value.name,
      code: value.code,
    })
      .then((res) => {
        setSubjects([...subjects, res.data]);
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
              Short Name{' '}
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

          <Stack direction="row">
            <Typography variant="body2">
              Department{' '}
              <Typography component="span" sx={{ color: 'error.main' }}>
                *
              </Typography>
            </Typography>
            <Stack direction="column">
              <TextField
                {...register('department')}
                variant="outlined"
                name="department"
                sx={{ width: 200 }}
              />
              <Typography variant="caption" sx={{ color: 'error.main' }}>
                {errors.department?.message && `*${errors.department?.message}`}
              </Typography>
            </Stack>
          </Stack>

          <Button
            type="submit"
            startIcon={editMode ? <SaveIcon /> : <AddIcon />}
            size="medium"
            sx={{ width: 100 }}
          >
            Subject
          </Button>
          <Button size="medium" sx={{ width: 80 }} onClick={handleReset}>
            Clear
          </Button>
        </Stack>
      </form>
    </Stack>
  );
});

export default SubjectForm;
