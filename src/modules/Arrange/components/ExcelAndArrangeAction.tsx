import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Backdrop, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import images from '~/assets/images';
import UploadExcelButton from '~/components/ButtonComponents/UploadExcelButton';
import Image from '~/components/styledComponents/Image';
import {
  exportInImportFormat,
  importTimeTable,
} from '../../../services/arrange';
import SettingModelDialog from './SettingModelDialog';
import useNotification from '~/hooks/useNotification';
import useArrange from '~/hooks/useArrange';

interface Props {}

const ExcelAndArrangeAction = (props: Props) => {
  const setNotification = useNotification();
  const { refetch } = useArrange();
  const [openDialog, setOpen] = useState<boolean>(false);
  const [loadingUploadExcel, setLoadingUploadExcel] = useState<boolean>(false);

  const onCloseDialog = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onExportInImportFormat = async () => {
    await exportInImportFormat();
  };

  const handleUploadExcel = async (file: File) => {
    try {
      setLoadingUploadExcel(true);
      const formData = new FormData();

      formData.append('file', file, file.name);

      await importTimeTable(formData);
      setNotification({
        message: 'Upload file success',
        severity: 'success',
      });
      refetch();
    } catch (error) {
      setNotification({
        message: 'Upload file failed',
        severity: 'error',
      });
    } finally {
      setLoadingUploadExcel(false);
    }
  };

  return (
    <Fragment>
      <Stack
        direction="row"
        sx={{ border: '1px solid #ccc', p: 1, borderRadius: 1 }}
      >
        <Stack direction="column" spacing={1}>
          <Button
            sx={{ maxHeight: 40, height: 1 }}
            startIcon={
              <Image
                src={images.iconArrange}
                sx={{ width: 25, height: 25 }}
                alt=""
              />
            }
            fullWidth
            onClick={onOpen}
          >
            Arrange
          </Button>
          <UploadExcelButton
            sx={{ maxHeight: 40, height: 1 }}
            onSelect={handleUploadExcel}
            title="Import timetable"
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Button
            sx={{ maxHeight: 40, height: 1 }}
            onClick={onExportInImportFormat}
            startIcon={<FileDownloadIcon />}
            fullWidth
          >
            Export in import format
          </Button>
          <Button
            startIcon={<FileDownloadIcon />}
            fullWidth
            sx={{ maxHeight: 40, height: 1 }}
          >
            Export group by lecturer
          </Button>
        </Stack>
      </Stack>

      <SettingModelDialog
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
      />
      <Backdrop
        sx={{
          color: '#fff',
          mt: '0 !important',
          zIndex: 9999,
        }}
        open={loadingUploadExcel}
      >
        <Stack direction="column" spacing={2} sx={{ alignItems: 'center' }}>
          <CircularProgress sx={{ color: 'white' }} />
          <Typography variant="body1">Importing timetable ...</Typography>
        </Stack>
      </Backdrop>
    </Fragment>
  );
};

export default ExcelAndArrangeAction;
