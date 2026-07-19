import { useState } from "react";
import { BottomPanelHeader } from "../bottomPanelHeader";
import { ArrowLeft, ChevronDown } from "lucide-react";

interface ChangeSortOrderProps {
  onBack: () => void;
}

const sortItems = [
  { label: "Período", value: "time" },
  { label: "Transações", value: "transactions" },
  { label: "Ordem alfabética (A-Z)", value: "az" },
];

const periodOptions = [
  { label: "Últimos ano", value: "last-year" },
  { label: "Hoje", value: "today" },
  { label: "Últimos 7 dias", value: "7d" },
  { label: "Últimos 15 dias", value: "15d" },
  { label: "Últimos 30 dias", value: "30d" },
  { label: "Últimos 6 meses", value: "6m" },
];

const transactionOptions = [
  { label: "Apenas entradas", value: "income" },
  { label: "Apenas saídas", value: "expenses" },
  { label: "Todas", value: "all" },
];

export const Filters = ({ onBack }: ChangeSortOrderProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>("last-year");
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>("all");
  const [azChecked, setAzChecked] = useState<boolean>(false);

  const toggleOpen = (index: number, value: string) => {
    if (value === "az") return;
    setOpenIndex((current) => (current === index ? null : index));
  };

  const handleSelectPeriod = (value: string) => {
    setSelectedPeriod((current) => (current === value ? null : value));
  };

  const handleSelectTransaction = (value: string) => {
    setSelectedTransaction((current) => (current === value ? null : value));
  };

  return (
    <nav className="w-1/2 h-full flex flex-col py-7 px-5">
      <div className="flex flex-col gap-5 h-full">
        <BottomPanelHeader variant="changeSortOrder" icon={<ArrowLeft size={25}/>} title="Filtrar" onClick={onBack} />
        
        <ul className="flex flex-col mt-5 gap-5 h-full tracking-widest text-xl sm:text-lg">
          {sortItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <li
                key={index}
                className="flex flex-col border-b border-border-glass pb-4 cursor-pointer hover:text-white transition-colors"
              >
                {item.value === "az" ? (
                  <label
                    className="flex items-center justify-between cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{item.label}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-md">
                      <input
                        type="checkbox"
                        checked={azChecked}
                        onChange={(e) => setAzChecked(e.target.checked)}
                        className="h-4 w-4 rounded-sm border-0 bg-transparent accent-white"
                        aria-label="Ordem alfabética (A-Z)"
                      />
                    </span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between" onClick={() => toggleOpen(index, item.value)}>
                    <p>{item.label}</p>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                )}

                <div className={`grid transition-all duration-300 ease-in-out ${isOpen && item.value === "time" ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                  <ul className="overflow-hidden flex flex-col gap-3 pl-2">
                    {item.value === "time" && periodOptions.map((opt) => {
                      const isSelected = selectedPeriod === opt.value;

                      return (
                        <li key={opt.value}>
                          <label className="flex items-center justify-between gap-3 cursor-pointer px-2 py-1.5 transition-colors" onClick={(e) => e.stopPropagation()}>
                            <span className="select-none text-sm">{opt.label}</span>
                            <span className={`flex h-6 w-6 items-center justify-center rounded-md`}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleSelectPeriod(opt.value)}
                                className="h-4 w-4 rounded-sm border-0 bg-transparent accent-white"
                                aria-label={opt.label}
                              />
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className={`grid transition-all duration-300 ease-in-out ${isOpen && item.value === "transactions" ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                  <ul className="overflow-hidden flex flex-col gap-3 pl-2">
                    {item.value === "transactions" && transactionOptions.map((opt) => {
                      const isSelected = selectedTransaction === opt.value;

                      return (
                        <li key={opt.value}>
                          <label className="flex items-center justify-between gap-3 cursor-pointer px-2 py-1.5 transition-colors" onClick={(e) => e.stopPropagation()}>
                            <span className="select-none text-sm">{opt.label}</span>
                            <span className={`flex h-6 w-6 items-center justify-center rounded-md`}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleSelectTransaction(opt.value)}
                                className="h-4 w-4 rounded-sm border-0 bg-transparent accent-white"
                                aria-label={opt.label}
                              />
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};