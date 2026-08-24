# FinQuest — Contexto Mestre do Projeto

> **Objetivo deste arquivo:** servir como fonte de contexto técnico, funcional e de produto para qualquer desenvolvedor ou agente de IA que trabalhe no FinQuest.
>
> Antes de alterar o projeto, leia este documento por completo e confirme no código o estado da funcionalidade que será modificada. Este arquivo distingue explicitamente o que **já funciona**, o que está **parcialmente implementado**, o que existe **somente visualmente** e o que é **planejado**.

---

# 1. Visão geral

**FinQuest** é um MVP frontend de gerenciamento de finanças pessoais.

A proposta é permitir que o usuário registre e acompanhe suas movimentações financeiras por meio de uma interface moderna, responsiva e interativa.

O dashboard foi pensado para centralizar:

- receitas;
- despesas;
- saldo;
- histórico de transações;
- gráficos;
- filtros;
- busca;
- ordenação;
- exportação;
- gerenciamento das transações.

O projeto atualmente já possui um fluxo funcional para cadastro e visualização de transações, mas **ainda não deve ser considerado um produto pronto para produção**.

Parte importante da interface já existe visualmente, porém vários controles ainda precisam ser conectados aos dados reais da aplicação.

---

# 2. Estado real atual do projeto

## Status geral

**MVP frontend funcional, porém com pendências importantes.**

No estado atual:

### Funciona

- Cadastro de transações.
- Validação do formulário.
- Atualização dos totais.
- Cálculo de entradas.
- Cálculo de saídas.
- Cálculo do saldo.
- Atualização reativa do dashboard.
- Exibição da lista de transações.
- Filtro por tipo:
  - Todas;
  - Entradas;
  - Saídas.
- Build de produção.

### Parcialmente implementado

- Gráfico de entradas e saídas.
- Sistema visual de filtros.
- Painel de opções da transação.
- Submenu visual de ordenação.

### Existe visualmente, mas ainda não executa a funcionalidade real

- Busca.
- Filtro por período.
- Ordenação.
- Histórico completo.
- Exportação CSV.
- Exclusão de transações.
- Parte da navegação lateral.

### Ainda ausente

- Persistência dos dados.
- Backend.
- Banco de dados.
- Autenticação.
- Sessão de usuário.
- Testes automatizados.

---

# 3. Stack tecnológica atual

O projeto utiliza:

| Camada | Tecnologia |
|---|---|
| Interface | React 19 |
| Linguagem | TypeScript 6 |
| Estilização | Tailwind CSS 4 |
| Rotas | TanStack React Router |
| Estado global | Context API |
| Estado local | `useState` |
| Formulários | React Hook Form |
| Validação | Zod |
| Gráficos | Recharts |
| Ícones | Lucide React |
| Build / Dev Server | Vite 8 |
| Lint | ESLint |

---

# 4. Organização geral do projeto

A inspeção atual identificou a seguinte organização conceitual:

```text
src/
├── pages/
│   └── Rotas, layout principal e dashboard
│
├── components/
│   └── Componentes visuais e fluxos de cadastro,
│       filtros, transações, painéis etc.
│
├── context/
│   └── Estado global das transações e cálculos financeiros
│
├── interfaces/
│   └── Tipos relacionados a transações e filtros
│
├── utils/
│   └── Utilitários, incluindo formatação monetária
│
└── assets/
    └── Logo, imagens e outros recursos visuais
```

O projeto utiliza geração automática da árvore de rotas pelo TanStack React Router.

---

# 5. Fluxo atual dos dados

Atualmente o fluxo principal funciona aproximadamente desta forma:

```text
Usuário
   ↓
Modal de cadastro
   ↓
React Hook Form
   ↓
Validação com Zod
   ↓
Context API
   ↓
Nova transação adicionada ao array em memória
   ↓
Recalculo dos valores
   ├── Entradas
   ├── Saídas
   └── Saldo
   ↓
Dashboard reage automaticamente
   ├── Cards
   ├── Gráfico
   └── Lista de transações
```

O ID da transação atualmente é criado com base no horário.

## Limitação importante

As transações vivem **somente na memória do navegador**.

Isso significa:

```text
Adicionar transação
      ↓
Transação aparece normalmente
      ↓
Atualizar/recarregar a página
      ↓
Dados desaparecem
```

Ainda não existe persistência local definitiva nem integração com backend.

---

# 6. Cadastro de transações

O cadastro é uma das funcionalidades que já funciona no MVP.

O formulário utiliza:

- React Hook Form;
- Zod;
- TypeScript.

Existem validações para informações como:

- descrição;
- valor;
- data;
- tipo da transação;
- forma/tipo de pagamento.

Depois de uma transação válida ser cadastrada:

1. ela é adicionada ao estado;
2. os cálculos financeiros são refeitos;
3. os cards são atualizados;
4. o gráfico reage;
5. a lista é atualizada.

Esse fluxo foi testado no navegador e está funcional.

---

# 7. Estado financeiro

O estado global utiliza Context API.

Atualmente são derivados das transações valores como:

- total de entradas;
- total de saídas;
- saldo.

Esses valores são recalculados quando o array de transações é alterado.

## Problema conhecido — modelagem monetária

Os valores monetários ainda possuem um problema estrutural importante:

**valores são representados como texto/string em partes do fluxo.**

Isso pode gerar ambiguidades envolvendo formatos como:

```text
1.234,56
1234.56
1,234.56
```

e pode provocar:

- interpretação incorreta;
- cálculos incorretos;
- `NaN`;
- inconsistência entre entrada e exibição.

### Direção recomendada

Centralizar a conversão monetária.

Uma solução futura recomendada é representar dinheiro internamente em **centavos como inteiro**.

Exemplo:

```ts
R$ 1.234,56
```

internamente:

```ts
123456
```

A formatação para Real deve acontecer apenas na camada de apresentação.

**Não realizar uma refatoração monetária ampla sem primeiro analisar todos os pontos do código que consomem o valor atual.**

---

# 8. Dashboard

O dashboard é o centro visual da aplicação.

Atualmente ele reage ao estado das transações e apresenta informações através de:

- cards/resumos financeiros;
- gráfico;
- filtros;
- lista de transações.

Quando uma receita ou despesa é adicionada, os principais elementos do dashboard são atualizados imediatamente.

---

# 9. Lista de transações

A lista já exibe informações das transações cadastradas, incluindo dados como:

- descrição;
- data;
- valor.

O filtro por tipo está conectado aos dados.

## Filtro por tipo — IMPLEMENTADO

As opções:

- Todas;
- Entradas;
- Saídas.

alteram corretamente a lista exibida.

Esse filtro deve ser preservado durante futuras refatorações.

---

# 10. Busca — SOMENTE VISUAL

Existe uma interface/campo de busca.

Porém, no estado atual, o campo **não está conectado aos dados das transações**.

Portanto:

```text
Usuário digita
      ↓
Interface recebe o texto
      ↓
Lista NÃO é filtrada
```

## Funcionalidade pretendida

A busca deverá futuramente permitir localizar transações, provavelmente utilizando a descrição e outros campos relevantes.

Antes de implementar, verificar a interface atual da transação e decidir explicitamente quais campos serão pesquisáveis.

---

# 11. Filtro por período — SOMENTE VISUAL

A seleção de período existe na interface e possui estado/comportamento visual local.

Entretanto, ela **ainda não filtra as transações reais**.

A intenção é permitir restringir a lista de acordo com períodos/datas.

A implementação deverá trabalhar em conjunto com os demais filtros, e não substituir o filtro por tipo existente.

O resultado final deverá permitir composição semelhante a:

```text
Todas as transações
        ↓
Filtro por tipo
        ↓
Filtro por período
        ↓
Busca
        ↓
Ordenação
        ↓
Lista final
```

A ordem exata dessa pipeline deve ser definida ao implementar.

---

# 12. Painel de opções da transação

Existe um componente de painel de opções chamado conceitualmente de:

