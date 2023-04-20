import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Image from '~/components/styledComponents/Image';
import { LOGIN_PATH } from '~/constants/path';
import useAuth from '~/hooks/useAuth';
import useNotification from '~/hooks/useNotification';
import LocalStorage from '~/utils/LocalStorage';

export const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Props extends AppBarProps {
  handleDrawerOpen?: () => void;
}

const Header = (props: Props) => {
  const { handleDrawerOpen, open } = props;
  const { pathname } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const setNotification = useNotification();

  const onLogout = () => {
    LocalStorage.remove('currentUser');
    navigate(LOGIN_PATH);
    window.location.reload();
    setNotification({ severity: 'success', message: 'Logged out' });
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{
          px: pathname === LOGIN_PATH ? 5 : 2.25,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        disableGutters={true}
      >
        <Stack direction="row">
          {pathname !== LOGIN_PATH && (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          )}
          <Image sx={{ width: 80, height: 'auto' }} src={images.logo} />
        </Stack>
        {pathname !== LOGIN_PATH && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography
              variant="body1"
              sx={{ color: 'black', fontStyle: 'italic' }}
            >
              {user?.username}:{' '}
              <span style={{ color: '#3DA2FF' }}>{user?.department}</span>
            </Typography>

            <Tooltip title="Logout">
              <IconButton onClick={onLogout}>
                <Image
                  sx={{ width: 20, height: 'auto' }}
                  src={images.iconLogout}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
