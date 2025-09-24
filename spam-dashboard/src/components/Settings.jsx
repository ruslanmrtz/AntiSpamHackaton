import { useState } from 'react'

const Settings = () => {
  const [settings, setSettings] = useState({
    autoUpdate: true,
    updateInterval: 5,
    showNotifications: true,
    emailThreshold: 100,
    darkMode: false,
    language: 'ru',
    enableSounds: false,
    maxEmailsDisplay: 50
  })

  const [activeTab, setActiveTab] = useState('general')

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const tabs = [
    { id: 'general', label: 'Общие', icon: '⚙️' },
    { id: 'notifications', label: 'Уведомления', icon: '🔔' },
    { id: 'security', label: 'Безопасность', icon: '🔒' },
    { id: 'advanced', label: 'Расширенные', icon: '🔧' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">⚙️</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
                <p className="text-gray-600 mt-1">
                  Конфигурация системы защиты от спама
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковое меню вкладок */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Общие настройки */}
              {activeTab === 'general' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Общие настройки</h2>
                  
                  <div className="space-y-6">
                    {/* Автообновление */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Автообновление данных</h3>
                        <p className="text-sm text-gray-500">Автоматически обновлять список спам-писем</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('autoUpdate', !settings.autoUpdate)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.autoUpdate ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.autoUpdate ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    {/* Интервал обновления */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Интервал обновления (секунды)
                      </label>
                      <select
                        value={settings.updateInterval}
                        onChange={(e) => handleSettingChange('updateInterval', parseInt(e.target.value))}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                      >
                        <option value={1}>1 секунда</option>
                        <option value={5}>5 секунд</option>
                        <option value={10}>10 секунд</option>
                        <option value={30}>30 секунд</option>
                        <option value={60}>1 минута</option>
                      </select>
                    </div>

                    {/* Язык */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Язык интерфейса
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>

                    {/* Темная тема */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Темная тема</h3>
                        <p className="text-sm text-gray-500">Использовать темное оформление интерфейса</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.darkMode ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Уведомления */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Настройки уведомлений</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Показывать уведомления</h3>
                        <p className="text-sm text-gray-500">Отображать всплывающие уведомления о новых угрозах</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('showNotifications', !settings.showNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.showNotifications ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.showNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Звуковые уведомления</h3>
                        <p className="text-sm text-gray-500">Воспроизводить звук при обнаружении спама</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('enableSounds', !settings.enableSounds)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.enableSounds ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.enableSounds ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Порог для уведомлений (писем в час)
                      </label>
                      <input
                        type="number"
                        value={settings.emailThreshold}
                        onChange={(e) => handleSettingChange('emailThreshold', parseInt(e.target.value))}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        min="1"
                        max="1000"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Уведомлять при превышении указанного количества спам-писем в час
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Безопасность */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Настройки безопасности</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-600">⚠️</span>
                        <h3 className="text-sm font-medium text-yellow-800">Внимание</h3>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        Изменение настроек безопасности может повлиять на эффективность защиты от спама.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Уровень фильтрации</h3>
                      <div className="space-y-2">
                        {['Низкий', 'Средний', 'Высокий', 'Максимальный'].map((level, index) => (
                          <label key={level} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="filterLevel"
                              className="h-4 w-4 text-red-600 focus:ring-red-500"
                              defaultChecked={index === 2}
                            />
                            <span className="text-sm text-gray-700">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Белый список доменов</h3>
                      <textarea
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        rows={4}
                        placeholder="example.com&#10;trusted-sender.ru&#10;company.org"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Добавьте доверенные домены (по одному на строку)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Расширенные настройки */}
              {activeTab === 'advanced' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Расширенные настройки</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Максимальное количество писем для отображения
                      </label>
                      <input
                        type="number"
                        value={settings.maxEmailsDisplay}
                        onChange={(e) => handleSettingChange('maxEmailsDisplay', parseInt(e.target.value))}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        min="10"
                        max="200"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-blue-900 mb-2">Экспорт настроек</h3>
                      <p className="text-sm text-blue-700 mb-3">
                        Сохраните текущие настройки в файл для резервного копирования
                      </p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                        Экспортировать настройки
                      </button>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-red-900 mb-2">Сброс настроек</h3>
                      <p className="text-sm text-red-700 mb-3">
                        Вернуть все настройки к значениям по умолчанию
                      </p>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700">
                        Сбросить к заводским настройкам
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Кнопки сохранения */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Отменить
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
