import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Definição do schema com a adição do campo de data
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
    .union([z.literal(""), z.literal("income"), z.literal("expense")])
    .refine((value) => value !== "", {
      message: "Selecione o tipo da transação",
    })
    .transform((value) => value),
  date: z.string().trim().nonempty("A data é obrigatória"),
  paymentMethod: z
    .union([
      z.literal(""),
      z.literal("pix"),
      z.literal("dinheiro"),
      z.literal("debito"),
      z.literal("credito"),
    ])
    .refine((value) => value !== "", {
      message: "O método de pagamento é obrigatório",
    })
    .transform((value) => value),
});

export type TransactionFormInput = z.input<typeof addTransactionFormSchema>;

export type TransactionFormData = z.output<typeof addTransactionFormSchema>;

// 2. Hook Customizado com o novo valor padrão
export const useTransactionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<TransactionFormInput, undefined, TransactionFormData>({
    resolver: zodResolver(addTransactionFormSchema),
    mode: "onBlur",
    defaultValues: {
      description: "",
      amount: "",
      type: "",
      date: "",
      paymentMethod: "",
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
