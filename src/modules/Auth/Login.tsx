import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '~/components/PageWrapper';
import { HOME_PATH } from '~/constants/path';
import useNotification from '~/hooks/useNotification';
import { login } from '~/services/auth';
import LocalStorage from '~/utils/LocalStorage';
import Validation from '~/utils/Validation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { forwardRef, useImperativeHandle } from 'react';
import { FiltersRef } from '~/utils/form';
import useAuth from '~/hooks/useAuth';

interface LoginForm {
  username: string;
  password: string;
}

const schema = Validation.shape({
  username: Validation.string().required('Username is required'),
  password: Validation.string().required('Password is required'),
});

interface Props {}

const Login = forwardRef<FiltersRef, Props>((props, ref) => {
  const navigate = useNavigate();
  const setNotification = useNotification();
  const { refetch } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const onSubmit = (value: LoginForm) => {
    login({
      username: value.username,
      password: value.password,
    })
      .then((res) => {
        if (res.isSuccess && res.data) {
          LocalStorage.set('currentUser', res.data);
          navigate(HOME_PATH);
          setNotification({
            severity: 'success',
            message: 'Login successfully!',
          });
          refetch();
          return;
        }
        if (!res.isSuccess) {
          setNotification({
            severity: 'error',
            message: res.message,
          });
        }
      })
      .catch((err) => {
        setNotification({
          severity: 'error',
          message: 'Login fail',
        });
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
    <PageWrapper title="Manage Page">
      <Container maxWidth="xs" sx={{ marginTop: 20 }}>
        <Paper elevation={12} sx={{ p: 3 }}>
          <Stack direction="column">
            <Typography variant="h5" align="center" sx={{ pb: 2 }}>
              Welcome to TimeTable <br /> Schedule app
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                direction="column"
                spacing={0}
                sx={{
                  p: 2,
                  borderRadius: 0.5,
                }}
              >
                <Stack direction="column" spacing={1}>
                  <Typography variant="body2">
                    Username{' '}
                    <Typography component="span" sx={{ color: 'error.main' }}>
                      *
                    </Typography>
                  </Typography>
                  <Stack direction="column" spacing={1}>
                    <TextField
                      {...register('username')}
                      variant="outlined"
                      name="username"
                    />
                    <Typography variant="caption" sx={{ color: 'error.main' }}>
                      {errors.username?.message &&
                        `*${errors.username?.message}`}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="column">
                  <Typography variant="body2">
                    Password{' '}
                    <Typography component="span" sx={{ color: 'error.main' }}>
                      *
                    </Typography>
                  </Typography>
                  <Stack direction="column">
                    <TextField
                      {...register('password')}
                      variant="outlined"
                      name="password"
                    />
                    <Typography variant="caption" sx={{ color: 'error.main' }}>
                      {errors.password?.message &&
                        `*${errors.password?.message}`}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="column" sx={{ pt: 3 }}>
                  <Button size="medium" type="submit" fullWidth>
                    Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Container>
    </PageWrapper>
  );
});

export default Login;
