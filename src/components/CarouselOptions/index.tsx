import {
  History,
  Upload,
  SlidersHorizontal,
  Trash,
  ChevronRight,
} from "lucide-react";
import { useContext } from "react";
import { BottomPanelHeader } from "../bottomPanelHeader";
import { TransactionContext } from "../../context/TransactionContext";
import { exportTransactionsToCsv } from "../../utils/export-transactions-csv";

interface CarouselOptionsProps {
  onClose: () => void;
  onStartDelete: () => void;
  onNavigateToSort: () => void;
}

const navigationItems = [
  { label: "Ver histórico completo", icon: History, href: "#" },
  { label: "Exportar dados CSV", icon: Upload, href: "#" },
  { label: "Filtros", icon: SlidersHorizontal, href: "#" },
  { label: "Excluir", icon: Trash, href: "#" },
];

export const CarouselOptions = ({
  onClose,
  onStartDelete,
  onNavigateToSort,
}: CarouselOptionsProps) => {
  const { filteredTransactions } = useContext(TransactionContext);

  return (
    <nav className="w-1/2 h-full flex flex-col justify-between py-7 px-5">
      <div className="flex flex-col gap-5 h-full justify-around">
        <BottomPanelHeader title="Opções" icon={"X"} onClick={onClose} />
        <ul className="flex flex-col gap-5 h-full justify-around tracking-widest text-xl sm:text-lg">
          {navigationItems.map((item, index) => (
            <li key={index} className="border-b border-border-glass pb-4">
              <a
                href={item.href}
                className="flex items-center justify-between w-full"
                onClick={(e) => {
                  if (item.label === "Filtros") {
                    e.preventDefault();
                    onNavigateToSort();
                  }

                  if (item.label === "Excluir") {
                    e.preventDefault();
                    onStartDelete();
                  }

                  if (item.label === "Exportar dados CSV") {
                    e.preventDefault();
                    exportTransactionsToCsv(filteredTransactions);
                    onClose();
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <item.icon
                    size={25}
                    className={`text-gray-700 ${item.label === "Excluir" ? "text-red-400" : ""}`}
                  />
                  {item.label}
                </div>
                {item.label === "Filtros" && (
                  <ChevronRight size={20} className="text-white/40" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
