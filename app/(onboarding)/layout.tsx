export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-mist-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <img src="/logo-ys.png" alt="You System" className="h-12" />
        </div>
        <div className="card p-8">{children}</div>
      </div>
    </div>
  );
}
