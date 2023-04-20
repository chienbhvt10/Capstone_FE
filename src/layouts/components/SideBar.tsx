import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';
import SideBarItems from './SideBarItems';

export const drawerWidth = 240;

interface Props {
  handleDrawerClose: () => void;
  open: boolean;
}

const SideBar = (props: Props) => {
  const { handleDrawerClose, open } = props;
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{ sx: { backgroundColor: 'rgba(0, 131, 252, 0.8)' } }}
    >
      <DrawerHeader>
        <IconButton
          onClick={handleDrawerClose}
          size="medium"
          sx={{ color: '#FFFFFF' }}
        >
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon fontSize="large" />
          ) : (
            <ChevronLeftIcon fontSize="large" />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider variant="fullWidth" sx={{ borderColor: '#E0E0E0' }} />
      <SideBarItems open={open} />
    </Drawer>
  );
};

export default SideBar;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
