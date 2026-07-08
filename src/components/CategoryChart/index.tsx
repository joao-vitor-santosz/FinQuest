import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

export const CategoryChart = () => {
  const { incomeTotal, expenseTotal } = useContext(TransactionContext);

  const currentChartData = [
    { name: "Entradas", value: incomeTotal, color: "#34d399" }, // Cor verde do seu mockup
    { name: "Saídas", value: expenseTotal, color: "#f87171" }, // Cor vermelha para destacar despesas
  ];

  return (
    <div className="flex-1 p-6 max-h-112.5 w-full rounded-2xl bg-bg-card/40 border border-border-glass backdrop-blur-md flex flex-col justify-between">
      {/* Título do Card */}
      <div className="mb-4">
        <h3 className="text-3xl font-semibold text-white">Categorias</h3>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8">
        {currentChartData.every((entry) => entry.value === 0) ? (
          <div className="flex-1 flex items-center justify-center text-text-secondary text-lg font-medium">
           <p>Nenhum dado disponível para o gráfico.</p>
          </div>
        ) : (
          <>
            <div className="w-50 h-50 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60} // Faz o círculo ficar vazado no meio (estilo Donut)
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {currentChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-3">
              {currentChartData.map((entry, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-md text-text-primary font-medium">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
