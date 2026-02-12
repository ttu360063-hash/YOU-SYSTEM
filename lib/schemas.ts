import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const companyProfileSchema = z.object({
  companyName: z.string().min(2),
  businessType: z.enum([
    "Comercio de produtos fisicos",
    "Prestacao de servicos",
    "Comercio digital",
    "Restaurante / Alimentacao",
    "Outro",
  ]),
  operationMode: z.enum([
    "Loja fisica",
    "Online",
    "Atendimento presencial",
    "Atendimento remoto",
  ]),
  offers: z.enum(["Produtos", "Servicos", "Produtos e servicos"]),
  companySize: z.enum([
    "Apenas eu",
    "2 a 5 pessoas",
    "6 a 20 pessoas",
    "Mais de 20 pessoas",
  ]),
  mainArea: z.enum([
    "Vendas",
    "Financeiro",
    "Clientes",
    "Operacoes / Processos",
    "Tudo e importante",
  ]),
});

export const layoutPreferencesSchema = z.object({
  theme: z.enum(["claro", "escuro"]),
  navigation: z.enum(["sidebar", "topbar"]),
  cardStyle: z.enum(["round", "square"]),
  density: z.enum(["minimal", "advanced"]),
  iconStyle: z.enum(["simple", "detailed"]),
});
