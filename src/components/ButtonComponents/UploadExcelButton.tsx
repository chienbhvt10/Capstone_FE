import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import { ChangeEvent } from 'react';
import { EXCEL_FILE_TYPES } from '~/constants';
import useNotification from '~/hooks/useNotification';
import UploadInput from './UploadInput';
import ActionButton from './ActionButton';

interface Props extends Omit<ButtonProps, 'onSelect'> {
  onSelect: (file: File) => void;
  title: string;
}

const UploadExcelButton = (props: Props) => {
  const { onSelect, title, ...rest } = props;

  const setNotification = useNotification();

  const handleUploadExcel = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];

      if (
        ![
          EXCEL_FILE_TYPES.CSV_TYPE,
          EXCEL_FILE_TYPES.XLSX_TYPE,
          EXCEL_FILE_TYPES.XLS_TYPE,
        ].includes(file.type)
      ) {
        setNotification({
          message: 'Not Support file extension',
          severity: 'error',
        });
        return;
      }

      onSelect(file);
    }

    event.target.value = '';
  };

  return (
    <ActionButton
      variant="contained"
      actionType="upload"
      // @ts-ignore
      component="label" // Fix type error later
      {...rest}
    >
      {title}
      <UploadInput
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleUploadExcel}
      />
    </ActionButton>
  );
};

export default UploadExcelButton;
