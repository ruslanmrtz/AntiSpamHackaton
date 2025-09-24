import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Боковая навигация */}
      <Sidebar />
      
      {/* Основной контент */}
      <div className="flex-1 ml-64 overflow-hidden">
        <main className="h-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
