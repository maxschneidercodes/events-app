import React from 'react';
import { useState } from 'react';

enum NotificationStauts {
    SUCCESS = 'success',
    ERROR = 'error',
    PENDING = 'pending',
    NONE = ""
}

type Notification = {
    title: string,
    message: string,
    status: NotificationStauts,
}

interface NotificationContextProps {
    showNotification(notification: Notification): void,
    notificatio: Notification,
}

const GlobalContext = React.createContext<NotificationContextProps>({
    showNotification(notification: Notification) { },
    notificatio: { title: "", message: "", status: NotificationStauts.NONE },
});

export const GlobalContextProvider = (props: any) => {

    const [showNotification, setShowNotification] = useState<Notification>({
        title: "", message: "", status: NotificationStauts.NONE
    })

    return <GlobalContext.Provider value={{
        showNotification: setShowNotification,
        notificatio: showNotification
    }}>
        {props.children}
    </GlobalContext.Provider>;
};

export default GlobalContext;