```text
TransactionBottomSheet
```

Ele foi projetado como uma interface responsiva:

- **mobile:** Bottom Sheet;
- **desktop:** painel lateral/drawer.

A intenção é oferecer ações relacionadas às transações através de uma experiência semelhante a aplicativos móveis.

---

# 13. TransactionBottomSheet — comportamento pretendido

## Mobile

Em telas pequenas, o componente deve funcionar como uma Bottom Sheet.

Características planejadas/implementadas durante o desenvolvimento:

- surgir da parte inferior;
- ocupar a largura disponível;
- possuir aproximadamente `60vh` de altura;
- topo arredondado;
- overlay/backdrop;
- animação vertical.

Conceitualmente:

```text
FECHADO
translate-y-full

ABERTO
translate-y-0
```

---

# 14. TransactionBottomSheet — desktop

Em telas `sm` ou superiores, o mesmo componente muda de comportamento e se transforma em drawer lateral.

Características:

- ancorado à direita;
- altura total;
- largura aproximada de 300px;
- animação horizontal;
- movimento vertical neutralizado no desktop.

Uma decisão importante durante o desenvolvimento foi utilizar:

```text
sm:left-auto
```

para neutralizar o:

```text
left-0
```

herdado da configuração mobile.

Sem isso, o painel recebia simultaneamente posicionamento à esquerda e à direita no desktop e podia aparecer incorretamente no centro da tela.

Conceitualmente:

```text
Mobile:
left-0
right-0
bottom-0

Desktop:
sm:left-auto
sm:right-0
sm:top-0
sm:bottom-0
```

---

# 15. Arquitetura interna do painel

O painel foi refatorado durante o desenvolvimento para separar responsabilidades.

Os componentes conceituais/documentados são:

```text
TransactionBottomSheet
│
├── CarouselOptions
│   └── BottomPanelHeader
│
└── ChangeSortOrder
    └── BottomPanelHeader
```

## TransactionBottomSheet

Componente pai.

Responsabilidades:

- abertura/fechamento;
- backdrop;
- container;
- animações;
- navegação interna;
- estado da tela atual.

## BottomPanelHeader

Cabeçalho reutilizável.

Responsabilidades:

- título;
- botão/ícone de ação;
- suporte a diferentes layouts.

Durante o desenvolvimento, a propriedade de ícone foi generalizada utilizando:

```ts
React.ReactNode
```

Isso permite fornecer elementos como:

```tsx
<X size={24} />
```

ou:

```tsx
<ArrowLeft size={24} />
```

sem acoplar o cabeçalho diretamente ao Lucide.

## CarouselOptions

Representa a primeira tela do painel.

## ChangeSortOrder

Representa o submenu de alteração da ordenação.

---

# 16. Menu principal do painel

O menu foi projetado com as seguintes ações:

```text
Ver histórico completo
Exportar dados CSV
Alterar ordenação    >
Excluir
```

Ícones documentados:

```text
History
Upload
ArrowUpDown
Trash
ChevronRight
```

O item **Excluir** possui destaque visual vermelho.

O item **Alterar ordenação** possui um `ChevronRight` na extremidade direita para comunicar visualmente que existe um submenu.

O Chevron é renderizado condicionalmente apenas nessa opção.

---

# 17. Navegação para o submenu de ordenação

A navegação interna foi projetada com um estado semelhante a:

```ts
const [activeTab, setActiveTab] =
  useState<"main" | "sort">("main");
```

Estados:

```text
main → menu principal
sort → menu de ordenação
```

Ao selecionar:

```text
Alterar ordenação
```

o fluxo planejado/estruturado é:

```ts
setActiveTab("sort");
```

Como os componentes foram separados, a comunicação é feita por callbacks.

Exemplo conceitual:

```tsx
<CarouselOptions
  onClose={onClose}
  onNavigateToSort={() => setActiveTab("sort")}
/>

<ChangeSortOrder
  onClose={onClose}
  onBack={() => setActiveTab("main")}
/>
```

Isso mantém o estado no componente pai.

---

