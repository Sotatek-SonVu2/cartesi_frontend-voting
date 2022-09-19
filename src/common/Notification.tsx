import { Store } from "react-notifications-component";

const title: any = {
    success: 'Wonderful!',
    danger: 'Error!',
    info: 'Info',
    warning: 'Warning!',
    default: ''
}

export const createNotifications = (type: string, message: string) => {
    const notification: any = {
        title: title[type],
        message: message,
        type: type, // success || danger || info || default || warning
        insert: "top",
        container: "top-right",
        dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
        },
    };

    return Store.addNotification({
        ...notification,
    })
}