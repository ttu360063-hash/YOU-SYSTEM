"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function OnboardingStep1() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    companyName: "",
    businessType: "Comercio de produtos fisicos",
    operationMode: "Loja fisica",
    offers: "Produtos",
    companySize: "Apenas eu",
    mainArea: "Vendas",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/onboarding/step1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError("Preencha todos os campos corretamente.");
      setLoading(false);
      return;
    }
    router.push("/onboarding/2");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title text-2xl font-semibold">Etapa 1 - Informacoes da empresa</h2>
        <p className="text-sm text-ink-700">Conte-nos sobre seu negocio.</p>
      </div>
      {error && <div className="rounded-xl bg-ink-900 px-4 py-2 text-sm text-white">{error}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Qual e o nome da empresa?"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          required
        />
        <Select value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })}>
          <option>Comercio de produtos fisicos</option>
          <option>Prestacao de servicos</option>
          <option>Comercio digital</option>
          <option>Restaurante / Alimentacao</option>
          <option>Outro</option>
        </Select>
        <Select value={form.operationMode} onChange={(e) => setForm({ ...form, operationMode: e.target.value })}>
          <option>Loja fisica</option>
          <option>Online</option>
          <option>Atendimento presencial</option>
          <option>Atendimento remoto</option>
        </Select>
        <Select value={form.offers} onChange={(e) => setForm({ ...form, offers: e.target.value })}>
          <option>Produtos</option>
          <option>Servicos</option>
          <option>Produtos e servicos</option>
        </Select>
        <Select value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })}>
          <option>Apenas eu</option>
          <option>2 a 5 pessoas</option>
          <option>6 a 20 pessoas</option>
          <option>Mais de 20 pessoas</option>
        </Select>
        <Select value={form.mainArea} onChange={(e) => setForm({ ...form, mainArea: e.target.value })}>
          <option>Vendas</option>
          <option>Financeiro</option>
          <option>Clientes</option>
          <option>Operacoes / Processos</option>
          <option>Tudo e importante</option>
        </Select>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Salvando..." : "Continuar"}
        </Button>
      </form>
    </div>
  );
}
