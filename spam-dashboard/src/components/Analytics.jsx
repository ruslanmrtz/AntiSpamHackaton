const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">📊</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Аналитика</h1>
                <p className="text-gray-600 mt-1">
                  Статистика и отчеты по спам-письмам
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <span className="text-8xl mb-8 block">📈</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Страница в разработке
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Здесь будут отображаться графики, статистика и подробные отчеты о работе системы защиты от спама.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Analytics
