import {
  History,
  Upload,
  ArrowUpDown,
  Trash,
  ChevronRight,
} from "lucide-react";
import { BottomPanelHeader } from "../bottomPanelHeader";

interface CarouselOptionsProps {
  onClose: () => void;
  onNavigateToSort: () => void;
}

const navigationItems = [
  { label: "Ver histórico completo", icon: History, href: "#" },
  { label: "Exportar dados CSV", icon: Upload, href: "#" },
  { label: "Alterar ordenação", icon: ArrowUpDown, href: "#" },
  { label: "Excluir", icon: Trash, href: "#" },
];

export const CarouselOptions = ({
  onClose,
  onNavigateToSort,
}: CarouselOptionsProps) => {
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
                  if (item.label === "Alterar ordenação") {
                    e.preventDefault();
                    onNavigateToSort();
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
                {item.label === "Alterar ordenação" && (
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
