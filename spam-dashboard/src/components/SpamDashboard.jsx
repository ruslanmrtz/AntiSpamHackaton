import { useState, useEffect, useRef } from 'react'
import SpamCard from './SpamCard'
import SpamModal from './SpamModal'
import { NotificationContainer } from './NotificationToast'
import { useNotifications } from '../hooks/useNotifications'
import { API_URLS, debugLog } from '../config/env'

const SpamDashboard = () => {
  const [spamEmails, setSpamEmails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  
  // Хук для уведомлений
  const {
    notifications,
    removeNotification,
    notifyNewSpamEmail,
    notifyMultipleSpamEmails,
    notifySystemAlert
  } = useNotifications()
  
  // Ссылка для отслеживания предыдущих писем
  const previousEmailsRef = useRef([])
  const isFirstLoadRef = useRef(true)

  // Функция для обнаружения новых писем
  const detectNewEmails = (newEmails, previousEmails) => {
    // При первой загрузке не показываем уведомления
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false
      return []
    }

    // Если предыдущий список пустой, не показываем уведомления
    if (previousEmails.length === 0) {
      return []
    }

    const previousIds = new Set(previousEmails.map(email => email.id))
    const newFound = newEmails.filter(email => !previousIds.has(email.id))
    
    return newFound
  }

  // Функция для воспроизведения звука уведомления
  const playNotificationSound = () => {
    // Создаем простой звуковой сигнал
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  // Функция для получения данных с эндпоинта
  const fetchSpamEmails = async () => {
    setIsLoading(true)
    debugLog('Загрузка писем с:', API_URLS.SPAM_EMAILS)
    try {
      const response = await fetch(API_URLS.SPAM_EMAILS);
      
      if (response.ok) {
        const data = await response.json();
        
        // Обнаруживаем новые письма (сравниваем с текущим состоянием)
        const newEmails = detectNewEmails(data, previousEmailsRef.current)
        
        // Обновляем ссылку на предыдущие письма ПЕРЕД обновлением состояния
        previousEmailsRef.current = data
        
        data.reverse();
        setSpamEmails(data);
        setLastUpdated(new Date());
        
        // Показываем уведомления для новых писем ПОСЛЕ обновления состояния
        if (newEmails.length > 0) {
          if (newEmails.length === 1) {
            notifyNewSpamEmail(newEmails[0])
          } else {
            notifyMultipleSpamEmails(newEmails.length)
          }
          
          // Воспроизводим звук
          try {
            playNotificationSound()
          } catch (soundError) {
            // Звуковое уведомление недоступно - это нормально
          }
        }
      } else {
        console.error('Ошибка при получении данных:', response.statusText);
        notifySystemAlert('Ошибка подключения к серверу')
        setSpamEmails([]);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      notifySystemAlert('Потеряно соединение с сервером')
      setSpamEmails([]);
    } finally {
      setIsLoading(false)
    }
  }

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchSpamEmails()
  }, [])

  // Автообновление каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSpamEmails()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCardClick = (email) => {
    setSelectedEmail(email)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEmail(null)
  }

  return (
    <div className="min-h-screen">
      {/* Заголовок */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  📧 Система безопасности почтовых писем
                </h1>
                <p className="text-gray-600 mt-1">
                  Мониторинг и анализ обнаруженных спам-писем
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  {isLoading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  )}
                  <span className="text-sm text-gray-500">
                    Автообновление: 5 сек
                  </span>
                </div>
                {lastUpdated && (
                  <p className="text-xs text-gray-400 mt-1">
                    Последнее обновление: {lastUpdated.toLocaleTimeString('ru-RU')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-2xl">🚫</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Всего спам-писем</p>
                <p className="text-2xl font-bold text-gray-900">{spamEmails.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">За последний час</p>
                <p className="text-2xl font-bold text-gray-900">
                  {spamEmails.filter(email => 
                    new Date(email.timestamp) > new Date(Date.now() - 3600000)
                  ).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Статус системы</p>
                <p className="text-2xl font-bold text-green-600">Активна</p>
              </div>
            </div>
          </div>
        </div>

        {/* Карточки писем */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Обнаруженные спам-письма
          </h2>
          
          {spamEmails.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-gray-500 text-lg">Спам-письма не обнаружены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spamEmails.map((email) => (
                <SpamCard
                  key={email.id}
                  email={email}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно */}
      <SpamModal
        email={selectedEmail}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Контейнер уведомлений */}
      <NotificationContainer
        notifications={notifications}
        onRemoveNotification={removeNotification}
      />
    </div>
  )
}

export default SpamDashboard
