interface Choice {
  id: string;
  label: string;
  description: string;
}

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  choices: Choice[];
  selectedChoice: string | null;
  onSelectChoice: (choiceId: string) => void;
  dimensionName: string;
}

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  choices,
  selectedChoice,
  onSelectChoice,
  dimensionName
}: QuestionCardProps) {
  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      {/* Question Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl leading-none text-accent/20"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {questionNumber.toString().padStart(2, '0')}
            </span>
            <span className="text-muted-foreground text-xs mb-1">
              / {totalQuestions.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex-1 pt-8">
            <div className="inline-block px-2 py-0.5 bg-accent/10 rounded-full">
              <span className="text-accent text-[10px] tracking-wider uppercase">
                {dimensionName}
              </span>
            </div>
          </div>
        </div>

        <h2
          className="text-base leading-[1.3] text-foreground max-w-xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {question}
        </h2>
      </div>

      {/* Choices */}
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <button
            key={choice.id}
            onClick={() => onSelectChoice(choice.id)}
            className={`
              w-full text-left p-3 rounded-lg border-2 transition-all duration-300
              hover:border-accent hover:shadow-md
              ${selectedChoice === choice.id
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-border bg-card hover:bg-secondary/50'
              }
            `}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'slideIn 0.4s ease-out forwards',
              opacity: 0
            }}
          >
            <div className="flex gap-4 items-start">
              <div className={`
                flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                ${selectedChoice === choice.id
                  ? 'border-accent bg-accent text-white'
                  : 'border-muted-foreground/30 text-muted-foreground'
                }
              `}>
                <span className="text-xs" style={{ fontFamily: 'var(--font-display)' }}>
                  {choice.label}
                </span>
              </div>
              <div className="flex-1 pt-1.5">
                <p className="text-xs text-foreground leading-snug">
                  {choice.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
