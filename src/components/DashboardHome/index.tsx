import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { MetricCard } from "../MetricCard/index";

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

      {/* Próximo passo: A linha de baixo (Gráfico + Lista de Transações) virá aqui */}
      
    </div>
  );
};