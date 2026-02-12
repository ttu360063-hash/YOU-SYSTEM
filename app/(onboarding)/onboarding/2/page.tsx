"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export default function OnboardingStep2() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    theme: "claro",
    navigation: "sidebar",
    cardStyle: "round",
    density: "minimal",
    iconStyle: "simple",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/onboarding/step2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError("Erro ao salvar preferencias.");
      setLoading(false);
      return;
    }
    router.push("/onboarding/3");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title text-2xl font-semibold">Etapa 2 - Preferencias de layout</h2>
        <p className="text-sm text-ink-700">Defina o estilo visual do seu sistema.</p>
      </div>
      {error && <div className="rounded-xl bg-ink-900 px-4 py-2 text-sm text-white">{error}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Select value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })}>
          <option value="claro">Layout claro</option>
          <option value="escuro">Layout escuro</option>
        </Select>
        <Select value={form.navigation} onChange={(e) => setForm({ ...form, navigation: e.target.value })}>
          <option value="sidebar">Sidebar lateral</option>
          <option value="topbar">Barra superior</option>
        </Select>
        <Select value={form.cardStyle} onChange={(e) => setForm({ ...form, cardStyle: e.target.value })}>
          <option value="round">Cards redondos</option>
          <option value="square">Cards quadrados</option>
        </Select>
        <Select value={form.density} onChange={(e) => setForm({ ...form, density: e.target.value })}>
          <option value="minimal">Layout minimalista</option>
          <option value="advanced">Layout avancado</option>
        </Select>
        <Select value={form.iconStyle} onChange={(e) => setForm({ ...form, iconStyle: e.target.value })}>
          <option value="simple">Icones simples</option>
          <option value="detailed">Icones detalhados</option>
        </Select>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Salvando..." : "Continuar"}
        </Button>
      </form>
    </div>
  );
}
