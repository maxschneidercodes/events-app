import { useContext } from 'react';

import classes from './notificatio.module.css';
import NotificationContext from "../../context/context"
import { NotificationStauts } from '../../types/NotificationStatus';

export default function Notification(props: { title: any; message: any; status: any; }) {
    const notificationCtx = useContext(NotificationContext);

    const { title, message, status } = props;

    let statusClasses = "";

    if (status === NotificationStauts.SUCCESS) {
        statusClasses = classes.success;
    } else if (status === NotificationStauts.ERROR) {
        statusClasses = classes.error;
    } else if (status === NotificationStauts.PENDING) {
        statusClasses = classes.pending;
    } else if (status === NotificationStauts.NONE) {
        statusClasses = classes.none
    }
    const activeClasses = `${classes.notification} ${statusClasses}`;

    return (
        <div className={activeClasses} onClick={() => {
            notificationCtx.hideNotification()
        }}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

