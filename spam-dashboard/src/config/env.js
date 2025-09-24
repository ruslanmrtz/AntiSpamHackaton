/**
 * Конфигурация приложения на основе переменных окружения
 * Все переменные с префиксом VITE_ доступны в браузере
 */

// API конфигурация
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  ENDPOINTS: {
    SPAM_EMAILS: import.meta.env.VITE_API_SPAM_EMAILS_ENDPOINT || '/api/spam-emails',
    SPAM_GENERATE: import.meta.env.VITE_API_SPAM_GENERATE_ENDPOINT || '/api/spam-emails/generate'
  }
}

// Приложение конфигурация
export const APP_CONFIG = {
  TITLE: import.meta.env.VITE_APP_TITLE || 'Spam Dashboard',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true',
  DEBUG_LOGS: import.meta.env.VITE_DEBUG_LOGS === 'true'
}

// Формирование полных URL для API эндпоинтов
export const API_URLS = {
  SPAM_EMAILS: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SPAM_EMAILS}`,
  SPAM_GENERATE: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SPAM_GENERATE}`
}

// Функция для логирования в dev режиме
export const debugLog = (...args) => {
  if (APP_CONFIG.DEV_MODE && APP_CONFIG.DEBUG_LOGS) {
    console.log('[DEBUG]', ...args)
  }
}

// Валидация конфигурации
export const validateConfig = () => {
  const errors = []
  
  if (!API_CONFIG.BASE_URL) {
    errors.push('VITE_API_BASE_URL не определен')
  }
  
  if (!API_CONFIG.ENDPOINTS.SPAM_EMAILS) {
    errors.push('VITE_API_SPAM_EMAILS_ENDPOINT не определен')
  }
  
  if (!API_CONFIG.ENDPOINTS.SPAM_GENERATE) {
    errors.push('VITE_API_SPAM_GENERATE_ENDPOINT не определен')
  }
  
  if (errors.length > 0) {
    console.error('Ошибки конфигурации:', errors)
    throw new Error(`Некорректная конфигурация: ${errors.join(', ')}`)
  }
  
  debugLog('Конфигурация валидна:', { API_CONFIG, APP_CONFIG })
  return true
}

// Экспорт всей конфигурации
export default {
  API_CONFIG,
  APP_CONFIG,
  API_URLS,
  debugLog,
  validateConfig
}
