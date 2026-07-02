import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { MetricCard } from "../MetricCard/index";
import { TransactionList } from "../TransactionList/index";

export const DashboardHome = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Linha dos Cards de Métrica (Layout Responsivo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <MetricCard 
          title="Total de Entradas" 
          value="+$ 299,36" 
          icon={TrendingUp} 
          type="income" 
        />
        <MetricCard 
          title="Total de Saídas" 
          value="-R$ 653,77" 
          icon={TrendingDown} 
          type="expense" 
        />
        <MetricCard 
          title="Saldo Atual" 
          value="R$ 270,62" 
          icon={Clock} 
          type="balance" 
        />
      </div>

      {/* Gráfico + Transações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
        
        {/* COLUNA ESQUERDA: Espaço reservado para o Gráfico */}
        <div className="p-6 rounded-2xl bg-bg-card/40 border border-border-glass backdrop-blur-md flex flex-col justify-center items-center min-h-75">
          <span className="text-text-secondary text-sm">Espaço do Gráfico de Pizza</span>
        </div>

        {/* COLUNA DIREITA: Lista de Transações real */}
        <TransactionList />

      </div>
      
    </div>
  );
};