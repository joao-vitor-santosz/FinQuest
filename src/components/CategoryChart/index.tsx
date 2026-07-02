import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { chartData } from "../../mocks/chartData";


export const CategoryChart = () => {
  return (
    <div className="flex-1 p-6 max-h-112.5 w-full rounded-2xl bg-bg-card/40 border border-border-glass backdrop-blur-md flex flex-col justify-between">
      
      {/* Título do Card */}
      <div className="mb-4">
        <h3 className="text-3xl font-semibold text-white">Categorias</h3>
      </div>

      {/* Área do Gráfico e Legenda */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8">
        
        {/* O Gráfico em si (Donut) */}
        <div className="w-50 h-50 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60} // Faz o círculo ficar vazado no meio (estilo Donut)
                outerRadius={90}
                paddingAngle={0}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda Customizada ao Lado */}
        <div className="flex flex-col gap-3">
          {chartData.map((entry, index) => (
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

      </div>

    </div>
  );
};