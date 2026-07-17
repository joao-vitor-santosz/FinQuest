interface BottomPanelHeaderProps {
  title: string;
  onClick: () => void;
  variant?: "carouselOptions" | "changeSortOrder";
  icon: React.ReactNode;
}

export const BottomPanelHeader = ({
  title,
  onClick,
  variant = "carouselOptions",
  icon,

}: BottomPanelHeaderProps) => {
  const headerStyle = {
    variant: {
      carouselOptions: "flex-row",
      changeSortOrder: "flex-row-reverse",
    },
  };

  return (
    <div
      className={`flex items-center justify-between mb-7 sm:mb-0 tracking-widest text-xl sm:text-lg ${headerStyle.variant[variant]}`}
    >
      <p>{title}</p>
      <p className="text-white/20 cursor-pointer" onClick={onClick}>
        {icon}
      </p>
    </div>
  );
};
