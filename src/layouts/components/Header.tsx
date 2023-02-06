import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Image from '../../components/Image';

export const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Props extends AppBarProps {
  handleDrawerOpen: () => void;
}

const Header = (props: Props) => {
  const { handleDrawerOpen, open } = props;

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{ px: 2.25, backgroundColor: '#FFFFFF' }}
        disableGutters={true}
      >
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
        <Image
          sx={{ width: 80, height: 'auto' }}
          src="images/Logo-FU-01-200.png"
        />
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
