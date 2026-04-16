export default function SurveyHeader() {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            AI Adoption Assessment
          </h1>
          <span className="text-muted-foreground">2026</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground max-w-1xl">
          A comprehensive evaluation of artificial intelligence integration in software development practices
        </p>
      </div>
    </header>
  );
}
