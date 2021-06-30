import { createContext, useState, useEffect } from 'react'

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) { },
  hideNotification: function () { }
})

export const NotificationContextProvider = (props) => {

  const [activeNotification, setActiveNotification] = useState()

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData)
  }

  const hideNotificationHandler = () => {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  }

  useEffect(() => {
    let timer = null
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status == 'error')) {
      timer = setTimeout(() => {
        setActiveNotification(null)
      }, 3000);
    }
    return () => {
      clearTimeout(timer)
    }
  }, [activeNotification])

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext