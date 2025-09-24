import { useEffect } from 'react'

const SpamModal = ({ email, isOpen, onClose }) => {
  // Закрытие модала по ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !email) return null

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getSpamReasonColor = (reason) => {
    if (reason.includes('фишинг') || reason.includes('Фишинг')) {
      return 'bg-red-100 text-red-800 border-red-200'
    }
    if (reason.includes('выигрыш') || reason.includes('деньги')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    if (reason.includes('лекарств')) {
      return 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Заголовок модала */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🚨</span>
              <div>
                <h2 className="text-xl font-bold">Детали спам-письма</h2>
                <p className="text-red-100 text-sm">ID: {email.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 text-2xl font-bold transition-colors"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Содержимое модала */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Дата и время */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl">📅</span>
                <h3 className="font-semibold text-gray-900">Дата получения</h3>
              </div>
              <p className="text-gray-700">{formatTimestamp(email.timestamp)}</p>
            </div>

            {/* Отправитель */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl">📧</span>
                <h3 className="font-semibold text-gray-900">Отправитель</h3>
              </div>
              <p className="text-gray-700 font-mono bg-white px-3 py-2 rounded border">
                {email.sender}
              </p>
            </div>
          </div>

          {/* Тема письма */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl">📝</span>
              <h3 className="font-semibold text-gray-900">Тема письма</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 text-lg leading-relaxed">{email.title}</p>
            </div>
          </div>

          {/* Содержимое письма */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl">📄</span>
              <h3 className="font-semibold text-gray-900">Текст письма</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {email.text}
              </div>
            </div>
          </div>

          {/* Причина определения как спам */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl">🛡️</span>
              <h3 className="font-semibold text-gray-900">Анализ угрозы</h3>
            </div>
            <div className={`rounded-lg p-4 border-2 ${getSpamReasonColor(email.spamReason)}`}>
              <div className="flex items-start space-x-3">
                <span className="text-2xl flex-shrink-0">⚠️</span>
                <div>
                  <h4 className="font-semibold mb-2">Причина блокировки:</h4>
                  <p className="leading-relaxed">{email.spamReason}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <span className="text-xl flex-shrink-0">💡</span>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Рекомендации по безопасности:</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Не отвечайте на подозрительные письма</li>
                  <li>• Не переходите по ссылкам из неизвестных источников</li>
                  <li>• Не предоставляйте личную информацию по запросу в письме</li>
                  <li>• При сомнениях свяжитесь с отправителем по официальным каналам</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя панель */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Письмо автоматически помещено в карантин
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpamModal
