import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Definição do schema com validação compatível para o formulário
export const addTransactionFormSchema = z.object({
  description: z.string().trim().nonempty("A descrição é obrigatória"),
  amount: z
    .string()
    .trim()
    .nonempty("O valor é obrigatório")
    .refine((val) => !Number.isNaN(Number(val.replace(",", "."))), {
      message: "Insira um número válido",
    }),
  type: z
    .string()
    .trim()
    .nonempty("Selecione o tipo da transação")
    .refine((value) => ["income", "expense"].includes(value), {
      message: "Selecione o tipo da transação",
    }),
});

export type TransactionFormData = z.infer<typeof addTransactionFormSchema>;

// 2. Hook Customizado exatamente igual ao modelo enviado
export const useTransactionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(addTransactionFormSchema),
    mode: "onBlur",
    defaultValues: {
      description: "",
      amount: "",
      type: "",
    },
    criteriaMode: "all",
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    watch,
    reset,
  };
};