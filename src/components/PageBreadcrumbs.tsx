import Box from '@mui/material/Box';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { HOME_PATH } from '../constants/path';
import { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Breadcrumb {
  text: string;
  link: string;
}

interface Props {
  category?: string;
  breadcrumbs: Breadcrumb[];
  title: string;
  page?: string;
  home?: boolean;
}

const PageBreadcrumbs = (props: Props) => {
  const { page, title, home = false, breadcrumbs, category } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {page && (
        <Fragment>
          <Typography variant="subtitle2">{page}</Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1.5 }} />
        </Fragment>
      )}
      <Breadcrumbs
        separator=">"
        sx={{
          [`& > .${breadcrumbsClasses.ol}`]: {
            alignItems: 'baseline',
          },
        }}
      >
        {!home && (
          <Link component={RouterLink} to={HOME_PATH} variant="subtitle2">
            Trang chủ
          </Link>
        )}
        {category && (
          <Typography variant="subtitle2" color="primary.main">
            {category}
          </Typography>
        )}
        {breadcrumbs.map((item, i) => {
          const { text, link } = item;
          return (
            <Link key={i} component={RouterLink} to={link} variant="subtitle2">
              {text}
            </Link>
          );
        })}
        <Typography variant="subtitle2" color="primary.main">
          {title}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default PageBreadcrumbs;
