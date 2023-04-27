import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import type { PaginationRenderItemParams } from '@mui/material/Pagination';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select, { selectClasses } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  pageIndex: number;
  totalPages: number;
  totalRows: number;
  onChangePage: (pageIndex: number) => void;
  onChangeRowsPerPage: (rowsPerPage: number) => void;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  small?: boolean;
}

const TablePagination = (props: Props) => {
  const {
    pageIndex,
    totalPages,
    totalRows,
    rowsPerPage,
    rowsPerPageOptions,
    onChangePage,
    onChangeRowsPerPage,
    small = false,
  } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const isSmall = matches || small;

  const handleChangePage = (_event: unknown, pageIndex: number) => {
    onChangePage(pageIndex);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    onChangeRowsPerPage(Number(event.target.value));
  };

  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        alignItems: 'center',
        p: 2,
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'row',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center',
            sm: 'center',
            md: 'space-between',
          },
          alignItems: 'center',
          flexGrow: 1,
          flexWrap: 'wrap',
          mb: { xs: 0.5, sm: 0.5, md: 0 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ whiteSpace: 'nowrap' }}
          >
            Row per page
          </Typography>
          <FormControl sx={{ mx: 1 }}>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              size="small"
              variant="standard"
              disableUnderline
              sx={{
                [`& .${selectClasses.select}`]: {
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  pb: 0,
                },
              }}
            >
              {rowsPerPageOptions.map((rowsPerPage) => (
                <MenuItem key={rowsPerPage} value={rowsPerPage}>
                  {rowsPerPage}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {totalPages === 0 ? 0 : (pageIndex - 1) * rowsPerPage + 1}-
            {pageIndex * rowsPerPage} Total {totalRows}
          </Typography>
        </Box>
      </Box>
      <Pagination
        page={pageIndex}
        count={totalPages}
        shape="rounded"
        showFirstButton
        showLastButton
        onChange={handleChangePage}
        size={isSmall ? 'small' : 'medium'}
        renderItem={(params: PaginationRenderItemParams) => {
          const { type } = params;
          if (type === 'page' && isSmall) {
            return null;
          }
          return <PaginationItem {...params} />;
        }}
      />
    </Box>
  );
};

export default TablePagination;
