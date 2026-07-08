import {
  LayoutGrid,
  Calendar,
  FolderOpen,
  Search,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import logo from "../../assets/images/logo.png";

export const Sidebar = () => {
  return (
    <aside className="h-screen flex flex-col justify-between px-4 py-3 max-w-18 bg-bg-sidebar text-white">
      <div>
        <img
          className="w-15 h-15 object-cover"
          src={logo}
          alt="Logo - FinQuest"
        />
      </div>

      <nav>
        <ul className="flex flex-col items-center gap-3">
          <li className="relative w-full flex items-center justify-center">
            <div className="absolute -left-4 w-1 h-8 bg-income rounded-r-full shadow-[0_0_8px_#34d399]" />
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
        </ul>
      </nav>

      <nav>
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
            <a>
              <LogOut size={20} />
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