# 18. Animação entre telas do painel

Foi estruturado um efeito de carrossel horizontal.

O wrapper possui aproximadamente:

```text
flex
w-[200%]
h-full
transition-transform
duration-300
```

As duas telas ocupam metade do wrapper.

Quando:

```ts
activeTab === "main"
```

posição:

```text
translate-x-0
```

Quando:

```ts
activeTab === "sort"
```

posição:

```text
-translate-x-1/2
```

Conceitualmente:

```text
┌──────────────┬──────────────┐
│     MAIN     │     SORT     │
└──────────────┴──────────────┘
       ↑
 viewport
```

Após mover 50%:

```text
┌──────────────┬──────────────┐
│     MAIN     │     SORT     │
└──────────────┴──────────────┘
                      ↑
                   viewport
```

---

# 19. Submenu de ordenação

O submenu documentado possui opções como:

```text
Mais recentes
Mais antigas
Ordem alfabética (A-Z)
```

Exemplo da estrutura planejada:

```ts
const sortItems = [
  { label: "Mais recentes", value: "recentes" },
  { label: "Mais antigas", value: "antigas" },
  { label: "Ordem alfabética (A-Z)", value: "az" },
];
```

O cabeçalho utiliza uma seta `ArrowLeft` para retornar ao menu anterior.

---

# 20. ATENÇÃO — ordenação ainda não está funcional

Embora a interface e o submenu de ordenação tenham sido desenvolvidos, a inspeção atual do repositório confirmou que **a ordenação ainda não altera a lista real de transações**.

Existe estado/checkbox visual local, mas sem efeito sobre os dados exibidos.

Portanto, não considerar a ordenação como concluída.

## Funcionalidade pretendida

A implementação futura deverá:

1. armazenar a ordenação selecionada;
2. aplicar a ordenação ao conjunto real de transações;
3. atualizar a lista;
4. mostrar visualmente a opção selecionada;
5. preservar integração com filtros e busca.

Um estado possível:

```ts
const [selectedSort, setSelectedSort] = useState(...);
```

O tipo e local definitivo desse estado devem ser decididos após analisar a arquitetura atual.

---

# 21. Histórico completo — SOMENTE VISUAL

A opção:

```text
Ver histórico completo
```

existe na interface.

Entretanto, atualmente o link possui comportamento/destino de placeholder e **não existe um fluxo funcional de histórico completo**.

Essa funcionalidade deverá ser implementada futuramente.

Não assumir uma rota ou UX específica sem verificar primeiro a arquitetura de navegação do projeto.

---

# 22. Exportação CSV — SOMENTE VISUAL

A opção:

```text
Exportar dados CSV
```

está presente visualmente.

Porém **nenhuma exportação real é executada atualmente**.

A implementação futura deverá transformar os dados relevantes das transações em CSV e iniciar o download/exportação para o usuário.

Antes de implementar, definir:

- quais transações serão exportadas;
- se filtros atuais afetam a exportação;
- colunas;
- formato de datas;
- formato monetário;
- encoding.

---

# 23. Exclusão — SOMENTE VISUAL

A opção:

```text
Excluir
```

está presente no painel e possui destaque visual vermelho.

Porém **nenhuma remoção real de transação foi implementada no estado analisado**.

A futura implementação deverá definir claramente:

- qual transação está selecionada;
- confirmação antes da exclusão;
- atualização do Context;
- atualização dos totais;
- atualização do gráfico;
- atualização da lista;
- feedback visual.

Quando houver persistência/backend, a exclusão também deverá refletir na camada persistente.

---

# 24. Gráfico

O projeto utiliza **Recharts**.

O gráfico atual é do tipo rosca e compara:

- entradas;
- saídas.

Ele reage aos dados.

## Estado: PARCIAL

Existe uma inconsistência semântica:

o gráfico mostra **entradas versus saídas**, enquanto o título atual faz referência a **Categorias**.

Portanto, antes de considerar essa seção finalizada, decidir entre:

### Opção A

Manter o gráfico de entradas x saídas e corrigir o título.

