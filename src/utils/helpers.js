import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = "UdaciCards:notifications";

export const generateUid = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export function getDailyRemindervalue() {
  return {
    today: "👋 Don't forget to log your data today!",
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Start a Quiz",
    body: "👋 don't forget to make one quiz",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tommorow = new Date();

            tommorow.setDate(tommorow.getDate() + 1);
            tommorow.setHours(20);
            tommorow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tommorow,
              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
