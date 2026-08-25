import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'

// Definimos a rota do layout atrelada ao grupo '_app'
export const Route = createFileRoute('/_app')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  return (
    <div className="flex min-h-screen w-full text-white sm:h-screen sm:overflow-hidden">
      
      <Sidebar />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto px-4 py-4 pb-24 sm:px-6 sm:py-6 sm:pb-6 lg:px-12 flex flex-col">
        
        <Header title="Personal Finance" />

        <div className="flex-1">
          <Outlet />
        </div>

      </main>
    </div>
  )
}
