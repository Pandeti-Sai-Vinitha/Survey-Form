interface Dimension {
  id: number;
  name: string;
  questionCount: number;
  completed: number;
}

interface DimensionNavProps {
  dimensions: Dimension[];
  currentDimension: number;
}

export default function DimensionNav({ dimensions, currentDimension }: DimensionNavProps) {
  return (
    <nav className="space-y-2">
      <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 px-4">
        Dimensions
      </h3>
      {dimensions.map((dimension) => {
        const progress = (dimension.completed / dimension.questionCount) * 100;
        const isActive = dimension.id === currentDimension;

        return (
          <div
            key={dimension.id}
            className={`
              px-4 py-3 rounded-lg transition-all
              ${isActive ? 'bg-accent/10' : 'hover:bg-secondary'}
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm
                ${isActive ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}
              `} style={{ fontFamily: 'var(--font-display)' }}>
                {dimension.id}
              </div>
              <div className="flex-1">
                <div className={`text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {dimension.name}
                </div>
              </div>
            </div>
            <div className="ml-11">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span>{dimension.completed}/{dimension.questionCount}</span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
