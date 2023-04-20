import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Backdrop, CircularProgress, Tooltip } from '@mui/material';
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
import useAuth from '~/hooks/useAuth';
import { downloadFileFromBlob } from '~/utils/downloadExcel';
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios';
import {
  API_EXPORT_GROUP_BY_LECTURER,
  API_EXPORT_IN_IMPORT_FORMAT,
} from '~/constants/api-path';

interface Props {}

const ExcelAndArrangeAction = (props: Props) => {
  const setNotification = useNotification();
  const { refetch, currentSemester } = useArrange();
  const { user } = useAuth();
  const [openDialog, setOpen] = useState<boolean>(false);
  const [loadingUploadExcel, setLoadingUploadExcel] = useState<boolean>(false);

  const onCloseDialog = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onExportInImportFormat = async () => {
    const response: AxiosResponse = await axios.get(
      `https://localhost:7279/api${API_EXPORT_IN_IMPORT_FORMAT}/${
        user?.id || 0
      }`,
      {
        responseType: 'blob',
      }
    );
    if (response.status === 200) {
      const { data, headers } = response;
      downloadFileFromBlob(data, headers as AxiosResponseHeaders);
    }
  };

  const onExportGroupByLecturer = async () => {
    const response: AxiosResponse = await axios.get(
      `https://localhost:7279/api${API_EXPORT_GROUP_BY_LECTURER}/${
        user?.id || 0
      }`,
      {
        responseType: 'blob',
      }
    );
    if (response.status === 200) {
      const { data, headers } = response;
      downloadFileFromBlob(data, headers as AxiosResponseHeaders);
    }
  };

  const handleUploadExcel = async (file: File) => {
    try {
      setLoadingUploadExcel(true);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('semesterId', String(currentSemester?.id || 0));
      formData.append('departmentHeadId', String(user?.id || 0));

      const res = await importTimeTable(formData);
      if (!res.isSuccess) {
        setNotification({
          message: res.message,
          severity: 'error',
        });
        return;
      }
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
            sx={{ maxHeight: 40, height: 1, lineHeight: 1.25 }}
            onSelect={handleUploadExcel}
            title="Import timetable"
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Button
            sx={{ maxHeight: 40, height: 1, lineHeight: 1.25 }}
            onClick={onExportInImportFormat}
            startIcon={<FileDownloadIcon />}
            fullWidth
          >
            Export in import format
          </Button>
          <Button
            sx={{ maxHeight: 40, height: 1, lineHeight: 1.25 }}
            onClick={onExportGroupByLecturer}
            startIcon={<FileDownloadIcon />}
            fullWidth
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
