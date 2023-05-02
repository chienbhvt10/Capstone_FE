import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios';
import { Fragment, useState } from 'react';
import {
  API_EXPORT_GROUP_BY_LECTURER,
  API_EXPORT_IN_IMPORT_FORMAT,
} from '~/constants/api-path';
import useAuth from '~/hooks/useAuth';
import { downloadFileFromBlob } from '~/utils/downloadExcel';

interface Props {}

const ExcelAndArrangeAction = (props: Props) => {
  const { user } = useAuth();
  const [loadingExportInImportFormat, setLoadingExportInImportFormat] =
    useState<boolean>(false);
  const [loadingExportGroupByLecturer, setLoadingExportGroupByLecturer] =
    useState<boolean>(false);

  const onExportInImportFormat = async () => {
    setLoadingExportInImportFormat(true);
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
    setLoadingExportInImportFormat(false);
  };

  const onExportGroupByLecturer = async () => {
    setLoadingExportGroupByLecturer(true);
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
    setLoadingExportGroupByLecturer(false);
  };

  return (
    <Fragment>
      <Stack
        direction="row"
        sx={{ border: '1px solid #ccc', p: 1, borderRadius: 1 }}
      >
        <Stack direction="column" spacing={1}>
          <LoadingButton
            loading={loadingExportInImportFormat}
            loadingPosition="start"
            sx={{ maxHeight: 40, height: 1, lineHeight: 1.25 }}
            onClick={onExportInImportFormat}
            startIcon={<FileDownloadIcon />}
            fullWidth
          >
            Export in import format
          </LoadingButton>
          <LoadingButton
            loading={loadingExportGroupByLecturer}
            loadingPosition="start"
            sx={{ maxHeight: 40, height: 1, lineHeight: 1.25 }}
            onClick={onExportGroupByLecturer}
            startIcon={<FileDownloadIcon />}
            fullWidth
          >
            Export group by lecturer
          </LoadingButton>
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default ExcelAndArrangeAction;
