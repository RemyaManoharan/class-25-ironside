import { create } from 'zustand';
import { AlertColor } from '@mui/material';

export interface NotificationInterface {
  message: string;
  severity: AlertColor;
}

export interface NotificationState {
  notification: NotificationInterface | null;
  setNotification: (notification: NotificationInterface | null) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notification: null,
  setNotification: (notification: NotificationInterface | null) => set({ notification }),
}));

export default useNotificationStore;
