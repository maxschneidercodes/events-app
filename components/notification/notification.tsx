import { useContext } from 'react';

import classes from './notificatio.module.css';
import NotificationContext from "../../context/context"

export default function Notification(props: { title: any; message: any; status: any; }) {
    const notificationCtx = useContext(NotificationContext);

    const { title, message, status } = props;

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    if (status === 'pending') {
        statusClasses = classes.pending;
    }

    const activeClasses = `${classes.notification} ${statusClasses}`;

    return (
        <div className={activeClasses} onClick={() => {
            // notificationCtx.close
        }}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

