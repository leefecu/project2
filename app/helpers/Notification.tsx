import firebase from 'react-native-firebase';

import { EXPIRY_NOTIFICATION } from '../constants/Messages';
import { NOTIFICATION_CHANNEL_ID } from '../constants/Shared';

const notifications = firebase.notifications();

export const createNotificationChannel = () => {
  const channel = new firebase.notifications.Android.Channel(
    NOTIFICATION_CHANNEL_ID,
    'Expiry Notification Channel',
    firebase.notifications.Android.Importance.High,
  ).setDescription('Used for getting expiry notification');
  notifications.android.createChannel(channel);
};

const buildNotification = (id: string, body: string) => {
  const notification = new firebase.notifications.Notification()
    .setNotificationId(id)
    .setTitle(EXPIRY_NOTIFICATION.TITLE)
    .setBody(body)
    .android.setPriority(firebase.notifications.Android.Priority.High)
    .android.setChannelId(NOTIFICATION_CHANNEL_ID)
    .android.setAutoCancel(true)
    .ios.setBadge(Number(id));
  return notification;
};

const TWO_MINUTES = 2 * 60 * 1000; // two minutes in micro second

export const clearAllExpiryNotification = () => {
  notifications.cancelAllNotifications();
};

export const createExpiryNotification = (endTime: number) => {
  clearAllExpiryNotification();

  const expiryDate = new Date(endTime);

  notifications.scheduleNotification(
    buildNotification(
      EXPIRY_NOTIFICATION.WARNING_EXPIRY_MESSAGE_ID,
      EXPIRY_NOTIFICATION.WARNING_EXPIRY_MESSAGE,
    ),
    {
      exact: true,
      fireDate: expiryDate.getTime() - TWO_MINUTES,
    },
  );

  firebase
    .notifications()
    .scheduleNotification(
      buildNotification(EXPIRY_NOTIFICATION.EXPIRY_MESSAGE_ID, EXPIRY_NOTIFICATION.EXPIRY_MESSAGE),
      {
        exact: true,
        fireDate: expiryDate.getTime(),
      },
    );
};

export const clearBadgeCount = async () => {
  notifications.setBadge(0);
};
