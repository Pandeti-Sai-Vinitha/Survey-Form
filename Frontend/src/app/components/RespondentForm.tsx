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
    <div className="min-h-0 flex flex-col items-center px-2 pt-8 md:pt-12 pb-8">
      <div className="max-w-md w-full">
          <div className="text-center mb-8 mt-0">
          <div className="inline-block px-3 py-1 bg-accent/10 rounded-full mb-2 mt-0">
            <span className="text-accent tracking-wide uppercase text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              Step 1 of 2
            </span>
          </div>
          <h2 className="text-2xl leading-tight mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome to the AI Adoption Assessment
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            Please provide your details to begin the survey. This assessment will help us understand your organization's AI integration journey.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 text-foreground text-xs">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                className="w-full px-3 py-2 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent transition-all text-xs"
                placeholder="e.g., John Smith"
              />
            </div>

            <div>
              <label htmlFor="project" className="block mb-1 text-foreground text-xs">
                Project Name
              </label>
              <input
                id="project"
                type="text"
                value={projectName}
                onChange={(e) => onProjectChange(e.target.value)}
                className="w-full px-3 py-2 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent transition-all text-xs"
                placeholder="e.g., Enterprise Platform Modernization"
              />
            </div>

            <button
              onClick={onSubmit}
              disabled={!name.trim() || !projectName.trim()}
              className="w-full mt-4 px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Begin Assessment
            </button>
          </div>
        </div>

        <p className="text-center mt-4 text-[11px] text-muted-foreground">
          This survey contains approximately 20 questions across 4 key dimensions • Estimated time: 8-10 minutes
        </p>
      </div>
    </div>
  );
}
