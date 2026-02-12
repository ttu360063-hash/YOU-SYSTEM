import crypto from "crypto";
import type { CompanyProfile, LayoutPreferences } from "@prisma/client";

export type LayoutConfig = {
  id: string;
  layoutHash: string;
  navigation: "sidebar-small" | "sidebar-large" | "topbar" | "expansive";
  cards: "grid" | "list" | "dual" | "mosaic";
  density: "minimal" | "advanced";
  cardStyle: "round" | "square";
  theme: "claro" | "escuro";
  widgets: Array<{
    key: string;
    title: string;
    description: string;
    span?: "wide" | "tall" | "normal";
  }>;
  highlights: string[];
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(list: readonly T[], rand: () => number) {
  return list[Math.floor(rand() * list.length)];
}

function shuffle<T>(list: readonly T[], rand: () => number) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function hashLayout(input: object) {
  return crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex");
}

export function generateLayout(
  profile: CompanyProfile,
  prefs: LayoutPreferences,
  existingHashes: string[]
): LayoutConfig {
  const seed = crypto.randomBytes(8).readUInt32LE(0);
  const rand = mulberry32(seed);

  const navigationOptions: readonly LayoutConfig["navigation"][] =
    prefs.navigation === "topbar"
      ? ["topbar", "expansive"]
      : ["sidebar-small", "sidebar-large"];

  const cardsOptions = ["grid", "list", "dual", "mosaic"] as const;
  const density: LayoutConfig["density"] = prefs.density === "advanced" ? "advanced" : "minimal";
  const cardStyle: LayoutConfig["cardStyle"] = prefs.cardStyle === "square" ? "square" : "round";
  const theme: LayoutConfig["theme"] = prefs.theme === "escuro" ? "escuro" : "claro";

  const widgetsBase = [
    { key: "finance", title: "Resumo financeiro", description: "Entradas, saidas e fluxo de caixa." },
    { key: "customers", title: "Clientes ativos", description: "Relacionamento e historico de compras." },
    { key: "operations", title: "Operacoes", description: "Tarefas, projetos e checklists." },
    { key: "performance", title: "Performance", description: "Indicadores do negocio." },
  ];

  const widgetsByArea: Record<string, LayoutConfig["widgets"]> = {
    "Vendas": [
      { key: "sales-chart", title: "Grafico de vendas", description: "Acompanhe o desempenho." },
      { key: "top-products", title: "Produtos mais vendidos", description: "Ranking e giro." },
      { key: "sales-pipeline", title: "Funil comercial", description: "Oportunidades em aberto." },
    ],
    "Financeiro": [
      { key: "cash-flow", title: "Fluxo de caixa", description: "Entradas e saidas diarias." },
      { key: "payables", title: "Contas a pagar", description: "Calendario financeiro." },
      { key: "receivables", title: "Contas a receber", description: "Previsao de receita." },
    ],
    "Clientes": [
      { key: "crm", title: "Visao de clientes", description: "Segmentos e engajamento." },
      { key: "feedback", title: "Feedback recente", description: "Voce ouviu seus clientes?" },
      { key: "support", title: "Chamados", description: "Historico de suporte." },
    ],
    "Operacoes / Processos": [
      { key: "tasks", title: "Quadro de tarefas", description: "Acompanhe o time." },
      { key: "projects", title: "Projetos ativos", description: "Cronogramas e prioridades." },
      { key: "checklists", title: "Checklists", description: "Rotinas essenciais." },
    ],
    "Tudo e importante": [
      { key: "overview", title: "Visao geral", description: "Resumo completo." },
      { key: "insights", title: "Insights", description: "Tendencias do negocio." },
      { key: "alerts", title: "Alertas", description: "O que precisa de atencao." },
    ],
  };

  const offersWidgets: Record<string, LayoutConfig["widgets"]> = {
    "Produtos": [
      { key: "inventory", title: "Estoque", description: "Niveis e reposicoes." },
      { key: "suppliers", title: "Fornecedores", description: "Relacionamentos ativos." },
    ],
    "Servicos": [
      { key: "agenda", title: "Agenda", description: "Atendimentos e horarios." },
      { key: "orders", title: "Ordens de servico", description: "Status e prazos." },
    ],
    "Produtos e servicos": [
      { key: "inventory", title: "Estoque", description: "Produtos e reposicoes." },
      { key: "agenda", title: "Agenda", description: "Servicos em andamento." },
    ],
  };

  let candidate: LayoutConfig;
  let attempts = 0;

  do {
    attempts += 1;
    const navigation = pick(navigationOptions, rand);
    const cards = pick(cardsOptions, rand);
    const baseWidgets = shuffle(widgetsBase, rand).slice(0, 2);
    const areaWidgets = widgetsByArea[profile.mainArea] || widgetsByArea["Tudo e importante"];
    const offerWidgets = offersWidgets[profile.offers] || [];

    const widgets = shuffle(
      [...baseWidgets, ...areaWidgets, ...offerWidgets],
      rand
    ).slice(0, density === "minimal" ? 6 : 9);

    const highlights = shuffle(
      [
        profile.businessType,
        profile.mainArea,
        profile.companySize,
        profile.operationMode,
      ],
      rand
    ).slice(0, 3);

    const layoutSeed = {
      navigation,
      cards,
      density,
      cardStyle,
      theme,
      widgets: widgets.map((w) => w.key),
    };

    const layoutHash = hashLayout(layoutSeed);
    candidate = {
      id: crypto.randomUUID(),
      layoutHash,
      navigation,
      cards,
      density,
      cardStyle,
      theme,
      widgets,
      highlights,
    };
  } while (existingHashes.includes(candidate.layoutHash) && attempts < 12);

  return candidate!;
}