### Opção B

Transformar o gráfico em uma visualização real por categorias.

Não alterar esse comportamento sem compreender qual direção de produto será adotada.

---

# 25. Persistência — AUSENTE

Este é um dos principais pontos pendentes.

Atualmente:

```text
Context API
     ↓
memória
     ↓
reload
     ↓
dados perdidos
```

Não existe:

- banco de dados;
- API;
- persistência permanente;
- autenticação;
- sessão de usuário.

## Evolução recomendada

Antes do backend definitivo, pode ser utilizada persistência local provisória para estabilizar o comportamento do MVP.

Depois:

```text
Frontend
    ↓
API
    ↓
Backend
    ↓
Banco de dados
```

A arquitetura definitiva ainda não está definida.

---

# 26. Backend — NÃO IMPLEMENTADO

O FinQuest atualmente é um MVP frontend.

Não existe backend funcional no estado analisado.

Também não existem:

- API de transações;
- banco de dados;
- autenticação;
- contas de usuário;
- sessão;
- autorização.

Qualquer implementação dessas funcionalidades deve ser considerada **nova etapa arquitetural**, e não continuação de algo já existente.

---

# 27. Responsividade

A interface possui várias decisões responsivas já desenvolvidas, especialmente no painel de opções.

Entretanto, a aplicação completa **ainda apresenta problemas importantes no mobile**.

O teste em viewport:

```text
390 x 844
```

identificou:

- overflow horizontal;
- componentes cortados;
- cabeçalho comprimido.

Portanto:

**não considerar o projeto totalmente responsivo neste momento.**

## Pontos que precisam ser revisados

Especialmente:

- largura mínima dos cards;
- cabeçalho;
- sidebar;
- espaçamentos;
- breakpoints;
- containers;
- possíveis `min-width`;
- elementos que forçam largura superior à viewport.

---

# 28. Navegação lateral

A navegação lateral está presente visualmente.

Porém os ícones/links identificados na análise utilizam destinos de placeholder.

Portanto a navegação ainda precisa ser conectada a rotas ou ações reais conforme a arquitetura final do produto.

O projeto já utiliza TanStack React Router, portanto qualquer expansão de navegação deve respeitar essa estrutura.

---

# 29. Qualidade técnica atual

## Build

**APROVADO**

O build de produção concluiu corretamente.

Na análise:

```text
571 módulos transformados
```

TypeScript e Vite finalizaram o processo.

---

# 30. ESLint

## Estado atual

**REPROVADO — 4 erros**

Os quatro erros encontrados estão relacionados à regra:

```text
react-refresh/only-export-components
```

Esses erros precisam ser investigados antes de simplesmente desabilitar a regra.

Possíveis soluções incluem:

- separar contextos e componentes;
- reorganizar exports;
- adequar arquivos ao padrão esperado pelo Fast Refresh;
- avaliar configuração específica do sistema de rotas.

---

# 31. Testes

Não existe atualmente suíte de testes automatizados configurada.

Também não existe script de testes identificado.

Antes de uma integração significativa com backend, é recomendado adicionar cobertura principalmente para:

- parser monetário;
- cálculos;
- cadastro;
- filtros;
- ordenação;
- manipulação das transações.

---

# 32. Acessibilidade

Existem melhorias de acessibilidade pendentes.

Entre elas:

- nomes acessíveis em botões representados apenas por ícones;
- associação correta entre labels e inputs;
- tratamento de painéis inativos na árvore de acessibilidade;
- navegação por teclado;
- foco em modais/painéis;
- semântica de elementos interativos.

Ao implementar novas funcionalidades, evitar aumentar essa dívida.

---

# 33. Acabamentos conhecidos

Também existem pendências menores de interface e acabamento:

- ponto e vírgula aparecendo/renderizado indevidamente em algum ponto da interface;
- idioma/textos a revisar;
- favicon;
- README anterior incompleto/desatualizado;
- título do gráfico inconsistente com os dados apresentados.

Esses itens têm prioridade inferior aos problemas funcionais.

---

# 34. Performance visual

A imagem de fundo atual possui aproximadamente:

```text
1,64 MB
```

É recomendável posteriormente:

- converter para formato mais eficiente;
- comprimir;
- avaliar resolução necessária;
- revisar impacto no carregamento inicial.

Essa otimização não deve ter prioridade sobre integridade de dados e funcionalidades principais.

---

# 35. Prioridades atuais

## P0 — Críticas

### 1. Modelagem monetária

Eliminar ambiguidades na representação dos valores.

### 2. Persistência

Impedir perda completa dos dados ao atualizar a página.

### 3. Responsividade mobile

Eliminar overflow horizontal e conteúdo cortado.

---

## P1 — Importantes

### Funcionalidades

Conectar:

- busca;
- período;
- ordenação;
- exclusão;
- histórico;
- exportação.

### Qualidade

- resolver os 4 erros de lint;
- adicionar testes automatizados.

---

## P2 — Acabamento

- acessibilidade;
- semântica;
- favicon;
- textos;
- título do gráfico;
- otimização das imagens;
- refinamentos visuais.

---

# 36. Roadmap recomendado

## Fase 1 — Estabilizar o núcleo

Objetivo: tornar os fundamentos confiáveis antes de expandir funcionalidades.

### Tarefas

- [ ] Padronizar representação monetária.
- [ ] Padronizar tratamento de datas.
- [ ] Corrigir responsividade mobile.
- [ ] Corrigir os quatro erros de lint.
- [ ] Adicionar persistência local provisória.
- [ ] Criar testes para cálculos.
- [ ] Criar testes para cadastro.
- [ ] Criar testes para filtros.

---

# 37. Fase 2 — Completar a experiência

Depois do núcleo estar estável:

- [ ] Implementar busca real.
- [ ] Implementar filtro por período.
- [ ] Implementar ordenação real.
- [ ] Exibir estado visual da ordenação selecionada.
- [ ] Implementar exclusão.
- [ ] Avaliar/implementar edição de transações.
- [ ] Implementar histórico completo.
- [ ] Implementar exportação CSV.
- [ ] Conectar navegação atualmente visual.
- [ ] Melhorar estados vazios.
- [ ] Melhorar feedbacks de interação.
- [ ] Melhorar acessibilidade.

---

# 38. Fase 3 — Preparar para produção

Somente após estabilizar o frontend:

- [ ] Definir arquitetura de backend.
- [ ] Definir banco de dados.
- [ ] Definir autenticação.
- [ ] Definir contrato da API.
- [ ] Migrar estado local para API.
- [ ] Implementar tratamento consistente de erros.
- [ ] Adicionar observabilidade.
- [ ] Adicionar CI.
- [ ] Otimizar imagens.
- [ ] Revisar tamanho dos bundles/pacotes.

---

# 39. Intenção de UX do projeto

O FinQuest não deve ser tratado apenas como um CRUD simples.

A intenção visual estabelecida durante o desenvolvimento é oferecer uma experiência próxima de uma aplicação financeira moderna.

Princípios já utilizados:

- interface escura;
- componentes com hierarquia visual clara;
- ícones Lucide;
- feedback visual;
- transições suaves;
- painéis contextuais;
- comportamento mobile semelhante a app;
- adaptação desktop;
- menus progressivos;
- separação entre ações comuns e destrutivas;
- destaque vermelho para exclusão;
- Chevron para indicar submenus;
- animações sem navegação abrupta quando apropriado.

Novos componentes devem tentar preservar essa linguagem visual.

---

# 40. Princípios arquiteturais já adotados

Durante o desenvolvimento houve esforço para evitar componentes monolíticos.

Exemplo:

Em vez de concentrar toda a lógica visual em:

```text
TransactionBottomSheet
```

foram separados componentes como:

```text
TransactionBottomSheet
CarouselOptions
ChangeSortOrder
BottomPanelHeader
```

A comunicação entre filho e pai utiliza callbacks.

Princípio:

```text
Estado compartilhado importante
        ↓
fica no ancestral apropriado
        ↓
filhos recebem dados e callbacks
```

