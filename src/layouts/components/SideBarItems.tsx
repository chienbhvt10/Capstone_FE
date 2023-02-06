import InboxIcon from '@mui/icons-material/MoveToInbox';
import { IconButton, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from '../../components/Image';

interface Props {
  open: boolean;
}

interface ListItem {
  title: string;
  icon: React.ReactNode;
}

const listItem: ListItem[] = [
  {
    title: 'Time Table',
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
    icon: (
      <Image
        src="images/sidebar/register.png"
        alt=""
        sx={{ width: 25, height: 25 }}
      />
    ),
  },
  {
    title: 'Arrange',
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

  return (
    <List>
      {listItem.map((item, index) => (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
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
