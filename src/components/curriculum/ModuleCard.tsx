import { ArrowRight, LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  codePreview: string[];
  estimatedTime?: string;
}

const ModuleCard = ({ icon: Icon, title, description, difficulty, codePreview, estimatedTime }: ModuleCardProps) => {
  const badgeClass = {
    beginner: 'badge-beginner',
    intermediate: 'badge-intermediate',
    advanced: 'badge-advanced',
  }[difficulty];

  const badgeLabel = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }[difficulty];

  return (
    <div className="group rounded-2xl bg-card border border-border p-6 card-hover-glow flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-secondary group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <span className={badgeClass}>{badgeLabel}</span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{description}</p>

      {/* Code Preview */}
      <div className="rounded-lg bg-[#1e1e1e] border border-border p-3 mb-4 font-mono text-xs overflow-hidden">
        {codePreview.map((line, i) => (
          <div key={i} className="truncate">
            {line.includes('class') && (
              <>
                <span className="syntax-keyword">class</span>
                <span className="syntax-class">{line.replace('class', '').replace(':', '')}</span>
                <span className="text-foreground">:</span>
              </>
            )}
            {line.includes('def') && (
              <>
                <span className="text-muted-foreground">  </span>
                <span className="syntax-keyword">def</span>
                <span className="syntax-function">{line.replace('def', '').replace(':', '')}</span>
                <span className="text-foreground">:</span>
              </>
            )}
            {line.includes('#') && (
              <span className="syntax-comment">{line}</span>
            )}
            {!line.includes('class') && !line.includes('def') && !line.includes('#') && (
              <span className="text-muted-foreground">{line}</span>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        {estimatedTime && (
          <span className="text-xs text-muted-foreground">{estimatedTime}</span>
        )}
        <button className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors ml-auto">
          Learn more
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;
