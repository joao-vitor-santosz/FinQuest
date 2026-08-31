import {
  Landmark,
  WalletCards,
} from "lucide-react";
import { useContext } from "react";
import { BillsContext } from "../../context/bills-context";
import { summaryCards } from "./types/index";

export const BillsPage = () => {
  const { bills } = useContext(BillsContext);
  const hasBills = bills.length > 0;

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      <div
        className="animate-page-content-enter flex items-center gap-4"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-income/30 bg-income/10 text-income shadow-[0_0_18px_rgba(34,197,94,0.18)]">
          <WalletCards size={27} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Contas
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Acompanhe vencimentos, parcelas e compromissos financeiros.
          </p>
        </div>
      </div>

      <div
        className="animate-page-content-enter grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        style={{ animationDelay: "140ms" }}
      >
        {summaryCards.map(
          ({ label, description, icon: Icon, accentClassName }) => (
            <section
              key={label}
              className="flex min-w-0 items-center justify-between rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-5"
            >
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-bold text-white">0</p>
                <p className="mt-1 text-xs text-text-muted">{description}</p>
              </div>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accentClassName}`}
              >
                <Icon size={20} />
              </span>
            </section>
          ),
        )}
      </div>

      <section
        className="animate-page-content-enter flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-glass bg-bg-card/40 px-6 text-center backdrop-blur-md"
        style={{ animationDelay: "200ms" }}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-sidebar text-text-muted">
          <Landmark size={28} />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-white">
          {hasBills
            ? "Organização de contas em preparação"
            : "Suas contas aparecerão aqui"}
        </h2>
        <p className="mt-2 max-w-md text-sm text-text-secondary">
          {hasBills
            ? "O cadastro e a visualização detalhada das contas serão disponibilizados nas próximas etapas."
            : "Em breve, você poderá cadastrar vencimentos, recorrências e parcelamentos para receber alertas antes de cada pagamento."}
        </p>
      </section>
    </div>
  );
};
