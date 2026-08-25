import { Search } from "lucide-react";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="mb-5 flex w-full flex-col gap-3 py-2 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:py-4">
      
      {/* LADO ESQUERDO: Título Dinâmico da Página */}
      <h1 className="text-xl font-semibold tracking-wide text-white sm:text-2xl">
        {title}
      </h1>

      {/* LADO DIREITO: Busca e Perfil */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* BARRA DE PESQUISA (Estilo Glassmorphism Escuro) */}
        <div className="relative flex flex-1 items-center sm:flex-none">
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full rounded-3xl border border-border-glass bg-bg-card/40 pl-4 pr-10 text-sm text-text-primary placeholder:tracking-wider placeholder:text-text-secondary transition-all focus:border-income/50 focus:outline-none sm:w-48 lg:w-64"
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
