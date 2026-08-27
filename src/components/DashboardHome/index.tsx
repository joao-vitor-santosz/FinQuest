import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { MetricCard } from "../MetricCard/index";
import { TransactionList } from "../TransactionList/index";
import { CategoryChart } from "../CategoryChart";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import formatCurrency from "../../utils/format-currency";

export const DashboardHome = () => {
  const { incomeTotal, expenseTotal, balanceTotal } =
    useContext(TransactionContext);

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      
      {/* Linha dos Cards de Métrica (Layout Responsivo) */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        <MetricCard
          className="animate-page-content-enter"
          animationDelay="200ms"
          title="Total de Entradas"
          value={formatCurrency(incomeTotal)}
          icon={TrendingUp}
          type="income"
        />
        <MetricCard
          className="animate-page-content-enter"
          animationDelay="260ms"
          title="Total de Saídas"
          value={formatCurrency(expenseTotal)}
          icon={TrendingDown}
          type="expense"
        />
        <MetricCard
          className="animate-page-content-enter"
          animationDelay="320ms"
          title="Saldo Atual"
          value={formatCurrency(balanceTotal)}
          icon={Clock}
          type="balance"
        />
      </div>

      {/* Gráfico + Transações */}
      <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-2">
        
        {/* Gráfico */}
        <CategoryChart
          className="animate-page-content-enter"
          animationDelay="380ms"
        />

        {/* COLUNA DIREITA: Lista de Transações real */}
        <TransactionList
          className="animate-page-content-enter"
          animationDelay="440ms"
        />
      </div>
    </div>
  );
};
