import { useState } from 'react'

const SpamCard = ({ email, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString('ru-RU'),
      time: date.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  }

  const { date, time } = formatTimestamp(email.timestamp)

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const getSpamReasonColor = (reason) => {
    if (reason.includes('фишинг') || reason.includes('Фишинг')) {
      return 'bg-red-100 text-red-800'
    }
    if (reason.includes('выигрыш') || reason.includes('деньги')) {
      return 'bg-yellow-100 text-yellow-800'
    }
    if (reason.includes('лекарств')) {
      return 'bg-purple-100 text-purple-800'
    }
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300 ${
        isHovered ? 'transform scale-105' : ''
      }`}
      onClick={() => onClick(email)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Заголовок карточки */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
            {truncateText(email.title, 50)}
          </h3>
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <span>📅 {date}</span>
            <span>🕐 {time}</span>
          </div>
        </div>
        <div className="ml-2">
          <span className="text-2xl">🚨</span>
        </div>
      </div>

      {/* Отправитель */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">От:</span>
          <span className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
            {email.sender}
          </span>
        </div>
      </div>

      {/* Превью текста */}
      <div className="mb-4">
        <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
          {truncateText(email.text, 120)}
        </p>
      </div>

      {/* Причина спама */}
      <div className="mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSpamReasonColor(email.spamReason)}`}>
          ⚠️ {truncateText(email.spamReason, 30)}
        </span>
      </div>

      {/* Кнопка действия */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          ID: {email.id}
        </div>
        <button className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors">
          📄 Подробнее
        </button>
      </div>
    </div>
  )
}

export default SpamCard
