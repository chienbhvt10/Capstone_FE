import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios';
import { Fragment } from 'react';
import {
  API_EXPORT_GROUP_BY_LECTURER,
  API_EXPORT_IN_IMPORT_FORMAT,
} from '~/constants/api-path';
import useAuth from '~/hooks/useAuth';
import { downloadFileFromBlob } from '~/utils/downloadExcel';

interface Props {}

const ExcelAndArrangeAction = (props: Props) => {
  const { user } = useAuth();

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

  return (
    <Fragment>
      <Stack
        direction="row"
        sx={{ border: '1px solid #ccc', p: 1, borderRadius: 1 }}
      >
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
    </Fragment>
  );
};

export default ExcelAndArrangeAction;
