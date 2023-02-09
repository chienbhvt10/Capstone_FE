import { IconButton, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import {
  ARRANGE_PATH,
  MANAGE_PATH,
  REGISTER_PATH,
  SETTING_PATH,
  TIMETABLE_PATH,
} from '../../constants/path';

interface Props {
  open: boolean;
}

interface ListItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const listItem: ListItem[] = [
  {
    title: 'Time Table',
    path: TIMETABLE_PATH,
    icon: (
      <Image
        src="images/sidebar/timetable.png"
        alt=""
        sx={{ width: 25, height: 25 }}
      />
    ),
  },
  {
    title: 'Manage',
    path: MANAGE_PATH,
    icon: (
      <Image
        src="images/sidebar/manage.png"
        alt=""
        sx={{ width: 25, height: 25 }}
      />
    ),
  },
  {
    title: 'Register',
    path: REGISTER_PATH,

    icon: (
      <Image
        src="images/sidebar/edit.png"
        alt=""
        sx={{ width: 25, height: 25 }}
      />
    ),
  },
  {
    title: 'Arrange',
    path: ARRANGE_PATH,
    icon: (
      <Image
        src="images/sidebar/arrange.png"
        alt=""
        sx={{ width: 25, height: 25 }}
      />
    ),
  },
  {
    title: 'Settings',
    path: SETTING_PATH,
    icon: (
      <Image
        src="images/sidebar/settings.png"
        alt=""
        sx={{ width: 25, height: 25 }}
      />
    ),
  },
];

const SideBarItems = (props: Props) => {
  const { open } = props;
  const navigate = useNavigate();

  const onChangePath = (path: string) => () => {
    navigate(path);
  };

  return (
    <List>
      {listItem.map((item, index) => (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={onChangePath(item.path)}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            {open ? (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                {item.icon}
              </ListItemIcon>
            ) : (
              <Tooltip title={item.title} placement="right">
                <IconButton>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </IconButton>
              </Tooltip>
            )}

            <ListItemText
              primary={item.title}
              sx={{ opacity: open ? 1 : 0, color: '#FFFFFF' }}
            />
          </ListItemButton>
          <Divider variant="fullWidth" sx={{ borderColor: '#E0E0E0' }} />
        </ListItem>
      ))}
    </List>
  );
};

export default SideBarItems;
