import type { NotificationContextValue } from '../contexts/Notification';
import { NotificationContext } from '../contexts/Notification';
import { useContext } from 'react';

const useNotification = (): NotificationContextValue => {
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext) {
    throw new Error('Forgot to wrap component in NotificationProvider');
  }

  return notificationContext;
};

export default useNotification;
