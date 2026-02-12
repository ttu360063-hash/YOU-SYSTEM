"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    await signIn("email", { email, redirect: false });
    setMessage("Se o email existir, enviamos um link para acesso.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title text-2xl font-semibold">Recuperar senha</h2>
        <p className="text-sm text-ink-700">Enviaremos um link de acesso para seu email.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">Enviar link</Button>
      </form>
      {message && <p className="text-sm text-ink-700">{message}</p>}
    </div>
  );
}
