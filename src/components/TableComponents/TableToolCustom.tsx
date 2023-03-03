import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';

interface Props {
  item: any;
  onEdit?: (item: any) => () => void;
  onDelete?: (item: any) => () => void;
  displayEditButton?: boolean;
  displayDeleteButton?: boolean;
}

const TableToolCustom = (props: Props) => {
  const {
    item,
    onEdit,
    onDelete,
    displayEditButton = true,
    displayDeleteButton = true,
  } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {displayEditButton && (
        <Tooltip title="Edit item" placement="top">
          <IconButton onClick={onEdit?.(item)}>
            <EditIcon fontSize="medium" sx={{ color: 'primary.main' }} />
          </IconButton>
        </Tooltip>
      )}
      {displayDeleteButton && (
        <Tooltip title="Delete item" placement="top">
          <IconButton onClick={onDelete?.(item)}>
            <DeleteIcon fontSize="medium" sx={{ color: 'error.main' }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default TableToolCustom;
