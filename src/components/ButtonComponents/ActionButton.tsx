import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import type { LoadingButtonProps } from '@mui/lab/LoadingButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

// TODO: Implements text: Cancel, Save, Update,...

const icons = {
  search: SearchIcon,
  download: FileDownloadIcon,
  save: SaveIcon,
  cancel: CloseIcon,
  delete: DeleteIcon,
  check: CheckIcon,
  add: AddIcon,
  upload: UploadIcon,
  return: KeyboardReturnIcon,
  forward: ArrowForwardIcon,
  outward: ArrowOutwardIcon,
  back: ArrowBackIcon,
} as const;

interface Props extends LoadingButtonProps {
  actionType?: keyof typeof icons;
  iconPosition?: 'start' | 'end';
  onSubmit?: () => Promise<void>;
}

const ActionButton = (props: Props) => {
  const {
    actionType,
    iconPosition = 'start',
    onSubmit,
    loading,
    ...rest
  } = props;
  const [submitting, setSubmitting] = useState<boolean>(false);

  const Icon = actionType && icons[actionType];

  const handleSubmit = async () => {
    if (!onSubmit) {
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LoadingButton
      onClick={handleSubmit}
      loading={submitting || loading}
      {...(actionType && {
        loadingPosition: 'start',
        startIcon: Icon && iconPosition === 'start' ? <Icon /> : void 0,
        endIcon: Icon && iconPosition === 'end' ? <Icon /> : void 0,
        variant: actionType === 'cancel' ? 'outlined' : void 0,
      })}
      {...rest}
    />
  );
};

export default ActionButton;
