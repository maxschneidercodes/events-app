import { useContext, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';
import MainHeader from './main-header';
import NotificationContext from '../../context/context';
import Notification from "../../components/notification/notification"

function Layout(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {

  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notificatio;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}

export default Layout;
