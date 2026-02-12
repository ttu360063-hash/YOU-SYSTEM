export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-mist-50">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-2">
          <div className="hidden flex-col justify-center space-y-4 lg:flex">
            <img
              src="/logo-ys.png"
              alt="You System"
              className="h-16 w-16 object-contain"
            />
            <h1 className="section-title text-3xl font-semibold">Seu negocio. Seu sistema.</h1>
            <p className="text-sm text-ink-700">
              Crie um sistema totalmente adaptado ao seu negocio e mantenha cada conta isolada.
            </p>
          </div>
          <div className="card p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
