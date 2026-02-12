import { CompanyProfile } from "@prisma/client";

export type ModuleKey =
  | "vendas"
  | "produtos"
  | "servicos"
  | "financeiro"
  | "clientes"
  | "operacoes";

export function computeModules(profile: CompanyProfile): ModuleKey[] {
  const modules = new Set<ModuleKey>();

  switch (profile.businessType) {
    case "Prestacao de servicos":
      modules.add("servicos");
      modules.add("clientes");
      modules.add("financeiro");
      break;
    case "Comercio de produtos fisicos":
      modules.add("produtos");
      modules.add("vendas");
      modules.add("financeiro");
      modules.add("clientes");
      break;
    case "Comercio digital":
      modules.add("produtos");
      modules.add("vendas");
      modules.add("financeiro");
      modules.add("clientes");
      break;
    case "Restaurante / Alimentacao":
      modules.add("produtos");
      modules.add("vendas");
      modules.add("operacoes");
      modules.add("financeiro");
      break;
    default:
      modules.add("operacoes");
      modules.add("financeiro");
      modules.add("clientes");
      break;
  }

  if (profile.offers === "Produtos") {
    modules.add("produtos");
    modules.add("vendas");
  }

  if (profile.offers === "Servicos") {
    modules.add("servicos");
  }

  if (profile.offers === "Produtos e servicos") {
    modules.add("produtos");
    modules.add("servicos");
    modules.add("vendas");
  }

  if (profile.mainArea === "Operacoes / Processos") {
    modules.add("operacoes");
  }

  return Array.from(modules);
}
