import { useState } from 'react'
import { API_URLS, debugLog } from '../config/env'

const CreateEmail = () => {
  const [formData, setFormData] = useState({
    title: '',
    sender: '',
    text: '',
    spamReason: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      debugLog('Создание письма:', formData)
      const response = await fetch(API_URLS.SPAM_EMAILS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        setMessage('Письмо успешно создано!')
        setMessageType('success')
        setFormData({
          title: '',
          sender: '',
          text: '',
          spamReason: ''
        })
      } else {
        const error = await response.json()
        setMessage(error.error || 'Ошибка при создании письма')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Ошибка соединения с сервером')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGenerateRandom = async () => {
    setIsSubmitting(true)
    setMessage('')

    try {
      debugLog('Генерация случайного письма')
      const response = await fetch(API_URLS.SPAM_GENERATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const result = await response.json()
        setMessage('Случайное письмо сгенерировано!')
        setMessageType('success')
      } else {
        const error = await response.json()
        setMessage(error.error || 'Ошибка при генерации письма')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Ошибка соединения с сервером')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const spamReasonTemplates = [
    "Мошенническая схема с лотереей",
    "Фишинг - попытка получить личные данные",
    "Незаконная продажа лекарств",
    "Финансовая пирамида",
    "Инвестиционное мошенничество",
    "Поддельный антивирус",
    "Схема быстрого обогащения",
    "Поддельный интернет-магазин",
    "Продажа сомнительной информации"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">✉️</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Создать тестовое письмо</h1>
                <p className="text-gray-600 mt-1">
                  Добавьте новое спам-письмо в базу данных для тестирования
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Сообщения */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            messageType === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              <span>{messageType === 'success' ? '✅' : '❌'}</span>
              <span>{message}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная форма */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Форма создания письма
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Тема письма */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Тема письма
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                      placeholder="Введите тему спам-письма..."
                    />
                  </div>

                  {/* Отправитель */}
                  <div>
                    <label htmlFor="sender" className="block text-sm font-medium text-gray-700 mb-2">
                      Email отправителя
                    </label>
                    <input
                      type="email"
                      id="sender"
                      name="sender"
                      value={formData.sender}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                      placeholder="spammer@example.com"
                    />
                  </div>

                  {/* Текст письма */}
                  <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                      Содержимое письма
                    </label>
                    <textarea
                      id="text"
                      name="text"
                      value={formData.text}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                      placeholder="Введите текст спам-письма..."
                    />
                  </div>

                  {/* Причина спама */}
                  <div>
                    <label htmlFor="spamReason" className="block text-sm font-medium text-gray-700 mb-2">
                      Причина определения как спам
                    </label>
                    <select
                      id="spamReason"
                      name="spamReason"
                      value={formData.spamReason}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Выберите причину...</option>
                      {spamReasonTemplates.map((reason, index) => (
                        <option key={index} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Или введите свою причину в текстовом поле ниже
                    </p>
                    <input
                      type="text"
                      name="spamReason"
                      value={formData.spamReason}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                      placeholder="Или введите свою причину..."
                    />
                  </div>

                  {/* Кнопки */}
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Создание...' : 'Создать письмо'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleGenerateRandom}
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Генерация...' : 'Сгенерировать случайное'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Боковая панель с примерами */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  💡 Примеры спам-писем
                </h3>
                
                <div className="space-y-4">
                  {/* Пример 1 */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-yellow-900 mb-2">
                      Лотерейное мошенничество
                    </h4>
                    <p className="text-xs text-yellow-800">
                      "Поздравляем! Вы выиграли миллион рублей! Для получения приза..."
                    </p>
                  </div>

                  {/* Пример 2 */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-red-900 mb-2">
                      Фишинг
                    </h4>
                    <p className="text-xs text-red-800">
                      "Ваш аккаунт будет заблокирован! Подтвердите данные по ссылке..."
                    </p>
                  </div>

                  {/* Пример 3 */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-purple-900 mb-2">
                      Незаконная продажа
                    </h4>
                    <p className="text-xs text-purple-800">
                      "Лекарства без рецепта со скидкой 90%! Анонимная доставка..."
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    🎯 Совет
                  </h4>
                  <p className="text-xs text-blue-800">
                    Создавайте разнообразные примеры для лучшего тестирования системы фильтрации спама.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEmail
