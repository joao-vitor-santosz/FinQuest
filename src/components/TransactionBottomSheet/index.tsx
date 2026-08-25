import { useState } from "react";
import { CarouselOptions } from "../CarouselOptions";
import { Filters } from "../Filters";

interface TransactionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDelete: () => void;
}

export const TransactionBottomSheet = ({
  isOpen,
  onClose,
  onStartDelete,
}: TransactionBottomSheetProps) => {
  const [activeTab, setActiveTab] = useState<"main" | "sort">("main");

  return (
    <>
      <div
        className={`${!isOpen ? "opacity-0 transition-opacity duration-300 pointer-events-none" : "opacity-100 transition-opacity duration-300"} fixed bg-black/50 inset-0 z-998`}
        onClick={activeTab === "main" ? onClose : () => setActiveTab("main")}
      />
      <div
        className={`${!isOpen ? "translate-y-full sm:translate-y-0 sm:translate-x-full" : "translate-y-0 sm:translate-x-0"} ${activeTab === "sort" ? "h-[90vh]" : ""} fixed bottom-0 left-0 right-0 z-999 h-[70vh] w-full overflow-hidden rounded-t-2xl bg-bg-card transition-transform duration-300 ease-in-out sm:bottom-0 sm:left-auto sm:right-0 sm:top-0 sm:h-full sm:w-100 sm:rounded-l-xl sm:rounded-t-none`}
      >
        <div
          className={`${
            activeTab === "sort" ? "-translate-x-1/2" : "translate-x-0"
          } flex w-[200%] h-full transition-transform duration-300`}
        >
          <CarouselOptions
            onNavigateToSort={() => setActiveTab("sort")}
            onClose={onClose}
            onStartDelete={onStartDelete}
          />
          <Filters onBack={() => setActiveTab("main")} />
        </div>
      </div>
    </>
  );
};
