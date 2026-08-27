import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  type: "income" | "expense" | "balance";
  className?: string;
  animationDelay?: string;
}

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  type,
  className = "",
  animationDelay,
}: MetricCardProps) => {
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
    <div
      className={`flex min-w-0 flex-col gap-4 rounded-2xl border bg-bg-card/40 p-4 backdrop-blur-md transition-all hover:scale-[1.01] sm:p-6 ${currentStyle.borderColor} ${currentStyle.shadowColor} ${className}`}
      style={{ animationDelay }}
    >
      
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
      <div className={`wrap-break-word text-2xl font-bold tracking-tight lg:text-4xl ${currentStyle.textColor}`}>
        {value}
      </div>

    </div>
  );
};
