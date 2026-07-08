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
    <div className="w-full flex flex-col gap-6">
      
      {/* Linha dos Cards de Métrica (Layout Responsivo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <MetricCard
          title="Total de Entradas"
          value={formatCurrency(incomeTotal)}
          icon={TrendingUp}
          type="income"
        />
        <MetricCard
          title="Total de Saídas"
          value={formatCurrency(expenseTotal)}
          icon={TrendingDown}
          type="expense"
        />
        <MetricCard
          title="Saldo Atual"
          value={formatCurrency(balanceTotal)}
          icon={Clock}
          type="balance"
        />
      </div>

      {/* Gráfico + Transações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
        
        {/* Gráfico */}
        <CategoryChart />

        {/* COLUNA DIREITA: Lista de Transações real */}
        <TransactionList />
      </div>
    </div>
  );
};
