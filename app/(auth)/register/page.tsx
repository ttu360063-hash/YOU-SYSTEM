"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Erro ao criar conta.");
      setLoading(false);
      return;
    }

    setSuccess("Conta criada. Entre com seu email e senha.");
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title text-2xl font-semibold">Criar conta</h2>
        <p className="text-sm text-ink-700">Configure sua conta para iniciar o onboarding.</p>
      </div>

      {error && <div className="rounded-xl bg-ink-900 px-4 py-2 text-sm text-white">{error}</div>}
      {success && <div className="rounded-xl bg-mist-200 px-4 py-2 text-sm text-ink-900">{success}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="Senha (min 8 caracteres)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Criando..." : "Criar conta"}
        </Button>
      </form>

      <div className="text-sm text-ink-700">
        Ja tem conta? <Link href="/login" className="hover:text-ink-900">Entrar</Link>
      </div>
    </div>
  );
}
