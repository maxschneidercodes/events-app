import React, { useEffect } from 'react';
import { useState } from 'react';

enum NotificationStauts {
    SUCCESS = 'success',
    ERROR = 'error',
    PENDING = 'pending',
    NONE = "none"
}

type Notification = {
    title: string,
    message: string,
    status: NotificationStauts,
}

interface NotificationContextProps {
    showNotification(notification: Notification): void,
    notification: Notification,
    hideNotification(): void
}

const GlobalContext = React.createContext<NotificationContextProps>({
    showNotification(notification: Notification) { },
    notification: { title: "", message: "", status: NotificationStauts.NONE },
    hideNotification() { }
});

export const GlobalContextProvider = (props: any) => {

    const hideNotificationState: Notification = { title: "", message: "", status: NotificationStauts.NONE }

    const [showNotification, setShowNotification] = useState<Notification>(hideNotificationState)

    function hideNotification() {
        setShowNotification(hideNotificationState)
    }

    useEffect(() => {
        if (showNotification && showNotification.status === NotificationStauts.SUCCESS ||
            showNotification.status === NotificationStauts.ERROR) {
            const timer = setTimeout(() => {
                hideNotification()
            }, 3000)

            return () => { clearTimeout(timer) }
        }
    }, [showNotification])

    return <GlobalContext.Provider value={{
        showNotification: setShowNotification,
        notification: showNotification,
        hideNotification: hideNotification,
    }}>
        {props.children}
    </GlobalContext.Provider>;
};

export default GlobalContext;