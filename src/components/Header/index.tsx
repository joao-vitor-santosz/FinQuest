import { Search } from "lucide-react";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="w-full flex items-center justify-between py-4 mb-8">
      
      {/* LADO ESQUERDO: Título Dinâmico da Página */}
      <h1 className="text-2xl font-semibold text-white tracking-wide">
        {title}
      </h1>

      {/* LADO DIREITO: Busca e Perfil */}
      <div className="flex items-center gap-4">
        
        {/* BARRA DE PESQUISA (Estilo Glassmorphism Escuro) */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-48 lg:w-64 h-10 pl-4 pr-10 rounded-3xl bg-bg-card/40 border border-border-glass text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-income/50 transition-all placeholder:tracking-wider"
          />
          <Search 
            size={18} 
            className="absolute right-3 text-text-secondary pointer-events-none" 
          />
        </div>

        {/* AVATAR DE PERFIL (Círculo com a letra ou imagem) */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-border-glass border border-border-glass text-white font-medium cursor-pointer hover:bg-border-glass/80 transition-all select-none">
          E
        </div>

      </div>

    </header>
  );
};