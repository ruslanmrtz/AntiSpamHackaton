import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Дашборд',
      icon: '📧',
      path: '/',
      description: 'Мониторинг спам-писем'
    },
    {
      id: 'create',
      label: 'Создать письмо',
      icon: '✉️',
      path: '/create',
      description: 'Добавить тестовое письмо'
    },
    {
      id: 'settings',
      label: 'Настройки',
      icon: '⚙️',
      path: '/settings',
      description: 'Конфигурация системы'
    },
    {
      id: 'analytics',
      label: 'Аналитика',
      icon: '📊',
      path: '/analytics',
      description: 'Статистика и отчеты'
    },
    {
      id: 'logs',
      label: 'Логи',
      icon: '📝',
      path: '/logs',
      description: 'История событий'
    }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen fixed left-0 top-0 z-10">
      {/* Заголовок */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">🛡️</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">PhishHook</h1>
            <p className="text-xs text-gray-500">Защита от спама</p>
          </div>
        </div>
      </div>

      {/* Навигационное меню */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-600">
                    {item.description}
                  </div>
                </div>
                {isActive(item.path) && (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Статус системы */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">Система активна</span>
          </div>
          <div className="text-xs text-green-600 mt-1">
            Защита работает в штатном режиме
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
