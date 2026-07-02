import { Car, Utensils } from "lucide-react";

// Simulando dados estáticos que virão de uma API ou estado no futuro
export const transactions = [
    {
      id: 1,
      title: "Alimentação",
      date: "Jan 15th",
      amount: "+ R$ 264,53",
      type: "income",
      icon: Utensils,
      iconBg: "bg-income/10 text-income",
    },
    {
      id: 2,
      title: "Transporte",
      date: "Jan 22nd",
      amount: "- R$ 118,00",
      type: "expense",
      icon: Car,
      iconBg: "bg-expense/10 text-expense",
    },
    {
      id: 3,
      title: "Transporte",
      date: "Jan 18th",
      amount: "- R$ 7,83",
      type: "expense",
      icon: Car,
      iconBg: "bg-expense/10 text-expense",
    },
    {
      id: 4,
      title: "Alimentação",
      date: "Jan 20th",
      amount: "- R$ 10,00",
      type: "expense",
      icon: Utensils,
      iconBg: "bg-orange-500/10 text-orange-400", // Exemplo de outra cor de categoria
    },
    {
      id: 5,
      title: "Alimentação",
      date: "Jan 20th",
      amount: "- R$ 10,00",
      type: "expense",
      icon: Utensils,
      iconBg: "bg-orange-500/10 text-orange-400", // Exemplo de outra cor de categoria
    },
    {
      id: 6,
      title: "Alimentação",
      date: "Jan 20th",
      amount: "- R$ 10,00",
      type: "expense",
      icon: Utensils,
      iconBg: "bg-orange-500/10 text-orange-400", // Exemplo de outra cor de categoria
    },
  ];