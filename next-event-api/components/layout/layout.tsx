import {Fragment, PropsWithChildren, useContext} from 'react';

import MainHeader from './main-header';
import Notification from "@/components/ui/notification";
import NotificationContext from "@/store/notification-context";

function Layout(props: PropsWithChildren) {
  const notificationContext = useContext(NotificationContext);
  const activeNotification = notificationContext.notification;

  return (
    <Fragment>
      <MainHeader />
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status} />
      )}
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
