import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Image from '../../components/Image';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/path';
import Box from '@mui/material/Box/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import useNotification from '../../hooks/useNotification';

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
  const navigate = useNavigate();
  const setNotification = useNotification();

  const onLogout = () => {
    navigate(LOGIN_PATH);
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
          <Image
            sx={{ width: 80, height: 'auto' }}
            src="images/Logo-FU-01-200.png"
          />
        </Stack>
        {pathname !== LOGIN_PATH && (
          <Tooltip title="Logout">
            <IconButton onClick={onLogout}>
              <Image
                sx={{ width: 20, height: 'auto' }}
                src="images/button/logout.png"
              />
            </IconButton>
          </Tooltip>
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
