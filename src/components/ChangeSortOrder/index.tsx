import { BottomPanelHeader } from "../bottomPanelHeader";
import { ArrowLeft } from "lucide-react";

interface ChangeSortOrderProps {
  onBack: () => void;
}

const sortItems = [
  { label: "Mais recentes", value: "recentes" },
  { label: "Mais antigas", value: "antigas" },
  { label: "Ordem alfabética (A-Z)", value: "az" },
];

export const ChangeSortOrder = ({ onBack }: ChangeSortOrderProps) => {
  return (
    <nav className="w-1/2 h-full flex flex-col py-7 px-5">
      <div className="flex flex-col gap-5 h-full justify-around">
        <BottomPanelHeader variant="changeSortOrder" icon={<ArrowLeft size={25}/>} title="Alterar Ordenação" onClick={onBack} />
        
        <ul className="flex flex-col gap-5 h-full justify-around tracking-widest text-xl sm:text-lg">
          {sortItems.map((item, index) => (
            <li key={index} className="border-b border-border-glass pb-4 cursor-pointer hover:text-white transition-colors">
              <p>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};