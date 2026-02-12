"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = { role: "user" | "assistant"; content: string };

export default function AssistentePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Ola! Sou o assistente do You System. Como posso ajudar?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/assistente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage.content }),
    });
    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply || "Ainda estou configurando." },
    ]);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="section-title text-2xl font-semibold">Assistente IA</h1>
      <div className="card flex h-[60vh] flex-col gap-4 p-6">
        <div className="flex-1 space-y-3 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={`${msg.role}-${index}`}
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "user" ? "ml-auto bg-ink-900 text-white" : "bg-mist-100 text-ink-900"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte algo sobre seu negocio..."
          />
          <Button type="button" onClick={sendMessage} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
