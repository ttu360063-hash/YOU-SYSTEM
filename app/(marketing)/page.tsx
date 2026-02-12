import Link from "next/link";
import { AnimatedLogo } from "@/components/marketing/animated-logo";

export default function MarketingPage() {
  const features = [
    {
      icon: "◻",
      title: "Sistema adaptavel ao seu negocio",
      text: "Ajusta-se automaticamente as necessidades especificas da sua empresa.",
    },
    {
      icon: "⚡",
      title: "Interface simples e intuitiva",
      text: "Facil de usar, sem complicacoes. Comece a trabalhar em minutos.",
    },
    {
      icon: "◍",
      title: "Dados seguros e isolados por empresa",
      text: "Seus dados sao exclusivos e protegidos. Seguranca total garantida.",
    },
    {
      icon: "✦",
      title: "Assistente inteligente integrado",
      text: "IA que aprende com seu negocio e oferece insights valiosos.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#efefef] text-ink-900">
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-14 text-center sm:pb-16 sm:pt-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <AnimatedLogo />
          <p className="mx-auto max-w-2xl text-xl tracking-[0.22em] text-ink-900 sm:text-2xl">
            SEU NEGOCIO. SEU SISTEMA.
          </p>
          <p className="mx-auto max-w-2xl text-xl text-ink-700">
            Um sistema de gestao inteligente que se adapta a forma como sua empresa trabalha.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/register" className="btn btn-primary px-8 py-3 text-base">
              Comecar agora
            </Link>
            <Link href="/login" className="btn btn-secondary px-8 py-3 text-base">
              Entrar
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-mist-300 bg-[#f2f2f2] px-7 py-8 shadow-edge"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-mist-200 text-lg text-ink-700">
                {item.icon}
              </div>
              <h3 className="section-title text-2xl font-semibold leading-tight">{item.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-mist-300 py-9 text-center text-sm tracking-wide text-ink-600">
        © 2025 You System. Todos os direitos reservados.
      </footer>
    </main>
  );
}