Continuar seguindo esse padrão quando fizer sentido.

Evitar abstrações prematuras para componentes utilizados apenas uma vez e sem complexidade suficiente para justificar separação.

---

# 41. Regras importantes para futuras alterações

## Para OpenCode / agentes de IA

Ao trabalhar neste projeto:

### 1. Não assumir que uma interface visual está funcional

Antes de alterar algo, verificar o handler e o fluxo de dados.

Especialmente:

```text
Busca
Período
Ordenação
Histórico
Exportação
Excluir
Navegação lateral
```

Atualmente essas áreas possuem funcionalidades ausentes ou incompletas.

### 2. Não inventar backend

O projeto ainda não possui backend.

### 3. Não substituir Context API sem necessidade

Context API é a arquitetura atual.

Uma migração de estado deve ser uma decisão explícita.

### 4. Preservar funcionalidades existentes

Mudanças não devem quebrar:

- cadastro;
- validação;
- cálculo das entradas;
- cálculo das saídas;
- saldo;
- lista;
- filtro por tipo;
- atualização reativa.

### 5. Verificar responsividade

Toda mudança visual deve ser conferida pelo menos em:

```text
Mobile
Desktop
```

### 6. Não confundir UI pronta com feature pronta

Um botão existir não significa que a funcionalidade esteja implementada.

### 7. Preferir mudanças pequenas e verificáveis

Evitar grandes refatorações simultâneas sem necessidade.

### 8. Executar verificações depois de alterações relevantes

Idealmente:

```bash
npm run build
npm run lint
```

e testar o fluxo afetado no navegador.

Se houver outros scripts no `package.json`, verificar antes de executar comandos adicionais.

---

# 42. Fluxo esperado ao implementar filtros

Quando busca, período e ordenação forem implementados, evitar múltiplas fontes conflitantes de verdade.

Conceitualmente, deve existir uma composição previsível:

```text
transactions
     ↓
filterByType
     ↓
filterByPeriod
     ↓
filterBySearch
     ↓
sortTransactions
     ↓
visibleTransactions
```

Isso é uma **direção arquitetural recomendada**, não uma implementação existente.

Antes de implementar, analisar como o Context e os componentes atuais estão estruturados.

---

# 43. Fluxo esperado para exclusão

Conceitualmente:

```text
Usuário seleciona transação
        ↓
Abre painel de opções
        ↓
Excluir
        ↓
Confirmação
        ↓
removeTransaction(id)
        ↓
Estado atualizado
        ↓
Totais recalculados
        ↓
Gráfico atualizado
        ↓
Lista atualizada
```

Esse fluxo é **planejado**.

No estado atual, a exclusão ainda não está implementada.

---

# 44. Fluxo esperado para persistência

## Etapa provisória

```text
Context
   ↕
Persistência local
```

## Etapa futura

```text
React
   ↓
Camada de acesso aos dados
   ↓
API
   ↓
Backend
   ↓
Banco de dados
```

Evitar acoplar componentes visuais diretamente ao mecanismo de persistência sempre que possível.

---

# 45. Estado funcional resumido

| Funcionalidade | Estado atual |
|---|---|
| Cadastro de transação | ✅ Funciona |
| Validação com Zod | ✅ Funciona |
| Totais | ✅ Funciona |
| Saldo | ✅ Funciona |
| Lista de transações | ✅ Funciona |
| Filtro Entradas/Saídas/Todas | ✅ Funciona |
| Gráfico | 🟡 Parcial |
| Filtro por período | 🟠 Somente visual |
| Ordenação | 🟠 Somente visual |
| Busca | 🟠 Somente visual |
| Histórico completo | 🟠 Somente visual |
| Exportação CSV | 🟠 Somente visual |
| Exclusão | 🟠 Somente visual |
| Navegação lateral | 🟠 Somente visual/placeholder |
| Persistência | ❌ Ausente |
| Backend | ❌ Ausente |
| Banco de dados | ❌ Ausente |
| Autenticação | ❌ Ausente |
| Testes automatizados | ❌ Ausentes |
| Build de produção | ✅ Aprovado |
| Lint | ❌ 4 erros |
| Responsividade mobile global | ❌ Possui problemas |

