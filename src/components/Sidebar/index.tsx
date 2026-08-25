import {
  LayoutGrid,
  Calendar,
  FolderOpen,
  Search,
  User,
  Settings,
  HelpCircle,
  LogOut,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";
import logo from "../../assets/images/logo.png";

const mobileSecondaryItems = [
  { label: "Perfil", icon: User },
  { label: "Configurações", icon: Settings },
  { label: "Ajuda", icon: HelpCircle },
  { label: "Sair", icon: LogOut, destructive: true },
];

export const Sidebar = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center bg-bg-sidebar px-2 py-2 text-white sm:static sm:h-screen sm:w-18 sm:max-w-18 sm:flex-col sm:justify-between sm:px-4 sm:py-3">
        <div className="hidden sm:block">
          <img
            className="w-15 h-15 object-cover"
            src={logo}
            alt="Logo - FinQuest"
          />
        </div>

        <nav className="flex-1 sm:flex-none">
          <ul className="flex items-center justify-around sm:flex-col sm:gap-3">
            <li className="relative flex h-10 w-10 items-center justify-center sm:h-auto sm:w-full">
              <div className="absolute -left-4 hidden h-8 w-1 rounded-r-full bg-income shadow-[0_0_8px_#34d399] sm:block" />
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-border-glass">
                <a href="#">
                  <LayoutGrid size={20} />
                </a>
              </div>
            </li>
            <li className="w-10 h-10 flex items-center justify-center rounded-lg">
              <a href="#">
                <Calendar size={20} />
              </a>
            </li>
            <li className="w-10 h-10 flex items-center justify-center rounded-lg ">
              <a href="#">
                <FolderOpen size={20} />
              </a>
            </li>
            <li className="w-10 h-10 flex items-center justify-center rounded-lg">
              <a href="#">
                <Search size={20} />
              </a>
            </li>
            <li className="flex h-10 w-10 items-center justify-center rounded-lg sm:hidden">
              <button
                className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                onClick={() => setIsMoreMenuOpen(true)}
                aria-label="Abrir mais opções"
              >
                <MoreHorizontal size={20} />
              </button>
            </li>
          </ul>
        </nav>

        <nav className="hidden sm:block">
          <ul className="flex flex-col items-center gap-3">
            <li className="w-10 h-10 flex items-center justify-center rounded-lg">
              <a href="#">
                <User size={20} />
              </a>
            </li>
            <li className="w-10 h-10 flex items-center justify-center rounded-lg">
              <a href="#">
                <Settings size={20} />
              </a>
            </li>
            <li className="w-10 h-10 flex items-center justify-center rounded-lg">
              <a href="#">
                <HelpCircle size={20} />
              </a>
            </li>
            <li className="w-10 h-10 flex items-center justify-center rounded-lg">
              <a href="#">
                <LogOut size={20} />
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div
        className={`${isMoreMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 sm:hidden`}
        onClick={() => setIsMoreMenuOpen(false)}
      >
          <div
            className={`${isMoreMenuOpen ? "translate-y-0" : "translate-y-full"} absolute inset-x-0 bottom-0 rounded-t-2xl border border-border-glass bg-bg-card p-5 shadow-2xl transition-transform duration-300 ease-in-out`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="more-options-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 id="more-options-title" className="text-lg font-semibold">
                Mais opções
              </h2>
              <button
                className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                onClick={() => setIsMoreMenuOpen(false)}
                aria-label="Fechar mais opções"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {mobileSecondaryItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <button
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/5 cursor-pointer ${item.destructive ? "text-expense" : "text-white"}`}
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      <Icon size={20} />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
    </>
  );
};
