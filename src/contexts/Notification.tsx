import CloseIcon from '@mui/icons-material/Close';
import type { AlertProps } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { __DEV__ } from '../config';
import type { SyntheticEvent } from 'react';
import { createContext, forwardRef, useCallback, useState } from 'react';
import wait from '../utils/wait';

const AlertMessage = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <Alert ref={ref} {...props} />
));

interface Settings {
  message: string | null | JSX.Element;
  error?: string | null;
  severity?: AlertProps['severity'];
  onUndo?: () => Promise<void> | void;
  onForward?: () => Promise<void> | void;
}

export type NotificationContextValue = (config: Settings) => void;

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

if (__DEV__) {
  NotificationContext.displayName = 'NotificationContext';
}

const initialSettings: Settings = {
  message: null,
  error: null,
};

interface Props {
  children?: React.ReactNode;
}

const NotificationProvider = (props: Props) => {
  const { children } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const { message, error, severity = 'success', onUndo, onForward } = settings;

  const handleReset = async () => {
    setOpen(false);
    await wait(350);
    setSettings(initialSettings);
  };

  const handleClose = async (
    _event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    handleReset();
  };

  const handleUndo = async (
    _event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    onUndo?.();
    handleReset();
  };

  const handleForward = async (
    _event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    onForward?.();
    handleReset();
  };

  const setNotification = useCallback((settings: Settings) => {
    setSettings((state) => ({
      ...state,
      ...settings,
    }));
    setOpen(true);
  }, []);

  return (
    <NotificationContext.Provider value={setNotification}>
      {children}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <AlertMessage
          onClose={handleClose}
          severity={error ? 'error' : severity}
          action={
            <Stack direction="row" spacing={1}>
              {typeof onUndo === 'function' && (
                <Button variant="text" color="inherit" onClick={handleUndo}>
                  Hủy bỏ
                </Button>
              )}
              {typeof onForward === 'function' && (
                <Button variant="text" color="inherit" onClick={handleForward}>
                  Xác nhận
                </Button>
              )}
              <IconButton color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          }
        >
          {error || message}
        </AlertMessage>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export { NotificationContext as default, NotificationProvider };
