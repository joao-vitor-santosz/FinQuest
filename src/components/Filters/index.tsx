import { useContext, useState } from "react";
import { BottomPanelHeader } from "../bottomPanelHeader";
import { ArrowLeft, ChevronDown } from "lucide-react";
import {
  alphabeticalSortOptions,
  paymentMethodOptions,
  sortItems,
  periodOptions,
  transactionOptions,
} from "./filtersCategories";
import { TransactionContext } from "../../context/TransactionContext";

interface FiltersProps {
  onBack: () => void;
}

export const Filters = ({ onBack }: FiltersProps) => {
  const {
    filters,
    setTransactionPaymentMethod,
    setTransactionPeriod,
    setTransactionSort,
    setTransactionType,
  } = useContext(TransactionContext);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const handleSelectPeriod = (value: string) => {
    if (
      value === "today" ||
      value === "7d" ||
      value === "15d" ||
      value === "30d" ||
      value === "6m" ||
      value === "last-year"
    ) {
      setTransactionPeriod(filters.period === value ? null : value);
    }
  };

  const handleSelectSort = (value: string) => {
    if (value === "az" || value === "za") {
      setTransactionSort(filters.sort === value ? null : value);
    }
  };

  const handleSelectTransaction = (value: string) => {
    if (value === "all" || value === "income" || value === "expense") {
      setTransactionType(value);
    }
  };

  const handleSelectPaymentMethod = (value: string) => {
    if (
      value === "all" ||
      value === "pix" ||
      value === "dinheiro" ||
      value === "debito" ||
      value === "credito"
    ) {
      setTransactionPaymentMethod(value);
    }
  };

  return (
    <nav className="w-1/2 h-full flex flex-col py-7 px-5">
      <div className="flex flex-col gap-5 h-full">
        <BottomPanelHeader
          variant="changeSortOrder"
          icon={<ArrowLeft size={25} />}
          title="Filtrar"
          onClick={onBack}
        />

        <ul className="flex flex-col mt-5 gap-5 h-full tracking-widest text-xl sm:text-lg">
          {sortItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <li
                key={index}
                className="flex flex-col border-b border-border-glass pb-4 cursor-pointer hover:text-white transition-colors"
              >
                <div
                  className="flex items-center justify-between"
                  onClick={() => toggleOpen(index)}
                >
                  <p>{item.label}</p>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen && item.value === "time" ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                >
                  <ul className="overflow-hidden flex flex-col gap-3 pl-2">
                    {item.value === "time" &&
                      periodOptions.map((opt) => {
                        const isSelected = filters.period === opt.value;

                        return (
                          <li key={opt.value}>
                            <label
                              className="flex items-center justify-between gap-3 cursor-pointer px-2 py-1.5 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="select-none text-sm">
                                {opt.label}
                              </span>
                              <span
                                className={`flex h-6 w-6 items-center justify-center rounded-md`}
                              >
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

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen && item.value === "sort" ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                >
                  <ul className="overflow-hidden flex flex-col gap-3 pl-2">
                    {item.value === "sort" &&
                      alphabeticalSortOptions.map((opt) => {
                        const isSelected = filters.sort === opt.value;

                        return (
                          <li key={opt.value}>
                            <label
                              className="flex items-center justify-between gap-3 cursor-pointer px-2 py-1.5 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="select-none text-sm">
                                {opt.label}
                              </span>
                              <span className="flex h-6 w-6 items-center justify-center rounded-md">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleSelectSort(opt.value)}
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

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen && item.value === "transactions" ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                >
                  <ul className="overflow-hidden flex flex-col gap-3 pl-2">
                    {item.value === "transactions" &&
                      transactionOptions.map((opt) => {
                        const isSelected = filters.type === opt.value;

                        return (
                          <li key={opt.value}>
                            <label
                              className="flex items-center justify-between gap-3 cursor-pointer px-2 py-1.5 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="select-none text-sm">
                                {opt.label}
                              </span>
                              <span
                                className={`flex h-6 w-6 items-center justify-center rounded-md`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() =>
                                    handleSelectTransaction(opt.value)
                                  }
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

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen && item.value === "payment-method" ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                >
                  <ul className="overflow-hidden flex flex-col gap-3 pl-2">
                    {item.value === "payment-method" &&
                      paymentMethodOptions.map((opt) => {
                        const isSelected = filters.paymentMethod === opt.value;

                        return (
                          <li key={opt.value}>
                            <label
                              className="flex items-center justify-between gap-3 cursor-pointer px-2 py-1.5 transition-colors"
                              onClick={(event) => event.stopPropagation()}
                            >
                              <span className="select-none text-sm">
                                {opt.label}
                              </span>
                              <span className="flex h-6 w-6 items-center justify-center rounded-md">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() =>
                                    handleSelectPaymentMethod(opt.value)
                                  }
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
