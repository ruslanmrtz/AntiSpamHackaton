import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SpamDashboard from './components/SpamDashboard'
import CreateEmail from './components/CreateEmail'
import Settings from './components/Settings'
import Analytics from './components/Analytics'
import Logs from './components/Logs'
import { validateConfig, debugLog, APP_CONFIG } from './config/env'

function App() {
  // Валидация конфигурации при запуске приложения
  try {
    validateConfig()
    debugLog('Приложение запущено:', {
      title: APP_CONFIG.TITLE,
      version: APP_CONFIG.VERSION,
      devMode: APP_CONFIG.DEV_MODE
    })
  } catch (error) {
    console.error('Ошибка инициализации приложения:', error)
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SpamDashboard />} />
          <Route path="/create" element={<CreateEmail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App