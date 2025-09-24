import { useState, useEffect } from 'react'

const NotificationToast = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (notification) {
      setIsVisible(true)
      setIsExiting(false)
      
      // Автоматическое закрытие через 5 секунд
      const timer = setTimeout(() => {
        handleClose()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 300)
  }

  if (!notification || !isVisible) return null

  const getTypeStyles = () => {
    const baseStyles = 'shadow-lg border-l-4'
    switch (notification.type) {
      case 'danger':
        return `${baseStyles} bg-red-500 border-red-600 notification-pulse`
      case 'warning':
        return `${baseStyles} bg-yellow-500 border-yellow-600`
      case 'info':
        return `${baseStyles} bg-blue-500 border-blue-600`
      default:
        return `${baseStyles} bg-red-500 border-red-600 notification-pulse`
    }
  }

  const getTypeIcon = () => {
    switch (notification.type) {
      case 'danger':
        return '🚨'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return '🚨'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`transform transition-all duration-300 ${
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}>
        <div className={`${getTypeStyles()} text-white p-4 rounded-lg min-w-96 max-w-md`}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <span className="text-2xl">{getTypeIcon()}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">
                  {notification.title}
                </h3>
                <button
                  onClick={handleClose}
                  className="text-white hover:text-gray-200 text-xl font-bold transition-colors"
                  aria-label="Закрыть уведомление"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-sm opacity-90 mb-2">
                {notification.message}
              </p>
              
              {notification.details && (
                <div className="bg-black bg-opacity-20 rounded p-2 mt-2">
                  <p className="text-xs">
                    <strong>От:</strong> {notification.details.sender}
                  </p>
                  <p className="text-xs">
                    <strong>Тема:</strong> {notification.details.title}
                  </p>
                  <p className="text-xs">
                    <strong>Причина:</strong> {notification.details.spamReason}
                  </p>
                </div>
              )}
              
              <div className="text-xs opacity-75 mt-2">
                {new Date(notification.timestamp).toLocaleTimeString('ru-RU')}
              </div>
            </div>
          </div>
          
          {/* Прогресс-бар автозакрытия */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20 rounded-b-lg overflow-hidden">
            <div 
              className="h-full bg-white bg-opacity-30"
              style={{
                animation: isExiting ? 'none' : 'progress 5s linear forwards'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const NotificationContainer = ({ notifications, onRemoveNotification }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={() => onRemoveNotification(notification.id)}
        />
      ))}
    </div>
  )
}

export { NotificationToast, NotificationContainer }
