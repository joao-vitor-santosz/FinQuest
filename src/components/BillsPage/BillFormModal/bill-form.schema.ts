import { z } from "zod";
import type { Bill, BillInput } from "../../../interfaces/bills";

const amountSchema = z
  .string()
  .trim()
  .min(1, "O valor é obrigatório")
  .refine((value) => Number(value.replace(",", ".")) > 0, {
    message: "Insira um valor maior que zero",
  });

export const billFormSchema = z
  .object({
    description: z.string().trim().min(1, "A descrição é obrigatória"),
    category: z.string().trim().min(1, "A categoria é obrigatória"),
    amount: amountSchema,
    type: z.enum(["expense", "income"]),
    dueDate: z.string().date("Informe uma data válida"),
    recurrence: z.enum(["one-time", "monthly", "annual"]),
    hasInstallments: z.boolean(),
    installmentCurrent: z.string(),
    installmentTotal: z.string(),
    installmentAmount: z.string(),
  })
  .superRefine((data, context) => {
    if (!data.hasInstallments) {
      return;
    }

    if (data.recurrence !== "one-time") {
      context.addIssue({
        code: "custom",
        path: ["recurrence"],
        message: "Contas parceladas devem ter recorrência única",
      });
    }

    const current = Number(data.installmentCurrent);
    const total = Number(data.installmentTotal);

    if (!Number.isInteger(current) || current < 1) {
      context.addIssue({
        code: "custom",
        path: ["installmentCurrent"],
        message: "Informe a parcela atual",
      });
    }

    if (!Number.isInteger(total) || total < 2) {
      context.addIssue({
        code: "custom",
        path: ["installmentTotal"],
        message: "Informe ao menos 2 parcelas",
      });
    }

    if (Number.isInteger(current) && Number.isInteger(total) && current > total) {
      context.addIssue({
        code: "custom",
        path: ["installmentCurrent"],
        message: "A parcela atual não pode superar o total",
      });
    }

    const installmentAmount = Number(data.installmentAmount.replace(",", "."));
    if (!Number.isFinite(installmentAmount) || installmentAmount <= 0) {
      context.addIssue({
        code: "custom",
        path: ["installmentAmount"],
        message: "Informe o valor da parcela",
      });
    }
  });

export type BillFormData = z.infer<typeof billFormSchema>;

export const getBillFormValues = (bill: Bill | null): BillFormData => ({
  description: bill?.description ?? "",
  category: bill?.category ?? "",
  amount: bill?.amount ?? "",
  type: bill?.type ?? "expense",
  dueDate: bill?.dueDate ?? "",
  recurrence: bill?.recurrence ?? "one-time",
  hasInstallments: Boolean(bill?.installment),
  installmentCurrent: bill?.installment?.current.toString() ?? "1",
  installmentTotal: bill?.installment?.total.toString() ?? "2",
  installmentAmount: bill?.installment?.amount ?? "",
});

export const toBillInput = (data: BillFormData): BillInput => ({
  description: data.description.trim(),
  category: data.category.trim(),
  amount: data.amount.trim(),
  type: data.type,
  dueDate: data.dueDate,
  recurrence: data.recurrence,
  installment: data.hasInstallments
    ? {
        current: Number(data.installmentCurrent),
        total: Number(data.installmentTotal),
        amount: data.installmentAmount.trim(),
      }
    : null,
});
