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
    <div className="relative w-full h-full flex flex-col gap-4">
      {/* Botão flutuante ou posicionado no topo para abrir o modal temporariamente */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-income text-bg-card font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_rgba(52,350,0,1)] hover:-translate-y-1 hover:text-white cursor-pointer"
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