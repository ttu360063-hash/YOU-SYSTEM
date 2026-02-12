"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutPreview } from "@/components/layout/layout-preview";
import type { LayoutConfig } from "@/lib/layout-generator";

export default function OnboardingStep3() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState<LayoutConfig | null>(null);
  const [candidateId, setCandidateId] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/onboarding/step3", { method: "POST" });
    const data = await res.json();
    setLayout(data.layout);
    setCandidateId(data.candidateId);
    setLoading(false);
  }

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title text-2xl font-semibold">Etapa 3 - Gerar layout dinamico</h2>
        <p className="text-sm text-ink-700">
          Cada geracao cria um layout 100% novo com base no seu perfil.
        </p>
      </div>

      {layout ? <LayoutPreview layout={layout} /> : <p>Gerando layout...</p>}

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={generate} disabled={loading}>
          {loading ? "Gerando..." : "Gerar outro modelo"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (candidateId) router.push(`/onboarding/4?candidate=${candidateId}`);
          }}
          disabled={!candidateId}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
