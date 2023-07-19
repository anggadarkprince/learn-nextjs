import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {Notification} from '@/types/notification';

const NotificationContext = createContext<{
  notification: Notification | null,
  showNotification: (notification: Notification) => void,
  hideNotification: () => void,
}>({
  notification: null,
  showNotification: function(notification: Notification) {},
  hideNotification: function () {}
});

export function NotificationContextProvider(props: PropsWithChildren) {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (activeNotification && ['success', 'error'].includes(activeNotification.status || '')) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: Notification) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
