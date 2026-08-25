export const sortItems = [
  { label: "Período", value: "time" },
  { label: "Tipo de transação", value: "transactions" },
  { label: "Método de pagamento", value: "payment-method" },
  { label: "Ordenação", value: "sort" },
];

export const periodOptions = [
  { label: "Hoje", value: "today" },
  { label: "Últimos 7 dias", value: "7d" },
  { label: "Últimos 15 dias", value: "15d" },
  { label: "Últimos 30 dias", value: "30d" },
  { label: "Últimos 6 meses", value: "6m" },
  { label: "Último ano", value: "last-year" },
];

export const transactionOptions = [
  { label: "Apenas entradas", value: "income" },
  { label: "Apenas saídas", value: "expense" },
  { label: "Todas", value: "all" },
];

export const paymentMethodOptions = [
  { label: "Pix", value: "pix" },
  { label: "Dinheiro", value: "dinheiro" },
  { label: "Débito", value: "debito" },
  { label: "Crédito", value: "credito" },
  { label: "Todos", value: "all" },
] as const;

export const alphabeticalSortOptions = [
  { label: "Alfabética (A-Z)", value: "az" },
  { label: "Alfabética (Z-A)", value: "za" },
] as const;
