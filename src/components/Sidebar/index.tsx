import {
  Calendar,
  FolderOpen,
  HelpCircle,
  LayoutGrid,
  LogOut,
  MoreHorizontal,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import logoCompleta from "../../assets/images/logo-completa-finquest.png";
import logo from "../../assets/images/logo.png";

interface SidebarItem {
  label: string;
  icon: LucideIcon;
  href?: "/" | "/calendar" | "/files";
  destructive?: boolean;
}

const primaryItems: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutGrid, href: "/" },
  { label: "Calendário", icon: Calendar, href: "/calendar" },
  { label: "Arquivos", icon: FolderOpen, href: "/files" },
  { label: "Buscar", icon: Search },
];

const secondaryItems: SidebarItem[] = [
  { label: "Perfil", icon: User },
  { label: "Configurações", icon: Settings },
  { label: "Ajuda", icon: HelpCircle },
  { label: "Sair", icon: LogOut, destructive: true },
];

export const Sidebar = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });
  const activePrimaryIndex = primaryItems.findIndex(
    (item) => item.href === currentPath,
  );

  const renderDesktopItems = (
    items: SidebarItem[],
  ) =>
    items.map((item) => {
      const Icon = item.icon;
      const isActive = item.href === currentPath;
      const itemClassName = `flex h-11 w-full items-center rounded-lg transition-colors hover:bg-white/5 ${item.destructive ? "text-expense" : "text-white"} ${isSidebarExpanded ? "gap-3 px-3" : "justify-center"} ${isActive ? "bg-border-glass" : ""}`;

      return (
        <li key={item.label} className="relative w-full">
          {item.href ? (
            <Link
              to={item.href}
              className={itemClassName}
              onClick={() => setIsSidebarExpanded(false)}
            >
              <Icon size={20} className="shrink-0" />
              <span
                className={`${isSidebarExpanded ? "w-auto opacity-100" : "w-0 opacity-0"} overflow-hidden whitespace-nowrap transition-all duration-300`}
              >
                {item.label}
              </span>
            </Link>
          ) : (
            <button type="button" className={itemClassName}>
              <Icon size={20} className="shrink-0" />
              <span
                className={`${isSidebarExpanded ? "w-auto opacity-100" : "w-0 opacity-0"} overflow-hidden whitespace-nowrap transition-all duration-300`}
              >
                {item.label}
              </span>
            </button>
          )}
        </li>
      );
    });

  return (
    <>
      <aside
        className={`${isSidebarExpanded ? "sm:w-72" : "sm:w-18"} fixed inset-x-0 bottom-0 z-30 flex h-16 items-center overflow-hidden bg-bg-sidebar px-2 py-2 text-white sm:inset-y-0 sm:left-0 sm:right-auto sm:h-screen sm:flex-col sm:px-3 sm:py-3 sm:transition-[width] sm:duration-300 sm:ease-in-out`}
      >
        <nav className="flex-1 sm:hidden">
          <ul className="relative grid grid-cols-5 items-center">
            <li
              aria-hidden="true"
              className={`${activePrimaryIndex === -1 ? "opacity-0" : "opacity-100"} pointer-events-none absolute -bottom-2 h-1 w-8 rounded-t-full bg-income shadow-[0_0_8px_#34d399] transition-[left,opacity] duration-300 ease-in-out`}
              style={{
                left: `calc(${activePrimaryIndex * 20 + 10}% - 1rem)`,
              }}
            />
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === currentPath;

              return (
                <li key={item.label} className="relative flex h-10 w-10 items-center justify-center justify-self-center">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${isActive ? "bg-border-glass" : ""}`}
                      aria-label={item.label}
                    >
                      <Icon size={20} />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      aria-label={item.label}
                    >
                      <Icon size={20} />
                    </button>
                  )}
                </li>
              );
            })}
            <li className="flex h-10 w-10 items-center justify-center justify-self-center">
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

        <div className="hidden h-full w-full flex-col sm:flex">
          <div className="mb-8 flex h-15 items-center justify-between">
            {isSidebarExpanded ? (
              <>
                <img
                  className="h-25 w-48 object-contain object-left"
                  src={logoCompleta}
                  alt="FinQuest"
                />
                <button
                  className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                  onClick={() => setIsSidebarExpanded(false)}
                  aria-label="Recolher menu lateral"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <button
                className="flex h-15 w-full items-center justify-center rounded-lg transition-colors hover:bg-white/5 cursor-pointer"
                onClick={() => setIsSidebarExpanded(true)}
                aria-label="Expandir menu lateral"
              >
                <img className="h-12 w-12 object-cover" src={logo} alt="FinQuest" />
              </button>
            )}
          </div>

          <nav className="flex flex-1 items-center">
            <ul className="relative flex w-full flex-col gap-2">
              <li
                aria-hidden="true"
                className={`${activePrimaryIndex === -1 ? "opacity-0" : "opacity-100"} pointer-events-none absolute -left-3 top-1.5 h-8 w-1 rounded-r-full bg-income shadow-[0_0_8px_#34d399] transition-[transform,opacity] duration-300 ease-in-out`}
                style={{
                  transform: `translateY(${activePrimaryIndex * 52}px)`,
                }}
              />
              {renderDesktopItems(primaryItems)}
            </ul>
          </nav>
          <nav className="mt-auto">
            <ul className="flex flex-col gap-2">{renderDesktopItems(secondaryItems)}</ul>
          </nav>
        </div>
      </aside>

      <div
        className={`${isSidebarExpanded ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 z-20 hidden bg-black/50 transition-opacity duration-300 sm:block`}
        onClick={() => setIsSidebarExpanded(false)}
        aria-hidden={!isSidebarExpanded}
      />

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
            {secondaryItems.map((item) => {
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
