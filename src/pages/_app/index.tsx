import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardHome } from '../../components/DashboardHome';
import { AddTransactionModal } from '../../components/AddTransactionModal';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/_app/')({
  component: DashboardComponent,
});

function DashboardComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex h-full w-full flex-col gap-4 sm:gap-6">
      {/* Botão flutuante ou posicionado no topo para abrir o modal temporariamente */}
      <div
        className="animate-page-content-enter flex justify-end"
        style={{ animationDelay: "80ms" }}
      >
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-income px-4 py-2.5 font-semibold text-bg-card transition-all duration-300 hover:-translate-y-1 hover:text-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(52,350,0,1)] sm:w-auto cursor-pointer"
        >
          <Plus size={18} /> Nova Transação
        </button>
      </div>

      {/* Seu Dashboard principal */}
      <DashboardHome />

      {/* O Modal injetado no final da estrutura */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
