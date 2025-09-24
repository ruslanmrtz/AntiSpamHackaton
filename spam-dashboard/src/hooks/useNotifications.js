import { useState, useCallback } from 'react'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      timestamp: new Date().toISOString(),
      ...notification
    }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Ограничиваем количество одновременных уведомлений
    setNotifications(prev => prev.slice(-5))
    
    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  // Специализированные методы для разных типов уведомлений
  const notifyNewSpamEmail = useCallback((email) => {
    return addNotification({
      type: 'danger',
      title: 'Новое спам-письмо обнаружено!',
      message: `Получено подозрительное письмо от ${email.sender}`,
      details: {
        sender: email.sender,
        title: email.title.length > 50 ? email.title.substring(0, 50) + '...' : email.title,
        spamReason: email.spamReason
      }
    })
  }, [addNotification])

  const notifyMultipleSpamEmails = useCallback((count) => {
    return addNotification({
      type: 'warning',
      title: 'Множественные угрозы!',
      message: `Обнаружено ${count} новых спам-писем за последнее обновление`,
      details: null
    })
  }, [addNotification])

  const notifySystemAlert = useCallback((message) => {
    return addNotification({
      type: 'info',
      title: 'Системное уведомление',
      message,
      details: null
    })
  }, [addNotification])

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    notifyNewSpamEmail,
    notifyMultipleSpamEmails,
    notifySystemAlert
  }
}
