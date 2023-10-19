import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import useNotificationStore from '../../store/notification.store';

interface NotificationPropsInterface {
  message: string;
  severity: AlertColor;
  onCloseCallback?: () => void;
}

const Notification: React.FC<NotificationPropsInterface> = ({
  message,
  severity,
  onCloseCallback,
}: NotificationPropsInterface) => {
  const [open, setOpen] = useState(false);
  const { setNotification } = useNotificationStore();

  const onClose = useCallback(() => {
    setOpen(false);
    setNotification(null);
    onCloseCallback && onCloseCallback();
  }, [setNotification, onCloseCallback]);

  useEffect(() => {
    setOpen(!!message);
  }, [message]);

  return (
    <Snackbar
      autoHideDuration={1500}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
      style={{ marginTop: '50px' }}
    >
      <Alert severity={severity} onClose={onClose}>
        {<p>{message}</p>}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