---

# 46. Diagnóstico técnico de referência

A análise técnica mais recente utilizada para atualizar este contexto foi realizada em:

```text
Data: 24 de agosto de 2026
Branch: main
Commit analisado: 7011dbc
```

Foram analisados aproximadamente:

```text
24 arquivos de código
~1.338 linhas
```

Além de:

- histórico recente do Git;
- configuração;
- build;
- lint;
- aplicação executada no navegador;
- fluxos funcionais;
- viewport mobile.

Nenhum código-fonte foi alterado durante essa análise.

O arquivo gerado:

```text
src/router-tree-gen.ts
```

já aparecia modificado no início da análise e permaneceu nessa condição.

---

# 47. Estado do projeto no momento deste documento

A maneira correta de entender o FinQuest atualmente é:

> O FinQuest já possui um núcleo funcional de cadastro e visualização de transações financeiras. As transações alimentam o estado global e atualizam totais, saldo, gráfico e lista reativamente. O filtro por tipo também está funcional.
>
> Ao mesmo tempo, uma parte significativa da experiência avançada já foi desenhada visualmente, mas ainda não está conectada à lógica real: busca, período, ordenação, histórico, exportação, exclusão e parte da navegação.
>
> O projeto ainda não possui persistência, backend, banco de dados ou autenticação. Também existem problemas de responsividade mobile, modelagem monetária, lint e ausência de testes.
>
> Portanto, o próximo objetivo não deve ser adicionar indiscriminadamente novas funcionalidades. Primeiro deve-se estabilizar a base atual e, em seguida, transformar progressivamente os controles visuais existentes em funcionalidades reais.

---

# 48. Orientação final para o OpenCode

Se você é um agente de IA trabalhando neste repositório:

1. **Leia este documento inteiro antes de propor mudanças grandes.**
2. **Inspecione os arquivos reais envolvidos antes de editar.**
3. Use este README como contexto de intenção e estado conhecido, mas considere **o código atual como fonte final da verdade** caso o repositório tenha evoluído depois da data deste documento.
4. Diferencie sempre:
   - funcionalidade implementada;
   - implementação parcial;
   - interface visual;
   - funcionalidade planejada.
5. Não marque uma tarefa como concluída apenas porque o componente visual existe.
6. Preserve a arquitetura e linguagem visual existentes quando não houver motivo técnico para substituí-las.
7. Evite reescrever partes funcionais do projeto apenas para implementar uma pequena feature.
8. Faça alterações incrementais e verificáveis.
9. Após cada alteração relevante, confira erros de TypeScript, build, lint e comportamento no navegador.
10. Se encontrar divergência entre este documento e o código atual, **investigue o código e atualize este documento para que ele não volte a ficar defasado**.

---

# 49. Próximo passo recomendado

A prioridade imediata recomendada é estabilizar o núcleo antes de expandir o MVP.

Sequência sugerida:

```text
1. Corrigir modelagem monetária
          ↓
2. Corrigir problemas críticos de responsividade
          ↓
3. Resolver erros de lint
          ↓
4. Adicionar persistência provisória
          ↓
5. Criar testes do núcleo
          ↓
6. Implementar busca
          ↓
7. Implementar período
          ↓
8. Implementar ordenação
          ↓
9. Implementar exclusão
          ↓
10. Implementar histórico/exportação
          ↓
11. Consolidar UX e acessibilidade
          ↓
12. Planejar backend + banco + autenticação
```

Essa sequência pode ser adaptada conforme as prioridades de desenvolvimento, mas problemas de integridade de dados e responsividade devem receber prioridade sobre funcionalidades cosméticas.

---

**Última atualização de contexto:** 24/08/2026  
**Projeto:** FinQuest  
**Estado:** MVP frontend funcional em desenvolvimento  
**Referência técnica:** branch `main`, commit `7011dbc`