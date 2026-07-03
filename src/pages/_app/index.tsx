import { createFileRoute } from '@tanstack/react-router'
import { DashboardHome } from '../../components/DashboardHome' // Note que subiu mais um nível (../../) para sair da pasta _app e da pasta pages

// Em vez de ('/'), usamos ('/_app/') porque ele está dentro da pasta com sublinhado
export const Route = createFileRoute('/_app/')({
  component: DashboardHome,
})