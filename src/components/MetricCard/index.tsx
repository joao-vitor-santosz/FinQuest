import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  type: "income" | "expense" | "balance";
}

export const MetricCard = ({ title, value, icon: Icon, type }: MetricCardProps) => {
  // Define as cores e sombras dinamicamente com base no tipo do card
  const cardStyles = {
    income: {
      textColor: "text-income",
      borderColor: "border-income/20",
      shadowColor: "shadow-[0_0_15px_rgba(52,211,153,0.15)]", // Brilho verde sutil
      badgeBg: "bg-income/10 text-income",
    },
    expense: {
      textColor: "text-expense",
      borderColor: "border-expense/20",
      shadowColor: "shadow-[0_0_15px_rgba(239,68,68,0.15)]", // Brilho vermelho sutil
      badgeBg: "bg-expense/10 text-expense",
    },
    balance: {
      textColor: "text-white",
      borderColor: "border-border-glass",
      shadowColor: "shadow-[0_0_15px_rgba(59,130,246,0.15)]", // Brilho azul sutil
      badgeBg: "bg-border-glass text-blue-400",
    },
  };

  const currentStyle = cardStyles[type];

  return (
    <div className={`flex-1 min-w-62.5 p-6 rounded-2xl bg-bg-card/40 border ${currentStyle.borderColor} ${currentStyle.shadowColor} backdrop-blur-md flex flex-col gap-4 transition-all hover:scale-[1.01]`}>
      
      {/* Linha Superior: Título e Ícone de Status */}
      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-md font-medium tracking-wide">
          {title}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentStyle.badgeBg}`}>
          <Icon size={18} />
        </div>
      </div>

      {/* Linha Inferior: Valor Monetário */}
      <div className={`text-2xl lg:text-4xl font-bold tracking-tight ${currentStyle.textColor}`}>
        {value}
      </div>

    </div>
  );
};