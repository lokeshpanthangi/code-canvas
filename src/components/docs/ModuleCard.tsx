import { ArrowRight, Clock, LucideIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  codePreview: string[];
  estimatedTime?: string;
  viewMode?: 'grid' | 'list';
}

const ModuleCard = ({ icon: Icon, title, description, difficulty, codePreview, estimatedTime, viewMode = 'grid' }: ModuleCardProps) => {
  const { theme } = useTheme();
  const badgeStyles = {
    beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    advanced: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  }[difficulty];

  const badgeLabel = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }[difficulty];

  const gradientOverlay = {
    beginner: 'from-emerald-500/10 to-transparent',
    intermediate: 'from-amber-500/10 to-transparent',
    advanced: 'from-purple-500/10 to-transparent',
  }[difficulty];

  // List view layout
  if (viewMode === 'list') {
    return (
      <div className="group relative rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden cursor-pointer hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <div className="relative z-10 p-6 flex items-center gap-6">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-muted-foreground" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold text-foreground truncate">{title}</h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium shrink-0 ${badgeStyles}`}>
                {badgeLabel}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-6 shrink-0">
            {estimatedTime && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{estimatedTime}</span>
              </div>
            )}
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  // Grid view layout (default)
  return (
    <div className="group relative rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden flex flex-col cursor-pointer hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-muted-foreground" />
          </div>
          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${badgeStyles}`}>
            {badgeLabel}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Code Preview */}
        <div className={`rounded-xl border p-4 mb-5 font-mono text-xs overflow-hidden ${
          theme === 'dark' 
            ? 'bg-[#0a0a0a] border-foreground/5' 
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex gap-3">
            {/* Line numbers */}
            <div className={`select-none text-right ${theme === 'dark' ? 'text-muted-foreground/30' : 'text-slate-400'}`}>
              {codePreview.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            {/* Code */}
            <div className="flex-1 overflow-hidden">
              {codePreview.map((line, i) => (
                <div key={i} className="truncate">
                  {line.includes('class') && (
                    <>
                      <span className={theme === 'dark' ? 'text-[#C586C0]' : 'text-[#AF00DB]'}>class</span>
                      <span className={theme === 'dark' ? 'text-[#4EC9B0]' : 'text-[#267F99]'}>{line.replace('class', '').replace(':', '')}</span>
                      <span className={theme === 'dark' ? 'text-foreground/80' : 'text-slate-700'}>:</span>
                    </>
                  )}
                  {line.includes('def') && (
                    <>
                      <span className={theme === 'dark' ? 'text-[#C586C0]' : 'text-[#AF00DB]'}>def</span>
                      <span className={theme === 'dark' ? 'text-[#DCDCAA]' : 'text-[#795E26]'}>{line.replace('def', '').replace(':', '')}</span>
                      <span className={theme === 'dark' ? 'text-foreground/80' : 'text-slate-700'}>:</span>
                    </>
                  )}
                  {line.includes('#') && (
                    <span className={theme === 'dark' ? 'text-[#6A9955]' : 'text-[#008000]'}>{line}</span>
                  )}
                  {!line.includes('class') && !line.includes('def') && !line.includes('#') && (
                    <span className={theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}>{line}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          {estimatedTime && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{estimatedTime}</span>
            </div>
          )}
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors ml-auto font-medium">
            Start Module
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
