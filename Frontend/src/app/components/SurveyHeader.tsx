export default function SurveyHeader() {
  return (
    <header className="border-b border-border bg-card px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-3">
          <h1 className="text-[2.5rem] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            AI Adoption Assessment
          </h1>
          <span className="text-muted-foreground">2026</span>
        </div>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          A comprehensive evaluation of artificial intelligence integration in software development practices
        </p>
      </div>
    </header>
  );
}
