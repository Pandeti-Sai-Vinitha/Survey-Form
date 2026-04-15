interface RespondentFormProps {
  name: string;
  projectName: string;
  onNameChange: (value: string) => void;
  onProjectChange: (value: string) => void;
  onSubmit: () => void;
}

export default function RespondentForm({
  name,
  projectName,
  onNameChange,
  onProjectChange,
  onSubmit
}: RespondentFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full mb-6">
            <span className="text-accent tracking-wide uppercase text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              Step 1 of 2
            </span>
          </div>
          <h2 className="text-[3rem] leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome to the AI Adoption Assessment
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Please provide your details to begin the survey. This assessment will help us understand your organization's AI integration journey.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-foreground">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="e.g., John Smith"
              />
            </div>

            <div>
              <label htmlFor="project" className="block mb-2 text-foreground">
                Project Name
              </label>
              <input
                id="project"
                type="text"
                value={projectName}
                onChange={(e) => onProjectChange(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="e.g., Enterprise Platform Modernization"
              />
            </div>

            <button
              onClick={onSubmit}
              disabled={!name.trim() || !projectName.trim()}
              className="w-full mt-8 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
            >
              Begin Assessment
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          This survey contains approximately 20 questions across 4 key dimensions • Estimated time: 8-10 minutes
        </p>
      </div>
    </div>
  );
}
