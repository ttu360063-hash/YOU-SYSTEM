"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Credenciais invalidas.");
      setLoading(false);
      return;
    }
    router.push("/onboarding/1");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title text-2xl font-semibold">Entrar</h2>
        <p className="text-sm text-ink-700">Acesse sua conta para continuar.</p>
      </div>

      {error && <div className="rounded-xl bg-ink-900 px-4 py-2 text-sm text-white">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => signIn("google", { callbackUrl: "/onboarding/1" })}
      >
        Entrar com Google
      </Button>

      <div className="flex items-center justify-between text-sm text-ink-700">
        <Link href="/forgot" className="hover:text-ink-900">Esqueci minha senha</Link>
        <Link href="/register" className="hover:text-ink-900">Criar conta</Link>
      </div>
    </div>
  );
}
