import { Button, Stack, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/Image';
import PageWrapper from '~/components/PageWrapper';
import { HOME_PATH } from '~/constants/path';
import useNotification from '~/hooks/useNotification';

const Login = () => {
  const navigate = useNavigate();
  const setNotification = useNotification();

  const onLogin = () => {
    navigate(HOME_PATH);
    setNotification({ severity: 'success', message: 'Login successfully!' });
  };

  return (
    <PageWrapper title="Manage Page">
      <Container maxWidth="xs" sx={{ marginTop: 20 }}>
        <Paper elevation={12} sx={{ p: 3 }}>
          <Stack direction="column">
            <Typography variant="h5" align="center" sx={{ pb: 2 }}>
              Welcome to TimeTable <br /> Schedule app
            </Typography>
            <Stack direction="column" sx={{ pt: 3 }}>
              <Typography variant="body2">Username</Typography>
              <TextField placeholder="Enter username" size="medium" />
            </Stack>
            <Stack direction="column">
              <Typography variant="body2">Password</Typography>
              <TextField placeholder="Enter password" size="medium" />
            </Stack>

            <Stack direction="column" sx={{ pt: 3 }}>
              <Button size="medium" fullWidth onClick={onLogin}>
                Login
              </Button>
              <Button
                size="medium"
                fullWidth
                variant="outlined"
                startIcon={
                  <Image
                    src={images.iconGoogle}
                    alt=""
                    sx={{ width: 25, height: 25 }}
                  />
                }
              >
                <Typography variant="body2" sx={{ ml: 1, letterSpacing: 1 }}>
                  FPT.EDU.VN
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </PageWrapper>
  );
};

export default Login;
