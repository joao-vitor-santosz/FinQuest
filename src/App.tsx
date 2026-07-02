import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

function App() {
  return (
    // O container principal precisa cobrir a tela toda e usar flex para colocar a sidebar ao lado do conteúdo
    <div className="flex h-screen w-screen text-white overflow-hidden">
      
      {/* 1. Sua Barra Lateral Fixa */}
      <Sidebar />

      {/* 2. Área de Conteúdo da Página */}
      <main className="flex-1 h-full overflow-y-auto px-8 py-6 lg:px-12 flex flex-col">
        
        {/* O Header no topo da página */}
        <Header title="Personal Finance" />

        {/* O espaço abaixo é onde vão entrar os cards do Dashboard depois */}
        <div className="flex-1">
          {/* Conteúdo do Dashboard virá aqui no Passo 3 */}
        </div>

      </main>
    </div>
  );
}

export default App;
