import { useState } from "react";
import { CarouselOptions } from "../CarouselOptions";
import { ChangeSortOrder } from "../ChangeSortOrder";

interface TransactionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionBottomSheet = ({
  isOpen,
  onClose,
}: TransactionBottomSheetProps) => {
  const [activeTab, setActiveTab] = useState<"main" | "sort">("main");

  return (
    <>
      <div
        className={`${!isOpen ? "opacity-0 transition-opacity duration-300 pointer-events-none" : "opacity-100 transition-opacity duration-300"} fixed bg-black/50 inset-0 z-998`}
        onClick={activeTab === "main" ? onClose : () => setActiveTab("main")}
      />
      <div
        className={`${!isOpen ? "translate-y-full sm:translate-y-0 sm:translate-x-full" : "translate-y-0 sm:translate-x-0"} transition-transform duration-300 ease-in-out fixed left-0 right-0 bottom-0 w-full z-999 bg-bg-card rounded-t-2xl h-[60vh] overflow-hidden sm:left-auto sm:right-0 sm:h-full sm:w-100 sm:bottom-0 sm:top-0 sm:rounded-t-none sm:rounded-l-xl`}
      >
        <div
          className={`${
            activeTab === "sort" ? "-translate-x-1/2" : "translate-x-0"
          } flex w-[200%] h-full transition-transform duration-300`}
        >
          <CarouselOptions
            onNavigateToSort={() => setActiveTab("sort")}
            onClose={onClose}
          />
          <ChangeSortOrder onBack={() => setActiveTab("main")} />
        </div>
      </div>
    </>
  );
};
