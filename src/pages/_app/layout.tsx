import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'

// Definimos a rota do layout atrelada ao grupo '_app'
export const Route = createFileRoute('/_app')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  return (
    <div className="flex h-screen w-screen bg-[#121318] text-white overflow-hidden">
      
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto px-8 py-6 lg:px-12 flex flex-col">
        
        <Header title="Personal Finance" />

        <div className="flex-1">
          <Outlet />
        </div>

      </main>
    </div>
  )
}