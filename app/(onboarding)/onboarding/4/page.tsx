"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutPreview } from "@/components/layout/layout-preview";
import type { LayoutConfig } from "@/lib/layout-generator";

export default function OnboardingStep4() {
  const router = useRouter();
  const search = useSearchParams();
  const candidateId = search.get("candidate");
  const [layout, setLayout] = useState<LayoutConfig | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!candidateId) return;
    fetch(`/api/layouts/candidate?id=${candidateId}`)
      .then((res) => res.json())
      .then((data) => setLayout(data as LayoutConfig));
  }, [candidateId]);

  async function confirm() {
    if (!candidateId) return;
    setLoading(true);
    const res = await fetch("/api/onboarding/step4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateId }),
    });
    if (res.ok) {
      router.push("/dashboard");
      return;
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="section-title text-2xl font-semibold">Etapa 4 - Aprovar layout</h2>
        <p className="text-sm text-ink-700">Confirme o layout para gerar seu sistema.</p>
      </div>

      {layout ? <LayoutPreview layout={layout} /> : <p>Carregando layout...</p>}

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={confirm} disabled={loading}>
          {loading ? "Confirmando..." : "Confirmar layout"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push("/onboarding/3")}>
          Gerar outro novamente
        </Button>
      </div>
    </div>
  );
}
